
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Sidebar } from "./Sidebar/SettingSidebar";
import PersonalInfoForm from "./Sidebar/PersonalInfoForm";
import ChangePassword from "./Sidebar/ChangePassword";
import { NotificationSettings } from "./Sidebar/Notification";
import Perferences from "./Sidebar/Perferences";
import SecuritySettings from "./Sidebar/Security";
import SubscriptionOverview from "./Sidebar/Subscription/SubscriptionOverview";
import StaffManagement from "./Sidebar/MyStaf/StafMembers";
import { Outlet } from "react-router-dom";


export const SettingsLayout: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Personal Info");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4 flex items-center">
        <a href="#" className="hover:underline">Dashboard</a>
        <ChevronRight size={12} className="mx-2" />
        <a href="#" className="hover:underline">Settings</a>
        <ChevronRight size={12} className="mx-2" />
        <span className="font-semibold text-gray-700">{activeItem}</span>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Sidebar */}
        <div className="w-full lg:w-[240px] mb-6 lg:mb-0">
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
    

        {/* Main content */}
        <div className="flex-1 min-w-0 w-full lg:w-[856px] bg-white shadow-2xl rounded-xl p-4 sm:p-6 lg:p-8 cursor-pointer">
          {activeItem === "Personal Info" && <PersonalInfoForm />}
          {activeItem === "My Staff" && <StaffManagement/>}
          {activeItem === "Change Password" && <ChangePassword />}
           {activeItem === "Notification" && <NotificationSettings />}

          {activeItem === "Subscription" && <SubscriptionOverview />}
          {activeItem === "Preferences" && <Perferences />}
          {activeItem === "Security" && <SecuritySettings />} 

              <Outlet/>
        </div>
      </div>
    </div>
  );
};
