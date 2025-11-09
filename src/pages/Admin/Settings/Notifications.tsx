import React, { useState } from 'react';

// --- Notification Settings Component ---
export const NotificationSettings: React.FC = () => {
  // State with proper type
  const [settings, setSettings] = useState({
    emailNotifications: true, // 2nd - active
    callLogs: true,           // 3rd - active
    taskDeadlines: true,      // 4th - active
    securityAlerts: false,    // 5th - inactive
  });

  type SettingKey = keyof typeof settings;

  const handleToggle = (key: SettingKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // List of notification items
  const items: { key?: SettingKey; label: string; desc: string }[] = [
    { label: 'Notification Preferences', desc: 'Add an extra layer of security to your admin account.' }, // No key, not toggle-able
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account' },
    { key: 'callLogs', label: 'Security Alerts', desc: 'Get notified about security events' },
    { key: 'taskDeadlines', label: 'System Updates', desc: 'Notifications about system maintenance' },
    { key: 'securityAlerts', label: 'Marketing Emails', desc: 'Receive product updates and tips' },
  ];

  return (
    <div className="p-6 bg-[#FAFAFA] rounded-[24px] -mt-4">
      <h2 className="text-2xl font-semibold text-[#171C35] mb-4">Notification</h2>
      <div className="gap-y-2 flex flex-col">
        {items.map(({ key, label, desc }) => (
          <div key={label} className="flex items-center justify-between py-2 space-y-2">
            <div className="flex-1 pr-4 space-y-1">
              <h3 className="text-base font-semibold text-[#171C35]">{label}</h3>
              <p className="text-sm text-[#111A2D]">{desc}</p>
            </div>
            {key && (
              <button
                onClick={() => handleToggle(key)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  settings[key] ? 'bg-[#2A71FF]' : 'bg-gray-200'
                } relative`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 absolute top-0.5 ${
                    settings[key] ? 'right-0.5' : 'left-0.5'
                  }`}
                ></span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
