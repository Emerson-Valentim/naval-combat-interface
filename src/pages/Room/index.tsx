import { useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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

  const navigate = useNavigate();

  const skinAudioRef = React.createRef<any>();

  const { socket } = useContext(SocketContext);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { user } = useContext(UserContext);

  const [gameOver, setGameOver] = useState<{
    isGameOver: boolean;
    winner: string;
    loser: string;
  }>({
    isGameOver: false,
    winner: "",
    loser: "",
  });
  const [audioEvent, setAudioEvent] =
    useState<{ happy: string; sad: string }>();
  const [messages, updateMessages] = useState<Messages[]>([]);
  const [enemyId, setEnemyId] = useState("");
  const [getRoom, { data: getRoomData, loading: getRoomLoading, refetch }] =
    useLazyQuery(GET_ROOM, {
      variables: {
        input: {
          roomId: params.roomId,
        },
      },
    });

  useEffect(() => {
    socket.on(
      "client:room:update",
      async ({ message, username, action, data }: any) => {
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
          refetch();

          updateMessages((value) =>
            value.concat([
              {
                message: `${action === "leave" ? "Saiu" : "Entrou"} na sala`,
                sender: username,
              },
            ])
          );

          if (action === "leave") {
            setEnemyId("");
          }
        }

        if (action === "turn") {
          if (data?.isGameOver) {
            setGameOver(data);
          }
          setAudioEvent(data);

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
    console.log(audioEvent);
    skinAudioRef.current.play();
  }, [audioEvent]);

  useEffect(() => {
    if (getRoomData) {
      getRoomData.getRoom.players.forEach((enemyId: string) => {
        if (user?.id) {
          if (enemyId !== user?.id) {
            setEnemyId(enemyId);
          }
        }
      });
    }
  }, [getRoomData, user]);

  useEffect(() => {
    setFullscreenLoading(getRoomLoading);
  }, [getRoomLoading]);

  useEffect(() => {
    if (gameOver.isGameOver) {
      const isPlayerWinner = user.id === gameOver.winner;

      navigate("/end", {
        state: {
          winner: isPlayerWinner,
        },
      });
    }
  }, [gameOver]);

  const scored = audioEvent?.happy === user?.id;
  const hit = audioEvent?.sad === user?.id;

  return params.roomId ? (
    getRoomData && user ? (
      <Styled.RoomBox>
        <audio
          src={
            scored
              ? user.skin.current.voiceYes
              : hit
              ? user.skin.current.voiceYes
              : "/miss.mp3"
          }
          ref={skinAudioRef}
        />
        <Styled.Room
          height="100%"
          backgroundImage={user?.skin.current.scenario}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Styled.FirstColumn>
            <UserInfo userId={user.id} />
            <UserBoard board={getRoomData.getRoom.board} />
            <LeaveRoomButton roomId={params.roomId} />
          </Styled.FirstColumn>
          <Styled.SecondColumn>
            <Board
              board={getRoomData.getRoom.board}
              userId={enemyId}
              title={getRoomData.getRoom.title}
            />
          </Styled.SecondColumn>
          <Styled.ThirdColumn>
            {enemyId ? <UserInfo userId={enemyId} /> : null}
            <Chat messages={messages} />
          </Styled.ThirdColumn>
        </Styled.Room>
      </Styled.RoomBox>
    ) : null
  ) : (
    <Navigate to="/lobby" />
  );
};

export default Room;
