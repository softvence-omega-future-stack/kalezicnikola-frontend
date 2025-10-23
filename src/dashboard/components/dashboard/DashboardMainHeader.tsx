import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react'; 
import NotificationsDrawer from './Notifications';


const userData = {
  name: 'Keren nix',
  role: 'Anaesthesia',

  avatarUrl: 'https://i.ibb.co.com/qwJ83Rb/Screenshot-2025-10-23-153749.png', 
};



const MainHeader: React.FC = () => {
    const [showNotification, setShowNotification] = useState(false);
  return (
    
 
    <header className="w-full h-20 mb-2 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 lg:px-10 sticky top-0 z-30">

      {/* 1. Search Bar (Left/Center) */}
      <div className="flex items-center w-full max-w-lg bg-gray-50 rounded-lg py-3 px-4 border border-transparent focus-within:border-indigo-300 transition-colors">
        <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search something."
          className="w-full bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none text-base"
        />
      </div>

   
      <div className="flex items-center space-x-4 sm:space-x-6">
        
 
        <div className="hidden md:flex items-center text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors">
         
          <div className="w-6 h-6 mr-1">

            <img 
              src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" 
              alt="UK Flag" 
              className="rounded-full w-full h-full object-cover border border-gray-200"
            />
          </div>
          <span className="text-sm font-medium mr-1">EN</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-gray-200 hidden md:block" />

        {/* Notification Icon */}
        <button onClick={() => setShowNotification(true)} 
         className="relative p-2 text-indigo-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
          <Bell className="w-6 h-6" />
      
        </button>

        {/* User Profile */}
        <div className="flex items-center p-1 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
          <div className="flex items-center">
            {/* Avatar */}
            <img 
              src={userData.avatarUrl} 
              alt={userData.name} 
              className="h-10 w-10 rounded-full object-cover mr-3 border border-gray-200"
            />
            {/* Text details (Hidden on XS screens for space) */}
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">{userData.name}</p>
              <p className="text-xs text-gray-500 leading-none mt-1">{userData.role}</p>
            </div>
          </div>
        </div>
         {/* ✅ Notification Modal */}
      {showNotification && (
        <NotificationsDrawer onClose={() => setShowNotification(false)} />
      )}
      </div>
    </header>
  );
};

export default MainHeader;