
// import MainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";
// import Sidebar from "@/dashboard/Sidebar";
// import { useState } from "react";
// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {

//     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
//     const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//     const toggleSidebar = (newState: boolean) => {
//         setIsSidebarCollapsed(newState);
//     };
//   return (
//     <div className="flex h-screen bg-[#F3F6F6]">

//       <div className="fw-[280px] border-r border-gray-300">
//         <Sidebar   onToggle={toggleSidebar}  collapsed={isSidebarCollapsed} />
//       </div>

     
//       <div className="flex-1 flex flex-col pl-2">
      
//         <MainHeader toggleMenu={toggleMenu }/>

//         <main className="flex-1 -pl-6 overflow-auto">
        
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import MainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";
import Sidebar from "@/dashboard/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";




const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = (newState: boolean) => {
    setIsSidebarCollapsed(newState);
  };

  return (
    <div className="flex h-screen bg-[#F3F6F6] overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block left-0 top-0 h-full border-r border-gray-300">
        <Sidebar collapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300
          ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#F3F6F6] shadow-lg z-50 md:hidden transition-transform duration-300
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: "280px" }}
      >
        <Sidebar collapsed={false} onToggle={() => {}} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <MainHeader toggleMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto px-3 md:px-6 pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
