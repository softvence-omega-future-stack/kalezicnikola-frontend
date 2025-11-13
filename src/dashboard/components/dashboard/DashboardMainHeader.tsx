import { useState } from 'react';
import NotificationsDrawer from './Notifications';
import UserDropdown from './DoctorProfile/DoctorProfileDropdown';
import karennix from '../../../assets/svgIcon/karen.svg';
import search from '../../../assets/svgIcon/search.svg';
import notification from '../../../assets/svgIcon/notification.svg';
import LanguageSelector from './LanguageSelector';

const userData = {
  name: 'Keren nix',
  role: 'Anaesthesia',
  avatarUrl: karennix,
};

const MainHeader: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div className="flex flex-col w-full border-b border-gray-200">
      <header className="w-full h-20 mb-2 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-30 ">
        {/* Left: Search */}
        <div className="flex items-center w-full max-w-full sm:max-w-lg flex-1">
          <div className="flex items-center gap-3 flex-1 rounded-lg py-2 px-4 border border-transparent focus-within:border-indigo-300 transition-colors min-w-0">
            <img src={search} alt="Search" />
            <input
              type="text"
              placeholder="Search something."
              className="w-full min-w-0 text-gray-700 placeholder-[#111A2D] focus:outline-none text-base"
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4 ml-4 flex-shrink-0">
          {/* Language */}
          <div className="relative flex-shrink-0">
            <LanguageSelector />
          </div>

          {/* Notification */}
          <div className="flex items-center border-r border-gray-200 pr-3 h-10 flex-shrink-0">
            <button
              onClick={() => setShowNotification(true)}
              className="relative p-2 text-[#111A2D] transition-colors focus:outline-none flex-shrink-0"
            >
              <img src={notification} alt="Notification" />
            </button>
          </div>

          {/* User Profile */}
          <div className="relative flex-shrink-0">
            <div
              className="flex items-center p-1 cursor-pointer rounded-full transition-colors"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <div className="flex items-center">
                <img
                  src={userData.avatarUrl}
                  alt={userData.name}
                  className="h-10 w-10 rounded-xl object-cover mr-2 sm:mr-3"
                />
                <div className="hidden sm:block">
                  <p className="text-lg font-semibold text-[#171C35] leading-none">
                    {userData.name}
                  </p>
                  <p className="text-sm text-[#171C35] leading-none mt-1">
                    {userData.role}
                  </p>
                </div>
              </div>
            </div>
            {showUserDropdown && (
              <UserDropdown onClose={() => setShowUserDropdown(false)} />
            )}
          </div>
        </div>

        {/* Notifications Drawer */}
        {showNotification && (
          <NotificationsDrawer onClose={() => setShowNotification(false)} />
        )}
      </header>
    </div>
  );
};

export default MainHeader;
