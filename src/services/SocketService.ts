import { WebSocket } from "ws";
import { UserData, ChatRoom } from "../websocket/socketHandler";

function addUserToRoom(
  room: ChatRoom,
  socket: WebSocket,
  userDataMap: Map<string, UserData>,
  socketRoomMap: Map<WebSocket, string>
) {
  const user = userDataMap.get(socketRoomMap.get(socket)!);
  if (user && room) {
    room.users.push(user);
  }
}

function removeUserFromRoom(
  room: ChatRoom,
  socket: WebSocket,
  userDataMap: Map<string, UserData>,
  socketRoomMap: Map<WebSocket, string>
) {
  const user = userDataMap.get(socketRoomMap.get(socket)!);
  if (user && room) {
    room.users.filter((u) => u.emailId !== user.emailId);
  }
}

function broadcastToRoom(
  room: ChatRoom,
  socketRoomMap: Map<WebSocket, string>,
  event: string,
  data?: any
) {
  if (room) {
    room.users.forEach((user) => {
      const userSocket = Array.from(socketRoomMap.entries()).find(
        ([_, emailId]) => emailId === user.emailId
      )?.[0];

      if (userSocket) {
        userSocket.send(JSON.stringify({ event, data }));
      }
    });
  }
}

function getRoom(roomId: string | undefined, chatRooms: Map<string, ChatRoom>) {
  return roomId ? chatRooms.get(roomId) : undefined;
}

export { addUserToRoom, removeUserFromRoom, broadcastToRoom, getRoom };
