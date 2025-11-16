
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

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
          {/* Left side - Breadcrumb & Title */}
        {/* Left side - Breadcrumb & Title */}
  <div>
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <img src={home} alt="" />
      <span>Dashboard</span>
      <img src={chevron} alt="" />
      <span>Settings</span>
      <img src={chevron} alt="" />

      {/* 👉 Dynamic Last Part */}
      <span className="text-[#1a1c21] font-medium">{activeItem}</span>
    </div>

    {/* 👉 Title (also dynamic if you want) */}
    <h1 className="text-2xl font-semibold text-[#1a1c21]">{activeItem}</h1>
  </div>

          {/* Right side - Stats */}
          {/* <div className="flex flex-wrap gap-4">
            <div className=" px-6 py-3 min-w-[120px]">
              <p className="text-sm text-[#111A2D] font-semibold mb-1">Total Staff</p>
              <p className="text-[32px] font-medium text-[#171C35]">63</p>
            </div>
            <div className=" px-6 py-3 min-w-[120px]">
              <p className="text-sm text-[#111A2D] font-semibold mb-1">Active Staff</p>
              <p className="text-[32px] font-medium text-#171C35]">54</p>
            </div>
            <div className=" px-6 py-3 min-w-[120px]">
              <p className="text-sm text-[#111A2D] font-semibold mb-1">On Leave</p>
              <p className="text-[32px] font-medium text-[#171C35]">8</p>
            </div>
            <button className="w-12 h-12 bg-[#526FFF] rounded-lg flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div> */}
        </div>

    

      <div className="flex flex-col lg:flex-row lg:space-x-5">
        {/* Sidebar */}
        <div className="w-full lg:w-[240px] mb-6 lg:mb-0  bg-white rounded-xl  ">
             <h2 className="text-[#171C35] font-semibold text-xl pl-5 pt-2">Setting</h2>
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
    

        {/* Main content */}
        <div className="flex-1  w-full  bg-[#F3F6F6] rounded-2xl -pl-4 cursor-pointer">
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
