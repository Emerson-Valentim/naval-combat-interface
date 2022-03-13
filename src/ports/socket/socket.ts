import { io } from "socket.io-client";

import { getAgent } from "../http";

export const socketClient = (url: string) =>
  io(url, {
    //@ts-expect-error socket io has an error on types
    agent: (url: string) =>
      getAgent({
        protocol: url,
      }),
    transports: ["websocket"],
  });
