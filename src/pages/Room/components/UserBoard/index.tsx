import { cloneDeep } from "apollo-utilities";
import React, { useContext, useEffect, useState } from "react";

import { Board as BoardType } from "../..";
import UserContext from "../../../../context/User";

import Tiles from "../Tiles";

import Styled from "./styled";

const UserBoard: React.FC<{ board: BoardType }> = ({ board }) => {
  const { user } = useContext(UserContext);

  const [dynamicPosition, setDynamicPosition] = useState(
    board?.state[user?.id]?.positions
  );

  useEffect(() => {
    const boardPositions = board?.state[user.id]?.positions;

    if (board?.state[user.id]?.positions) {
      setDynamicPosition(cloneDeep(boardPositions));
    }
  }, [board?.state[user.id]?.positions]);

  return user ? (
    <Styled.Container>
      <Styled.Title>Sua frota</Styled.Title>
      <Tiles positions={dynamicPosition} disabled />
    </Styled.Container>
  ) : null;
};

export default UserBoard;
