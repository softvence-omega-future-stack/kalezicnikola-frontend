
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
    <div className="h-[820px] bg-white rounded-xl p-3 mt-2 flex flex-col justify-between">
   
      {/* Navigation Items */}
      <div className="space-y-1">
        {navItems.map((name) => (
          <button
            key={name}
            onClick={() => setActiveItem(name)}
            className={`block w-full p-3 text-sm font-medium rounded-lg text-left transition cursor-pointer
              ${activeItem === name
                ? "bg-[#DFE2E2] text-[#171C35]"
                : "text-[#111A2D] hover:bg-gray-100"}
            `}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Delete Account */}
      <button className="text-sm font-medium text-[#FF1C33]  p-3 w-full text-left border-t border-gray-100 mt-2 cursor-pointer">
        Delete Account
      </button>
    </div>
  );
};
