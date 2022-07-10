import { Socket } from "socket.io";

export const callingHandler = (socket: Socket) => {
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
};
