import React from "react";
import { Badge, Stat, StatGroup } from "@chakra-ui/react";

import LeaveRoomButton from "./components/LeaveRoomButton";
import Styled from "./styled";

const Info: React.FC<{ room: any }> = ({ room }) => {
  return (
    <Styled.RoomInfoBox>
      <StatGroup
        height="70%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Stat>Título: {room.title}</Stat>
        <Badge colorScheme="green" variant="solid">
          Jogadores: {room.players.length}/{room.limit}
        </Badge>
      </StatGroup>
      <LeaveRoomButton roomId={room.id} />
    </Styled.RoomInfoBox>
  );
};

export default Info;
