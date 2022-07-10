import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";
import rooms from "../global/rooms";

let joinedUsers: Record<string, string> = {};

export const dashboardHandler = (socket: Socket, io: any) => {
  const userJoined = ({ socketId, name }: { socketId: any; name: any }) => {
    joinedUsers[socketId] = name;
    socket.broadcast.emit("userJoined", {
      [`${socketId}`]: name,
    });
  };

  const callUser = ({
    userToCall,
    from,
    name,
  }: {
    userToCall: any;
    from: any;
    name: any;
  }) => {
    const roomId = uuidV4();
    rooms[roomId] = [from];
    io.to(userToCall).emit("calling", {
      from: from.socketId,
      name,
      room: roomId,
    });
  };

  const answerCall = ({
    from,
    userToAnswer,
    room,
  }: {
    from: any;
    userToAnswer: any;
    room: any;
  }) => {
    rooms[room].push(from);
    io.to(userToAnswer).emit("callAccepted", { room });
  };

  socket.emit("userConnected", {
    socketId: socket.id,
    users: joinedUsers,
  });

  socket.on("userJoined", userJoined);

  socket.on("callUser", callUser);

  socket.on("answerCall", answerCall);

  socket.on("disconnect", () => {
    const { [socket.id]: _, ...otherUsers } = joinedUsers;
    joinedUsers = otherUsers;
    socket.broadcast.emit("userLeft", {
      socketId: socket.id,
    });
  });
};
