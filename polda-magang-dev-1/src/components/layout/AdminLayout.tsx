import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="p-6 bg-white shadow-sm rounded-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
