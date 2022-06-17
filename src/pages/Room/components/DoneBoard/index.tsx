import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";

import Tiles from "../Tiles";

import Styled from "./styled";

const BOARD_GUESS = gql`
  mutation boardGuess($input: BoardGuessInput!) {
    boardGuess(input: $input)
  }
`;

const DoneBoard: React.FC<{
  positions: any;
  userId: string;
  roomId: string;
  currentPlayer: string;
}> = ({ positions, userId, roomId, currentPlayer }) => {
  const [guess] = useMutation(BOARD_GUESS);

  const isPlayerTurn = userId !== currentPlayer;

  return (
    <>
      <Tiles
        disabled={!isPlayerTurn}
        positions={positions}
        size={2}
        onTileClick={(position) =>
          guess({
            variables: {
              input: {
                roomId: roomId,
                userId,
                x: position.row,
                y: position.column,
              },
            },
          })
        }
      />
      <Styled.Action>{isPlayerTurn ? "Sua vez" : "Aguarde"}</Styled.Action>
    </>
  );
};

export default DoneBoard;
