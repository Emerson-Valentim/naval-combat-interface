import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Button";
import SocketContext from "../../../../context/Socket";
import { parseBuffer } from "../../../../utils/buffer-parser";

interface LeaveRoomProps {
  roomId: string;
}

const LeaveRoomButton: React.FC<LeaveRoomProps> = ({ roomId }) => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const leaveRoom = () => {
    socket.emit(
      "client:room:disconnect",
      parseBuffer({
        roomId: roomId,
      })
    );

    navigate("/lobby");
  };

  return <Button onClick={() => leaveRoom()}>Sair</Button>;
};

export default LeaveRoomButton;
