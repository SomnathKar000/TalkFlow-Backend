import { WebSocket } from "ws";
import {
  handleSetupEvent,
  handleJoinEvent,
  handleTypingEvent,
  handleNewMessageEvent,
  handleStopTypingEvent,
} from "../controllers/socketController";
interface UserData {
  emailId: string;
}

interface ChatMessage {
  chatMembers: UserData[];
  message: string;
  sender: UserData;
}

function handleWebSocketConnection(
  socket: WebSocket,
  clients: Map<string, WebSocket>
) {
  console.log("client connected");

  socket.on("message", (data: string) => {
    const jsonData = JSON.parse(data.toString());
    switch (jsonData.event) {
      case "setup":
        handleSetupEvent(socket, jsonData.data, clients);
        break;
      case "join chat":
        handleJoinEvent(socket, jsonData.data);
        break;
      case "typing":
        handleTypingEvent(socket, jsonData.data);
        break;
      case "stop typing":
        handleStopTypingEvent(socket, jsonData.data);
        break;
      case "new message":
        handleNewMessageEvent(socket, jsonData.data);
        break;
      default:
        break;
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
}

export { handleWebSocketConnection, UserData, ChatMessage };
