import React, { useState } from 'react';
import RevenueCollection from './RevenueCollection';

interface BillingSettings {
  autoGenerateInvoices: boolean;
  sendInvoiceEmails: boolean;
  supportEmail: string;
}

const BellingSetting: React.FC = () => {
  const [settings, setSettings] = useState<BillingSettings>({
    autoGenerateInvoices: true,
    sendInvoiceEmails: true,
    supportEmail: 'billing@saas.com',
  });

  const handleToggle = (field: keyof BillingSettings) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      supportEmail: e.target.value
    }));
  };

  const handleSave = () => {
    console.log('Saving billing settings:', settings);
    alert('Billing settings saved successfully!');
  };

  return (
   <div>
     <div className="bg-[#FAFAFA] rounded-2xl -mt-4 p-4 sm:p-6 lg:p-8">
      <div className="">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">Platform Billing Configuration</h1>
          <p className="text-base text-[#111A2D]">Manage payment gateway and billing settings</p>
        </div>

        <div className="space-y-6">
          
          {/* Payment Gateway Section */}
          <div>
            <h2 className="text-base font-medium text-[#171C35] mb-2">Payment Gateway</h2>
            <div className="bg-white rounded-lg border border-[#E8E8E8] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#171C35] mb-1">Stripe</h3>
                  <p className="text-base text-[#111A2D]">Connected and active</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2 border border-gray-200 rounded-full text-sm font-semibold text-[#111A2D] hover:bg-gray-50 transition-colors">
                    Configure
                  </button>
                  <span className="px-6 py-2 bg-[#526FFF1A] text-[#526FFF] rounded-full text-sm font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Setting Section */}
          <div>
            <h2 className="text-base font-medium text-[#171C35] mb-2">Invoice Setting</h2>
            <div className="bg-white rounded-lg border border-[#E8E8E8] ">
              
              {/* Auto-generate invoices */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#171C35] mb-1">Auto-generate invoices</h3>
                    <p className="text-base text-[#111A2D]">Automatically create invoices for subscriptions</p>
                  </div>
                  <button
                    onClick={() => handleToggle('autoGenerateInvoices')}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                      settings.autoGenerateInvoices ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        settings.autoGenerateInvoices ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Send invoice emails */}
              <div className="p-6 -mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#171C35] mb-1">Send invoice emails</h3>
                    <p className="text-base text-[#111A2D]">Email invoices to customers automatically</p>
                  </div>
                  <button
                    onClick={() => handleToggle('sendInvoiceEmails')}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                      settings.sendInvoiceEmails ? 'bg-blue-600' : 'bg-gray-300'
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
          </div>

          {/* Billing Support Email Section */}
          <div>
            <h2 className="text-base font-medium text-[#171C35] mb-2">Billing Support Email</h2>
            <div className=" ">
              <input
                type="email"
                value={settings.supportEmail}
                onChange={handleEmailChange}
                placeholder="billing@saas.com"
                className="w-full px-4 py-4 border bg-white  border-[#E8E8E8] rounded-lg text-sm text-gray-900 placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
          </div>

          {/* Email Description */}
          <p className="text-base text-[#111A2D]">Email invoices to customers automatically</p>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#526FFF] rounded-lg text-base font-semibold text-white  transition-colors"
            >
              Save Billing Setting
            </button>
          </div>

        </div>

      </div>
    </div>
    <div>
        <RevenueCollection/>
    </div>
   </div>
  );
};

export default BellingSetting;