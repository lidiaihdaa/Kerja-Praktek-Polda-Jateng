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
        {/* Public - halaman utama tetap bisa diakses siapapun */}
        <Route path="/*" element={<UserRoutes />} />

        {/* Auth - selalu bisa diakses meskipun sudah login */}
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
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;