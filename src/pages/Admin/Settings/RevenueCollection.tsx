import React, { useState } from 'react';

interface RevenueSettings {
  retryFailedPayments: boolean;
  gracePeriod: boolean;
  proration: boolean;
}

const RevenueCollection: React.FC = () => {
  const [settings, setSettings] = useState<RevenueSettings>({
    retryFailedPayments: true,
    gracePeriod: true,
    proration: true,
  });

  const handleToggle = (field: keyof RevenueSettings) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="bg-[#FAFAFA] rounded-2xl mt-4 p-4 sm:p-6 lg:p-8">
      <div className="">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">Revenue Collection</h1>
          <p className="text-base text-[#111A2D]">Configure how payments are collected from customers</p>
        </div>

        {/* Settings Cards */}
        <div className="space-y-2">
          
          {/* Retry failed payments */}
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#171C35] mb-1">Retry failed payments</h3>
                <p className="text-base text-[#111A2D]">Automatically retry failed subscription payments</p>
              </div>
              <button
                onClick={() => handleToggle('retryFailedPayments')}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                  settings.retryFailedPayments ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.retryFailedPayments ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Grace period */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#171C35] mb-1">Grace period</h3>
                <p className="text-base text-[#111A2D]">Allow 3 days before suspending service</p>
              </div>
              <button
                onClick={() => handleToggle('gracePeriod')}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                  settings.gracePeriod ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.gracePeriod ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Proration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#171C35] mb-1">Proration</h3>
                <p className="text-base text-[#111A2D]">Prorate charges when customers upgrade/downgrade</p>
              </div>
              <button
                onClick={() => handleToggle('proration')}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                  settings.proration ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.proration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RevenueCollection;