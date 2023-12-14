import { WebSocket } from "ws";
import {
  handleSetupEvent,
  handleJoinEvent,
  handleTypingEvent,
  handleNewMessageEvent,
  handleStopTypingEvent,
  handleDisconnectEvent,
} from "../controllers/socketController";
interface UserData {
  emailId: string;
}

interface ChatRoom {
  roomId: string;
  users: UserData[];
}

function handleWebSocketConnection(
  socket: WebSocket,
  userDataMap: Map<string, UserData>,
  socketRoomMap: Map<WebSocket, string>,
  chatRooms: Map<string, ChatRoom>
) {
  console.log("client connected");

  socket.on("message", (data: string) => {
    const jsonData = JSON.parse(data.toString());
    switch (jsonData.event) {
      case "setup":
        handleSetupEvent(socket, jsonData.data, userDataMap, socketRoomMap);
        break;
      case "join chat":
        handleJoinEvent(socket, jsonData.data, userDataMap, chatRooms);
        break;
      case "typing":
        handleTypingEvent(socket, socketRoomMap);
        break;
      case "stop typing":
        handleStopTypingEvent(socket, socketRoomMap);
        break;
      case "new message":
        handleNewMessageEvent(socket, jsonData.data, socketRoomMap);
        break;
      default:
        break;
    }
  });

  socket.on("close", () => {
    handleDisconnectEvent(socket, socketRoomMap, chatRooms);
  });
}

export { handleWebSocketConnection, UserData, ChatRoom };
