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

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, end = false, collapsed, badge }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3 px-3 mx-4 rounded-[8px] transition-colors relative
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

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const totalMinutes = 1535;
  const [usedMinutes, setUsedMinutes] = useState(1035);
  const percentage = (usedMinutes / totalMinutes) * 100;

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Decide collapsed state on small devices
  const isMobile = windowWidth < 768;
  const effectiveCollapsed = collapsed || isMobile; // small devices => collapsed

  return (
    <div
      className={`relative flex flex-col justify-between h-screen border-r border-gray-200 transition-all duration-300
        ${effectiveCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Top */}
      <div>
        <div className="flex items-center justify-between md:justify-start p-4 relative">
          <div className={`flex items-center ${effectiveCollapsed ? 'gap-2' : 'gap-4'}`}>
            <img src={logo} alt="logo" />
            {!effectiveCollapsed && <img src={textlogo} alt="" className="hidden md:block" />}
          </div>

          {/* Toggle button */}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="absolute xl:right-4 right-6 cursor-pointer"
            >
              <img src={sidelogo} alt="toggle" className="h-8 w-8" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ fontFamily: 'Urbanist, sans-serif' }} className="flex flex-col mt-2 gap-2">
          <NavItem to="/dashboard" iconSrc={dashbord} label="Dashboard" end collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/call_logs" iconSrc={callLogs} label="Call Logs" collapsed={effectiveCollapsed} badge={5} />
          <NavItem to="/dashboard/calendar" iconSrc={calendar} label="Calendar" collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/patients" iconSrc={patients} label="Patients" collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/tasks" iconSrc={tasks} label="Tasks" collapsed={effectiveCollapsed} />
          <NavItem to="/dashboard/supports" iconSrc={supports} label="Supports" collapsed={effectiveCollapsed} />
        </nav>
      </div>

      {/* Bottom */}
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

            <p className="text-md font-bold text-gray-800 mb-2">{usedMinutes} Minutes Used</p>

            <div
              className="w-full bg-gray-300 rounded-full h-2 mb-3 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPercentage = (clickX / rect.width) * 100;
                const newMinutes = Math.round((newPercentage / 100) * totalMinutes);
                setUsedMinutes(newMinutes);
              }}
            >
              <div
                className="bg-[#111A2D] h-2 rounded-full transition-all duration-200"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <button className="w-full bg-[#111A2D] text-white text-sm font-semibold py-2 rounded-lg transition-colors mt-2">
              {totalMinutes - usedMinutes} Minutes left
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
