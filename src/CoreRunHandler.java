import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

/**
 * Atlas Core host bridge: /api/core/...
 *
 * Atlas One does not run or grade anything here. Every answer is what the
 * Atlas Core CLI printed: `atlas create`, `atlas run`, `atlas status`,
 * `atlas events`, `atlas inspect` and `atlas cancel`. One run = one event log,
 * so the log path is derived from the run id and nothing else is stored.
 *
 *   POST /api/core/runs                  {"task", "repo_path"} -> {"run_id"}
 *   GET  /api/core/runs/{id}/status      atlas-status.v1
 *   GET  /api/core/runs/{id}/events      atlas-event.v1 records, as an array
 *   GET  /api/core/runs/{id}/inspect     atlas-inspect.v1
 *   GET  /api/core/runs/{id}/result      {"exit", "run", "error"} once the run exited
 *   POST /api/core/runs/{id}/cancel      atlas-status.v1
 */
class CoreRunHandler implements HttpHandler {
    /** Same rule as Core's run id: it ends up in file names. */
    private static final Pattern RUN_ID = Pattern.compile("[A-Za-z0-9][A-Za-z0-9._:-]{0,127}");
    private static final long CLI_TIMEOUT_SECS = 30;

    private final String atlasBin;
    private final Path runsDir;

    CoreRunHandler() {
        String bin = System.getenv("ATLAS_BIN");
        this.atlasBin = (bin == null || bin.isEmpty()) ? "atlas" : bin;
        String dir = System.getenv("ATLAS_ONE_RUNS_DIR");
        this.runsDir = (dir == null || dir.isEmpty())
            ? Paths.get(System.getProperty("user.home"), ".atlas-one", "runs")
            : Paths.get(dir);
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String[] parts = exchange.getRequestURI().getPath().split("/");
        // "", "api", "core", "runs", [id], [action]
        try {
            if (parts.length == 4 && "runs".equals(parts[3]) && "POST".equals(method)) {
                start(exchange);
                return;
            }
            if (parts.length != 6 || !"runs".equals(parts[3]) || !RUN_ID.matcher(parts[4]).matches()) {
                send(exchange, 404, "{\"error\":\"not found\"}");
                return;
            }
            String runId = parts[4];
            String log = logPath(runId).toString();
            switch (parts[5]) {
                case "status":
                    relay(exchange, atlas("status", runId, "--event-log", log, "--json"));
                    return;
                case "inspect":
                    relay(exchange, atlas("inspect", runId, "--event-log", log, "--json"));
                    return;
                case "events":
                    events(exchange, atlas("events", runId, "--event-log", log));
                    return;
                case "result":
                    result(exchange, runId);
                    return;
                case "cancel":
                    if (!"POST".equals(method)) {
                        send(exchange, 405, "{\"error\":\"POST required\"}");
                        return;
                    }
                    relay(exchange, atlas("cancel", runId, "--event-log", log, "--json"));
                    return;
                default:
                    send(exchange, 404, "{\"error\":\"not found\"}");
            }
        } catch (Exception e) {
            send(exchange, 500, "{\"error\":" + AtlasServer.escapeJson(e.getMessage()) + "}");
        }
    }

    private void start(HttpExchange exchange) throws Exception {
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        String task = AtlasServer.extractJsonString(body, "task").trim();
        String repoPath = AtlasServer.extractJsonString(body, "repo_path").trim();
        if (task.isEmpty()) {
            send(exchange, 400, "{\"error\":\"task is required\"}");
            return;
        }
        Result created = atlas("create");
        String runId = created.stdout.trim();
        if (created.exit != 0 || !RUN_ID.matcher(runId).matches()) {
            send(exchange, 502, "{\"error\":" + AtlasServer.escapeJson("atlas create failed: " + created.stderr) + "}");
            return;
        }
        Files.createDirectories(runsDir);
        List<String> cmd = new ArrayList<>(Arrays.asList(
            atlasBin, "run", task, "--run-id", runId,
            "--event-log", logPath(runId).toString(), "--json"));
        if (!repoPath.isEmpty()) {
            cmd.add("--repo-path");
            cmd.add(repoPath);
        }
        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.redirectOutput(file(runId, ".run.json"));
        pb.redirectError(file(runId, ".stderr"));
        Process proc = pb.start();
        // The exit code is written when the run exits: `result` answers only
        // after that, so a half-written stdout is never read as a document.
        Thread waiter = new Thread(() -> {
            try {
                int exit = proc.waitFor();
                Files.write(file(runId, ".exit").toPath(),
                    Integer.toString(exit).getBytes(StandardCharsets.UTF_8));
            } catch (Exception ignored) {
            }
        });
        waiter.setDaemon(true);
        waiter.start();
        send(exchange, 202, "{\"run_id\":" + AtlasServer.escapeJson(runId)
            + ",\"event_log\":" + AtlasServer.escapeJson(logPath(runId).toString()) + "}");
    }

