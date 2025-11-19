import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import icon from "../assets/svgIcon/logo.svg";
import logo from "../assets/svgIcon/textLogo.svg";
import sidelogo from "../assets/svgIcon/rightside-logo.svg";
import dashbord from "../assets/svgIcon/dashboard.svg";
import callLogs from "../assets/svgIcon/callLogs.svg";
import calendar from "../assets/svgIcon/calender.svg";
import patients from "../assets/svgIcon/patients.svg";
import tasks from "../assets/svgIcon/tasks.svg";
import supports from "../assets/svgIcon/supports.svg";
import settings from "../assets/svgIcon/settings.svg";
import logout from "../assets/svgIcon/logout.svg";

interface LogoProps {
    collapsed: boolean;
    onToggle: (state: boolean) => void;
}

const Logo: React.FC<LogoProps> = ({ collapsed, onToggle }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className={`flex items-center p-4 h-16 md:h-20 ${collapsed ? "justify-center" : "justify-between"}`}
            style={{ fontFamily: "Urbanist" }}
        >
            {collapsed ? (
                <button
                    onClick={() => onToggle(false)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="cursor-pointer p-1"
                >
                    <img
                        src={isHovering ? sidelogo : icon}
                        alt={isHovering ? "Open Menu" : "Logo"}
                        className="h-8 w-8 object-contain transition-transform duration-100"
                    />
                </button>
            ) : (
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <img src={icon} alt="Logo" className="h-8 w-8" />
                        <img src={logo} alt="Docline" className="hidden md:block" />
                    </div>

                    <button onClick={() => onToggle(true)} className="cursor-pointer p-1 hidden md:block">
                        <img src={sidelogo} alt="Close Menu" className="h-8 w-8" />
                    </button>
                </div>
            )}
        </div>
    );
};

interface NavItemProps {
    to?: string;
    iconSrc: string;
    label: string;
    onClick?: () => void;
    collapsed: boolean;
    closeMobileMenu?: () => void;
    badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, onClick, collapsed, closeMobileMenu, badge }) => {
    const baseClasses = collapsed
        ? "flex items-center justify-center py-3 px-2 mb-1 mx-2 rounded-lg transition-colors text-[#111A2D] font-semibold relative"
        : "flex items-center gap-3 py-3 px-4 mb-1 mx-4 rounded-lg transition-colors text-[#111A2D] font-semibold relative";

    const handleClick = () => {
        if (onClick) onClick();
        if (closeMobileMenu) closeMobileMenu();
    };

    if (onClick) {
        return (
            <button onClick={handleClick} className={`${baseClasses} hover:bg-gray-100 w-auto`}>
                <img src={iconSrc} alt={label} className="h-6 w-6 min-w-6 min-h-6 object-contain shrink-0" />
                {!collapsed && <span className="flex-1 text-left whitespace-nowrap">{label}</span>}
                
                {/* Badge for collapsed state */}
                {badge !== undefined && badge > 0 && collapsed && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#526FFF] text-white text-xs font-bold">
                        {badge}
                    </span>
                )}
                
                {/* Badge for expanded state */}
                {badge !== undefined && badge > 0 && !collapsed && (
                    <span className="ml-auto flex items-center justify-center h-5 w-5 bg-[#526FFF] text-white text-xs font-bold rounded-full">
                        {badge}
                    </span>
                )}
            </button>
        );
    }

    return (
        <NavLink
            to={to!}
            end
            onClick={handleClick}
            className={({ isActive }) => `${baseClasses} ${isActive ? "bg-[#DFE2E2]" : "hover:bg-[#DFE2E2]"}`}
        >
            <img src={iconSrc} alt={label} className="h-6 w-6 min-w-6 min-h-6 object-contain shrink-0" />
            {!collapsed && <span className="flex-1 text-left whitespace-nowrap">{label}</span>}
            
            {/* Badge for collapsed state */}
            {badge !== undefined && badge > 0 && collapsed && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#526FFF] text-white text-xs font-bold">
                    {badge}
                </span>
            )}
            
            {/* Badge for expanded state */}
            {badge !== undefined && badge > 0 && !collapsed && (
                <span className="ml-auto flex items-center justify-center h-5 w-5 bg-[#526FFF] text-white text-xs font-bold rounded-full">
                    {badge}
                </span>
            )}
        </NavLink>
    );
};

