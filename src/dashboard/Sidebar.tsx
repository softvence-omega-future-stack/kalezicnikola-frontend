import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo: React.FC = () => (
  <div className="flex items-center justify-between  md:justify-start gap-4 p-4">
  <div className='flex items-center gap-2'>
      <img
      src="https://i.ibb.co.com/0yzBCxRm/logo.png"
      className="h-7 w-7"
      alt="logo"
    />
    <span className="hidden md:inline text-3xl font-semibold text-[#171C35]">Docline</span>
  </div>
    <div>
      <div className="relative w-8 h-8 flex items-center ml-20">
      <img src="https://i.ibb.co.com/Kjmmzw43/Vector-3.png" alt="box" />
      <img src="https://i.ibb.co.com/H8G449X/Vector-2.png" alt="inner icon" className="absolute" />
    </div>
    </div>
  </div>
);

interface NavItemProps {
  to: string;
  iconSrc: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc }) => {
  const isGray = label === "Tasks" || label === "Supports";
  const isDashboard = to === "/dashboard";

  return (
    <NavLink
      to={to}
      end={isDashboard}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3 mx-6 px-4 mb-1 rounded-lg transition-colors 
         ${isActive ? 'bg-[#DFE2E2] ' : isGray ? 'text-[#667085]' : 'text-[#111A2D] font-semibold'} justify-center md:justify-start`
      }
    >
      <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
   <div className="flex flex-col justify-between h-screen  w-20 md:w-72 transition-all duration-300">
      {/* Top: Logo + Navigation */}
      <div>
        <Logo />

        <nav className="flex flex-col mt-2 gap-2">
          <NavItem to="/dashboard" iconSrc="https://i.ibb.co.com/gbTtnvQX/dashboard-icon.png" label="Dashboard" />
          <NavItem to="/dashboard/call_logs" iconSrc="https://i.ibb.co.com/LzJb92yd/callogs-Icon.png" label="Call Logs" />
          <NavItem to="/dashboard/calendar" iconSrc="https://i.ibb.co.com/jvwLXHjj/calendar-Icon.png" label="Calendar" />
          <NavItem to="/dashboard/patients" iconSrc="https://i.ibb.co.com/qLJhx3J8/patients-Icon.png" label="Patients" />
          <NavItem to="/dashboard/tasks" iconSrc="https://i.ibb.co.com/0jF0Kf8M/Tasks-Icon.png" label="Tasks" />
          <NavItem to="/dashboard/supports" iconSrc="https://i.ibb.co.com/gbSxWDz4/Support-Icon.png" label="Supports" />
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

        <NavItem to="/dashboard/settings" iconSrc="https://i.ibb.co.com/prwFGM8n/Setting-Icon.png" label="Settings" />
        <NavItem to="/" iconSrc="https://i.ibb.co.com/YBS1JYcY/logout-Icon.png" label="Logout" />
      </div>
    </div>
  );
};

export default Sidebar;
