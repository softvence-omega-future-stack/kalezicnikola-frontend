import  { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    passwordPolicy: true,
    passwordExpiry: '',
    minPasswordLength: '',
    requireUpperLower: true,
    requireNumbers: true,
    requireSpecialChars: true,
    loginSecurity: true,
    twoFactorAuth: true,
    sessionTimeout: '',
    maxLoginAttempts: '',
    dataProtection: true,
    encryptData: true,
    auditLogs: true
  });

  const handleToggle = (field: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className=" bg-white  p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Security Settings</h1>
          <p className="text-sm text-gray-900">Configure security and privacy settings for your clinic</p>
        </div>

        {/* Password Policy Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Password Policy</h2>
            <button
              onClick={() => handleToggle('passwordPolicy')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.passwordPolicy ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.passwordPolicy ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Password Expiry */}
            <div>
              <label className="block text-lg font-normal text-gray-900 mb-2">Password Expiry</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.passwordExpiry}
                  onChange={(e) => setSettings({...settings, passwordExpiry: e.target.value})}
                >
                  <option value="">Select days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Minimum Password Length */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">Minimum Password Length</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.minPasswordLength}
                  onChange={(e) => setSettings({...settings, minPasswordLength: e.target.value})}
                >
                  <option value="">Select Minimum Password Length 8 character</option>
                  <option value="8">8 characters</option>
                  <option value="12">12 characters</option>
                  <option value="16">16 characters</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Password Requirements Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mr-2.5" />
              <span className="text-md font-semibold text-gray-900">Require uppercase & lowercase letters (Default)</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mr-2.5" />
              <span className="text-md font-semibold text-gray-900">Require numbers (Default)</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mr-2.5" />
              <span className="text-md font-semibold text-gray-900">Require special characters (Default)</span>
            </div>
          </div>
        </div>

        {/* Login Security Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Login Security</h2>
            <button
              onClick={() => handleToggle('loginSecurity')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.loginSecurity ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.loginSecurity ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center mb-6">
            <CheckCircle2 className="w-5 h-5 text-gray-900 mr-2.5" />
            <span className="text-md font-semibold text-gray-900">Enforce two-factor authentication (Default)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Session Timeout */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">Session Timeout</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                >
                  <option value="">Select Session Timeout</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Maximum Login Attempts */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">Maximum Login Attempts</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings({...settings, maxLoginAttempts: e.target.value})}
                >
                  <option value="">Select ...</option>
                  <option value="3">3 attempts</option>
                  <option value="5">5 attempts</option>
                  <option value="10">10 attempts</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Data Protection</h2>
            <button
              onClick={() => handleToggle('dataProtection')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.dataProtection ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.dataProtection ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mr-2.5" />
              <span className="text-md font-semibold text-gray-900">Encrypt sensitive data (Default)</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mr-2.5" />
              <span className="text-md font-semibold text-gray-900">Enable audit logs (Default)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="w-full px-6 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Cancel
          </button>
          <button className="w-full px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}