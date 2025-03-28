import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login.jsx";
import { Users } from "../pages/Users.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};
