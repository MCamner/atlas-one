import com.sun.net.httpserver.HttpServer;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.List;
import java.util.Map;

/**
 * /api/core/runs against a fake `atlas` that records the argv it was given.
 *
 * Run: javac -d out src/*.java tests/*.java && java -cp out CoreRunHandlerTest
 */
public class CoreRunHandlerTest {
    private static int failures = 0;

    public static void main(String[] args) throws Exception {
        // HttpURLConnection drops Origin unless told otherwise; a browser sends it.
        System.setProperty("sun.net.http.allowRestrictedHeaders", "true");
        parserDecodesEveryJsonEscape();
        parserFailsClosed();
        endToEnd();
        if (failures > 0) {
            System.out.println(failures + " FAILED");
            System.exit(1);
        }
        System.out.println("OK");
    }

    static void parserDecodesEveryJsonEscape() {
        Map<String, String> parsed = CoreRunHandler.parseStringObject(
            "{\"task\":\"rad 1\\nrad \\\"2\\\"\\r\\tC:\\\\test\\\\foo \\/ \\b\\f \\u00e5\\ud83d\\ude00\"}");
        check("every escape decodes", "rad 1\nrad \"2\"\r\tC:\\test\\foo / \b\f å😀",
            parsed.get("task"));
    }

    static void parserFailsClosed() {
        String[] malformed = {
            "", "[]", "{", "{\"task\"}", "{\"task\":1}", "{\"task\":\"a\\x\"}",
            "{\"task\":\"a\\u12\"}", "{\"task\":\"a\nb\"}", "{\"task\":\"a\"} x",
            "{\"task\":\"a\",\"task\":\"b\"}", "{\"task\":\"a\",}",
        };
        for (String body : malformed) {
            try {
                CoreRunHandler.parseStringObject(body);
                fail("accepted malformed body: " + body);
            } catch (IllegalArgumentException expected) {
                // fail-closed
            }
        }
    }

    static void endToEnd() throws Exception {
        Path dir = Files.createTempDirectory("atlas-one-test");
        Path argv = dir.resolve("argv");
        Path fake = dir.resolve("atlas");
        // Records each argument on its own NUL-terminated record, so a newline
        // inside the task survives the round trip.
        Files.write(fake, List.of(
            "#!/bin/sh",
            "if [ \"$1\" = create ]; then echo run-1; exit 0; fi",
            "if [ \"$1\" = run ]; then printf '%s\\0' \"$@\" > '" + argv + "'; echo '{}'; fi",
            "exit 0"));
        Files.setPosixFilePermissions(fake, PosixFilePermissions.fromString("rwx------"));

        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/api/core/", new CoreRunHandler(fake.toString(), dir.resolve("runs")));
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort();
        try {
            String task = "rad 1\nrad \"2\"\nC:\\test\\foo";
            String body = "{\"task\":\"rad 1\\nrad \\\"2\\\"\\nC:\\\\test\\\\foo\",\"repo_path\":\"\"}";

            check("text/plain is refused", 415, post(base, body, "text/plain", null));
            check("a foreign origin is refused", 403,
                post(base, body, "application/json", "https://evil.example"));
            check("malformed JSON is refused", 400, post(base, "{\"task\":", "application/json", null));
            check("Atlas One's own origin starts a run", 202,
                post(base, body, "application/json", base));
            waitFor(argv);
            String[] recorded = new String(Files.readAllBytes(argv), StandardCharsets.UTF_8).split("\0");
            check("Core receives the task exactly as typed", task, recorded[1]);

            Files.delete(argv);
            check("curl without an Origin starts a run", 202,
                post(base, body, "application/json", null));
            waitFor(argv);
            check("a foreign origin cannot cancel", 403,
                post(base + "/api/core/runs/run-1/cancel", "", "application/json", "https://evil.example", true));
        } finally {
            server.stop(0);
        }
    }

    static int post(String base, String body, String type, String origin) throws Exception {
        return post(base + "/api/core/runs", body, type, origin, true);
    }

    static int post(String url, String body, String type, String origin, boolean ignored) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", type);
        if (origin != null) conn.setRequestProperty("Origin", origin);
        try (OutputStream os = conn.getOutputStream()) {
            os.write(body.getBytes(StandardCharsets.UTF_8));
        }
        return conn.getResponseCode();
    }

    static void waitFor(Path file) throws InterruptedException {
        for (int i = 0; i < 100 && !Files.exists(file); i++) Thread.sleep(50);
    }

    static void check(String label, Object expected, Object actual) {
        if (!expected.equals(actual)) fail(label + ": expected " + expected + ", got " + actual);
    }

    static void fail(String message) {
        failures++;
        System.out.println("FAIL " + message);
    }
}
