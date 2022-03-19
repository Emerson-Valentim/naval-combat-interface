import React, { useEffect } from "react";

import CreateRoomButton from "./components/CreateRoomButton";
import SignOutButton from "./components/SingOutButton";

const Lobby: React.FC = () => {
  useEffect(() => {
    return;
  }, []);

  return (
    <>
      <SignOutButton />
      <CreateRoomButton />
    </>
  );
};

export default Lobby;
