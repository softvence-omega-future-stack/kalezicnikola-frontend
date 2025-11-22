import { useState } from 'react';
import chevron from '../../../assets/svgIcon/chevronnRight.svg';
import home from '../../../assets/svgIcon/homeIcon.svg';
import { ChevronDown } from 'lucide-react';
import PersonalInfoForm from './PersonalInfo';
import NotificationSettings from './Notifications';
import SecuritySetting from './SecuritySetting';
import BellingSetting from './BellingSetting';
import Checkout from './Checkout';

const tabs = [
  { label: 'Personal Info', key: 'Personal Info' },
  { label: 'Notifications', key: 'Notifications' },
  { label: 'Security', key: 'Security' },
  { label: 'Belling', key: 'Belling' },
  { label: 'Checkout', key: 'Checkout' },
];

const SettingHeader = () => {
  const [activeTab, setActiveTab] = useState<
    'Personal Info' | 'Notifications' | 'Security' | 'Belling' | 'Checkout'
  >('Personal Info');

  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  return (
    <div className="max-[767px]:mt-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <div className="flex items-center gap-1 md:gap-2 text-xs sm:text-sm text-[#667085] flex-wrap">
          <img src={home} alt="home" className="w-3 h-3 md:w-4 md:h-4" />
          <span className="truncate">Dashboard</span>
          <img src={chevron} alt="chevron" className="w-3 h-3 md:w-4 md:h-4" />
          <span className="truncate">Settings</span>
          <img src={chevron} alt="chevron" className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-[#1a1c21] font-medium truncate">{activeTab}</span>
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-headingBlack mt-4 sm:mt-6">
          Admin Settings
        </h1>
      </div>

      {/* Card */}
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-3xl mt-3 sm:mt-4 md:mt-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-headingBlack mb-4 sm:mb-6">
          Settings
        </h1>

        {/* Mobile Dropdown */}
        <div className="block sm:hidden mb-8 relative">
          <button
            onClick={() => setShowMobileDropdown(!showMobileDropdown)}
            className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-lg flex items-center justify-between text-sm font-medium"
          >
            <span>{activeTab}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showMobileDropdown ? 'rotate-180' : ''
                }`}
            />
          </button>

          {showMobileDropdown && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key as typeof activeTab);
                    setShowMobileDropdown(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${activeTab === tab.key
                      ? 'bg-[#DCE2FF] text-[#171c35] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:flex flex-wrap gap-2 mb-6 sm:mb-8 bg-[#FAFAFA] rounded-xl sm:rounded-2xl py-2 sm:py-3 px-3 sm:px-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 md:px-6 py-2 sm:py-3 text-sm md:text-base font-medium rounded-lg sm:rounded-[12px] transition-colors cursor-pointer ${activeTab === tab.key
                  ? 'bg-[#DCE2FF] text-[#171c35] shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4 sm:mt-6">
          {activeTab === 'Personal Info' && <PersonalInfoForm />}
          {activeTab === 'Notifications' && <NotificationSettings />}
          {activeTab === 'Security' && <SecuritySetting />}
          {activeTab === 'Belling' && <BellingSetting />}
          {activeTab === 'Checkout' && <Checkout />}
        </div>
      </div>
    </div>
  );
};

export default SettingHeader;
