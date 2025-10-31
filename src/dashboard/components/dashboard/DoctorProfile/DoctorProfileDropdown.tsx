import React, { useEffect, useRef } from 'react';
import { LogOut,  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 🧩 Local SVG Icons
import profile from '../../../../assets/svgIcon/karen.svg';
import chat from '../../../../assets/svgIcon/chatIcon.svg';
import support from '../../../../assets/svgIcon/supports.svg';
import setting from '../../../../assets/svgIcon/settings.svg';
import user from '../../../../assets/svgIcon/user.svg';

interface MenuItemProps {
  icon?: React.ComponentType<{ className?: string }> | string; // can be component or image
  text: string;
  onClick: () => void;
  isLogout?: boolean;
}

// ✅ MenuItem Component (Handles both SVG components & Images)
const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick, isLogout = false }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-4 p-4 rounded-lg w-full text-left transition-colors
      ${isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100'}
    `}
  >
    {/* Icon handling */}
    {typeof icon === 'string' ? (
      <img src={icon} alt={text} className="w-6 h-6" />
    ) : (
      icon && React.createElement(icon, { className: 'w-6 h-6' })
    )}
    <span className={`text-lg font-medium ${isLogout ? 'font-semibold' : ''}`}>{text}</span>
  </button>
);

interface UserDropdownProps {
  onClose?: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 🔒 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (onClose) onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // 🧭 Menu handlers
  const handleProfileSettings = () => {
    navigate('doctor-profile');
    if (onClose) onClose();
  };

  const handleChat = () => {
    console.log('Go to Chat');
    if (onClose) onClose();
  };

  const handleSupport = () => {
    console.log('Go to Support');
    if (onClose) onClose();
  };

  const handleSettings = () => {
    console.log('Go to Settings');
    if (onClose) onClose();
  };

  const handleLogout = () => {
    console.log('Logging out...');
    if (onClose) onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 font-sans border border-gray-100 z-50"
    >
      {/* 🧍 User Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <img src={profile} alt="Keren Nix" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#171C35]">Keren nix</h2>
          <p className="text-md text-[#171C35]">Anaesthesia</p>
        </div>
      </div>

      {/* 📜 Menu Items */}
      <nav className="space-y-1">
        <div className="rounded-lg bg-gray-100">
          <MenuItem icon={user} text="Profile settings" onClick={handleProfileSettings} />
        </div>
        <MenuItem icon={chat} text="Chat" onClick={handleChat} />
        <MenuItem icon={support} text="Support" onClick={handleSupport} />
        <MenuItem icon={setting} text="Settings" onClick={handleSettings} />
      </nav>

      <hr className="my-4 border-gray-200" />

      {/* 🚪 Logout */}
      <MenuItem icon={LogOut} text="Log Out" onClick={handleLogout} isLogout={true} />
    </div>
  );
};

export default UserDropdown;
