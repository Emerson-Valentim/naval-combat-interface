import React from "react";

import LeaveRoomButton from "./components/LeaveRoomButton";
import Styled from "./styled";

const Info: React.FC<{ roomId: string }> = ({ roomId }) => {
  return (
    <Styled.RoomInfoBox>
      <LeaveRoomButton roomId={roomId} />
    </Styled.RoomInfoBox>
  );
};

export default Info;
