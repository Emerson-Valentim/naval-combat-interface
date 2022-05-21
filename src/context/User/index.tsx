import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";

import tokenStorage from "../../utils/token-storage";

export type Roles = "admin" | "user" | "maintainer";

export interface User {
  id: string;
  username: string;
  skin: {
    current: {
      id: string;
      avatar: string;
      scenario: string;
    };
    available: string[];
  };
  balance: number;
  roles: Roles[];
}

interface UserContext {
  isAuthenticated: boolean;
  setAuthentication: (value: boolean) => void;
  roles: Roles[];
  setRoles: (roles: Roles[]) => void;
  user: User;
  refetch: () => void;
}

const UserContext = React.createContext<UserContext>({
  isAuthenticated: false,
  setAuthentication: undefined as any,
  roles: [],
  setRoles: undefined as any,
  user: undefined as any as User,
  refetch: undefined as any,
});

UserContext.displayName = "User";

const PROFILE = gql`
  query profile {
    profile {
      id
      username
      roles
      balance
      skin {
        current {
          id
          avatar
          scenario
        }
        available
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
        refetch: profile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };

export default UserContext;
