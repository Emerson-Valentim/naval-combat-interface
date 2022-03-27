import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";

import FullscreenLoadingContext from "../../context/loading/Loading";

import SocketContext from "../../context/socket/Socket";

import Styled from "./styled";
import Chat, { Messages } from "./Chat";
import Info from "./Info";

const GET_ROOM = gql`
  query getRoom($input: GetRoomInput!) {
    getRoom(input: $input) {
      id
      title
      limit
      players
    }
  }
`;

const Room: React.FC = () => {
  const params = useParams();
  const { socket } = useContext(SocketContext);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const [messages, updateMessages] = useState<Messages[]>([]);
  const [getRoom, { data, loading, refetch }] = useLazyQuery(GET_ROOM, {
    variables: {
      input: {
        roomId: params.roomId,
      },
    },
  });

  useEffect(() => {
    socket.on(
      "client:room:update",
      async ({ message, username, action }: any) => {
        await refetch();

        if (action === "message") {
          updateMessages((value) =>
            value.concat([
              {
                message,
                sender: username,
              },
            ])
          );
        }

        if (["leave", "join"].includes(action)) {
          updateMessages((value) =>
            value.concat([
              {
                message: `${action === "leave" ? "left" : "entered"} the room`,
                sender: username,
              },
            ])
          );
        }
      }
    );

    return () => {
      socket.off("client:room:update");
    };
  }, []);

  useEffect(() => {
    getRoom();
  }, []);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  return params.roomId ? (
    <Styled.RoomBox>
      <Styled.RoomTitle>Sala - {params.roomId}</Styled.RoomTitle>
      <>O jogo vem aqui</>
      <Styled.RoomWidgets>
        <Chat messages={messages} />
        {data ? <Info room={data?.getRoom} /> : null}
      </Styled.RoomWidgets>
    </Styled.RoomBox>
  ) : (
    <Navigate to="/lobby" />
  );
};

export default Room;