    private void result(HttpExchange exchange, String runId) throws IOException {
        Path exitFile = file(runId, ".exit").toPath();
        if (!Files.exists(exitFile)) {
            send(exchange, 404, "{\"error\":\"run has not exited\"}");
            return;
        }
        String exit = new String(Files.readAllBytes(exitFile), StandardCharsets.UTF_8).trim();
        String stdout = read(file(runId, ".run.json").toPath()).trim();
        String stderr = read(file(runId, ".stderr").toPath()).trim();
        // stdout is either one atlas-run.v1 document or empty (Core prints no
        // document when it cannot deliver one). It is passed on as is.
        String run = stdout.startsWith("{") ? stdout : "null";
        String error = stderr.startsWith("{") ? stderr : AtlasServer.escapeJson(stderr.isEmpty() ? null : stderr);
        send(exchange, 200, "{\"exit\":" + Integer.parseInt(exit) + ",\"run\":" + run + ",\"error\":" + error + "}");
    }

    private void relay(HttpExchange exchange, Result result) throws IOException {
        String out = result.stdout.trim();
        if (out.startsWith("{")) {
            send(exchange, 200, "{\"exit\":" + result.exit + ",\"data\":" + out + "}");
        } else {
            send(exchange, 200, "{\"exit\":" + result.exit + ",\"data\":null,\"error\":"
                + AtlasServer.escapeJson(result.stderr.trim()) + "}");
        }
    }

    private void events(HttpExchange exchange, Result result) throws IOException {
        StringBuilder array = new StringBuilder("[");
        for (String line : result.stdout.split("\n")) {
            if (line.trim().isEmpty()) continue;
            if (array.length() > 1) array.append(',');
            array.append(line.trim());
        }
        array.append(']');
        send(exchange, 200, "{\"exit\":" + result.exit + ",\"data\":" + array + ",\"error\":"
            + AtlasServer.escapeJson(result.stderr.trim().isEmpty() ? null : result.stderr.trim()) + "}");
    }

    private Path logPath(String runId) {
        return runsDir.resolve(runId + ".jsonl");
    }

    private File file(String runId, String suffix) {
        return runsDir.resolve(runId + suffix).toFile();
    }

    private static String read(Path path) throws IOException {
        return Files.exists(path) ? new String(Files.readAllBytes(path), StandardCharsets.UTF_8) : "";
    }

    private static final class Result {
        final int exit;
        final String stdout;
        final String stderr;

        Result(int exit, String stdout, String stderr) {
            this.exit = exit;
            this.stdout = stdout;
            this.stderr = stderr;
        }
    }

    private Result atlas(String... args) throws Exception {
        List<String> cmd = new ArrayList<>();
        cmd.add(atlasBin);
        cmd.addAll(Arrays.asList(args));
        ProcessBuilder pb = new ProcessBuilder(cmd);
        File out = File.createTempFile("atlas-one-", ".out");
        File err = File.createTempFile("atlas-one-", ".err");
        try {
            pb.redirectOutput(out);
            pb.redirectError(err);
            Process proc = pb.start();
            if (!proc.waitFor(CLI_TIMEOUT_SECS, TimeUnit.SECONDS)) {
                proc.destroyForcibly();
                return new Result(-1, "", "atlas " + args[0] + " timed out");
            }
            return new Result(proc.exitValue(), read(out.toPath()), read(err.toPath()));
        } finally {
            out.delete();
            err.delete();
        }
    }

    private static void send(HttpExchange exchange, int code, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.sendResponseHeaders(code, bytes.length);
        try (java.io.OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}
