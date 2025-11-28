import { createServer, IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import NotificationRoute from "./routes/NotificationRoute";

const app = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const method = req.method ?? "";
  const url = req.url ?? "";

  const handler = (NotificationRoute as any)[method]?.[url];

  if (!handler) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    try {
      req.body = body ? JSON.parse(body) : {};
    } catch {
      req.body = {};
    }

    handler(req, res);
  });
});

const io = new Server(app, {
  cors: { origin: "*" },
});

export { io };

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
