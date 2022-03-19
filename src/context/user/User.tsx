import React, { useEffect, useState } from "react";

import tokenStorage from "../../utils/token-storage";

const UserContext = React.createContext({
  isAuthenticated: false,
  setAuthentication: undefined as any,
});

UserContext.displayName = "User";

const UserContextProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setAuthentication] = useState(false);

  const authenticationState = tokenStorage.get();

  useEffect(() => {
    setAuthentication(!!authenticationState);
  }, [authenticationState]);

  return (
    <UserContext.Provider value={{ isAuthenticated, setAuthentication }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };

export default UserContext;
