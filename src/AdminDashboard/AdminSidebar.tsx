import React from 'react';
import { NavLink } from 'react-router-dom';


import icon from '../assets/svgIcon/logo.svg';
import logo from '../assets/svgIcon/textLogo.svg';
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
import chevron from '../assets/svgIcon/customersArow.svg';

const Logo: React.FC = () => (
  <div style={{ fontFamily: 'Urbanist' }} className="flex items-center justify-between md:justify-start xl:justify-between gap-2 p-4 h-16 md:h-20">
    <div className="flex items-center gap-2">
      <img src={icon} alt="Logo" className="h-8 w-8" />
      {/* Hide logo text on small screens */}
      <img src={logo} alt="Docline" className="hidden md:block" />
    </div>

    {/* Side logo hide on small/medium screens */}
    <div className="hidden md:block xl:block">
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

  const baseClasses =
    "flex items-center gap-3 py-3 mx-2 md:mx-4 px-2 md:px-4 mb-1 rounded-lg transition-colors justify-center md:justify-start text-[#111A2D] font-semibold";

  // Logout Button
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 py-3 px-2 md:px-4 mb-1 mx-2 md:mx-4 cursor-pointer rounded-lg hover:bg-gray-100 justify-center md:justify-start text-[#111A2D] font-semibold w-full"
      >
        <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
        <span className="hidden md:inline flex-1 text-left">{label}</span>
      </button>
    );
  }

 
  return (
    <NavLink
      to={to!}
      end
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? "bg-[#DFE2E2]" : "hover:bg-gray-100"}`
      }
    >
      <img src={iconSrc} alt={label} className="h-6 w-6 object-contain" />
      <span className="hidden md:inline flex-1 text-left">{label}</span>
      {showArrow && (
        <img src={chevron} alt="Arrow" className="hidden md:inline h-4 w-4" />
      )}
    </NavLink>
  );
};

interface AdminSidebarProps {
  onLogoutClick: () => void;
}


const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogoutClick }) => {
  return (
  
    <div className=" flex flex-col justify-between
        h-screen
        w-[70px] sm:w-[90px] md:w-72
        bg-white shadow-md
        transition-all duration-300
        flex-shrink-0
        overflow-hidden">
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