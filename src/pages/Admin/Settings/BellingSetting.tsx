import React, { useState } from 'react';
import RevenueCollection from './RevenueCollection';

interface BillingSettings {
  autoGenerateInvoices: boolean;
  sendInvoiceEmails: boolean;
  supportEmail: string;
}

const BellingSetting: React.FC = () => {
  const [settings, setSettings] = useState<BillingSettings>({
    autoGenerateInvoices: false,
    sendInvoiceEmails: false,
    supportEmail: 'billing@saas.com',
  });

  const handleToggle = (field: keyof BillingSettings) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      supportEmail: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log('Saving billing settings:', settings);
    alert('Billing settings saved successfully!');
  };

  return (
    <div className="space-y-4">
      {/* Main Card */}
      <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-4 md:p-6 md:mx-0">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg sm:text-xl font-semibold text-headingBlack">
            Platform Billing Configuration
          </h1>
          <p className="text-sm sm:text-base text-subHeadingBlack">
            Manage payment gateway and billing settings
          </p>
        </div>

        <div className="space-y-6">

          {/* Payment Gateway */}
          <div>
            <h2 className="text-base font-medium text-headingBlack mb-2">
              Payment Gateway
            </h2>
            <div className="bg-white rounded-lg border border-[#E8E8E8] p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-headingBlack mb-1">
                    Stripe
                  </h3>
                  <p className="text-sm sm:text-base text-subHeadingBlack">
                    Connected and active
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="px-4 py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium text-subHeadingBlack hover:bg-gray-50">
                    Configure
                  </button>
                  <span className="px-4 sm:px-6 py-2 bg-[#526FFF1A] text-[#526FFF] rounded-full text-xs sm:text-sm font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Setting */}
          <div>
            <h2 className="text-base font-medium text-headingBlack mb-2">
              Invoice Setting
            </h2>

            <div className="bg-white rounded-lg border border-[#E8E8E8] divide-y">

              {/* Auto-generate invoices */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-headingBlack mb-1">
                    Auto-generate invoices
                  </h3>
                  <p className="text-sm sm:text-base text-subHeadingBlack">
                    Automatically create invoices for subscriptions
                  </p>
                </div>

                <button
                  onClick={() => handleToggle('autoGenerateInvoices')}
                  className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    settings.autoGenerateInvoices ? 'bg-[#526FFF]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      settings.autoGenerateInvoices ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Send invoice emails */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-headingBlack mb-1">
                    Send invoice emails
                  </h3>
                  <p className="text-sm sm:text-base text-subHeadingBlack">
                    Email invoices to customers automatically
                  </p>
                </div>

                <button
                  onClick={() => handleToggle('sendInvoiceEmails')}
                  className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    settings.sendInvoiceEmails ? 'bg-[#526FFF]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      settings.sendInvoiceEmails ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Billing Support Email */}
          <div>
            <h2 className="text-base font-medium text-headingBlack mb-2">
              Billing Support Email
            </h2>

            <input
              type="email"
              value={settings.supportEmail}
              onChange={handleEmailChange}
              placeholder="billing@saas.com"
              className="w-full px-4 py-3 bg-white border border-[#E8E8E8] rounded-lg text-sm text-gray-900 placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-subHeadingBlack">
            Email invoices to customers automatically
          </p>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="px-5 sm:px-6 py-3 bg-[#526FFF] rounded-lg text-sm sm:text-base font-semibold text-white w-full sm:w-auto cursor-pointer"
          >
            Save Billing Setting
          </button>
        </div>
      </div>

      {/* Revenue Collection Section */}
      <div>
        <RevenueCollection />
      </div>
    </div>
  );
};

export default BellingSetting;
