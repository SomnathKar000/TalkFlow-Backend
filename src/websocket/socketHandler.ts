import * as WebSocket from "ws";

function handleWebSocketConnection(socket: WebSocket) {
  console.log("client connected");

  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());
    if (message.type === "join") {
      socket.send(`Welcome ${message}`);
    } else if (message.type === "message") {
      console.log("received: %s", message);
      socket.send(`Hello, you sent -> ${message.message}`);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
}

export { handleWebSocketConnection };
