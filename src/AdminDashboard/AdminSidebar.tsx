import React, { useState } from 'react';
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

interface LogoProps {
  collapsed: boolean;
  onToggle: (state: boolean) => void;
}


const Logo: React.FC<LogoProps> = ({ collapsed, onToggle }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      style={{ fontFamily: 'Urbanist' }}
      className={`flex items-center p-4 h-16 md:h-20 ${collapsed ? 'justify-center' : 'justify-between'}`}
    >
      {collapsed ? (
        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => onToggle(false)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="cursor-pointer p-1"
          >
            <img
              src={isHovering ? sidelogo : icon}
              alt={isHovering ? "Open Menu" : "Logo"}
              className="h-8 w-8 object-contain transition-transform duration-100"
            />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img src={icon} alt="Logo" className="h-8 w-8" />
            <img src={logo} alt="Docline" className="hidden md:block" />
          </div>

          <button
            onClick={() => onToggle(true)}
            className="cursor-pointer p-1"
          >
            <img src={sidelogo} alt="Close Menu" className="h-8 w-8" />
          </button>
        </div>
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
}

const NavItem: React.FC<NavItemProps> = ({ to, label, iconSrc, onClick, collapsed }) => {
  const showArrow = label === "Customers";

  const baseClasses = collapsed
    ? "flex items-center justify-center py-3 px-2 mb-1 mx-2 rounded-lg transition-colors text-[#111A2D] font-semibold"
    : "flex items-center gap-3 py-3 px-4 mb-1 mx-4 rounded-lg transition-colors text-[#111A2D] font-semibold";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} hover:bg-gray-100 w-auto`}
      >
        <img 
          src={iconSrc} 
          alt={label} 
          className="h-6 w-6 min-w-[24px] min-h-[24px] object-contain flex-shrink-0" 
        />
        {!collapsed && <span className="flex-1 text-left whitespace-nowrap">{label}</span>}
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
      <img 
        src={iconSrc} 
        alt={label} 
        className="h-6 w-6 min-w-[24px] min-h-[24px] object-contain flex-shrink-0" 
      />
      {!collapsed && <span className="flex-1 text-left whitespace-nowrap">{label}</span>}
      {showArrow && !collapsed && (
        <img src={chevron} alt="Arrow" className="h-4 w-4 ml-auto" />
      )}
    </NavLink>
  );
};

interface AdminSidebarProps {
  onLogoutClick: () => void;
  collapsed: boolean;
  onToggle: (state: boolean) => void; 
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogoutClick, collapsed, onToggle }) => {
  const sidebarWidth = collapsed ? 'w-[70px]' : 'w-72'; 

  return (
    <div className={`flex flex-col justify-between
        h-screen
        ${sidebarWidth} 
        
        transition-all duration-300
        flex-shrink-0
        overflow-hidden`}>
      <div>
        <Logo collapsed={collapsed} onToggle={onToggle} /> 
        <nav className="flex flex-col mt-2 gap-2">
          <NavItem to="/admin" iconSrc={dashbord} label="Dashboard" collapsed={collapsed} />
          <NavItem to="/admin/customers" iconSrc={customers} label="Customers" collapsed={collapsed} />
          <NavItem to="/admin/belling_subs" iconSrc={belling} label="Billing & Subscription" collapsed={collapsed} />
          <NavItem to="/admin/aivoice" iconSrc={voice} label="AI Voicebot" collapsed={collapsed} />
          <NavItem to="/admin/system_health" iconSrc={systemHealth} label="System Health" collapsed={collapsed} />
          <NavItem to="/admin/security" iconSrc={security} label="Security & Audit" collapsed={collapsed} />
          <NavItem to="/admin/supports" iconSrc={supports} label="Supports" collapsed={collapsed} />
        </nav>
      </div>

      <div className="flex flex-col p-4 space-y-4">
        <NavItem to="/admin/settings" iconSrc={settings} label="Settings" collapsed={collapsed} />
        <NavItem iconSrc={logout} label="Logout" onClick={onLogoutClick} collapsed={collapsed} />
      </div>
    </div>
  );
};

export default AdminSidebar;