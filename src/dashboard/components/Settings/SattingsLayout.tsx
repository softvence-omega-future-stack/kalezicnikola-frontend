import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar/SettingSidebar";
import PersonalInfoForm from "./Sidebar/PersonalInfoForm";
import ChangePassword from "./Sidebar/ChangePassword";
import { NotificationSettings } from "./Sidebar/Notification";
import Perferences from "./Sidebar/Perferences";
import SecuritySettings from "./Sidebar/Security";
import SubscriptionOverview from "./Sidebar/Subscription/SubscriptionOverview";
import StaffManagement from "./Sidebar/MyStaf/StafMembers";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import chevron from '../../../assets/svgIcon/chevronnRight.svg'
import home from '../../../assets/svgIcon/homeIcon.svg'
import { useTranslation } from "react-i18next";

export const SettingsLayout: React.FC = () => {
  const [activeItem, setActiveItem] = useState("personalInfo"); // key name use korbo
  const navigate = useNavigate()
  const [searchParams] = useSearchParams(); 
  const tab = searchParams.get("tab");  
  const { t } = useTranslation();

  useEffect(() => {
    if (tab) {
      setActiveItem(tab);   
    }
  }, [tab]);

  return (
    <div className="md:mt-[30px]">

      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between pb-6 md:pb-12">
        
        {/* Breadcrumb + Title */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <img src={home} alt="" className="w-4 h-4" />
            <span onClick={() => navigate('/dashboard')} className="cursor-pointer">
              {t("dashboard.routes.settings.breadcrumb.dashboard")}
            </span>
            <img src={chevron} alt="" />
            <span onClick={() => navigate('/dashboard/settings')} className="cursor-pointer">
              {t("dashboard.routes.settings.breadcrumb.settings")}
            </span>
            <img src={chevron} alt="" />

            <span className="text-[#1a1c21] text-sm font-semibold">
              {t(`dashboard.routes.settings.settingsSidebar.navItems.${activeItem}`)}
            </span>
          </div>

          <h1 className="text-xl md:text-2xl px-2 md:px-0 font-semibold text-[#1a1c21]">
            {t("dashboard.routes.settings.header.title")}
          </h1>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col gap-y-2 lg:flex-row w-full items-stretch">
        {/* Sidebar */}
        <div className="w-full lg:w-[240px] md:px-4 bg-white rounded-xl flex flex-col h-full">
          <h2 className="text-headingBlack font-semibold text-xl pl-3 leading-5 pt-6">
            {t("dashboard.routes.settings.header.title")}
          </h2>
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full bg-[#F3F6F6] mt-5 lg:mt-0 rounded-xl md:rounded-2xl md:pl-4 pb-6 h-full">
          {activeItem === "personalInfo" && <PersonalInfoForm />}
          {activeItem === "myStaff" && <StaffManagement />}
          {activeItem === "changePassword" && <ChangePassword />}
          {activeItem === "notification" && <NotificationSettings />}
          {activeItem === "subscription" && <SubscriptionOverview />}
          {activeItem === "preferences" && <Perferences />}
          {activeItem === "security" && <SecuritySettings />}
          <Outlet />
        </div>
      </div>

    </div>
  );
};
