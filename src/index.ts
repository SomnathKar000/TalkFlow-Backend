import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);

const port = 5000;

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("message", (message) => {
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
