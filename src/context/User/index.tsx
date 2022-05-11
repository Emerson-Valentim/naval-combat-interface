import { useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";

import tokenStorage from "../../utils/token-storage";

interface User {
  id: string;
  username: string;
}

const UserContext = React.createContext({
  isAuthenticated: false,
  setAuthentication: undefined as any,
  user: undefined as any as User,
});

UserContext.displayName = "User";

const PROFILE = gql`
  query profile {
    profile {
      id
      username
    }
  }
`;

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setAuthentication] = useState(false);

  const [profile, { data }] = useLazyQuery(PROFILE);

  const authenticationState = tokenStorage.get();

  useEffect(() => {
    setAuthentication(!!authenticationState);
  }, [authenticationState]);

  useEffect(() => {
    if (isAuthenticated) {
      profile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      setUser(data.profile);
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        user: user as User,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };

export default UserContext;
