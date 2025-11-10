
import MainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";
import Sidebar from "@/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#F3F6F6]">

      <div className="fw-[280px] border-r border-gray-300">
        <Sidebar />
      </div>

     
      <div className="flex-1 flex flex-col pl-2">
      
        <MainHeader />

        <main className="flex-1 -pl-6 overflow-auto">
        
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
