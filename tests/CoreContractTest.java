import com.sun.net.httpserver.HttpServer;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.ArrayList;
import java.util.List;

/**
 * /api/core against a mock Core that prints documents captured from a real
 * Atlas Core run (tests/fixtures/core). Every answer must carry Core's output
 * unchanged, including a run Core did not pass: Atlas One relays, it does not
 * grade.
 *
 * Run from the repo root:
 *   javac -d out src/*.java tests/*.java && java -cp out CoreContractTest
 */
public class CoreContractTest {
    static final Path FIXTURES = Paths.get("tests", "fixtures", "core");
    /** The run id inside the fixtures. */
    static final String RUN_ID = "9f3d3b6d-e65a-4474-b99e-a5d41b88f44d";
    static final String CANCEL_REFUSED =
        "atlas cancel: run '" + RUN_ID + "' already finished; nothing to cancel";
    static final String NO_DOCUMENT =
        "{\"error\": \"worker_result_unavailable\", \"run_id\": \"" + RUN_ID + "\"}";
    private static int failures = 0;

    public static void main(String[] args) throws Exception {
        String run = fixture("run.json");
        String status = fixture("status.json");
        String inspect = fixture("inspect.json");
        String events = fixture("events.jsonl");

        check("fixture run is atlas-run.v1", "atlas-run.v1", schemaOf(run));
        check("fixture status is atlas-status.v1", "atlas-status.v1", schemaOf(status));
        check("fixture inspect is atlas-inspect.v1", "atlas-inspect.v1", schemaOf(inspect));
        for (String line : lines(events)) {
            check("fixture event is atlas-event.v1", "atlas-event.v1", schemaOf(line));
        }
        // The fixture run did not pass. A bridge that graded it would have
        // something to disagree with.
        check("fixture run stopped short of passing", "max_iterations", stringField(run, "stop_reason"));

        Path dir = Files.createTempDirectory("atlas-one-contract");
        Path fake = mockCore(dir);
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/api/core/", new CoreRunHandler(fake.toString(), dir.resolve("runs")));
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort() + "/api/core/runs";
        try {
            check("status is Core's atlas-status.v1, unchanged",
                "{\"exit\":0,\"data\":" + status + "}", get(base + "/" + RUN_ID + "/status"));
            check("inspect is Core's atlas-inspect.v1, unchanged",
                "{\"exit\":0,\"data\":" + inspect + "}", get(base + "/" + RUN_ID + "/inspect"));
            check("events are Core's atlas-event.v1 records, in order",
                "{\"exit\":0,\"data\":[" + String.join(",", lines(events)) + "],\"error\":null}",
                get(base + "/" + RUN_ID + "/events"));
            check("a refused cancel carries Core's exit code and message",
                "{\"exit\":2,\"data\":null,\"error\":\"" + CANCEL_REFUSED + "\"}",
                post(base + "/" + RUN_ID + "/cancel", ""));

            check("result before the run exits is 404", 404, code(base + "/" + RUN_ID + "/result"));
            check("POST starts a run with Core's run id",
                "{\"run_id\":\"" + RUN_ID + "\",\"event_log\":\""
                    + dir.resolve("runs").resolve(RUN_ID + ".jsonl") + "\"}",
                post(base, "{\"task\":\"Review the README for accuracy\",\"repo_path\":\"\"}"));
            check("result is Core's exit code and atlas-run.v1, unchanged",
                "{\"exit\":2,\"run\":" + run + ",\"error\":null}",
                waitForResult(base + "/" + RUN_ID + "/result"));

            Files.delete(dir.resolve("runs").resolve(RUN_ID + ".exit"));
            post(base, "{\"task\":\"no-document\",\"repo_path\":\"\"}");
            check("a run without a document is null, with Core's error as it came",
                "{\"exit\":1,\"run\":null,\"error\":" + NO_DOCUMENT + "}",
                waitForResult(base + "/" + RUN_ID + "/result"));

            check("an id Core could not have issued is 404", 404, code(base + "/..%2Fetc/status"));
        } finally {
            server.stop(0);
        }

        Path failing = dir.resolve("failing-atlas");
        Files.write(failing, List.of("#!/bin/sh", "echo 'core unavailable' >&2", "exit 1"));
        Files.setPosixFilePermissions(failing, PosixFilePermissions.fromString("rwx------"));
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/api/core/", new CoreRunHandler(failing.toString(), dir.resolve("runs2")));
        server.start();
        try {
            String url = "http://127.0.0.1:" + server.getAddress().getPort() + "/api/core/runs";
            check("a failed atlas create is 502, not a run", 502, postCode(url, "{\"task\":\"x\"}"));
        } finally {
            server.stop(0);
        }

        if (failures > 0) {
            System.out.println(failures + " FAILED");
            System.exit(1);
        }
        System.out.println("OK");
    }

