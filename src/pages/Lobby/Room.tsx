import React from "react";
import { useParams } from "react-router-dom";

const Room: React.FC = () => {
  const params = useParams();

  return <>{params.roomId}</>;
};

export default Room;
