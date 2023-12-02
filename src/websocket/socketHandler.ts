import * as WebSocket from "ws";

function handleWebSocketConnection(socket: WebSocket) {
  console.log("client connected");
  socket.on("message", (data) => {
    console.log("received: %s", data);
    socket.send(`Hello, you sent -> ${data}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
}

export { handleWebSocketConnection };
