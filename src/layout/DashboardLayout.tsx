
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



import UserMainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";
import UserSidebar from "@/dashboard/Sidebar";
import LogoutModal from "@/pages/Admin/Logout/LogoutPopup";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = (newState: boolean) => setIsSidebarCollapsed(newState);

    const handleLogoutClick = () => {
        navigate("/dashboard");
        setShowLogoutModal(true);
        setMobileMenuOpen(false);
    };

    return (
        <div className="flex h-screen bg-[#F3F6F6] overflow-hidden" style={{ fontFamily: "Urbanist, sans-serif" }}>

            {/* Desktop Sidebar */}
            <div className="hidden md:block left-0 top-0 h-full border-r border-[#D0D5DD]">
                <UserSidebar
                    onLogoutClick={handleLogoutClick}
                    collapsed={isSidebarCollapsed}
                    onToggle={toggleSidebar}
                    closeMobileMenu={() => setMobileMenuOpen(false)}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300
                    ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            {/* Mobile Sidebar Drawer */}
            <div
                className={`fixed top-0 left-0 h-full bg-[#F3F6F6] shadow-lg z-50 transition-transform duration-300 lg:hidden
                    ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{ width: "300px" }}
            >
                <UserSidebar
                    onLogoutClick={handleLogoutClick}
                    collapsed={false}
                    onToggle={() => { }}
                    closeMobileMenu={() => setMobileMenuOpen(false)}
                />
            </div>

            {/* Main Content */}
       <div className="flex-1 flex flex-col min-h-screen w-full">

                <UserMainHeader onMobileMenuOpen={() => setMobileMenuOpen(true)} />

                {/* Scrollable content */}
                <main className="flex-1 overflow-y-auto w-full px-3 md:px-6 pb-6">
                    <Outlet />
                </main>

                {showLogoutModal && (
                    <LogoutModal
                        onConfirm={() => {
                            localStorage.removeItem("token");
                            setShowLogoutModal(false);
                            navigate("/");
                        }}
                        onCancel={() => setShowLogoutModal(false)}
                    />
                )}
            </div>
        </div>
    );

};

export default DashboardLayout;









// import MainHeader from "@/dashboard/components/dashboard/DashboardMainHeader";
// import Sidebar from "@/dashboard/Sidebar";
// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//   return (
//     <div className="flex h-screen bg-[#F3F6F6]">

//       <div className="fw-[280px] border-r border-gray-300">
//         <Sidebar />
//       </div>

     
//       <div className="flex-1 flex flex-col pl-2">
      
//         <MainHeader />

//         <main className="flex-1 -pl-6 overflow-auto">
        
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
