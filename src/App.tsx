import React, { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import UserContext from "./context/User";
import Admin from "./pages/Admin";
import GameOver from "./pages/GameOver";
import Welcome from "./pages/Home";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";

const PrivateRoute: React.FC<{
  isAuthenticated: boolean;
}> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const AdminRoute: React.FC<{
  isAdmin: boolean;
}> = ({ isAdmin }) => {
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const App = () => {
  const { isAuthenticated, roles } = useContext(UserContext);

  const isAdmin = roles.includes("admin");

  return (
    <Routes>
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/end" element={<GameOver />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route element={<AdminRoute isAdmin={isAdmin} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      <Route
        index
        element={isAuthenticated ? <Navigate to="/lobby" /> : <Welcome />}
      />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
};

export default App;
