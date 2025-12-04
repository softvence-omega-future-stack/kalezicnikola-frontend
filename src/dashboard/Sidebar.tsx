import React, { useState } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import icon from "../assets/svgIcon/logo.svg";
import logo from "../assets/svgIcon/textLogo.svg";
import sidelogo from "../assets/svgIcon/rightside-logo.svg";
import dashbord from "../assets/svgIcon/dashboard.svg";
import callLogs from "../assets/svgIcon/callLogs.svg";
import calendar from "../assets/svgIcon/calendar2.svg";
import patients from "../assets/svgIcon/patients.svg";
import tasks from "../assets/svgIcon/task2.svg";
import supports from "../assets/svgIcon/support.svg";
import settings from "../assets/svgIcon/settings.svg";
import logout from "../assets/svgIcon/logout.svg";

interface LogoProps {
    collapsed: boolean;
    onToggle: (state: boolean) => void;
    closeMobileMenu?: () => void;
}

const Logo: React.FC<LogoProps> = ({ collapsed, onToggle, closeMobileMenu }) => {
    return (
        <div
            className={`flex items-center border-b border-b-gray-200 md:border-b-0 p-6 ${collapsed ? "justify-center" : "justify-between"} relative`}
            style={{ fontFamily: "Urbanist" }}
        >
            {collapsed ? (
                <button onClick={() => onToggle(false)} className="cursor-pointer p-1">
                    <img src={icon} alt="Logo" className="h-8 w-8 object-contain transition-transform duration-100" />
                </button>
            ) : (
                <>
                    <Link to="/" className="flex items-center gap-">
                     
                        <img src={icon} alt="Logo" className="h-8 w-8" />
                      
                        <img src={logo} alt="Docline" className="hidden md:block" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <button onClick={() => onToggle(true)} className="cursor-pointer hidden md:block">
                            <img src={sidelogo} alt="Close Menu" className="h-8 w-8" />
                        </button>
                        {closeMobileMenu && (
                            <button
                                onClick={closeMobileMenu}
                                className="cursor-pointer p-2 md:hidden bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
                            >
                                <X className="h-5 w-5 text-gray-700" />
                            </button>
                        )}
                    </div>
                </>
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
    className?: string; 
    customActive?: (pathname: string) => boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, onClick, collapsed, closeMobileMenu, badge, className, customActive }) => {
    const location = useLocation();
    const handleClick = () => {
        if (onClick) onClick();
        if (closeMobileMenu) closeMobileMenu();
    };

    const baseClasses = collapsed
        ? "flex items-center justify-center py-3 mx-2 rounded-lg transition-colors font-semibold"
        : "flex items-center gap-3 py-3 px-4 mr-6 ml-2 rounded-lg transition-colors font-semibold flex-1";

    const finalClasses = `${baseClasses} ${className || ""}`;

    const isActive = customActive ? customActive(location.pathname) : (to ? location.pathname === to : false);

    if (onClick) {
        return (
            <button onClick={handleClick} className={`${finalClasses} hover:bg-[#DFE2E2] relative`}>
                <div className="relative flex items-center gap-3">
                    <img src={iconSrc} alt={label} className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0" />
                    {badge !== undefined && badge > 0 && collapsed && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#526FFF] text-white text-xs font-bold">
                            {badge}
                        </span>
                    )}
                </div>
                {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
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
            onClick={handleClick}
            className={`${finalClasses} relative ${isActive ? "bg-[#DFE2E2] text-[#171C35]" : "text-[#667085] hover:bg-[#DFE2E2]"}`}
        >
            <div className="relative flex items-center gap-3">
                <img src={iconSrc} alt={label} className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0" />
                {badge !== undefined && badge > 0 && collapsed && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#526FFF] text-white text-xs font-bold">
                        {badge}
                    </span>
                )}
            </div>
            {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
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
    const { t } = useTranslation();
    const subscriptionTotalMinutes = 1535;
    const [usedMinutes, setUsedMinutes] = useState(1035);
    const percentage = (usedMinutes / subscriptionTotalMinutes) * 100;
    const navigate = useNavigate();

    if (collapsed) return null;

    return (
        <div className="p-3 md:p-4">
            <div className="bg-gray-200 p-3 rounded-lg">
                <div className="mb-1">
                    <div className="flex justify-start gap-2 sm:gap-4 items-center flex-wrap">
                        <span className="text-[#171C35] font-semibold text-base">{t('dashboard.sidebar.upgradeCard.upgradeTo')}</span>
                        <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-subHeadingBlack text-white whitespace-nowrap">
                            {t('dashboard.sidebar.upgradeCard.proBadge')}
                        </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-semibold text-[#171C35] block mt-1">{t('dashboard.sidebar.upgradeCard.currentPlan')}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-800 mb-2">
                    {usedMinutes} / {subscriptionTotalMinutes} {t('dashboard.sidebar.upgradeCard.minutesUsed')}
                </p>
                <div
                    className="w-full bg-gray-300 rounded-full h-1.5 mb-3 cursor-pointer"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newPercentage = (clickX / rect.width) * 100;
                        const newMinutes = Math.round((newPercentage / 100) * subscriptionTotalMinutes);
                        setUsedMinutes(Math.min(newMinutes, subscriptionTotalMinutes));
                    }}
                >
                    <div
                        className="bg-subHeadingBlack h-1.5 rounded-full transition-all duration-200"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <button
                    className="w-full bg-subHeadingBlack text-white text-xs font-semibold py-2 sm:py-2 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors mt-2"
                    onClick={() => navigate('/dashboard/settings?tab=Subscription&subtab=manage')}
                >
                    {t('dashboard.sidebar.upgradeCard.upgradeButton')}
                </button>
            </div>
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
    const { t } = useTranslation();
    const sidebarWidth = collapsed ? "w-[80px]" : "w-[280px]";

    return (
        <div
            className={`flex flex-col justify-between h-screen overflow-y-auto ${sidebarWidth} bg-[#F3F6F6] transition-all duration-300 shrink-0`}
            style={{ fontFamily: "Urbanist, sans-serif" }}
        >
            <div>
                <Logo collapsed={collapsed} onToggle={onToggle} closeMobileMenu={closeMobileMenu} />
                <nav className="flex flex-col mt-2 gap-2">
                    <NavItem to="/dashboard" iconSrc={dashbord} label={t('dashboard.sidebar.navigation.dashboard')} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
                    <NavItem 
                        to="/dashboard/call_logs" 
                        iconSrc={callLogs} 
                        label={t('dashboard.sidebar.navigation.callLogs')} 
                        collapsed={collapsed} 
                        closeMobileMenu={closeMobileMenu} 
                        badge={5} 
                    />
                    <NavItem to="/dashboard/calendar" iconSrc={calendar} label={t('dashboard.sidebar.navigation.calendar')} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
                    <NavItem 
                        to="/dashboard/patients" 
                        iconSrc={patients} 
                        label={t('dashboard.sidebar.navigation.patients')} 
                        collapsed={collapsed} 
                        closeMobileMenu={closeMobileMenu}
                        customActive={(pathname) => pathname.startsWith("/dashboard/patients")} 
                    />
                    <NavItem to="/dashboard/tasks" iconSrc={tasks} label={t('dashboard.sidebar.navigation.tasks')} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
                    <NavItem to="/dashboard/supports" iconSrc={supports} label={t('dashboard.sidebar.navigation.supports')} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
                </nav>
            </div>

            <div className="flex flex-col">
                <UpgradeCard collapsed={collapsed} />
                <div className="flex flex-col p-4 space-y-4">
                    <NavItem to="/dashboard/settings" iconSrc={settings} label={t('dashboard.sidebar.navigation.settings')} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
                    <NavItem
                        iconSrc={logout}
                        label={t('dashboard.sidebar.navigation.logout')}
                        onClick={onLogoutClick}
                        collapsed={collapsed}
                        closeMobileMenu={closeMobileMenu}
                        className="text-[#667085]" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;




// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// import { useState } from "react";

// import logo from "../assets/svgIcon/logo.svg";
// import textlogo from "../assets/svgIcon/textLogo.svg";
// import sidelogo from "../assets/svgIcon/rightside-logo.svg";


// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { X } from 'lucide-react';

// import icon from "../assets/svgIcon/logo.svg";
// import logo from "../assets/svgIcon/textLogo.svg";
// import sidelogo from "../assets/svgIcon/rightside-logo.svg";

// import dashbord from "../assets/svgIcon/dashboard.svg";
// import callLogs from "../assets/svgIcon/callLogs.svg";
// import calendar from "../assets/svgIcon/calender.svg";
// import patients from "../assets/svgIcon/patients.svg";
// import tasks from "../assets/svgIcon/tasks.svg";
// import supports from "../assets/svgIcon/supports.svg";
// import settings from "../assets/svgIcon/settings.svg";
// import logout from "../assets/svgIcon/logout.svg";


// interface NavItemProps {
//   to?: string;
//   iconSrc: string;
//   label: string;
//   end?: boolean;
//   collapsed: boolean;
//   badge?: number;
//   onClick?: () => void;
//   closeMobileMenu?: () => void;
// }

// interface SidebarProps {
//   collapsed: boolean;
//   onToggle: (collapsed: boolean) => void;
//   closeMobileMenu?: () => void;
// }

// // === NavItem Component ===
// const NavItem: React.FC<NavItemProps> = ({
//   to,
//   label,
//   iconSrc,
//   end = false,
//   collapsed,
//   badge,
//   onClick,
//   closeMobileMenu,
// }) => {
//   const baseClasses = collapsed
//     ? "flex items-center justify-center py-3 px-2 mb-1 mx-2 rounded-lg transition-colors text-[#111A2D] font-semibold"
//     : "flex items-center gap-3 py-3 px-4 mb-1 mx-4 rounded-lg transition-colors text-[#111A2D] font-semibold";

//   const handleClick = () => {
//     if (onClick) onClick();
//     if (closeMobileMenu) closeMobileMenu();
//   };

//   if (onClick) {
//     return (
//       <button onClick={handleClick} className={`${baseClasses} hover:bg-gray-100 w-full`}>
//         <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
//         {!collapsed && <span className="flex-1">{label}</span>}
//       </button>
//     );
//   }

//   return (
//     <NavLink
//       to={to!}
//       end={end}
//       onClick={handleClick}
//       className={({ isActive }) =>
//         `${baseClasses} ${isActive ? "bg-[#DFE2E2]" : "hover:bg-[#DFE2E2]"}`
//       }
//     >
//       <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
//       {!collapsed && <span className="flex-1">{label}</span>}
//       {badge && badge > 0 && (
//         <span
//           className={`${
//             collapsed ? "absolute -top-1 right-2" : "ml-auto"
//           } flex items-center justify-center h-6 w-6 bg-[#526FFF] text-white text-xs font-bold rounded-full`}
//         >
//           {badge}
//         </span>
//       )}
//     </NavLink>
//   );
// };

// // === Sidebar Component ===
// const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, closeMobileMenu }) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [isHoveringCollapsedLogo, setIsHoveringCollapsedLogo] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const effectiveCollapsed = collapsed && !isMobile;

//   return (
//     <div
//       className={`flex flex-col justify-between h-screen bg-[#F3F6F6] transition-all duration-300 border-r
//         ${effectiveCollapsed ? "w-20" : "w-72"}`}
//     >
//       {/* Logo Section */}
//       <div className="flex items-center justify-between p-4">
//         {effectiveCollapsed ? (
//           <button
//             onClick={() => onToggle(false)}
//             onMouseEnter={() => setIsHoveringCollapsedLogo(true)}
//             onMouseLeave={() => setIsHoveringCollapsedLogo(false)}
//             className="cursor-pointer"
//           >
//             <img
//               src={isHoveringCollapsedLogo ? sidelogo : logo}
//               alt={isHoveringCollapsedLogo ? "Open Menu" : "Logo"}
//               className="h-8 w-8 object-contain"
//             />
//           </button>
//         ) : (
//           <div className="flex items-center justify-between w-full">
//             <div className="flex items-center gap-2">
//               <img src={logo} alt="Logo" />
//               <img src={textlogo} alt="Dashboard" className="hidden md:block" />
//             </div>
//             {!isMobile && (
//               <button onClick={() => onToggle(true)} className="cursor-pointer">
//                 <img src={sidelogo} alt="Close Menu" className="h-8 w-8" />
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col mt-2 gap-2">
//         <NavItem to="/dashboard" iconSrc={dashbord} label="Dashboard" end collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
//         <NavItem to="/dashboard/call_logs" iconSrc={callLogs} label="Call Logs" collapsed={effectiveCollapsed} badge={5} closeMobileMenu={closeMobileMenu} />
//         <NavItem to="/dashboard/calendar" iconSrc={calendar} label="Calendar" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
//         <NavItem to="/dashboard/patients" iconSrc={patients} label="Patients" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
//         <NavItem to="/dashboard/tasks" iconSrc={tasks} label="Tasks" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
//         <NavItem to="/dashboard/supports" iconSrc={supports} label="Supports" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
//       </nav>

//       {/* Footer */}
//       <div className="flex flex-col mt-auto mb-4 gap-2">
//         <NavItem to="/dashboard/settings" iconSrc={settings} label="Settings" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
//         <NavItem to="/" iconSrc={logout} label="Logout" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// interface LogoProps {
//     collapsed: boolean;
//     onToggle: (state: boolean) => void;
//     closeMobileMenu?: () => void;
// }

// const Logo: React.FC<LogoProps> = ({ collapsed, onToggle, closeMobileMenu }) => {
//     const [isHovering, setIsHovering] = useState(false);

//     return (
//         <div
//             className={`flex items-center border-b border-b-gray-200 md:border-b-0 p-4 h-16 md:h-20 ${collapsed ? "justify-center" : "justify-between"} relative`}
//             style={{ fontFamily: "Urbanist" }}
//         >
//             {collapsed ? (
//                 <button
//                     onClick={() => onToggle(false)}
//                     onMouseEnter={() => setIsHovering(true)}
//                     onMouseLeave={() => setIsHovering(false)}
//                     className="cursor-pointer p-1"
//                 >
//                     <img
//                         src={isHovering ? sidelogo : icon}
//                         alt={isHovering ? "Open Menu" : "Logo"}
//                         className="h-8 w-8 object-contain transition-transform duration-100"
//                     />
//                 </button>
//             ) : (
//                 <>
//                     <div className="flex items-center gap-2">
//                         <img src={icon} alt="Logo" className="h-8 w-8" />
//                         <img src={logo} alt="Docline" className="hidden md:block" />
//                     </div>

//                     <div className="flex items-center gap-2">
//                         {/* Desktop Toggle Button - Exactly like AdminSidebar */}
//                         <button 
//                             onClick={() => onToggle(true)} 
//                             className="cursor-pointer p-1 hidden md:block"
//                         >
//                             <img src={sidelogo} alt="Close Menu" className="h-8 w-8" />
//                         </button>
                        
//                         {/* Mobile Close Button - Only show when closeMobileMenu function is provided */}
//                         {closeMobileMenu && (
//                             <button 
//                                 onClick={closeMobileMenu}
//                                 className="cursor-pointer p-2 md:hidden bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
//                             >
//                                 <X className="h-5 w-5 text-gray-700" />
//                             </button>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// interface NavItemProps {
//     to?: string;
//     iconSrc: string;
//     label: string;
//     onClick?: () => void;
//     collapsed: boolean;
//     closeMobileMenu?: () => void;
//     badge?: number;
// }

// const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, onClick, collapsed, closeMobileMenu, badge }) => {
//     const baseClasses = collapsed
//         ? "flex items-center justify-center py-3 mx-2 rounded-lg transition-colors text-[#111A2D] font-semibold relative"
//         : "flex items-center gap-3 py-3 px-4 mx-2 rounded-lg transition-colors text-[#111A2D] font-semibold relative";

//     const handleClick = () => {
//         if (onClick) onClick();
//         if (closeMobileMenu) closeMobileMenu();
//     };

//     if (onClick) {
//         return (
//             <button onClick={handleClick} className={`${baseClasses} hover:bg-gray-100 w-auto`}>
//                 <img src={iconSrc} alt={label} className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0" />
//                 {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
                
               
//                 {badge !== undefined && badge > 0 && collapsed && (
//                     <span className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#526FFF] text-white text-xs font-bold">
//                         {badge}
//                     </span>
//                 )}
                
 
//                 {badge !== undefined && badge > 0 && !collapsed && (
//                     <span className="ml-auto flex items-center justify-center h-5 w-5 bg-[#526FFF] text-white text-xs font-bold rounded-full">
//                         {badge}
//                     </span>
//                 )}
//             </button>
//         );
//     }

//     return (
//         <NavLink
//             to={to!}
//             end
//             onClick={handleClick}
//             className={({ isActive }) => `${baseClasses} ${isActive ? "bg-[#DFE2E2]" : "hover:bg-[#DFE2E2]"}`}
//         >
//             <img src={iconSrc} alt={label} className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0" />
//             {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
            
//             {/* Badge for collapsed state */}
//             {badge !== undefined && badge > 0 && collapsed && (
//                 <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#526FFF] text-white text-xs font-bold">
//                     {badge}
//                 </span>
//             )}
            
//             {/* Badge for expanded state */}
//             {badge !== undefined && badge > 0 && !collapsed && (
//                 <span className="ml-auto flex items-center justify-center h-5 w-5 bg-[#526FFF] text-white text-xs font-bold rounded-full">
//                     {badge}
//                 </span>
//             )}
//         </NavLink>
//     );
// };

// interface UpgradeCardProps {
//     collapsed: boolean;
// }

// const UpgradeCard: React.FC<UpgradeCardProps> = ({ collapsed }) => {
//     const subscriptionTotalMinutes = 1535;
//     const [usedMinutes, setUsedMinutes] = useState(1035);
//     const remainingMinutes = subscriptionTotalMinutes - usedMinutes;
//     const percentage = (usedMinutes / subscriptionTotalMinutes) * 100;

//     if (collapsed) {
//         return null;
//     }

//     return (
//         <div className="p-4 md:p-6">
//             <div className="bg-gray-200 p-3 sm:p-4 rounded-xl">
//                 <div className="mb-1">
//                     <div className="flex justify-start gap-2 sm:gap-4 items-center flex-wrap">
//                         <span className="text-[#171C35] font-bold text-lg sm:text-xl">Upgrade to</span>
//                         <span className="text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full bg-[#111A2D] text-white whitespace-nowrap">
//                             PRO
//                         </span>
//                     </div>
//                     <span className="text-2xl sm:text-3xl font-bold text-[#171C35] block mt-1">Basic</span>
//                 </div>

//                 <p className="text-sm sm:text-md font-bold text-gray-800 mb-2">
//                     {usedMinutes} / {subscriptionTotalMinutes} Minutes Used
//                 </p>

//                 <div
//                     className="w-full bg-gray-300 rounded-full h-2 sm:h-2 mb-3 cursor-pointer"
//                     onClick={(e) => {
//                         const rect = e.currentTarget.getBoundingClientRect();
//                         const clickX = e.clientX - rect.left;
//                         const newPercentage = (clickX / rect.width) * 100;
//                         const newMinutes = Math.round((newPercentage / 100) * subscriptionTotalMinutes);
//                         setUsedMinutes(Math.min(newMinutes, subscriptionTotalMinutes));
//                     }}
//                 >
//                     <div
//                         className="bg-[#111A2D] h-2 rounded-full transition-all duration-200"
//                         style={{ width: `${percentage}%` }}
//                     />
//                 </div>

//                 <button className="w-full bg-[#111A2D] text-white text-xs sm:text-sm font-semibold py-2 sm:py-2 rounded-lg hover:bg-gray-900 transition-colors mt-2">
//                     {remainingMinutes} Minutes left
//                 </button>
//             </div>
//         </div>
//     );
// };

// interface UserSidebarProps {
//     onLogoutClick: () => void;
//     collapsed: boolean;
//     onToggle: (state: boolean) => void;
//     closeMobileMenu?: () => void;
// }

// const Sidebar: React.FC<UserSidebarProps> = ({ onLogoutClick, collapsed, onToggle, closeMobileMenu }) => {
//     const sidebarWidth = collapsed ? "w-[80px]" : "w-[280px]";

//     return (
//         <div
//             className={`flex flex-col justify-between h-screen overflow-y-auto ${sidebarWidth} bg-[#F3F6F6] transition-all duration-300 shrink-0`}
//             style={{ fontFamily: "Urbanist, sans-serif" }}
//         >
//             <div>
//                 <Logo 
//                     collapsed={collapsed} 
//                     onToggle={onToggle} 
//                     closeMobileMenu={closeMobileMenu}
//                 />
//                 <nav className="flex flex-col mt-2 gap-2">
//                     <NavItem
//                         to="/dashboard"
//                         iconSrc={dashbord}
//                         label="Dashboard"
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                     />
//                     <NavItem
//                         to="/dashboard/call_logs"
//                         iconSrc={callLogs}
//                         label="Call Logs"
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                         badge={5}
//                     />
//                     <NavItem
//                         to="/dashboard/calendar"
//                         iconSrc={calendar}
//                         label="Calendar"
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                     />
//                     <NavItem
//                         to="/dashboard/patients"
//                         iconSrc={patients}
//                         label="Patients"
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                     />
//                     <NavItem
//                         to="/dashboard/tasks"
//                         iconSrc={tasks}
//                         label="Tasks"
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                     />
//                     <NavItem
//                         to="/dashboard/supports"
//                         iconSrc={supports}
//                         label="Supports"
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                     />
//                 </nav>
//             </div>

//             <div className="flex flex-col">
//                 <UpgradeCard collapsed={collapsed} />

//                 <div className="flex flex-col p-4 space-y-4">
//                     <NavItem
//                         to="/dashboard/settings"
//                         iconSrc={settings}
//                         label="Settings"
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                     />
//                     <NavItem
//                         iconSrc={logout}
//                         label="Logout"
//                         onClick={onLogoutClick}
//                         collapsed={collapsed}
//                         closeMobileMenu={closeMobileMenu}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;








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

