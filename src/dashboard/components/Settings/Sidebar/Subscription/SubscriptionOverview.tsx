import { useState } from 'react';
import CurrentPaln from './CurrentPaln';
import ManageSubscription from './ManageSubscription';
import Invoices from './Invoices';


export default function SubscriptionOverview() {
  const [activeTab, setActiveTab] = useState<'current-plan' | 'manage' | 'invoices'>('current-plan');


  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <h1 className="text-lg font-semibold text-[#171c35] mb-6">Subscription Overview</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTab('current-plan')}
          className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
            activeTab === 'current-plan'
              ? 'bg-[#DCE2FF] text-[#171c35]'
              : 'bg-white text-[#111A2D] '
          }`}
        >
          Current Plan
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors  cursor-pointer ${
            activeTab === 'manage'
              ? 'bg-[#DCE2FF] text-[#171c35]'
              : 'bg-white text-[#111A2D] hover:bg-gray-50'
          }`}
        >
          Manage Subscription
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-6 py-3 text-md cursor-pointer font-normal rounded-[12px] transition-colors  ${
            activeTab === 'invoices'
              ? 'bg-[#DCE2FF] text-[#171c35]'
              : 'bg-white text-[#111A2D] hover:bg-gray-50'
          }`}
        >
          Invoices
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 cursor-pointer ">
        {activeTab === 'current-plan' && (
          <CurrentPaln/>
        )}

        {activeTab === 'manage' && <ManageSubscription />}
        {activeTab === 'invoices' && <Invoices />}
      </div>
    </div>
  );
}
