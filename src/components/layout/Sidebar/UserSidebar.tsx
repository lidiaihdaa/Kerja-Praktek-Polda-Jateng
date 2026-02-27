import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  DockIcon,
  FilePlus,
} from "lucide-react";
import logo from "@/assets/img/logo.png";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
   ${isActive ? "bg-abu text-white" : "text-abu hover:bg-gray-100"}`;

const UserSidebar = () => {
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
        <NavLink to="/user/dashboard" end className={navClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/user/pendaftaran" className={navClass}>
          <DockIcon size={18} />
          Pendaftaran
        </NavLink>

        <NavLink to="/user/profile" className={navClass}>
          <Users size={18} />
          Profile
        </NavLink>

        <NavLink to="/user/magangmu" className={navClass}>
          <FilePlus size={18} />
          Magangmu
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

export default UserSidebar;
