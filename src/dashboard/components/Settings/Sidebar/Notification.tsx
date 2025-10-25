import React, { useState } from 'react';

// --- Notification Settings Component ---
export const NotificationSettings: React.FC = () => {
  // State with proper type
  const [settings, setSettings] = useState({
    appointmentReminders: true,
    patientUpdates: false,
    callLogs: true,
    taskDeadlines: false,
    securityAlerts: true,
    emailNotifications: true,
  });

  // Keys type based on settings
  type SettingKey = keyof typeof settings;

  const handleToggle = (key: SettingKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

//   const handleCancel = () => {
//     console.log('Canceled changes.');
//   };

//   const handleSave = () => {
//     console.log('Saved settings:', settings);
//   };

  // List of notification items
  const items: { key: SettingKey; label: string; desc: string }[] = [
    { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get notified about upcoming appointments and schedule changes.' },
    { key: 'patientUpdates', label: 'Patient Updates', desc: 'Receive notifications when new patients are added or patient information is updated.' },
    { key: 'callLogs', label: 'Call Logs', desc: 'Get notified about missed calls and new call log entries.' },
    { key: 'taskDeadlines', label: 'Task Deadlines', desc: 'Receive reminders about upcoming task deadlines and overdue tasks.' },
    { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications about your account and login activity.' },
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account.' },
  ];

  return (
    <div className="p-6 bg-white rounded-xl ">
      <h2 className="text-2xl font-semibold">Notification</h2>
      <p className="text-md text-gray-800 mb-6 border-b  pb-3">
        We may still send you important notifications about your account outside of your notification settings.
      </p>

      <div className="space-y-4">
        {items.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div className="flex-1 pr-4">
              <h3 className="text-base font-medium text-gray-900">{label}</h3>
              <p className="text-md text-gray-900 w-80">{desc}</p>
            </div>
            <button
              onClick={() => handleToggle(key)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings[key] ? 'bg-blue-600' : 'bg-gray-200'
              } relative`}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 absolute top-0.5 ${
                  settings[key] ? 'right-0.5' : 'left-0.5'
                }`}
              ></span>
            </button>
          </div>
        ))}
      </div>
 <div className="flex space-x-4 mt-6">
          <button
            type="button"
            className="flex-1 py-3 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
    </div>
  );
};
