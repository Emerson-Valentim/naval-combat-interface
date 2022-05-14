import { useMutation } from "@apollo/client";
import { MenuItem } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import React, { useContext } from "react";

import SocketContext from "../../../../context/Socket";
import UserContext from "../../../../context/User";
import tokenStorage from "../../../../utils/token-storage";

const SIGN_OUT_MUTATION = gql`
  mutation singOut {
    signOut
  }
`;

const SignOut: React.FC = () => {
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

  return <MenuItem onClick={() => singOut()}>Sair</MenuItem>;
};

export default SignOut;
