import React, { useContext, useEffect } from "react";

import useSocket from "../../hooks/use-socket";
import UserContext from "../user/User";

const defaultValue = {
  socket: useSocket("socket-1"),
};

const SocketContext = React.createContext(defaultValue);

SocketContext.displayName = "Socket";

const SocketContextProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    isAuthenticated
      ? defaultValue.socket.connect()
      : defaultValue.socket?.disconnect();
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
