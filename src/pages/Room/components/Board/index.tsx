import { cloneDeep } from "apollo-utilities";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Board as BoardType } from "../..";
import UserContext from "../../../../context/User";
import DoneBoard from "../DoneBoard";
import PendingBoard from "../PendingBoard";

import Styled from "./styled";

const Board: React.FC<{ title: string; board: BoardType; userId: string }> = ({
  title,
  board,
  userId,
}) => {
  const params = useParams();

  const { user } = useContext(UserContext);

  const isBoardPending = board?.status === "PENDING";

  const currentUser = isBoardPending ? user.id : userId;

  const [dynamicPosition, setDynamicPosition] = useState(
    board?.state[currentUser]?.positions
  );

  const [initialPosition, setInitialPosition] = useState(
    board?.state[currentUser]?.positions
  );

  useEffect(() => {
    const boardPositions = board?.state[currentUser]?.positions;

    if (board?.state[currentUser]?.positions) {
      setDynamicPosition(cloneDeep(boardPositions));
      setInitialPosition(boardPositions);
    }
  }, [board?.state]);

  const resetBoard = useCallback(() => {
    return cloneDeep(initialPosition);
  }, [initialPosition]);

  const renderBoard = (positions?: any) => {
    setDynamicPosition(cloneDeep(positions));
  };

  return user ? (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      {isBoardPending ? (
        <PendingBoard
          size={board?.size}
          resetBoard={resetBoard}
          renderBoard={renderBoard}
          positions={dynamicPosition}
          roomId={params.roomId ?? ""}
          currentPlayer={board.currentPlayer}
        />
      ) : (
        <DoneBoard
          currentPlayer={board.currentPlayer}
          positions={board?.state[currentUser]?.positions}
          roomId={params.roomId ?? ""}
          userId={userId}
        />
      )}
    </Styled.Container>
  ) : null;
};

export default Board;
