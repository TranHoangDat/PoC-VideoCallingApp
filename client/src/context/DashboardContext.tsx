import React, { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import socketIOClient from "socket.io-client";

export const DashboardContext = createContext<null | any>(null);
const socket = socketIOClient(process.env.REACT_APP_API_HOST as string);

export default function DashboardProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const navigate = useNavigate();
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState<string>("");
  const [joinedUsers, setJoinedUsers] = useState<Record<string, string>>({});
  const [isInitiator, setIsInitiator] = useState<boolean>();

  useEffect(() => {
    socket.on("userConnected", ({ socketId, users }) => {
      setMe(socketId);
      setJoinedUsers(users);
    });

    socket.on("userJoined", user => {
      setJoinedUsers({ ...joinedUsers, ...user });
    });

    socket.on("userLeft", ({ socketId }: { socketId: string }) => {
      const { [socketId]: _, ...otherUsers } = joinedUsers;
      setJoinedUsers(otherUsers);
    });

    socket.on("calling", ({ from, name: callerName, room }) => {
      setCall({ isReceivingCall: true, from, name: callerName, room });
    });

    socket.on("callAccepted", ({ room }) => {
      navigate(`/room/${room}`);
    });

    socket.on("invitedToJoinRoom", ({ room }) => {
      navigate(`/room/${room}`);
    });
  }, []);

  useEffect(() => {
    if (me && me !== "") {
      socket.emit("userJoined", {
        socketId: me,
        name: localStorage.getItem("name"),
      });
    }
  }, [me]);

  const answerCall = () => {
    setIsInitiator(false);
    socket.emit("answerCall", {
      from: {
        socketId: me,
        name: localStorage.getItem("name"),
      },
      userToAnswer: call.from,
      room: call.room,
    });
  };

  const callUser = (socketId: string) => {
    setIsInitiator(true);
    socket.emit("callUser", {
      userToCall: socketId,
      from: {
        socketId: me,
        name: localStorage.getItem("name"),
      },
      name: localStorage.getItem("name"),
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        call,
        me,
        joinedUsers,
        callUser,
        isInitiator,
        answerCall,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
