import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";

import tokenStorage from "../../utils/token-storage";

type Roles = "admin" | "user" | "maintainer";

interface User {
  id: string;
  username: string;
  skin: {
    current: {
      avatar: string;
    };
  };
}

interface UserContext {
  isAuthenticated: boolean;
  setAuthentication: (value: boolean) => void;
  roles: Roles[];
  setRoles: (roles: Roles[]) => void;
  user: User;
}

const UserContext = React.createContext<UserContext>({
  isAuthenticated: false,
  setAuthentication: undefined as any,
  roles: [],
  setRoles: undefined as any,
  user: undefined as any as User,
});

UserContext.displayName = "User";

const PROFILE = gql`
  query profile {
    profile {
      id
      username
      roles
      skin {
        current {
          avatar
        }
      }
    }
  }
`;

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [roles, setRoles] = useState<Roles[]>([]);
  const [isAuthenticated, setAuthentication] = useState(!!tokenStorage.get());

  const { data, error, refetch: profile } = useQuery(PROFILE);

  useEffect(() => {
    if (isAuthenticated) {
      profile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      setUser(data.profile);
      setRoles(data.profile.roles);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      tokenStorage.delete();
    }
  }, [error]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        roles,
        setRoles,
        user: user as User,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };

export default UserContext;
