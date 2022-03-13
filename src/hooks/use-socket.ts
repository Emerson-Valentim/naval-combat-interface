import { socketClient } from "../ports/socket";

const socketHosts: { [key: string]: string } = {
  "socket-1": `${process.env.REACT_APP_SOCKET_HOST}:${process.env.REACT_APP_SOCKET_PORT}`,
};

const useSocket = (instance: string) => {
  const handler = socketClient(socketHosts[instance]);

  return handler;
};

export default useSocket;
