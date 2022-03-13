import React, { useEffect, useState } from "react";

const UserContext = React.createContext({
  isAuthenticated: false,
  setAuthentication: undefined as any,
});

UserContext.displayName = "User";

const UserContextProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setAuthentication] = useState(false);

  const authenticationState = localStorage.getItem("authentication");

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
