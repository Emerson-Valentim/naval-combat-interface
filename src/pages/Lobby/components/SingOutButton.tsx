import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useContext } from "react";

import Button from "../../../components/button/Button";
import SocketContext from "../../../context/socket/Socket";
import UserContext from "../../../context/user/User";
import tokenStorage from "../../../utils/token-storage";

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
