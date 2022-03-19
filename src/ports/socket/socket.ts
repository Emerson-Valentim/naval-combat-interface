import { io } from "socket.io-client";

const socketClient = (url: string) =>
  io(url, {
    transports: ["websocket"],
  });

export const NavalCombatSocket = socketClient(
  `${process.env.REACT_APP_SOCKET_HOST}:${process.env.REACT_APP_SOCKET_PORT}`
);
