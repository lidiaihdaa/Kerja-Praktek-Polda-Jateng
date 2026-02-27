import { Outlet } from "react-router-dom";
import UserSidebar from "./Sidebar/UserSidebar";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-gray-100">
        <UserSidebar />
        <main className="flex-1 p-6">
          <div className="p-6 bg-white shadow-sm rounded-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;