interface UpgradeCardProps {
    collapsed: boolean;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ collapsed }) => {
    const subscriptionTotalMinutes = 1535;
    const [usedMinutes, setUsedMinutes] = useState(1035);
    const remainingMinutes = subscriptionTotalMinutes - usedMinutes;
    const percentage = (usedMinutes / subscriptionTotalMinutes) * 100;

    if (collapsed) {
        return null; // Hide upgrade card when sidebar is collapsed
    }

    return (
        <div className="bg-gray-200 p-4 rounded-xl m-4">
            <div className="mb-1">
                <div className="flex justify-start gap-4 items-center">
                    <span className="text-[#171C35] font-bold text-xl">Upgrade to</span>
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-[#111A2D] text-white">PRO</span>
                </div>
                <span className="text-3xl font-bold text-[#171C35] block mt-1">Basic</span>
            </div>

            <p className="text-md font-bold text-gray-800 mb-2">{usedMinutes} / {subscriptionTotalMinutes} Minutes Used</p>

            <div
                className="w-full bg-gray-300 rounded-full h-2 mb-3 cursor-pointer"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newPercentage = (clickX / rect.width) * 100;
                    const newMinutes = Math.round((newPercentage / 100) * subscriptionTotalMinutes);
                    setUsedMinutes(Math.min(newMinutes, subscriptionTotalMinutes));
                }}
            >
                <div
                    className="bg-[#111A2D] h-2 rounded-full transition-all duration-200"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <button className="w-full bg-[#111A2D] text-white text-sm font-semibold py-2 rounded-lg transition-colors mt-2">
                {remainingMinutes} Minutes left
            </button>
        </div>
    );
};

interface UserSidebarProps {
    onLogoutClick: () => void;
    collapsed: boolean;
    onToggle: (state: boolean) => void;
    closeMobileMenu?: () => void;
}

