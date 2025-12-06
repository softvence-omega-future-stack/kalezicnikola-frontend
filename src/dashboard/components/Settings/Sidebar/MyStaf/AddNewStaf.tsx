import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PersonalInfo from "./PersonalInfo";  
import EmployeeDetailsForm from "./EmployedForm";
import home from "../../../../../assets/svgIcon/homeIcon.svg";
import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";

export default function AddNewStaff() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  // Next button handler
  const handleNext = () => {
    if (activeTab === "personal") {
      setActiveTab("employment");
    } else {
      console.log("Form Data:", {
        personal: "your personal info state here",
        employment: "your employment info state here",
      });
      alert(t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.alert'));
    }
  };

  return (
    <div className="min-h-screen mt-6 ">
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-base py-6 text-gray-600 ">
          <img src={home} alt="" />
          <span onClick={()=> navigate('/dashboard')} className="cursor-pointer">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.dashboard')}
          </span>
          <img src={chevron} alt="" />
          <span onClick={()=> navigate('/dashboard/settings')} className="cursor-pointer">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.settings')}
          </span>
          <img src={chevron} alt="" />
          <span className="text-[#171c35] font-medium">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.myStaff')}
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#171c35] mb-1">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.pageTitle')}
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl p-6 md:p-8">
          <h2 className="text-[#171C35] font-medium text-lg ">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.title')}
          </h2>
          <p className="text-[#667085] text-sm font-medium mb-4 ">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.description')}
          </p>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-2 mb-8 bg-[#FAFAFA] rounded-xl py-2 px-5">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-2.5 text-base font-medium rounded-full transition-colors cursor-pointer ${
                activeTab === "personal"
                  ? "bg-[#DCE2FF] text-[#171c35]"
                  : "text-[#667085]"
              }`}
            >
              {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personal')}
            </button>
            <button
              onClick={() => setActiveTab("employment")}
              className={`px-6 py-2.5 text-md font-semibold rounded-full transition-colors cursor-pointer ${
                activeTab === "employment"
                  ? "bg-[#DCE2FF] text-[#171c35]"
                  : "text-[#667085]"
              }`}
            >
              {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employment')}
            </button>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "employment" && <EmployeeDetailsForm />}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-[#171c35] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.cancel')}
            </button>

            <button
              onClick={handleNext}
              className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-white bg-[#526FFF] rounded-xl focus:outline-none transition-colors"
            >
              {activeTab === "personal" 
                ? t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.next') 
                : t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
