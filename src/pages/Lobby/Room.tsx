import React from "react";
import { Navigate, useParams } from "react-router-dom";

import Styled from "./styled";
import Chat from "./Chat";
import Info from "./Info";

const Room: React.FC = () => {
  const params = useParams();

  return params.roomId ? (
    <Styled.RoomBox>
      <Styled.RoomTitle>Sala - {params.roomId}</Styled.RoomTitle>
      <>O jogo vem aqui</>
      <Styled.RoomWidgets>
        <Chat />
        <Info roomId={params.roomId} />
      </Styled.RoomWidgets>
    </Styled.RoomBox>
  ) : (
    <Navigate to="/lobby" />
  );
};

export default Room;
