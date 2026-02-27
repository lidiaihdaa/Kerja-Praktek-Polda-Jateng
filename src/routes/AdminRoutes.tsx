import AdminLayout from "../components/layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import Analytic from "@/pages/Admin/Analytic/Analytic";
import Mahasiswa from "@/pages/Admin/Mahasiswa/Mahasiswa";
import DetailMahasiswaPage from "@/pages/Admin/Mahasiswa/DetailMahasiswa";
import HasilMagang from "@/pages/Admin/HasilMagang/HasilMagang";
import InstansiMitra from "@/pages/Admin/InstansiMitra/InstansiMitra";
import Pendaftar from "@/pages/Admin/Pendaftar/Pendaftar";
import DetailPendaftarPage from "@/pages/Admin/Pendaftar/DetailPendaftar";
import Penilaian from "@/pages/Admin/Penilaian/Penilaian";
import DetailPenilaianPage from "@/pages/Admin/Penilaian/DetailPenilaian";
import Absensi from "@/pages/Admin/Absensi/Absensi";
import DetailAbsensiPage from "@/pages/Admin/Absensi/DetailAbsensi";
import Notifikasi from "@/pages/Admin/Notifikasi/Notifikasi";
import { NotFoundPage } from "./UserRoutes";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard-main" element={<Dashboard />} />
        <Route path="analytic" element={<Analytic />} />
        <Route path="laporan/mhs" element={<Mahasiswa />} />
        <Route path="laporan/mhs/:id" element={<DetailMahasiswaPage />} />
        <Route path="laporan/hasil-magang" element={<HasilMagang />} />
        <Route path="laporan/instansi-mitra" element={<InstansiMitra />} />
        <Route path="pendaftar" element={<Pendaftar />} />
        <Route path="pendaftar/:id" element={<DetailPendaftarPage />} />
        <Route path="penilaian" element={<Penilaian />} />
        <Route path="penilaian/:id" element={<DetailPenilaianPage />} />
        <Route path="absensi" element={<Absensi />} />
        <Route path="absensi/:id" element={<DetailAbsensiPage />} />
        <Route path="notifikasi" element={<Notifikasi />} />
        <Route path="" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
