import React, { useEffect, useRef } from 'react';
import { LogOut, User, MessageSquare, Headphones, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  onClick: () => void;
  isLogout?: boolean;
}

// Menu item component
const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, text, onClick, isLogout = false }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-4 p-4 rounded-lg w-full text-left transition-colors
      ${isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100'}
    `}
  >
    <Icon className="w-6 h-6" />
    <span className={`text-lg font-medium ${isLogout ? 'font-semibold' : ''}`}>{text}</span>
  </button>
);

interface UserDropdownProps {
  onClose?: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (onClose) {
          onClose();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

const handleProfileSettings = () => {
  navigate('doctor-profile'); // এখানে Doctor Profile route
  if (onClose) onClose(); // dropdown close
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
      {/* User Profile */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <img
            src="https://i.ibb.co/qwJ83Rb/Screenshot-2025-10-23-153749.png"
            alt="Keren Nix"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Keren nix</h2>
          <p className="text-md text-gray-500">Anaesthesia</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1">
        <div className="rounded-lg bg-gray-100">
       <MenuItem icon={User} text="Profile settings" onClick={handleProfileSettings} />

        </div>
        <MenuItem icon={MessageSquare} text="Chat" onClick={handleChat} />
        <MenuItem icon={Headphones} text="Support" onClick={handleSupport} />
        <MenuItem icon={Settings} text="Settings" onClick={handleSettings} />
      </nav>

      <hr className="my-4 border-1 border-gray-200" />

      {/* Log Out */}
      <MenuItem icon={LogOut} text="Log Out" onClick={handleLogout} isLogout={true} />
    </div>
  );
};

export default UserDropdown;
