import React, { useState } from 'react';

interface RevenueSettings {
  retryFailedPayments: boolean;
  gracePeriod: boolean;
  proration: boolean;
}

const RevenueCollection: React.FC = () => {
  const [settings, setSettings] = useState<RevenueSettings>({
    retryFailedPayments: false,
    gracePeriod: false,
    proration: false,
  });

  const handleToggle = (field: keyof RevenueSettings) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-4 md:p-6 md:mx-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl font-semibold text-headingBlack">
          Revenue Collection
        </h1>
        <p className="text-sm sm:text-base text-subHeadingBlack">
          Configure how payments are collected from customers
        </p>
      </div>

      {/* Settings List */}
      <div className="space-y-4">

        {/* Retry failed payments */}
        <div className="bg-white rounded-xl border border-[#E8E8E8] p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-sm sm:text-lg font-semibold text-headingBlack">
                Retry failed payments
              </h3>
              <p className="text-xs sm:text-base text-subHeadingBlack">
                Automatically retry failed subscription payments
              </p>
            </div>
            <button
              onClick={() => handleToggle('retryFailedPayments')}
              className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                settings.retryFailedPayments ? 'bg-[#526FFF]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform ${
                  settings.retryFailedPayments ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Grace period */}
        <div className="bg-white rounded-xl border border-[#E8E8E8] p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-sm sm:text-lg font-semibold text-headingBlack">
                Grace period
              </h3>
              <p className="text-xs sm:text-base text-subHeadingBlack">
                Allow 3 days before suspending service
              </p>
            </div>
            <button
              onClick={() => handleToggle('gracePeriod')}
              className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                settings.gracePeriod ? 'bg-[#526FFF]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform ${
                  settings.gracePeriod ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Proration */}
        <div className="bg-white rounded-xl border border-[#E8E8E8] p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-sm sm:text-lg font-semibold text-headingBlack">
                Proration
              </h3>
              <p className="text-xs sm:text-base text-subHeadingBlack">
                Prorate charges when customers upgrade/downgrade
              </p>
            </div>
            <button
              onClick={() => handleToggle('proration')}
              className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                settings.proration ? 'bg-[#526FFF]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform ${
                  settings.proration ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RevenueCollection;
