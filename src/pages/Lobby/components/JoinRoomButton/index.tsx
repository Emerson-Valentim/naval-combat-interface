import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import { PlusSquareIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";

import FullscreenLoadingContext from "../../../../context/Loading";
import SocketContext from "../../../../context/Socket";
import { parseBuffer } from "../../../../utils/buffer-parser";
import Button from "../../../../components/Button";

const JOIN_ROOM = gql`
  mutation joinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input)
  }
`;

const JoinRoomButton: React.FC<{
  roomId: string;
}> = ({ roomId }) => {
  const { socket } = useContext(SocketContext);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const [incomingRoomId, setIncomingRoomId] = useState<string>("");

  const navigate = useNavigate();

  const [joinRoom, { loading }] = useMutation(JOIN_ROOM);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  useEffect(() => {
    socket.on("client:room:join", (message: { roomId: string }) => {
      setIncomingRoomId(message.roomId);
    });

    return () => {
      socket.off(`client:room:join`);
    };
  }, []);

  useEffect(() => {
    if (incomingRoomId === roomId) {
      socket.emit(
        "client:room:join:acknowledge",
        parseBuffer({
          roomId,
        })
      );

      navigate(`/room/${roomId}`);
    }
  }, [incomingRoomId]);

  return (
    <Button>
      <PlusSquareIcon
        onClick={() => {
          joinRoom({
            variables: {
              input: {
                roomId,
              },
            },
          });
        }}
      />
    </Button>
  );
};

export default JoinRoomButton;
