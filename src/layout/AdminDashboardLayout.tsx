import AdminMainHeader from "@/AdminDashboard/AdminMainHeader";
import AdminSidebar from "@/AdminDashboard/AdminSidebar";
import LogoutModal from "@/pages/Admin/Logout/LogoutPopup";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboardLayout = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = (newState: boolean) => setIsSidebarCollapsed(newState);

    const handleLogoutClick = () => {
        navigate("/admin");
        setShowLogoutModal(true);
        setMobileMenuOpen(false); // Close mobile menu on logout click
    };

    return (
        <div className="flex h-screen bg-[#F3F6F6] overflow-hidden" style={{ fontFamily: "Urbanist, sans-serif" }}>

            {/* Desktop Sidebar */}
            <div className="hidden md:block left-0 top-0 h-full border-r border-[#D0D5DD]">
                <AdminSidebar
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
                <AdminSidebar
                    onLogoutClick={handleLogoutClick}
                    collapsed={false}
                    onToggle={() => {}}
                    closeMobileMenu={() => setMobileMenuOpen(false)} // pass handler
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen w-full ">
                <AdminMainHeader onMobileMenuOpen={() => setMobileMenuOpen(true)} />

                {/* Scrollable content */}
                <main className="flex-1 overflow-y-auto px-3 md:pt-12 md:px-6 pb-6">
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

export default AdminDashboardLayout;









// import AdminMainHeader from "@/AdminDashboard/AdminMainHeader";
// import AdminSidebar from "@/AdminDashboard/AdminSidebar";
// import LogoutModal from "@/pages/Admin/Logout/LogoutPopup";
// import { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";

// const AdminDashboardLayout = () => {
//     const [showLogoutModal, setShowLogoutModal] = useState(false);
//     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
//     const navigate = useNavigate();

//     const toggleSidebar = (newState: boolean) => {
//         setIsSidebarCollapsed(newState);
//     };

//     const handleLogoutClick = () => {
//         navigate("/admin"); 
//         setShowLogoutModal(true); 
//     };

//     return (
//         <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="flex h-screen bg-[#F3F6F6]">
        
//             {/* Sidebar - Fixed position */}
//             <div className="border-r border-gray-300">
//                 <AdminSidebar  
//                     onLogoutClick={handleLogoutClick}
//                     collapsed={isSidebarCollapsed}
//                     onToggle={toggleSidebar}
//                 />
//             </div>

//             {/* Main content - No marginLeft needed */}
//             <div className="flex-1 flex flex-col px-2">
//                 <AdminMainHeader />

//                 <main className="flex-1 px-5 overflow-auto">
//                     <Outlet />
//                 </main>
                
//                 {showLogoutModal && (
//                     <LogoutModal
//                         onConfirm={() => {
//                             localStorage.removeItem("token"); 
//                             setShowLogoutModal(false);
//                             navigate("/"); 
//                         }}
//                         onCancel={() => setShowLogoutModal(false)}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardLayout;