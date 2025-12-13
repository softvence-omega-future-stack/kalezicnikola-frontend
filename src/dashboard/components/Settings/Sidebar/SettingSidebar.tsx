import React, { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const { t } = useTranslation();

  // Navigation items keys matching i18n JSON
  const navItemsKeys = [
    "personalInfo",
    "myStaff",
    "changePassword",
    "notification",
    "subscription",
    "preferences",
    "security",
  ];

  // State to control delete modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete confirm handler
  // const handleConfirmDelete = (password: string) => {
  //   console.log("Deleting account with password:", password);
  //   setIsModalOpen(false);
  //   // API call or delete logic goes here
  // };

  return (
    <div className="lg:h-[820px] bg-white rounded-xl p-3 mt-2 flex flex-col justify-between">
      {/* Navigation Items */}
      <div className="space-y-1">
        {navItemsKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveItem(key)}
            className={`block w-full p-3 text-sm font-medium rounded-lg text-left transition cursor-pointer
              ${activeItem === key
                ? "bg-[#DFE2E2] text-[#171C35]"
                : "text-[#111A2D] hover:bg-gray-100"}`}
          >
            {t(`dashboard.routes.settings.settingsSidebar.navItems.${key}`)}
          </button>
        ))}
      </div>

      {/* Delete Account Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm font-medium text-[#FF1C33] p-3 w-full text-left border-t border-gray-100 mt-2 cursor-pointer"
      >
        {t("dashboard.routes.settings.settingsSidebar.deleteAccount.button")}
      </button>

      {/* Delete Modal */}
      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
       // onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};
