import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DashboardUserRoutes from "./routes/DashboardUserRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/user/*" element={<DashboardUserRoutes />} />
    </Routes>
  );
}

export default App;
