import { Socket } from "socket.io";
import { v4 } from "uuid";

interface UserData {
  emailId: string;
}

function handleWebSocketConnection(socket: Socket) {
  console.log("client connected");
  socket.on("setup", (user: UserData) => {
    socket.join(user.emailId);
    socket.emit("Connected");
  });

  socket.on("join chat", (room) => {
    console.log("User joined room: " + room);
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageInfo) => {
    const users = newMessageInfo.ConversationMembers;
    const senderEmail = newMessageInfo.senderEmail;
    let message = newMessageInfo.message;

    message.messageId = v4();
    message.date = String(new Date());

    users.map(
      (user: { emailId: string; userName: string; avatar?: string }) => {
        if (user.emailId === senderEmail) return;
        socket.in(user.emailId).emit("message received", message);
      }
    );
  });

  socket.off("setup", (user: UserData) => {
    console.log("client disconnected");
    socket.leave(user.emailId);
  });
}

export { handleWebSocketConnection, UserData };
