import { WebSocket } from "ws";
import { UserData, ChatRoom } from "../websocket/socketHandler";

function handleSetupEvent(
  socket: WebSocket,
  userData: UserData,
  userDataMap: Map<string, UserData>,
  socketRoomMap: Map<WebSocket, string>
) {}

function handleJoinEvent(
  socket: WebSocket,
  userData: UserData,
  userDataMap: Map<string, UserData>,
  chatRooms: Map<string, ChatRoom>
) {}

function handleTypingEvent(
  socket: WebSocket,
  socketRoomMap: Map<WebSocket, string>
) {}

function handleStopTypingEvent(
  socket: WebSocket,
  socketRoomMap: Map<WebSocket, string>
) {}

function handleNewMessageEvent(
  socket: WebSocket,
  userData: UserData,
  socketRoomMap: Map<WebSocket, string>
) {}

function handleDisconnectEvent(
  socket: WebSocket,
  socketRoomMap: Map<WebSocket, string>,
  chatRooms: Map<string, ChatRoom>
) {}
export {
  handleSetupEvent,
  handleJoinEvent,
  handleTypingEvent,
  handleNewMessageEvent,
  handleStopTypingEvent,
  handleDisconnectEvent,
};
