import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Phone,
  Calendar,
  Users,
  ListChecks,
  Headset,
  Settings,
  LogOut,
  AppWindow,
} from 'lucide-react';

const Logo: React.FC = () => (
  <div className="flex items-center p-4">
    <AppWindow className="text-indigo-600 h-6 w-6 mr-2" />
    <span className="text-xl font-semibold text-gray-900">Docline</span>
  </div>
);

interface NavItemProps {
  to: string; // updated
  icon: React.ElementType;
  label: string;
  badgeContent?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, badgeContent }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center py-3 px-4 mb-1 mx-2 rounded-lg transition-colors
      ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`
    }
  >
    <Icon className="h-5 w-5 mr-3" />
    <span className="flex-grow">{label}</span>
    {badgeContent !== undefined && (
      <span className="bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {badgeContent}
      </span>
    )}
  </NavLink>
);

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-white shadow-lg border-r border-gray-200">
      <Logo />

      <nav className="flex-grow mt-2">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/dashboard/call_logs" icon={Phone} label="Call Logs" badgeContent={5} />
        <NavItem to="/dashboard/calendar" icon={Calendar} label="Calendar" />
        <NavItem to="/dashboard/patients" icon={Users} label="Patients" />
        <NavItem to="/dashboard/tasks" icon={ListChecks} label="Tasks" />
        <NavItem to="/dashboard/supports" icon={Headset} label="Supports" />
      </nav>

      <div className="my-4 mx-4 border-t border-dashed border-gray-300" />

      <div className="p-4 space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700 font-medium">Upgrade to Basic</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-600">PRO</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">1035 Minutes Uses</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '67%' }} />
          </div>
          <button className="w-full bg-gray-800 text-white text-sm font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors">
            500 Minutes left
          </button>
        </div>

        <NavItem to="/dashboard/settings" icon={Settings} label="Settings" />
        <NavItem to="/" icon={LogOut} label="Logout" />
      </div>
    </div>
  );
};

export default Sidebar;