const Sidebar: React.FC<UserSidebarProps> = ({ onLogoutClick, collapsed, onToggle, closeMobileMenu }) => {
    const sidebarWidth = collapsed ? "w-[70px]" : "w-72";

    return (
        <div
            className={`flex flex-col justify-between h-screen overflow-y-auto ${sidebarWidth} bg-[#F3F6F6] transition-all duration-300 shrink-0`}
            style={{ fontFamily: "Urbanist, sans-serif" }}
        >
            <div>
                <Logo collapsed={collapsed} onToggle={onToggle} />
                <nav className="flex flex-col mt-2 gap-2">
                    <NavItem
                        to="/dashboard"
                        iconSrc={dashbord}
                        label="Dashboard"
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                    />
                    <NavItem
                        to="/dashboard/call_logs"
                        iconSrc={callLogs}
                        label="Call Logs"
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                        badge={5}
                    />
                    <NavItem
                        to="/dashboard/calendar"
                        iconSrc={calendar}
                        label="Calendar"
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                    />
                    <NavItem
                        to="/dashboard/patients"
                        iconSrc={patients}
                        label="Patients"
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                    />
                    <NavItem
                        to="/dashboard/tasks"
                        iconSrc={tasks}
                        label="Tasks"
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                    />
                    <NavItem
                        to="/dashboard/supports"
                        iconSrc={supports}
                        label="Supports"
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                    />
                </nav>
            </div>

            <div className="flex flex-col">
                {/* Upgrade Card - Only show when sidebar is expanded */}
                <UpgradeCard collapsed={collapsed} />

                {/* Settings and Logout */}
                <div className="flex flex-col p-4 space-y-4">
                    <NavItem
                        to="/dashboard/settings"
                        iconSrc={settings}
                        label="Settings"
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                    />
                    <NavItem
                        iconSrc={logout}
                        label="Logout"
                        onClick={onLogoutClick}
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;





// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import logo from '../assets/svgIcon/logo.svg';
// import textlogo from '../assets/svgIcon/textLogo.svg';
// import sidelogo from '../assets/svgIcon/rightside-logo.svg';

// import dashbord from '../assets/svgIcon/dashboard.svg';
// import callLogs from '../assets/svgIcon/callLogs.svg';
// import calendar from '../assets/svgIcon/calender.svg';
// import patients from '../assets/svgIcon/patients.svg';
// import tasks from '../assets/svgIcon/tasks.svg';
// import supports from '../assets/svgIcon/supports.svg';
// import settings from '../assets/svgIcon/settings.svg';
// import logout from '../assets/svgIcon/logout.svg';

// interface NavItemProps {
//   to: string;
//   iconSrc: string;
//   label: string;
//   end?: boolean;
//   collapsed?: boolean;
//   badge?: number;
// }

// const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, end = false, collapsed, badge }) => {
//   return (
//     <NavLink
//       to={to}
//       end={end}
//       className={({ isActive }) =>
//         `flex items-center gap-3 py-3 px-3 mx-4 rounded-lg transition-colors relative
//           ${isActive ? 'bg-[#DFE2E2] mx-4 font-semibold' : 'text-[#111A2D] font-semibold'}
//           ${collapsed ? 'justify-center' : 'justify-start'}`
//       }
//     >
//       <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
//       {!collapsed && <span className="hidden md:inline">{label}</span>}
//       {badge !== undefined && badge > 0 && (
//         <span className={`${collapsed ? 'absolute -top-1 right-2' : 'ml-auto'} flex items-center justify-center h-6 w-6 bg-[#526FFF] text-white text-base font-bold rounded-full`}>
//           {badge}
//         </span>
//       )}
//     </NavLink>
//   );
// };

// const Sidebar: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   // State added for the hover-to-transform functionality
//   const [isHoveringCollapsedLogo, setIsHoveringCollapsedLogo] = useState(false);

//   const subscriptionTotalMinutes = 1535;
//   const [usedMinutes, setUsedMinutes] = useState(1035);
//   const remainingMinutes = subscriptionTotalMinutes - usedMinutes;
//   const percentage = (usedMinutes / subscriptionTotalMinutes) * 100;

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const effectiveCollapsed = collapsed || isMobile;

//   return (
//     <div
//     style={{ fontFamily: 'Urbanist, sans-serif' }}
//       className={`relative flex flex-col justify-between h-screen border-r border-gray-200 transition-all duration-300
//         ${effectiveCollapsed ? 'w-20' : 'w-72'}`}
//     >
//       <div>
//         {/* === UPDATED HEADER/LOGO SECTION === */}
//         <div className="flex p-4">
          
//           {effectiveCollapsed ? (
//             // Layout when collapsed (w-20): Logo transforms to toggle icon on hover
//             <div className="flex flex-col items-center w-full">
//               <button
//                 // Click action: Expands the sidebar
//                 onClick={() => setCollapsed(false)}
//                 // Hover actions: Updates state to swap the image source
//                 onMouseEnter={() => setIsHoveringCollapsedLogo(true)}
//                 onMouseLeave={() => setIsHoveringCollapsedLogo(false)}
//                 className="cursor-pointer"
//               >
//                 <img
//                   // Dynamically choose image source based on hover state
//                   src={isHoveringCollapsedLogo ? sidelogo : logo}
//                   alt={isHoveringCollapsedLogo ? "Open Menu" : "Logo"}
//                   className="h-8 w-8 object-contain"
//                 />
//               </button>
//             </div>
//           ) : (
//             // Layout when NOT collapsed (w-72): Logo and TextLogo side-by-side with toggle button on the right
//             <div className="flex items-center w-full justify-between">
//               <div className="flex items-center gap-4">
//                 <img src={logo} alt="logo" />
//                 <img src={textlogo} alt="Docline" className="hidden md:block" />
//               </div>
              
//               {/* Toggle Button - Click to collapse */}
//               {!isMobile && (
//                 <button
//                   onClick={() => setCollapsed(true)} 
//                   className="cursor-pointer"
//                 >
//                   <img src={sidelogo} alt="close toggle" className="h-8 w-8" />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>


//         <nav style={{ fontFamily: 'Urbanist, sans-serif' }} className="flex flex-col mt-2 gap-2">
//           <NavItem to="/dashboard" iconSrc={dashbord} label="Dashboard" end collapsed={effectiveCollapsed} />
//           <NavItem to="/dashboard/call_logs" iconSrc={callLogs} label="Call Logs" collapsed={effectiveCollapsed} badge={5} />
//           <NavItem to="/dashboard/calendar" iconSrc={calendar} label="Calendar" collapsed={effectiveCollapsed} />
//           <NavItem to="/dashboard/patients" iconSrc={patients} label="Patients" collapsed={effectiveCollapsed} />
//           <NavItem to="/dashboard/tasks" iconSrc={tasks} label="Tasks" collapsed={effectiveCollapsed} />
//           <NavItem to="/dashboard/supports" iconSrc={supports} label="Supports" collapsed={effectiveCollapsed} />
//         </nav>
//       </div>

//       <div className="flex flex-col">
//         {!effectiveCollapsed && (
//           <div className="hidden md:block bg-gray-200 p-4 rounded-xl m-4">
//             <div className="mb-1">
//               <div className="flex justify-start gap-4 items-center">
//                 <span className="text-[#171C35] font-bold text-xl">Upgrade to</span>
//                 <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-[#111A2D] text-white">PRO</span>
//               </div>
//               <span className="text-3xl font-bold text-[#171C35] block mt-1">Basic</span>
//             </div>

//             <p className="text-md font-bold text-gray-800 mb-2">{usedMinutes} / {subscriptionTotalMinutes} Minutes Used</p>

//             <div
//               className="w-full bg-gray-300 rounded-full h-2 mb-3 cursor-pointer"
//               onClick={(e) => {
//                 const rect = e.currentTarget.getBoundingClientRect();
//                 const clickX = e.clientX - rect.left;
//                 const newPercentage = (clickX / rect.width) * 100;
//                 const newMinutes = Math.round((newPercentage / 100) * subscriptionTotalMinutes);
//                 setUsedMinutes(newMinutes);
//               }}
//             >
//               <div
//                 className="bg-[#111A2D] h-2 rounded-full transition-all duration-200"
//                 style={{ width: `${percentage}%` }}
//               />
//             </div>

//             <button className="w-full bg-[#111A2D] text-white text-sm font-semibold py-2 rounded-lg transition-colors mt-2">
//               {remainingMinutes} Minutes left
//             </button>
//           </div>
//         )}

//         <div className="flex flex-col mt-auto mb-4 gap-2">
//           <NavItem to="/dashboard/settings" iconSrc={settings} label="Settings" collapsed={effectiveCollapsed} />
//           <NavItem to="/" iconSrc={logout} label="Logout" collapsed={effectiveCollapsed} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;