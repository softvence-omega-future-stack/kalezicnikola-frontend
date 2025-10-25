// Sidebar/SettingSidebar.tsx
import React from "react";

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const navItems = [
    "Personal Info",
    "My Staff",
    "Change Password",
    "Notification",
    "Subscription",
    "Preferences",
    "Security",
  ];

  return (
    <div className="min-h-screen bg-white rounded-xl shadow-lg p-3 flex flex-col justify-between">
      {/* Navigation Items */}
      <div className="space-y-1">
        {navItems.map((name) => (
          <button
            key={name}
            onClick={() => setActiveItem(name)}
            className={`block w-full p-3 text-sm font-medium rounded-lg text-left transition cursor-pointer
              ${activeItem === name
                ? "bg-gray-200 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
            `}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Delete Account */}
      <button className="text-sm font-medium text-red-500 hover:text-red-700 p-3 w-full text-left border-t border-gray-100 mt-2 cursor-pointer">
        Delete Account
      </button>
    </div>
  );
};
