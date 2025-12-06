import Toggle from "@/common/Toggle";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const NotificationSettings: React.FC = () => {
  const { t } = useTranslation();

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

  const items: SettingKey[] = [
    "appointmentReminders",
    "patientUpdates",
    "callLogs",
    "taskDeadlines",
    "securityAlerts",
    "emailNotifications",
  ];

  return (
    <div className="p-6 bg-white min-h-screen rounded-3xl">
      <h2 className="text-xl font-semibold text-[#171C35]">
        {t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.title")}
      </h2>
      <p className="text-sm text-[#111A2D] mb-6 pb-3">
        {t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.description")}
      </p>

      <div className="space-y-4">
        {items.map((key) => {
          const item = t(
            `dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.items.${key}`,
            { returnObjects: true }
          ) as { label: string; desc: string };

          return (
            <div
              key={key}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-[#EAECF0] last:border-b-0"
            >
              <div className="flex-1 pr-0 sm:pr-4 mb-2 sm:mb-0">
                <h3 className="text-sm font-semibold text-[#171C35]">{item.label}</h3>
                <p className="text-sm text-[#111a2D] font-medium w-full sm:w-auto break-words">
                  {item.desc}
                </p>
              </div>

              <Toggle enabled={settings[key]} onToggle={() => handleToggle(key)} />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:space-x-4 mt-6">
        <button
          type="button"
          className="flex-1 py-3 text-[#111A2D] border border-gray-200 rounded-xl cursor-pointer"
        >
          {t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.buttons.cancel")}
        </button>
        <button
          type="submit"
          className="flex-1 py-3 text-white bg-[#526FFF] rounded-xl cursor-pointer"
        >
          {t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.buttons.saveChanges")}
        </button>
      </div>
    </div>
  );
};
