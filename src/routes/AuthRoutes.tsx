import AuthLayout from "@/components/layout/AuthLayout";
import Daftar from "@/pages/Auth/Daftar";
import Login from "@/pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./UserRoutes";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="daftar" element={<Daftar />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
