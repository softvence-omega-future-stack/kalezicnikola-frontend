import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/svgIcon/logo.svg";
import textlogo from "../assets/svgIcon/textLogo.svg";
import sidelogo from "../assets/svgIcon/rightside-logo.svg";

import dashbord from "../assets/svgIcon/dashboard.svg";
import callLogs from "../assets/svgIcon/callLogs.svg";
import calendar from "../assets/svgIcon/calender.svg";
import patients from "../assets/svgIcon/patients.svg";
import tasks from "../assets/svgIcon/tasks.svg";
import supports from "../assets/svgIcon/supports.svg";
import settings from "../assets/svgIcon/settings.svg";
import logout from "../assets/svgIcon/logout.svg";

interface NavItemProps {
  to?: string;
  iconSrc: string;
  label: string;
  end?: boolean;
  collapsed: boolean;
  badge?: number;
  onClick?: () => void;
  closeMobileMenu?: () => void;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
  closeMobileMenu?: () => void;
}

// === NavItem Component ===
const NavItem: React.FC<NavItemProps> = ({
  to,
  label,
  iconSrc,
  end = false,
  collapsed,
  badge,
  onClick,
  closeMobileMenu,
}) => {
  const baseClasses = collapsed
    ? "flex items-center justify-center py-3 px-2 mb-1 mx-2 rounded-lg transition-colors text-[#111A2D] font-semibold"
    : "flex items-center gap-3 py-3 px-4 mb-1 mx-4 rounded-lg transition-colors text-[#111A2D] font-semibold";

  const handleClick = () => {
    if (onClick) onClick();
    if (closeMobileMenu) closeMobileMenu();
  };

  if (onClick) {
    return (
      <button onClick={handleClick} className={`${baseClasses} hover:bg-gray-100 w-full`}>
        <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
        {!collapsed && <span className="flex-1">{label}</span>}
      </button>
    );
  }

  return (
    <NavLink
      to={to!}
      end={end}
      onClick={handleClick}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? "bg-[#DFE2E2]" : "hover:bg-[#DFE2E2]"}`
      }
    >
      <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
      {!collapsed && <span className="flex-1">{label}</span>}
      {badge && badge > 0 && (
        <span
          className={`${
            collapsed ? "absolute -top-1 right-2" : "ml-auto"
          } flex items-center justify-center h-6 w-6 bg-[#526FFF] text-white text-xs font-bold rounded-full`}
        >
          {badge}
        </span>
      )}
    </NavLink>
  );
};

// === Sidebar Component ===
const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, closeMobileMenu }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHoveringCollapsedLogo, setIsHoveringCollapsedLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const effectiveCollapsed = collapsed && !isMobile;

  return (
    <div
      className={`flex flex-col justify-between h-screen bg-[#F3F6F6] transition-all duration-300 border-r
        ${effectiveCollapsed ? "w-20" : "w-72"}`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4">
        {effectiveCollapsed ? (
          <button
            onClick={() => onToggle(false)}
            onMouseEnter={() => setIsHoveringCollapsedLogo(true)}
            onMouseLeave={() => setIsHoveringCollapsedLogo(false)}
            className="cursor-pointer"
          >
            <img
              src={isHoveringCollapsedLogo ? sidelogo : logo}
              alt={isHoveringCollapsedLogo ? "Open Menu" : "Logo"}
              className="h-8 w-8 object-contain"
            />
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" />
              <img src={textlogo} alt="Dashboard" className="hidden md:block" />
            </div>
            {!isMobile && (
              <button onClick={() => onToggle(true)} className="cursor-pointer">
                <img src={sidelogo} alt="Close Menu" className="h-8 w-8" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col mt-2 gap-2">
        <NavItem to="/dashboard" iconSrc={dashbord} label="Dashboard" end collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
        <NavItem to="/dashboard/call_logs" iconSrc={callLogs} label="Call Logs" collapsed={effectiveCollapsed} badge={5} closeMobileMenu={closeMobileMenu} />
        <NavItem to="/dashboard/calendar" iconSrc={calendar} label="Calendar" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
        <NavItem to="/dashboard/patients" iconSrc={patients} label="Patients" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
        <NavItem to="/dashboard/tasks" iconSrc={tasks} label="Tasks" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
        <NavItem to="/dashboard/supports" iconSrc={supports} label="Supports" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
      </nav>

      {/* Footer */}
      <div className="flex flex-col mt-auto mb-4 gap-2">
        <NavItem to="/dashboard/settings" iconSrc={settings} label="Settings" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
        <NavItem to="/" iconSrc={logout} label="Logout" collapsed={effectiveCollapsed} closeMobileMenu={closeMobileMenu} />
      </div>
    </div>
  );
};

export default Sidebar;
