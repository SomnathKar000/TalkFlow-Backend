import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { handleWebSocketConnection } from "./websocket/socketHandler";
import { sequelize } from "./utils/database";

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

const port = 5000;

const wss = new WebSocketServer({ server });

wss.on("connection", handleWebSocketConnection);

async function start() {
  try {
    console.log("Starting server...");
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log("Unable to start server", error);
    process.exit(1);
  }
}
start();
