import React, { useState } from 'react';

import karennix from '../assets/svgIcon/karen.svg'
import search from '../assets/svgIcon/search.svg'
import notification from '../assets/svgIcon/notification.svg'

import LanguageSelector from '@/dashboard/components/dashboard/LanguageSelector';
import NotificationsModal from '@/dashboard/components/dashboard/Notifications';

const userData = {
  name: 'Keren nix',
  role: 'Anaesthesia',
  avatarUrl: karennix,
};

const AdminMainHeader: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className='flex flex-col w-full border-b border-gray-200'>
      <header className="w-full h-16 sm:h-20 mb-2 flex items-center justify-start md:justify-between gap-2 sm:gap-4 px-3 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-30">
        {/* 🔙 Back Button + Search Bar */}
        <div className="flex items-center flex-1 min-w-0 max-w-xs sm:max-w-md md:max-w-lg">
          <div className="flex items-center gap-2 sm:gap-3 w-full rounded-lg py-2 sm:py-3 px-2 sm:px-4 border border-transparent focus-within:border-indigo-300 transition-colors">
            <img src={search} alt="" className="w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full min-w-0 text-gray-700 placeholder-[#111A2D] focus:outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* 🔔 Notification + User */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
          {/* Language */}
          <div className="relative">
            <LanguageSelector />
          </div>

          {/* Notification - Hidden on small mobile, visible on sm and up */}
          <div className="hidden sm:flex items-center border-r border-gray-200 pr-3 h-10">
            <button
              onClick={() => setShowNotification(true)}
              className="relative p-2 text-[#111A2D] transition-colors focus:outline-none"
            >
              <img src={notification} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Notification Icon for Mobile Only (visible below sm) */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowNotification(true)}
              className="relative p-1.5 text-[#111A2D] transition-colors focus:outline-none"
            >
              <img src={notification} alt="" className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="relative flex-shrink-0">
            <div
              className="flex items-center cursor-pointer rounded-full transition-colors"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={userData.avatarUrl}
                  alt={userData.name}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-cover flex-shrink-0"
                />
                <div className="hidden md:block">
                  <p className="text-base sm:text-lg font-semibold text-[#171C35] leading-none whitespace-nowrap">
                    {userData.name}
                  </p>
                  <p className="text-xs sm:text-sm text-[#171C35] leading-none mt-1 whitespace-nowrap">
                    {userData.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showNotification && (
        <NotificationsModal onClose={() => setShowNotification(false)} />
      )}
    </div>
  );
};

export default AdminMainHeader;