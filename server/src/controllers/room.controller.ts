import { Socket } from "socket.io";
import rooms from "../global/rooms";

export const roomHandler = (socket: Socket) => {
  const joinRoom = ({
    roomId,
    isInitiator,
  }: {
    roomId: any;
    isInitiator: boolean;
  }) => {
    socket.join(roomId);
    socket.emit("joinedRoom", rooms[roomId][isInitiator ? 1 : 0].name);

    if (isInitiator && rooms[roomId][1]) {
      socket.broadcast
        .to(rooms[roomId][1].socketId)
        .emit("invitedToJoinRoom", { room: roomId });
    }
  };

  const sendSignal = ({
    roomId,
    signalData,
  }: {
    roomId: any;
    signalData: any;
  }) => {
    socket.broadcast.to(roomId).emit("receiveSignal", signalData);
  };

  socket.on("userJoinRoom", joinRoom);

  socket.on("sendSignal", sendSignal);
};
