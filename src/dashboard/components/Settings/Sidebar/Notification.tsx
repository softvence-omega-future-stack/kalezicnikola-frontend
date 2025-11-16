import React, { useState } from 'react';


export const NotificationSettings: React.FC = () => {

  const [settings, setSettings] = useState({
    appointmentReminders: true,
    patientUpdates: false,
    callLogs: true,
    taskDeadlines: false,
    securityAlerts: true,
    emailNotifications: true,
  });

  type SettingKey = keyof typeof settings;

  const handleToggle = (key: SettingKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  const items: { key: SettingKey; label: string; desc: string }[] = [
    { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get notified about upcoming appointments and schedule changes.' },
    { key: 'patientUpdates', label: 'Patient Updates', desc: 'Receive notifications when new patients are added or patient information is updated.' },
    { key: 'callLogs', label: 'Call Logs', desc: 'Get notified about missed calls and new call log entries.' },
    { key: 'taskDeadlines', label: 'Task Deadlines', desc: 'Receive reminders about upcoming task deadlines and overdue tasks.' },
    { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications about your account and login activity.' },
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account.' },
  ];

  return (
    <div className="p-6 bg-white rounded-3xl ">
      <h2 className="text-xl font-semibold text-[#171C35">Notification</h2>
      <p className="text-sm text-[#111A2D] mb-6  pb-3">
        We may still send you important notifications about your account outside of your notification settings.
      </p>

      <div className="space-y-4">
        {items.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-[#EAECF0] last:border-b-0">
            <div className="flex-1 pr-4">
              <h3 className="text-sm font-semibold text-[#171C35]">{label}</h3>
              <p className="text-sm text-[#111a2D] font-medium w-80">{desc}</p>
            </div>
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
          </div>
        ))}
      </div>
 <div className="flex space-x-4 mt-6">
          <button
            type="button"
            className="flex-1 py-3 text-[#111A2D] border border-gray-200 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 text-white bg-[#526FFF] rounded-xl  cursor-pointer"
          >
            Save Changes
          </button>
        </div>
    </div>
  );
};
