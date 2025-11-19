
import MainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";
import Sidebar from "@/dashboard/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

    const toggleSidebar = (newState: boolean) => {
        setIsSidebarCollapsed(newState);
    };
  return (
    <div className="flex h-screen bg-[#F3F6F6]">

      <div className="fw-[280px] border-r border-gray-300">
        <Sidebar   onToggle={toggleSidebar}  collapsed={isSidebarCollapsed} />
      </div>

     
      <div className="flex-1 flex flex-col pl-2">
      
        <MainHeader toggleMenu={toggleMenu }/>

        <main className="flex-1 -pl-6 overflow-auto">
        
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
