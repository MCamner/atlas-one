import com.sun.net.httpserver.HttpServer;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Local smoke test: Atlas One's /api/core against a real Atlas Core CLI.
 *
 * Not run in CI; it needs Core installed. `atlas` must be on PATH, or set
 * ATLAS_BIN. Run from the repo root:
 *   javac -d out src/*.java tests/*.java && java -cp out CoreSmoke
 *
 * It starts a run on a one-file repository through the same handler the UI
 * uses, then checks that each answer is what the Core CLI itself prints, that
 * Core read the file (path and SHA-256), and that the documents still carry
 * the schema tags the contract-test fixtures were captured with.
 */
public class CoreSmoke {
    private static int failures = 0;

    public static void main(String[] args) throws Exception {
        String env = System.getenv("ATLAS_BIN");
        String atlas = env == null || env.isEmpty() ? "atlas" : env;
        Result version = cli(atlas, "version");
        if (version.exit != 0) {
            System.out.println("FAIL atlas not runnable (" + atlas + "): " + version.stderr.trim());
            System.exit(1);
        }
        System.out.println("atlas " + version.stdout.trim());

        Path dir = Files.createTempDirectory("atlas-one-smoke");
        Path repo = Files.createDirectory(dir.resolve("repo"));
        byte[] readme = "# smoke\n\nOne file for the Atlas One smoke test.\n".getBytes(StandardCharsets.UTF_8);
        Files.write(repo.resolve("README.md"), readme);
        Path runs = dir.resolve("runs");

        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/api/core/", new CoreRunHandler(atlas, runs));
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort() + "/api/core/runs";
        try {
            String started = post(base, "{\"task\":\"Review the README for accuracy\",\"repo_path\":"
                + AtlasServer.escapeJson(repo.toString()) + "}");
            String runId = CoreContractTest.stringField(started, "run_id");
            if (runId == null) {
                System.out.println("FAIL no run id: " + started);
                System.exit(1);
            }
            System.out.println("run " + runId);
            String log = runs.resolve(runId + ".jsonl").toString();

            String result = waitForResult(base + "/" + runId + "/result");
            check("the run exited with a documented exit code", true,
                result.matches("(?s)\\{\"exit\":[0-3],.*"));
            check("the run document is atlas-run.v1", "atlas-run.v1", CoreContractTest.schemaOf(
                result.substring(result.indexOf("\"run\":"))));

            String status = get(base + "/" + runId + "/status");
            check("status is what `atlas status` prints",
                "{\"exit\":0,\"data\":" + cli(atlas, "status", runId, "--event-log", log, "--json").stdout.trim() + "}",
                status);
            check("status is atlas-status.v1", "atlas-status.v1", CoreContractTest.schemaOf(status.substring(8)));
            check("status is finished", "finished", CoreContractTest.stringField(status, "state"));

            String inspect = get(base + "/" + runId + "/inspect");
            check("inspect is what `atlas inspect` prints",
                "{\"exit\":0,\"data\":" + cli(atlas, "inspect", runId, "--event-log", log, "--json").stdout.trim() + "}",
                inspect);
            check("inspect is atlas-inspect.v1", "atlas-inspect.v1", CoreContractTest.schemaOf(inspect.substring(8)));
            check("Core read README.md with its real SHA-256", true,
                inspect.matches("(?s).*\"path\":\\s*\"README.md\",\\s*\"content_sha256\":\\s*\"" + sha256(readme) + "\".*"));

            String events = get(base + "/" + runId + "/events");
            check("events are what `atlas events` prints",
                "[" + String.join(",", CoreContractTest.lines(
                    cli(atlas, "events", runId, "--event-log", log).stdout)) + "]",
                events.substring(events.indexOf("\"data\":") + 7, events.lastIndexOf(",\"error\":")));
            check("events are atlas-event.v1", "atlas-event.v1", CoreContractTest.schemaOf(events));
        } finally {
            server.stop(0);
        }

        if (failures > 0) {
            System.out.println(failures + " FAILED");
            System.exit(1);
        }
        System.out.println("OK");
    }

    static String sha256(byte[] bytes) throws Exception {
        StringBuilder hex = new StringBuilder();
        for (byte b : MessageDigest.getInstance("SHA-256").digest(bytes)) hex.append(String.format("%02x", b));
        return hex.toString();
    }

    static String waitForResult(String url) throws Exception {
        // Core's own run deadline is well inside this.
        for (int i = 0; i < 1200; i++) {
            if (((HttpURLConnection) new URL(url).openConnection()).getResponseCode() == 200) return get(url);
            Thread.sleep(100);
        }
        System.out.println("FAIL the run did not exit within 120 s");
        System.exit(1);
        return null;
    }

    static String get(String url) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        return new String(conn.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    static String post(String url, String body) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/json");
        try (OutputStream os = conn.getOutputStream()) {
            os.write(body.getBytes(StandardCharsets.UTF_8));
        }
        return new String(conn.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    static final class Result {
        final int exit;
        final String stdout;
        final String stderr;

        Result(int exit, String stdout, String stderr) {
            this.exit = exit;
            this.stdout = stdout;
            this.stderr = stderr;
        }
    }

    /** The Core CLI called directly, as the reference the bridge must match. */
    static Result cli(String atlas, String... args) throws Exception {
        List<String> cmd = new ArrayList<>();
        cmd.add(atlas);
        cmd.addAll(List.of(args));
        Process proc;
        try {
            proc = new ProcessBuilder(cmd).start();
        } catch (java.io.IOException e) {
            return new Result(-1, "", e.getMessage());
        }
        String out = new String(proc.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        String err = new String(proc.getErrorStream().readAllBytes(), StandardCharsets.UTF_8);
        proc.waitFor(30, TimeUnit.SECONDS);
        return new Result(proc.exitValue(), out, err);
    }

    static void check(String label, Object expected, Object actual) {
        if (!expected.equals(actual)) {
            fail(label + ": expected " + CoreContractTest.clip(expected) + ", got " + CoreContractTest.clip(actual));
        }
    }

    static void fail(String message) {
        failures++;
        System.out.println("FAIL " + message);
    }
}
