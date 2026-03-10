import UserLayout from "@/components/layout/UserLayout";
import UserDashboard from "@/pages/User/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./UserRoutes";
import Pendaftaran from "@/pages/User/Pendaftaran/Pendaftaran";
import UserProfile from "@/pages/User/Profile/UserProfile";
import UserMagangPage from "@/features/UserDashboard/UserMagangPage/UserMagangPage";
import Berkas from "@/pages/User/Berkas/Berkas";

const DashboardUserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="pendaftaran" element={<Pendaftaran />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="magangmu" element={<UserMagangPage />} />
        <Route path="berkas" element={<Berkas />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardUserRoutes;
