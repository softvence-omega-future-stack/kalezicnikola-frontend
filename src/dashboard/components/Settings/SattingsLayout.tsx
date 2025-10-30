
import React, { useState } from "react";

import { Sidebar } from "./Sidebar/SettingSidebar";
import PersonalInfoForm from "./Sidebar/PersonalInfoForm";
import ChangePassword from "./Sidebar/ChangePassword";
import { NotificationSettings } from "./Sidebar/Notification";
import Perferences from "./Sidebar/Perferences";
import SecuritySettings from "./Sidebar/Security";
import SubscriptionOverview from "./Sidebar/Subscription/SubscriptionOverview";
import StaffManagement from "./Sidebar/MyStaf/StafMembers";
import { Outlet } from "react-router-dom";

import chevron from '../../../assets/svgIcon/chevronnRight.svg'

import home from '../../../assets/svgIcon/homeIcon.svg'



export const SettingsLayout: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Personal Info");

  return (
    <div className="min-h-screen bg-[#F3F6F6] p-4 sm:p-6 lg:p-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 gap-3 mb-4 flex items-center">
          <img src={home} alt="" />
        <a href="#" className="hover:underline">Dashboard</a>
          <img src={chevron} alt="" />
        <a href="#" className="hover:underline">Settings</a>
          <img src={chevron} alt="" />
        <span className="font-semibold text-gray-700">{activeItem}</span>
      </div>

      <h1 className="text-2xl font-semibold text-[#171C35] mb-6">Settings</h1>

      <div className="flex flex-col lg:flex-row lg:space-x-5">
        {/* Sidebar */}
        <div className="w-full lg:w-[240px] mb-6 lg:mb-0  bg-white rounded-xl  ">
             <h2 className="text-[#171C35] font-semibold text-xl pl-5">Setting</h2>
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
    

        {/* Main content */}
        <div className="flex-1 min-w-0 w-full lg:w-[856px] bg-[#F3F6F6] rounded-xl -pl-4 cursor-pointer">
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