    /** A Core CLI that answers every command from the fixtures. */
    static Path mockCore(Path dir) throws Exception {
        Path fake = dir.resolve("atlas");
        String fx = FIXTURES.toAbsolutePath().toString();
        Files.write(fake, List.of(
            "#!/bin/sh",
            "case \"$1\" in",
            "  create) echo " + RUN_ID + " ;;",
            "  run)",
            "    if [ \"$2\" = no-document ]; then echo '" + NO_DOCUMENT + "' >&2; exit 1; fi",
            "    cat '" + fx + "/run.json'; exit 2 ;;",
            "  status) cat '" + fx + "/status.json' ;;",
            "  inspect) cat '" + fx + "/inspect.json' ;;",
            "  events) cat '" + fx + "/events.jsonl' ;;",
            "  cancel) echo \"" + CANCEL_REFUSED + "\" >&2; exit 2 ;;",
            "  *) exit 64 ;;",
            "esac"));
        Files.setPosixFilePermissions(fake, PosixFilePermissions.fromString("rwx------"));
        return fake;
    }

    static String fixture(String name) throws Exception {
        return new String(Files.readAllBytes(FIXTURES.resolve(name)), StandardCharsets.UTF_8).trim();
    }

    static List<String> lines(String text) {
        List<String> out = new ArrayList<>();
        for (String line : text.split("\n")) {
            if (!line.trim().isEmpty()) out.add(line.trim());
        }
        return out;
    }

    static String schemaOf(String json) {
        return stringField(json, "schema");
    }

    /** The first `"name": "value"` in a document; enough for top-level tags. */
    static String stringField(String json, String name) {
        java.util.regex.Matcher m = java.util.regex.Pattern
            .compile("\"" + name + "\"\\s*:\\s*\"([^\"]*)\"").matcher(json);
        return m.find() ? m.group(1) : null;
    }

    static String waitForResult(String url) throws Exception {
        for (int i = 0; i < 100; i++) {
            if (code(url) == 200) return get(url);
            Thread.sleep(50);
        }
        return "no result";
    }

    static int code(String url) throws Exception {
        return ((HttpURLConnection) new URL(url).openConnection()).getResponseCode();
    }

    static String get(String url) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        return new String(conn.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    static HttpURLConnection send(String url, String body) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/json");
        try (OutputStream os = conn.getOutputStream()) {
            os.write(body.getBytes(StandardCharsets.UTF_8));
        }
        return conn;
    }

    static String post(String url, String body) throws Exception {
        return new String(send(url, body).getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    static int postCode(String url, String body) throws Exception {
        return send(url, body).getResponseCode();
    }

    static void check(String label, Object expected, Object actual) {
        if (!expected.equals(actual)) fail(label + ": expected " + clip(expected) + ", got " + clip(actual));
    }

    static String clip(Object value) {
        String text = String.valueOf(value);
        return text.length() > 200 ? text.substring(0, 200) + "… (" + text.length() + " chars)" : text;
    }

    static void fail(String message) {
        failures++;
        System.out.println("FAIL " + message);
    }
}
