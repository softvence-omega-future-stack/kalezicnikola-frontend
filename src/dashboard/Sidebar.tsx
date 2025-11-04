import React from 'react';
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

const Logo: React.FC = () => (
  <div className="flex items-center justify-between  md:justify-start gap-4 p-4 relative">
    {/* Main Logo */}
    <div className="flex items-center gap-2">
      <img src={logo} alt="logo" />
     <img src={textlogo} alt="" />
    </div>

    {/* Side Logo */}
    <div className="absolute ml-10 top-1/2 -translate-y-1/2 md:relative md:right-auto md:top-auto md:translate-y-0">
      <img src={sidelogo} alt="box" className="h-8 w-8" />
    </div>
  </div>
);

interface NavItemProps {
  to: string;
  iconSrc: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3 mx-2 md:mx-6 px-4 mb-1 rounded-[8px] transition-colors
         ${isActive ? 'bg-[#DFE2E2] font-semibold' : 'text-[#111A2D] font-semibold'}
         justify-center md:justify-start`
      }
    >
      <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-screen border-r border-gray-200 w-20 md:w-72 transition-all duration-300 ">
      {/* Top: Logo + Navigation */}
      <div>
        <Logo />
        <nav className="flex flex-col mt-2 gap-2">
          <NavItem to="/dashboard" iconSrc={dashbord} label="Dashboard" />
          <NavItem to="/dashboard/call_logs" iconSrc={callLogs} label="Call Logs" />
          <NavItem to="/dashboard/calendar" iconSrc={calendar} label="Calendar" />
          <NavItem to="/dashboard/patients" iconSrc={patients} label="Patients" />
          <NavItem to="/dashboard/tasks" iconSrc={tasks} label="Tasks" />
          <NavItem to="/dashboard/supports" iconSrc={supports} label="Supports" />
        </nav>
      </div>

      {/* Bottom: Upgrade + Settings + Logout */}
      <div className="flex flex-col p-4 space-y-4">
        <div className="hidden md:block bg-gray-200 p-4 rounded-xl">
          <div className="mb-1">
            <div className="flex justify-start gap-4 items-center">
              <span className="text-[#171C35] font-bold text-xl">Upgrade to</span>
              <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-[#111A2D] text-white">PRO</span>
            </div>
            <span className="text-3xl font-bold text-[#171C35] block mt-1">Basic</span>
          </div>
          <p className="text-md font-bold text-gray-800 mb-2">1035 Minutes Uses</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-[#111A2D] h-2 rounded-full" style={{ width: '67%' }} />
          </div>
          <button className="w-full bg-[#111A2D] text-white text-sm font-semibold py-2 rounded-lg transition-colors">
            500 Minutes left
          </button>
        </div>

        <NavItem to="/dashboard/settings" iconSrc={settings} label="Settings" />
        <NavItem to="/" iconSrc={logout} label="Logout" />
      </div>
    </div>
  );
};

export default Sidebar;
