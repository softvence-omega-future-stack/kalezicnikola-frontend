import React, { useState } from 'react';

// --- Notification Settings Component ---
const NotificationSettings: React.FC = () => {
  // State with proper type
  const [settings, setSettings] = useState({
    emailNotifications: false, // 2nd - active
    callLogs: false,           // 3rd - active
    taskDeadlines: false,      // 4th - active
    securityAlerts: false,    // 5th - inactive
  });

  type SettingKey = keyof typeof settings;

  const handleToggle = (key: SettingKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // List of notification items
  const items: { key?: SettingKey; label: string; desc: string }[] = [
    { label: 'Notification Preferences', desc: 'Add an extra layer of security to your admin account.' }, // No key
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account' },
    { key: 'callLogs', label: 'Security Alerts', desc: 'Get notified about security events' },
    { key: 'taskDeadlines', label: 'System Updates', desc: 'Notifications about system maintenance' },
    { key: 'securityAlerts', label: 'Marketing Emails', desc: 'Receive product updates and tips' },
  ];

  return (
    <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-4 md:p-6 md:mx-0">
      <h2 className="text-lg md:text-2xl font-semibold text-headingBlack mb-4">Notification</h2>

      <div className="gap-y-3 flex flex-col">
        {items.map(({ key, label, desc }) => (
          <div
            key={label}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2"
          >
            <div className="flex-1 pr-4 space-y-1 mb-2 sm:mb-0">
              <h3 className="text-base font-semibold text-headingBlack">{label}</h3>
              <p className="text-sm text-subHeadingBlack">{desc}</p>
            </div>

            {key && (
              <button
                onClick={() => handleToggle(key)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                  settings[key] ? 'bg-[#2A71FF]' : 'bg-gray-200'
                } relative self-start sm:self-auto`}
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

export default NotificationSettings;