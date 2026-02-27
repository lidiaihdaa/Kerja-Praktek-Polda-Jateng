import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import MainLayout from "../components/layout/MainLayout";
import Aboutpage from "../features/AboutPage/Aboutpage";
import Magang from "@/pages/Magang/Magang";
import Proyek from "@/pages/Proyek/Proyek";
import DetailProyek from "../pages/Proyek/DetailProyek";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-gray-600">
        Halaman yang kamu cari tidak ditemukan
      </p>

      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 text-white rounded bg-coklat hover:bg-birutua"
      >
        Kembali ke Halaman Sebelumnya
      </button>
    </div>
  );
};

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/magang" element={<Magang />} />
        <Route path="/proyek" element={<Proyek />} />
        <Route path="/proyek/:id" element={<DetailProyek />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
