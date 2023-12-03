import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { handleWebSocketConnection } from "./websocket/socketHandler";

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

const port = 5000;

const wss = new WebSocketServer({ server });

wss.on("connection", handleWebSocketConnection);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
