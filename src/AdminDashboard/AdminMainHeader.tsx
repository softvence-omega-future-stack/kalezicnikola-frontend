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



  // ✅ Check if current route is dashboard home
  // const isDashboardHome =
  //   location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
  <div className='flex flex-col w-full border-b border-gray-200'>
   <header className="w-full h-20 mb-2 flex items-center justify-between px-6 md:px-8 lg:px-10 sticky top-0 z-30">
  {/* 🔙 Back Button + Search Bar */}
  <div className="flex items-center w-full max-w-lg">
   
    {/* {!isDashboardHome && (
      <div className="flex items-center pr-3 mr-3 border-r border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#111A2D] font-semibold text-sm"
        >
          <img src={backIcon} alt="" />
          Back
        </button>
      </div>
    )} */}

  
    <div className="flex items-center gap-3 flex-1 rounded-lg py-3 px-4 border border-transparent focus-within:border-indigo-300 transition-colors">
      <img src={search} alt="" />
      <input
        type="text"
        placeholder="Search something."
        className="w-full text-gray-700 placeholder-[#111A2D] focus:outline-none text-base"
      />
    </div>
  </div>

  {/* 🔔 Notification + User */}
  <div className="flex items-center space-x-4 sm:space-x-6">
    {/* Language */}
    <div className="relative">
      <LanguageSelector />
    </div>

    {/* Notification */}
    <div className="flex items-center border-r border-gray-200 pr-3 ml-3 h-10">
      <button
        onClick={() => setShowNotification(true)}
        className="relative p-2 text-[#111A2D] transition-colors focus:outline-none"
      >
        <img src={notification} alt="" />
      </button>
    </div>

    {/* User Profile */}
    <div className="relative">
      <div
        className="flex items-center p-1 cursor-pointer rounded-full transition-colors"
        onClick={() => setShowUserDropdown(!showUserDropdown)}
      >
        <div className="flex items-center">
          <img
            src={userData.avatarUrl}
            alt={userData.name}
            className="h-10 w-10 rounded-xl object-cover mr-3"
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

     
    </div>

    {showNotification && (
      <NotificationsModal onClose={() => setShowNotification(false)} />
    )}
  </div>
</header>

  </div>
  );
};

export default AdminMainHeader;
