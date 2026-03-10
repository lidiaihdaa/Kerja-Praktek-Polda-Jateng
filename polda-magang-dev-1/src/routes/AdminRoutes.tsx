import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import OverviewPage from "@/pages/Admin/OverviewPage";
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
      <Route path="/" element={<AdminLayout />}>

        {/* Default page */}
        <Route index element={<Dashboard />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="analytic" element={<Analytic />} />

        {/* Laporan */}
        <Route path="laporan/mhs" element={<Mahasiswa />} />
        <Route path="laporan/mhs/:id" element={<DetailMahasiswaPage />} />

        <Route path="laporan/hasil-magang" element={<HasilMagang />} />
        <Route path="laporan/instansi-mitra" element={<InstansiMitra />} />

        {/* Pendaftar */}
        <Route path="pendaftar" element={<Pendaftar />} />
        <Route path="pendaftar/:id" element={<DetailPendaftarPage />} />

        {/* Penilaian */}
        <Route path="penilaian" element={<Penilaian />} />
        <Route path="penilaian/:id" element={<DetailPenilaianPage />} />

        {/* Absensi */}
        <Route path="absensi" element={<Absensi />} />
        <Route path="absensi/:id" element={<DetailAbsensiPage />} />

        {/* Notifikasi */}
        <Route path="notifikasi" element={<Notifikasi />} />

        {/* Not found */}
        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;