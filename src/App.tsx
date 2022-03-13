import React, { PropsWithChildren } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import useAuthentication from "./hooks/use-authentication";
import Welcome from "./pages/Home/Welcome";

const PrivateRoute: React.FC<
  {
    isAuthenticated: boolean;
  } & PropsWithChildren<any>
> = ({ isAuthenticated, children }) => {
  return isAuthenticated && children ? children : <Navigate to="/" />;
};

const App = () => {
  const { isAuthenticated } = useAuthentication();

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/private"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Welcome />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
};

export default App;
