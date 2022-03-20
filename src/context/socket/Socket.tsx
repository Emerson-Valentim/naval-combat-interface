import React, { useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

import useSocket from "../../hooks/use-socket";
import UserContext from "../user/User";

const SocketContext = React.createContext({
  socket: undefined as any as Socket,
});

SocketContext.displayName = "Socket";

const SocketContextProvider: React.FC = ({ children }) => {
  const defaultValue = {
    socket: useSocket("socket-1"),
  };

  const { isAuthenticated } = useContext(UserContext);

  const establishConnection = () => {
    defaultValue.socket.connect();

    defaultValue.socket.emit("client:signIn");
  };

  useEffect(() => {
    isAuthenticated ? establishConnection() : defaultValue.socket?.disconnect();
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <SocketContext.Provider value={defaultValue}>
          {children}
        </SocketContext.Provider>
      ) : (
        children
      )}
    </>
  );
};

export { SocketContextProvider };

export default SocketContext;
