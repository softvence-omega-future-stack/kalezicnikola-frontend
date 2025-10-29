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

const AdminSidebar: React.FC = () => {
  return (
   <div className="flex flex-col justify-between h-screen  w-20 md:w-72 transition-all duration-300">
      {/* Top: Logo + Navigation */}
      <div>
        <Logo />

        <nav className="flex flex-col mt-2 gap-2">
          <NavItem to="/admin" iconSrc="https://i.ibb.co.com/gbTtnvQX/dashboard-icon.png" label="Dashboard" />
          <NavItem to="/admin/coustomers" iconSrc="https://i.ibb.co.com/jP0TkcFW/customer.png" label="Customers" />
          <NavItem to="/admin/billing" iconSrc="https://i.ibb.co.com/CKRJgMCm/billing.png" label="Biling & Subscription" />
          <NavItem to="/admin/aivoice" iconSrc="https://i.ibb.co.com/0RjWqXVL/AiVoice.png" label="AI Voicebot" />
          <NavItem to="/admin/system_health" iconSrc="https://i.ibb.co.com/hRznXs4V/System-Health.png" label="System Health" />
          <NavItem to="admin/security" iconSrc="https://i.ibb.co.com/hRznXs4V/System-Health.png" label="Security & Audit" />
          <NavItem to="/admin/supports" iconSrc="https://i.ibb.co.com/gbSxWDz4/Support-Icon.png" label="Supports" />
        </nav>
      </div>

      {/* Bottom: Upgrade + Settings + Logout */}
      <div className="flex flex-col p-4 space-y-4">
       

        <NavItem to="/admin/settings" iconSrc="https://i.ibb.co.com/prwFGM8n/Setting-Icon.png" label="Settings" />
        <NavItem to="/" iconSrc="https://i.ibb.co.com/YBS1JYcY/logout-Icon.png" label="Logout" />
      </div>
    </div>
  );
};

export default AdminSidebar;
