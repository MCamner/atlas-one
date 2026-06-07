import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.awt.Desktop;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class AtlasServer {
    private static final int PORT = 8766;
    private static final Path WEB_ROOT = Paths.get("web");

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", PORT), 0);
        server.createContext("/api/prompts", new JsonHandler("web/prompts.json"));
        server.createContext("/api/health", exchange -> sendJson(exchange, "{\"status\":\"ok\",\"app\":\"Atlas Studio\"}"));
        server.createContext("/api/execute", new ExecuteHandler());
        server.createContext("/", new StaticHandler());
        server.setExecutor(null);
        server.start();

        String url = "http://127.0.0.1:" + PORT + "/";
        System.out.println("Atlas Studio running on " + url);
        try {
            if (Desktop.isDesktopSupported()) {
                Desktop.getDesktop().browse(new URI(url));
            }
        } catch (Exception ignored) {
            System.out.println("Open this URL manually: " + url);
        }
    }

    static class JsonHandler implements HttpHandler {
        private final Path jsonPath;
        JsonHandler(String jsonPath) {
            this.jsonPath = Paths.get(jsonPath);
        }
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            byte[] bytes = Files.readAllBytes(jsonPath);
            Headers headers = exchange.getResponseHeaders();
            headers.set("Content-Type", "application/json; charset=utf-8");
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }
    }

    static class StaticHandler implements HttpHandler {
        private final Map<String, String> mime = new HashMap<>();
        StaticHandler() {
            mime.put(".html", "text/html; charset=utf-8");
            mime.put(".css", "text/css; charset=utf-8");
            mime.put(".js", "application/javascript; charset=utf-8");
            mime.put(".json", "application/json; charset=utf-8");
            mime.put(".png", "image/png");
            mime.put(".jpg", "image/jpeg");
            mime.put(".jpeg", "image/jpeg");
            mime.put(".svg", "image/svg+xml");
            mime.put(".ico", "image/x-icon");
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String reqPath = exchange.getRequestURI().getPath();
            if (reqPath.equals("/")) reqPath = "/index.html";
            Path file = WEB_ROOT.resolve(reqPath.substring(1)).normalize();
            if (!file.startsWith(WEB_ROOT) || !Files.exists(file) || Files.isDirectory(file)) {
                byte[] body = "Not found".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(404, body.length);
                try (OutputStream os = exchange.getResponseBody()) { os.write(body); }
                return;
            }
            String type = contentType(file.getFileName().toString());
            exchange.getResponseHeaders().set("Content-Type", type);
            byte[] bytes = Files.readAllBytes(file);
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) { os.write(bytes); }
        }

        private String contentType(String filename) {
            for (Map.Entry<String, String> e : mime.entrySet()) {
                if (filename.endsWith(e.getKey())) return e.getValue();
            }
            return "application/octet-stream";
        }
    }

    static void sendJson(HttpExchange exchange, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.sendResponseHeaders(200, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    static class ExecuteHandler implements HttpHandler {
        private static final String MQ_AGENT_BIN = resolveBin();

        private static String resolveBin() {
            String env = System.getenv("MQ_AGENT_BIN");
            if (env != null && !env.isEmpty()) return env;
            String home = System.getProperty("user.home");
            return home + "/mq-agent/.venv/bin/mq-agent";
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            if (!"POST".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(405, -1);
                return;
            }

            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            String goal = extractJsonString(body, "goal");
            String mode = extractJsonString(body, "mode");
            String repoPath = extractJsonString(body, "path");
            if (repoPath == null || repoPath.isEmpty()) repoPath = ".";

            List<String> cmd = buildCommand(goal, mode, repoPath);
            int timeoutSecs = ("review".equals(mode) || "architect".equals(mode)) ? 180 : 60;

            try {
                ProcessBuilder pb = new ProcessBuilder(cmd);
                pb.redirectErrorStream(true);
                pb.environment().put("TERM", "dumb");
                Process proc = pb.start();

                final StringBuilder out = new StringBuilder();
                final InputStream is = proc.getInputStream();
                Thread reader = new Thread(() -> {
                    try {
                        out.append(new String(is.readAllBytes(), StandardCharsets.UTF_8));
                    } catch (IOException ignored) {}
                });
                reader.setDaemon(true);
                reader.start();

                boolean done = proc.waitFor(timeoutSecs, TimeUnit.SECONDS);
                reader.join(2000);

                if (!done) {
                    proc.destroyForcibly();
                    sendJson(exchange, "{\"ok\":false,\"error\":\"mq-agent timed out after " + timeoutSecs + "s\"}");
                    return;
                }

                int exit = proc.exitValue();
                String output = out.toString().trim();
                String json;
                if (output.startsWith("{") || output.startsWith("[")) {
                    json = "{\"ok\":" + (exit == 0) + ",\"command\":" + escapeJson(String.join(" ", cmd)) + ",\"result\":" + output + "}";
                } else {
                    json = "{\"ok\":" + (exit == 0) + ",\"command\":" + escapeJson(String.join(" ", cmd)) + ",\"result\":" + escapeJson(output) + "}";
                }
                sendJson(exchange, json);
            } catch (Exception e) {
                sendJson(exchange, "{\"ok\":false,\"error\":" + escapeJson(e.getMessage()) + "}");
            }
        }

        private List<String> buildCommand(String goal, String mode, String path) {
            switch (mode) {
                case "architect":
                    return Arrays.asList(MQ_AGENT_BIN, "review", "repo", path, "--architecture", "--json");
                case "review":
                    return Arrays.asList(MQ_AGENT_BIN, "review", "repo", path, "--json");
                case "debug":
                    return Arrays.asList(MQ_AGENT_BIN, "audit", path, "--dry-run", "--json");
                case "research":
                    return Arrays.asList(MQ_AGENT_BIN, "signal", path, "--json");
                default:
                    return Arrays.asList(MQ_AGENT_BIN, "plan", goal, "--json");
            }
        }

        private String extractJsonString(String json, String key) {
            int keyIdx = json.indexOf("\"" + key + "\"");
            if (keyIdx < 0) return "";
            int colon = json.indexOf(':', keyIdx);
            if (colon < 0) return "";
            int quote = json.indexOf('"', colon + 1);
            if (quote < 0) return "";
            StringBuilder sb = new StringBuilder();
            for (int i = quote + 1; i < json.length(); i++) {
                char c = json.charAt(i);
                if (c == '\\' && i + 1 < json.length()) {
                    sb.append(json.charAt(++i));
                } else if (c == '"') {
                    break;
                } else {
                    sb.append(c);
                }
            }
            return sb.toString();
        }

        private String escapeJson(String s) {
            if (s == null) return "null";
            return "\"" + s.replace("\\", "\\\\")
                           .replace("\"", "\\\"")
                           .replace("\n", "\\n")
                           .replace("\r", "\\r")
                           .replace("\t", "\\t") + "\"";
        }
    }
}
