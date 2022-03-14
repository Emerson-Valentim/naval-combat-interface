import React, { PropsWithChildren, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import UserContext from "./context/user/User";

import Welcome from "./pages/Home/Welcome";
import Lobby from "./pages/Lobby/Lobby";

const PrivateRoute: React.FC<
  {
    isAuthenticated: boolean;
  } & PropsWithChildren<any>
> = ({ isAuthenticated, children }) => {
  return isAuthenticated && children ? children : <Navigate to="/" />;
};

const App = () => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/lobby" /> : <Welcome />}
      />
      <Route
        path="/lobby"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Lobby />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
};

export default App;
