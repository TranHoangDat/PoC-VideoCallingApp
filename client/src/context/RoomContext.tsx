import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DashboardContext } from "./DashboardContext";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import socketIOClient from "socket.io-client";

export const RoomContext = createContext<null | any>(null);
const socket = socketIOClient(process.env.REACT_APP_API_HOST as string);

export default function RoomProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const { roomId } = useParams();
  const { isInitiator } = useContext(DashboardContext);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>();
  const [stream, setStream] = useState<MediaStream>();
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance>();

  useEffect(() => {
    socket.emit("userJoinRoom", { roomId, isInitiator });
    socket.on("joinedRoom", joinRoom);
  }, []);

  const joinRoom = async (nameOfUserToCall: any) => {
    const currentStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log(currentStream);
    setStream(currentStream);
    if (myVideo.current) myVideo.current.srcObject = currentStream;
    setUserName(nameOfUserToCall);
    let peer: Peer.Instance | null = null;

    if (isInitiator) {
      peer = new Peer({
        initiator: true,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
          ],
        },
        trickle: false,
        stream: currentStream,
      });
    } else {
      peer = new Peer({
        initiator: false,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
          ],
        },
        trickle: false,
        stream: currentStream,
      });
    }

    if (peer) {
      peer.on("signal", (data) => {
        socket.emit("sendSignal", {
          roomId,
          signalData: data,
        });
      });

      socket.on("receiveSignal", (signal) => {
        peer?.signal(signal);
      });

      peer.on("stream", (currentStream) => {
        if (userVideo.current) userVideo.current.srcObject = currentStream;
      });
    }

    if (connectionRef.current) connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <RoomContext.Provider
      value={{
        myVideo,
        userName,
        userVideo,
        stream,
        callEnded,
        leaveCall,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
