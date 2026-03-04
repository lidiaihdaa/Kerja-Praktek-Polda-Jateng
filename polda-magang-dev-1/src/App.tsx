import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DashboardUserRoutes from "./routes/DashboardUserRoutes";
import { Navigate } from "react-router-dom";

function App() {
  return (
      <>
      {}
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<DashboardUserRoutes />} />
        </Routes>

        <Toaster position="top-right" />
      </>
  );
}

export default App;