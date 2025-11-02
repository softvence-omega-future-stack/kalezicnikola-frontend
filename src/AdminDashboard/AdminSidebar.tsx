import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/svgIcon/logo.svg';
import sidelogo from '../assets/svgIcon/rightside-logo.svg';
import dashbord from '../assets/svgIcon/dashboard.svg';
import customers from '../assets/svgIcon/user.svg';
import voice from '../assets/svgIcon/callLogs.svg';
import belling from '../assets/svgIcon/belling.svg';
import supports from '../assets/svgIcon/supports.svg';
import settings from '../assets/svgIcon/settings.svg';
import logout from '../assets/svgIcon/logout.svg';
import systemHealth from '../assets/svgIcon/systemHealth.svg';
import security from '../assets/svgIcon/securityAudit.svg';
import chevron from '../assets/svgIcon/customersArow.svg'; // Arrow icon

const Logo: React.FC = () => (
  <div className="flex items-center justify-between md:justify-start gap-4 p-4 relative">
    <div className="flex items-center gap-2">
      <img src={logo} className="h-7 w-7" alt="logo" />
      <span className="hidden md:inline text-3xl font-semibold text-[#171C35]">Docline</span>
    </div>

    <div className="absolute pl-8 top-1/2 -translate-y-1/2 md:relative md:right-auto md:top-auto md:translate-y-0">
      <img src={sidelogo} alt="box" className="h-8 w-8" />
    </div>
  </div>
);

interface NavItemProps {
  to?: string;
  iconSrc: string;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, onClick }) => {
  const showArrow = label === "Customers";

if (onClick) {
  // If onClick exists, render a button instead of NavLink
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 py-3 px-4 mb-1 mx-2 md:mx-6 cursor-pointer rounded-lg hover:bg-gray-100 justify-center md:justify-start text-[#111A2D] font-semibold"
    >
      <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
      <span className="">{label}</span>
    </button>
  );
}


  return (
    <NavLink
      to={to!}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3 mx-2 md:mx-6 px-4 mb-1 rounded-lg transition-colors
        ${isActive ? 'bg-[#DFE2E2] text-[#111A2D] font-semibold ' : 'text-[#111A2D] font-semibold'}
        justify-center md:justify-start`
      }
    >
      <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
      <span className="hidden md:inline flex-1">{label}</span>
      {showArrow && <img src={chevron} alt="Arrow" className="hidden md:inline h-4 w-4" />}
    </NavLink>
  );
};

interface AdminSidebarProps {
  onLogoutClick: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogoutClick }) => {
  return (
    <div className="flex flex-col justify-between h-screen w-20 md:w-72 transition-all duration-300 bg-white shadow-md">
      <div>
        <Logo />
        <nav className="flex flex-col mt-2 gap-2">
          <NavItem to="/admin" iconSrc={dashbord} label="Dashboard" />
          <NavItem to="/admin/customers" iconSrc={customers} label="Customers" />
          <NavItem to="/admin/belling_subs" iconSrc={belling} label="Billing & Subscription" />
          <NavItem to="/admin/aivoice" iconSrc={voice} label="AI Voicebot" />
          <NavItem to="/admin/system_health" iconSrc={systemHealth} label="System Health" />
          <NavItem to="/admin/security" iconSrc={security} label="Security & Audit" />
          <NavItem to="/admin/supports" iconSrc={supports} label="Supports" />
        </nav>
      </div>

    <div className="flex flex-col p-4 space-y-4">
  <NavItem to="/admin/settings" iconSrc={settings} label="Settings" />
  <NavItem iconSrc={logout} label="Logout" onClick={onLogoutClick} />
</div>

    </div>
  );
};

export default AdminSidebar;
