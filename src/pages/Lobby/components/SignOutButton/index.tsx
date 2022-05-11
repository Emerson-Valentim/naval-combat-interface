import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useContext } from "react";

import Button from "../../../../components/Button";
import SocketContext from "../../../../context/Socket";
import UserContext from "../../../../context/User";
import tokenStorage from "../../../../utils/token-storage";

const SIGN_OUT_MUTATION = gql`
  mutation singOut {
    signOut
  }
`;

const SignOutButton: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const { setAuthentication } = useContext(UserContext);

  const applicationSingOut = () => {
    socket.disconnect();

    tokenStorage.delete();

    setAuthentication(false);
  };

  const [singOut] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: () => {
      applicationSingOut();
    },
    onError: () => {
      applicationSingOut();
    },
  });

  return <Button onClick={() => singOut()}>Sair</Button>;
};

export default SignOutButton;
