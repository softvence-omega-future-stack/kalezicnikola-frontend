// layout/DashboardLayout.jsx
import AdminSidebar from "@/AdminDashboard/AdminSidebar";
import MainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";

import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#F3F6F6] ">
      {/* Sidebar - fixed width 280px */}
      <div className="w-[280px] border-r border-gray-300">
        <AdminSidebar/>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-2 ">
        {/* Topbar */}
        <MainHeader />

        {/* Outlet for nested routes */}
        <main className="flex-1 px-5  overflow-auto">
        
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
