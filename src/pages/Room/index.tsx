import { useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import FullscreenLoadingContext from "../../context/Loading";
import SocketContext from "../../context/Socket";
import UserContext from "../../context/User";

import Board from "./components/Board";
import Chat, { Messages } from "./components/Chat";
import LeaveRoomButton from "./components/LeaveRoomButton";
import UserBoard from "./components/UserBoard";
import UserInfo from "./components/UserInfo";
import Styled from "./styled";

interface Room {
  id: string;
  title: string;
  players: string[];
  board: Board;
}

export type TileStatus = "EMPTY" | "DESTROYED" | "MISSED" | "FILLED";
export interface Board {
  status: "DONE" | "PENDING";
  currentPlayer: string;
  size: number;
  state: {
    [userId: string]: {
      positions: { [x: string]: TileStatus }[];
    };
  };
}

const GET_ROOM = gql`
  query getRoom($input: GetRoomInput!) {
    getRoom(input: $input) {
      id
      title
      limit
      players
      board {
        status
        currentPlayer
        size
        state
      }
    }
  }
`;

const Room: React.FC = () => {
  const params = useParams();

  const { socket } = useContext(SocketContext);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { user } = useContext(UserContext);

  const [messages, updateMessages] = useState<Messages[]>([]);
  const [getRoom, { data, loading, refetch }] = useLazyQuery(GET_ROOM, {
    variables: {
      input: {
        roomId: params.roomId,
      },
    },
  });

  const enemyId = data?.getRoom.players.find((enemyId: string) => {
    if (user?.id) {
      return enemyId !== user?.id;
    }
    return false;
  });

  console.log(enemyId);

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
                message: `${action === "leave" ? "Saiu" : "Entrou"} na sala`,
                sender: username,
              },
            ])
          );
        }

        if (action === "turn") {
          refetch();
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
    data && user ? (
      <Styled.RoomBox>
        <Styled.Room
          height="100%"
          backgroundImage={user?.skin.current.scenario}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Styled.FirstColumn>
            <UserInfo user={user} />
            <UserBoard board={data.getRoom.board} />
            <LeaveRoomButton roomId={params.roomId} />
          </Styled.FirstColumn>
          <Styled.SecondColumn>
            <Board board={data.getRoom.board} main userId={enemyId} />
          </Styled.SecondColumn>
          <Styled.ThirdColumn>
            <UserInfo user={user} />
            <Chat messages={messages} />
          </Styled.ThirdColumn>
        </Styled.Room>
      </Styled.RoomBox>
    ) : null
  ) : (
    <Navigate to="/lobby" />
  );
};

{
  /* <Styled.RoomWidgets>
        <Chat messages={messages} />
        {data ? <Info room={data?.getRoom} /> : null}
      </Styled.RoomWidgets> */
}

export default Room;
