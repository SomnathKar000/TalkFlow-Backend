import { Socket } from "socket.io";

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

  socket.off("setup", (user: UserData) => {
    console.log("client disconnected");
    socket.leave(user.emailId);
  });
}

export { handleWebSocketConnection, UserData };
