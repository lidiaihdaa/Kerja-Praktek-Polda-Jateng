import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  FileText,
  Users,
  ClipboardCheck,
  CalendarCheck,
  Bell,
  LogOut,
  ChevronDown,
  GraduationCap,
  Award,
  Building,
} from "lucide-react";
import logo from "@/assets/img/logo.png";
import { useEffect, useState } from "react";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
   ${isActive ? "bg-abu text-white" : "text-abu hover:bg-gray-100"}`;

const Sidebar = () => {
  const location = useLocation();
  const [openLaporan, setOpenLaporan] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/admin/laporan")) {
      setOpenLaporan(true);
    }
  }, [location.pathname]);

  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      <div className="px-6 py-5">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo Polda Jateng"
            className="object-contain w-9 h-9"
          />
          <span className="text-lg font-semibold text-abu">Polda Jateng</span>
        </div>
        <div className="mt-4 border-b" />
      </div>

      <nav className="px-3 space-y-1">
        <NavLink to="/admin/dashboard" end className={navClass}>
          <LayoutDashboard size={18} />
          Overview
        </NavLink>

        <NavLink to="/admin/analytic" className={navClass}>
          <LineChart size={18} />
          Analisis
        </NavLink>

        <button
          onClick={() => setOpenLaporan(!openLaporan)}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-md transition
            ${
              location.pathname.startsWith("/admin/laporan")
                ? "bg-abu text-white"
                : "text-abu hover:bg-gray-100"
            }`}
        >
          <div className="flex items-center gap-3">
            <FileText size={18} />
            Laporan
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              openLaporan ? "rotate-180" : ""
            }`}
          />
        </button>

        {openLaporan && (
          <div className="ml-6 space-y-1">
            <NavLink to="/admin/laporan/mhs" className={navClass}>
              <GraduationCap size={16} />
              Data Mahasiswa
            </NavLink>

            <NavLink to="/admin/laporan/hasil-magang" className={navClass}>
              <Award size={16} />
              Hasil Magang
            </NavLink>

            <NavLink to="/admin/laporan/instansi-mitra" className={navClass}>
              <Building size={16} />
              Instansi Mitra
            </NavLink>
          </div>
        )}

        <NavLink to="/admin/pendaftar" className={navClass}>
          <Users size={18} />
          Data Pendaftar Baru
        </NavLink>

        <NavLink to="/admin/penilaian" className={navClass}>
          <ClipboardCheck size={18} />
          Penilaian
        </NavLink>

        <NavLink to="/admin/absensi" className={navClass}>
          <CalendarCheck size={18} />
          Absensi Magang
        </NavLink>

        <NavLink to="/admin/notifikasi" className={navClass}>
          <Bell size={18} />
          Notifikasi
        </NavLink>
      </nav>

      <div className="px-3 mt-6">
        <button className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
