import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X } from 'lucide-react';
import { useTranslation } from "react-i18next";

import icon from "../assets/svgIcon/logo.svg";
import logo from "../assets/svgIcon/textLogo.svg";
import sidelogo from "../assets/svgIcon/rightside-logo.svg";
import dashbord from "../assets/svgIcon/dashboard.svg";
import customers from "../assets/svgIcon/user.svg";
import voice from "../assets/svgIcon/callLogs.svg";
import belling from "../assets/svgIcon/belling.svg";
import supports from "../assets/svgIcon/support.svg";
import settings from "../assets/svgIcon/settings.svg";
import logout from "../assets/svgIcon/logout.svg";
import systemHealth from "../assets/svgIcon/systemHealth.svg";
import security from "../assets/svgIcon/securityAudit.svg";

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
        <button
          onClick={() => onToggle(false)}
          className="cursor-pointer p-1"
        >
          <img
            src={icon}
            alt="Logo"
            className="h-8 w-8 object-contain transition-transform duration-100"
          />
        </button>
      ) : (
        <>
          <div className="flex items-center ">
            <img src={icon} alt="Logo" className="h-8 w-8" />
            <img src={logo} alt="Docline" className="hidden md:block" />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onToggle(true)} 
              className="cursor-pointer hidden md:block"
            >
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
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, onClick, collapsed, closeMobileMenu, className }) => {
  const location = useLocation();
  
  const baseClasses = collapsed
    ? "flex items-center justify-center py-3 mx-2 rounded-lg transition-colors font-semibold"
    : "flex items-center gap-3 py-3 px-4 mr-6 ml-2 rounded-lg transition-colors font-semibold flex-1";

  const handleClick = () => {
    if (onClick) onClick();
    if (closeMobileMenu) closeMobileMenu();
  };

  const finalClasses = `${baseClasses} ${className || ""}`;
  const isActive = to ? location.pathname === to : false;

  if (onClick) {
    return (
      <button onClick={handleClick} className={`${finalClasses} hover:bg-[#DFE2E2] relative`}>
        <div className="relative flex items-center gap-3">
          <img src={iconSrc} alt={label} className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0" />
        </div>
        {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
      </button>
    );
  }

  return (
    <NavLink
      to={to!}
      end
      onClick={handleClick}
      className={`${finalClasses} relative ${isActive ? "bg-[#DFE2E2] text-[#171C35]" : "text-[#667085] hover:bg-[#DFE2E2]"}`}
    >
      <div className="relative flex items-center gap-3">
        <img src={iconSrc} alt={label} className="h-5 w-5 sm:h-6 sm:w-6 object-contain shrink-0" />
      </div>
      {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
    </NavLink>
  );
};

interface AdminSidebarProps {
  onLogoutClick: () => void;
  collapsed: boolean;
  onToggle: (state: boolean) => void;
  closeMobileMenu?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogoutClick, collapsed, onToggle, closeMobileMenu }) => {
  const { t } = useTranslation();
  const sidebarWidth = collapsed ? "w-[80px]" : "w-[280px]";

  return (
    <div
      className={`flex flex-col justify-between h-screen overflow-y-auto ${sidebarWidth} bg-[#F3F6F6] transition-all duration-300 shrink-0`}
      style={{ fontFamily: "Urbanist, sans-serif" }}
    >
      <div>
        <Logo 
          collapsed={collapsed} 
          onToggle={onToggle} 
          closeMobileMenu={closeMobileMenu}
        />
        <nav className="flex flex-col mt-2 gap-2">
          <NavItem to="/admin" iconSrc={dashbord} label={t("adminDashboard.sidebar.dashboard")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
          <NavItem to="/admin/customers" iconSrc={customers} label={t("adminDashboard.sidebar.customers")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
          <NavItem to="/admin/belling_subs" iconSrc={belling} label={t("adminDashboard.sidebar.billing_subscription")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
          <NavItem to="/admin/aivoice" iconSrc={voice} label={t("adminDashboard.sidebar.ai_voicebot")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
          <NavItem to="/admin/system_health" iconSrc={systemHealth} label={t("adminDashboard.sidebar.system_health")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
          <NavItem to="/admin/security" iconSrc={security} label={t("adminDashboard.sidebar.security_audit")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
          <NavItem to="/admin/supports" iconSrc={supports} label={t("adminDashboard.sidebar.supports")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
        </nav>
      </div>

      <div className="flex flex-col p-4 space-y-4">
        <NavItem to="/admin/settings" iconSrc={settings} label={t("adminDashboard.sidebar.settings")} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
        <NavItem 
          iconSrc={logout} 
          label={t("adminDashboard.sidebar.logout")} 
          onClick={onLogoutClick} 
          collapsed={collapsed} 
          closeMobileMenu={closeMobileMenu}
          className="text-[#667085]"
        />
      </div>
    </div>
  );
};

export default AdminSidebar;







// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { X } from 'lucide-react'; // Close icon import

// import icon from "../assets/svgIcon/logo.svg";
// import logo from "../assets/svgIcon/textLogo.svg";
// import sidelogo from "../assets/svgIcon/rightside-logo.svg";
// import dashbord from "../assets/svgIcon/dashboard.svg";
// import customers from "../assets/svgIcon/user.svg";
// import voice from "../assets/svgIcon/callLogs.svg";
// import belling from "../assets/svgIcon/belling.svg";
// import supports from "../assets/svgIcon/supports.svg";
// import settings from "../assets/svgIcon/settings.svg";
// import logout from "../assets/svgIcon/logout.svg";
// import systemHealth from "../assets/svgIcon/systemHealth.svg";
// import security from "../assets/svgIcon/securityAudit.svg";

// interface LogoProps {
//   collapsed: boolean;
//   onToggle: (state: boolean) => void;
//   closeMobileMenu?: () => void;
// }

// const Logo: React.FC<LogoProps> = ({ collapsed, onToggle, closeMobileMenu }) => {
//   const [isHovering, setIsHovering] = useState(false);

//   return (
//     <div
//       className={`flex items-center p-4 h-16 md:h-20 ${collapsed ? "justify-center" : "justify-between"} relative`}
//       style={{ fontFamily: "Urbanist" }}
//     >
//       {collapsed ? (
//         <button
//           onClick={() => onToggle(false)}
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//           className="cursor-pointer p-1"
//         >
//           <img
//             src={isHovering ? sidelogo : icon}
//             alt={isHovering ? "Open Menu" : "Logo"}
//             className="h-8 w-8 object-contain transition-transform duration-100"
//           />
//         </button>
//       ) : (
//         <>
//           <div className="flex items-center gap-2">
//             <img src={icon} alt="Logo" className="h-8 w-8" />
//             <img src={logo} alt="Docline" className="hidden md:block" />
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Desktop Toggle Button */}
//             <button 
//               onClick={() => onToggle(true)} 
//               className="cursor-pointer p-1 hidden md:block"
//             >
//               <img src={sidelogo} alt="Close Menu" className="h-8 w-8" />
//             </button>
            
//             {/* Mobile Close Button - Only show when closeMobileMenu function is provided */}
//             {closeMobileMenu && (
//               <button 
//                 onClick={closeMobileMenu}
//                 className="cursor-pointer p-2 md:hidden bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
//               >
//                 <X className="h-5 w-5 text-gray-700" />
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// interface NavItemProps {
//   to?: string;
//   iconSrc: string;
//   label: string;
//   onClick?: () => void;
//   collapsed: boolean;
//   closeMobileMenu?: () => void;
// }

// const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, onClick, collapsed, closeMobileMenu }) => {
//   const baseClasses = collapsed
//     ? "flex items-center justify-center py-3 px-2 mb-1 mx-2 rounded-lg transition-colors text-[#111A2D] font-semibold"
//     : "flex items-center gap-3 py-3 px-4 mb-1 mx-4 rounded-lg transition-colors text-[#111A2D] font-semibold";

//   const handleClick = () => {
//     if (onClick) onClick();
//     if (closeMobileMenu) closeMobileMenu(); // close mobile menu on route click
//   };

//   if (onClick) {
//     return (
//       <button onClick={handleClick} className={`${baseClasses} hover:bg-gray-100 w-auto`}>
//         <img src={iconSrc} alt={label} className="h-6 w-6 object-contain shrink-0" />
//         {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
//       </button>
//     );
//   }

//   return (
//     <NavLink
//       to={to!}
//       end
//       onClick={handleClick}
//       className={({ isActive }) => `${baseClasses} ${isActive ? "bg-[#DFE2E2]" : "hover:bg-[#DFE2E2]"}`}
//     >
//       <img src={iconSrc} alt={label} className="h-6 w-6 object-contain shrink-0" />
//       {!collapsed && <span className="flex-1 text-sm md:text-base text-left whitespace-nowrap">{label}</span>}
//     </NavLink>
//   );
// };

// interface AdminSidebarProps {
//   onLogoutClick: () => void;
//   collapsed: boolean;
//   onToggle: (state: boolean) => void;
//   closeMobileMenu?: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogoutClick, collapsed, onToggle, closeMobileMenu }) => {
//   const sidebarWidth = collapsed ? "w-[70px]" : "w-72";

//   return (
//     <div
//       className={`flex flex-col justify-between h-screen overflow-y-auto ${sidebarWidth} bg-[#F3F6F6] transition-all duration-300 shrink-0`}
//     >
//       <div>
//         <Logo 
//           collapsed={collapsed} 
//           onToggle={onToggle} 
//           closeMobileMenu={closeMobileMenu}
//         />
//         <nav className="flex flex-col mt-2 gap-2 pb-20">
//           <NavItem to="/admin" iconSrc={dashbord} label="Dashboard" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//           <NavItem to="/admin/customers" iconSrc={customers} label="Customers" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//           <NavItem to="/admin/belling_subs" iconSrc={belling} label="Billing & Subscription" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//           <NavItem to="/admin/aivoice" iconSrc={voice} label="AI Voicebot" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//           <NavItem to="/admin/system_health" iconSrc={systemHealth} label="System Health" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//           <NavItem to="/admin/security" iconSrc={security} label="Security & Audit" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//           <NavItem to="/admin/supports" iconSrc={supports} label="Supports" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//         </nav>
//       </div>

//       <div className="flex flex-col p-4 space-y-4">
//         <NavItem to="/admin/settings" iconSrc={settings} label="Settings" collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//         <NavItem iconSrc={logout} label="Logout" onClick={onLogoutClick} collapsed={collapsed} closeMobileMenu={closeMobileMenu} />
//       </div>
//     </div>
//   );
