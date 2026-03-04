import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DashboardUserRoutes from "./routes/DashboardUserRoutes";

function App() {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");

  return (
    <>
      <Routes>
        {/* Jika belum login → ke login */}
        <Route
          path="/"
          element={
            token
              ? role === "admin"
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/user/dashboard" />
              : <Navigate to="/auth/login" />
          }
        />

        {/* Auth */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={token && role === "admin" ? <AdminRoutes /> : <Navigate to="/auth/login" />}
        />

        {/* User */}
        <Route
          path="/user/*"
          element={token ? <DashboardUserRoutes /> : <Navigate to="/auth/login" />}
        />

        {/* Public */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;