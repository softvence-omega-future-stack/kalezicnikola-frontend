// layout/DashboardLayout.jsx
import MainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";
import Sidebar from "@/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - fixed width 280px */}
      <div className="w-[280px] border-r border-gray-100">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <MainHeader />

        {/* Outlet for nested routes */}
        <main className="flex-1 p-6  overflow-auto">
        
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
