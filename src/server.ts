import "express-async-errors";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { WebSocketServer } from "ws";
import userRoutes from "./routes/userRoutes";
import { handleWebSocketConnection } from "./websocket/socketHandler";
import { sequelize } from "./utils/database";
import { errorHandler, notFoundHandler } from "./middleware/errorHandling";

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

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
