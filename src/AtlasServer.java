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
import java.util.HashMap;
import java.util.Map;

public class AtlasServer {
    private static final int PORT = 8765;
    private static final Path WEB_ROOT = Paths.get("web");

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", PORT), 0);
        server.createContext("/api/prompts", new JsonHandler("web/prompts.json"));
        server.createContext("/api/health", exchange -> sendJson(exchange, "{\"status\":\"ok\",\"app\":\"Atlas Studio v12 Mac\"}"));
        server.createContext("/", new StaticHandler());
        server.setExecutor(null);
        server.start();

        String url = "http://127.0.0.1:" + PORT + "/";
        System.out.println("Atlas Studio v12 Mac running on " + url);
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
        exchange.sendResponseHeaders(200, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}
