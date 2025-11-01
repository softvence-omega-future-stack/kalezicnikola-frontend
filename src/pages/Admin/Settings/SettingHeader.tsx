import { useState } from 'react';
import chevron from '../../../assets/svgIcon/chevronnRight.svg';
import home from '../../../assets/svgIcon/homeIcon.svg';
import PersonalInfoForm from './PersonalInfo';
import { NotificationSettings } from './Notifications';
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
  const [activeTab, setActiveTab] = useState<'Personal Info' | 'Notifications' | 'Security' | 'Belling' | 'Checkout'>('Personal Info');

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4 mt-7">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src={home} alt="home" />
          <span>Dashboard</span>
          <img src={chevron} alt="chevron" />
          <span>Settings</span>
          <img src={chevron} alt="chevron" />
          <span className="text-[#1a1c21] font-medium">{activeTab}</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#1a1c21] mt-6">Admin Settings</h1>
      </div>

      {/* Card */}
      <div className="bg-white p-5 rounded-2xl mt-10">
        <h1 className="text-lg font-semibold text-[#171c35] mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-[#FAFAFA] rounded-2xl py-3 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
                activeTab === tab.key ? 'bg-[#DCE2FF] text-[#171c35]' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'Personal Info' && (
            <div>
             <PersonalInfoForm/>
            </div>
          )}
          {activeTab === 'Notifications' && (
            <div>
              <NotificationSettings/>
            </div>
          )}
          {activeTab === 'Security' && (
            <div>
              <SecuritySetting/>
            </div>
          )}
          {activeTab === 'Belling' && (
            <div>
              <BellingSetting/>
            </div>
          )}
          {activeTab === 'Checkout' && (
            <div>
              <Checkout/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingHeader;
