import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log(`> New client connected. Total clients: ${wss.clients.size}`);

  ws.on("message", (message: string) => {
    console.log(`> Received message: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: false });
      }
    });
  });

  ws.on("error", console.error);

  ws.on("close", () => {
    console.log(`> Client disconnected. Total clients: ${wss.clients.size}`);
  });
});

server.listen(3001, () => {
  console.log("> Server running on port 3001");
});
