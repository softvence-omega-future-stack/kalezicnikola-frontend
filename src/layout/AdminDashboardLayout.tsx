import AdminMainHeader from "@/AdminDashboard/AdminMainHeader";
import AdminSidebar from "@/AdminDashboard/AdminSidebar";
import LogoutModal from "@/pages/Admin/Logout/LogoutPopup";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboardLayout = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
    const navigate = useNavigate();

    const toggleSidebar = (newState: boolean) => {
        setIsSidebarCollapsed(newState);
    };

    const handleLogoutClick = () => {
        navigate("/admin"); 
        setShowLogoutModal(true); 
    };

    return (
        <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="flex h-screen bg-[#F3F6F6]">
        
            {/* Sidebar - Fixed position */}
            <div className="border-r border-gray-300">
                <AdminSidebar  
                    onLogoutClick={handleLogoutClick}
                    collapsed={isSidebarCollapsed}
                    onToggle={toggleSidebar}
                />
            </div>

            {/* Main content - No marginLeft needed */}
            <div className="flex-1 flex flex-col px-2">
                <AdminMainHeader />

                <main className="flex-1 px-5 overflow-auto">
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