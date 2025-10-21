import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react'; // Using lucide-react for icons

// ----------------------------------------------------------------------
// Mock data for the user and flags
const userData = {
  name: 'Keren nix',
  role: 'Anaesthesia',
  // In a real app, this would be a dynamic path or import
  avatarUrl: 'https://via.placeholder.com/150/9CA3AF/FFFFFF?text=KN', 
};

// ----------------------------------------------------------------------

const MainHeader: React.FC = () => {
  return (
    // Outer container: Full width, fixed height, white background, shadow/border at bottom
    // The height needs to accommodate the content and padding (looks about h-20 or h-24)
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

      {/* 2. Right Side Icons and User Profile */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        
        {/* Language Selector (Visible on MD screens and up) */}
        <div className="hidden md:flex items-center text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors">
          {/* Mock Flag Image - Replace with actual image component */}
          <div className="w-6 h-6 mr-1">
            {/* Using a simple div to represent the flag image's size/position */}
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
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
          <Bell className="w-6 h-6" />
          {/* Optional: Add a red dot for new notifications */}
          {/* <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" /> */}
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
      </div>
    </header>
  );
};

export default MainHeader;