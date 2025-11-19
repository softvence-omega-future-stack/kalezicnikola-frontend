import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/svgIcon/logo.svg';
import textlogo from '../assets/svgIcon/textLogo.svg';
import sidelogo from '../assets/svgIcon/rightside-logo.svg';

import dashbord from '../assets/svgIcon/dashboard.svg';
import callLogs from '../assets/svgIcon/callLogs.svg';
import calendar from '../assets/svgIcon/calender.svg';
import patients from '../assets/svgIcon/patients.svg';
import tasks from '../assets/svgIcon/tasks.svg';
import supports from '../assets/svgIcon/supports.svg';
import settings from '../assets/svgIcon/settings.svg';
import logout from '../assets/svgIcon/logout.svg';

interface NavItemProps {
  to: string;
  iconSrc: string;
  label: string;
  end?: boolean;
  collapsed?: boolean;
  badge?: number;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}



const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, end = false, collapsed, badge }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3 px-3 mx-4 rounded-lg transition-colors relative
          ${isActive ? 'bg-[#DFE2E2] mx-4 font-semibold' : 'text-[#111A2D] font-semibold'}
          ${collapsed ? 'justify-center' : 'justify-start'}`
      }
    >
      <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
      {!collapsed && <span className="hidden md:inline">{label}</span>}
      {badge !== undefined && badge > 0 && (
        <span className={`${collapsed ? 'absolute -top-1 right-2' : 'ml-auto'} flex items-center justify-center h-6 w-6 bg-[#526FFF] text-white text-base font-bold rounded-full`}>
          {badge}
        </span>
      )}
    </NavLink>
  );
};

const Sidebar:  React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  // const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // State added for the hover-to-transform functionality
  const [isHoveringCollapsedLogo, setIsHoveringCollapsedLogo] = useState(false);

  const subscriptionTotalMinutes = 1535;
  const [usedMinutes, setUsedMinutes] = useState(1035);
  const remainingMinutes = subscriptionTotalMinutes - usedMinutes;
  const percentage = (usedMinutes / subscriptionTotalMinutes) * 100;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const effectiveCollapsed = collapsed || isMobile;

  return (
    <div
    style={{ fontFamily: 'Urbanist, sans-serif' }}
      className={`relative flex flex-col justify-between h-screen border-r border-gray-200 transition-all duration-300
        ${effectiveCollapsed ? 'w-20' : 'w-72'}`}
    >
      <div>
        {/* === UPDATED HEADER/LOGO SECTION === */}
        <div className="flex p-4">
          
          {effectiveCollapsed ? (
            // Layout when collapsed (w-20): Logo transforms to toggle icon on hover
            <div className="flex flex-col items-center w-full">
              <button
                // Click action: Expands the sidebar
                // onClick={() => setCollapsed(false)}
                // Hover actions: Updates state to swap the image source
                 onClick={() => onToggle(false)}
                onMouseEnter={() => setIsHoveringCollapsedLogo(true)}
                onMouseLeave={() => setIsHoveringCollapsedLogo(false)}
                className="cursor-pointer"
              >
                <img
                  // Dynamically choose image source based on hover state
                  src={isHoveringCollapsedLogo ? sidelogo : logo}
                  alt={isHoveringCollapsedLogo ? "Open Menu" : "Logo"}
                  className="h-8 w-8 object-contain"
                />
              </button>
            </div>
          ) : (
            // Layout when NOT collapsed (w-72): Logo and TextLogo side-by-side with toggle button on the right
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center gap-4">
                <img src={logo} alt="logo" />
                <img src={textlogo} alt="Docline" className="hidden md:block" />
              </div>
              
              {/* Toggle Button - Click to collapse */}
              {!isMobile && (
                <button
                   onClick={() => onToggle(true)}
                  className="cursor-pointer"
                >
                  <img src={sidelogo} alt="close toggle" className="h-8 w-8" />
                </button>
              )}
            </div>
          )}
        </div>


        <nav style={{ fontFamily: 'Urbanist, sans-serif' }} className="flex flex-col mt-2 gap-2">
          <NavItem to="/dashboard" iconSrc={dashbord} label="Dashboard" end collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/call_logs" iconSrc={callLogs} label="Call Logs" collapsed={effectiveCollapsed} badge={5} />
          <NavItem to="/dashboard/calendar" iconSrc={calendar} label="Calendar" collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/patients" iconSrc={patients} label="Patients" collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/tasks" iconSrc={tasks} label="Tasks" collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/supports" iconSrc={supports} label="Supports" collapsed={effectiveCollapsed} />
        </nav>
      </div>

      <div className="flex flex-col">
        {!effectiveCollapsed && (
          <div className="hidden md:block bg-gray-200 p-4 rounded-xl m-4">
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
                setUsedMinutes(newMinutes);
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
        )}

        <div className="flex flex-col mt-auto mb-4 gap-2">
          <NavItem to="/dashboard/settings" iconSrc={settings} label="Settings" collapsed={effectiveCollapsed} />
          <NavItem to="/" iconSrc={logout} label="Logout" collapsed={effectiveCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


