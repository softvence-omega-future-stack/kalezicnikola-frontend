import React, { useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Local SVG Icons
import profile from '../../../../assets/svgIcon/karen.svg';
import support from '../../../../assets/svgIcon/supports.svg';
import setting from '../../../../assets/svgIcon/settings.svg';
import user from '../../../../assets/svgIcon/user.svg';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/store/features/auth/auth.slice';

interface MenuItemProps {
  icon?: React.ComponentType<{ className?: string }> | string;
  text: string;
  onClick: () => void;
  isLogout?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick, isLogout = false }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-4 p-4 rounded-lg w-full text-left transition-colors
      ${isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100'}
    `}
  >
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
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Menu handlers
  const handleProfileSettings = () => {
    navigate('doctor-profile');
    onClose?.();
  };
  const handleSupport = () => {
    navigate('/dashboard/supports');
    onClose?.();
  };
  const handleSettings = () => {
    navigate('/dashboard/settings');
    onClose?.();
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    onClose?.();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 font-sans border border-gray-100 z-50"
    >
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <img src={profile} alt={t('dashboard.mainHeader.userDropdown.name')} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#171C35]">
            {/* {t('dashboard.mainHeader.userDropdown.name')} */} Keren Nix
            </h2>
          <p className="text-md text-[#171C35]">{t('dashboard.mainHeader.userDropdown.role')}</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1">
        <div className="rounded-lg bg-gray-100">
          <MenuItem
            icon={user}
            text={t('dashboard.mainHeader.userDropdown.menu.profileSettings')}
            onClick={handleProfileSettings}
          />
        </div>
        <MenuItem
          icon={support}
          text={t('dashboard.mainHeader.userDropdown.menu.support')}
          onClick={handleSupport}
        />
        <MenuItem
          icon={setting}
          text={t('dashboard.mainHeader.userDropdown.menu.settings')}
          onClick={handleSettings}
        />
      </nav>

      <hr className="my-4 border-gray-200" />

      {/* Logout */}
      <MenuItem
        icon={LogOut}
        text={t('dashboard.mainHeader.userDropdown.menu.logout')}
        onClick={handleLogout}
        isLogout
      />
    </div>
  );
};

export default UserDropdown;
