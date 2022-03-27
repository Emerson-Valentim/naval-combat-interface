import { Socket } from "socket.io-client";

import { NavalCombatSocket } from "../ports/socket/socket";
import tokenStorage from "../utils/token-storage";

const socketHosts: { [key: string]: Socket } = {
  "socket-1": NavalCombatSocket,
};

const useSocket = (instance: string) => {
  const authenticationState = tokenStorage.get();

  const accessToken = JSON.parse(authenticationState || "{}").accessToken;

  const handler = socketHosts[instance];

  handler.auth = { token: `Bearer ${accessToken}` };

  return handler;
};

export default useSocket;
