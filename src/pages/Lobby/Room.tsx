import { Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SocketContext from "../../context/socket/Socket";
import UserContext from "../../context/user/User";
import { parseBuffer } from "../../utils/buffer-parser";

const Room: React.FC = () => {
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const [message, addMessage] = useState<string[]>([]);

  const params = useParams();

  useEffect(() => {
    socket.on("client:room:connection", (message: any) => {
      addMessage((value) => value.concat(`${message.username} entered room`));
    });

    socket.on("client:room:disconnect", (message: any) => {
      addMessage((value) => value.concat(`${message.username} left room`));
    });

    return () => {
      socket.off("client:room:connection");
      socket.off("client:room:disconnect");

      window.onbeforeunload = function () {
        socket.emit(
          "client:room:disconnect",
          parseBuffer({
            roomId: params,
            username: user.username,
          })
        );
      };
    };
  }, []);

  return (
    <>
      {params.roomId}
      {message.map((message, index) => (
        <Text key={`message-${index}`}>{message}</Text>
      ))}
    </>
  );
};

export default Room;
