import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, LogOut, DockIcon, FilePlus } from "lucide-react";
import logo from "@/assets/img/logo.png";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
   ${isActive ? "bg-abu text-white" : "text-abu hover:bg-gray-100"}`;

const UserSidebar = () => {
  const navigate = useNavigate(); 
  
  // 1. UBAH JADI FALSE: Defaultnya anggap belum daftar
  const [sudahDaftar, setSudahDaftar] = useState(false);

  // 2. TAMBAHKAN USE EFFECT: Cek ke database beneran udah daftar belum?
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        const result = await response.json();

        // Jika ada data profil di database, berarti sudah daftar
        if (response.ok && result.data) {
          setSudahDaftar(true);
        } else {
          setSudahDaftar(false);
        }
      } catch (error) {
        console.error("Gagal mengecek status", error);
      }
    };
    checkRegistration();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
      <div className="px-6 py-5">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo Polda Jateng" className="object-contain w-9 h-9" />
          <span className="text-lg font-semibold text-abu">Polda Jateng</span>
        </div>
        <div className="mt-4 border-b" />
      </div>

      <nav className="px-3 space-y-1 flex-1">
        <NavLink to="/user/dashboard" end className={navClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        {/* 3. MENU PENDAFTARAN: Hanya muncul kalau belum daftar */}
        {!sudahDaftar && (
          <NavLink to="/user/pendaftaran" className={navClass}>
            <DockIcon size={18} /> Pendaftaran
          </NavLink>
        )}

        {/* 4. MENU PROFILE & MAGANGMU: Hanya muncul kalau sudah daftar */}
        {sudahDaftar && (
          <>
            <NavLink to="/user/profile" className={navClass}>
              <Users size={18} /> Profile
            </NavLink>

            <NavLink to="/user/magangmu" className={navClass}>
              <FilePlus size={18} /> Magangmu
            </NavLink>
          </>
        )}
      </nav>

      <div className="px-3 mt-6 border-t pt-4 pb-6">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors font-semibold"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;