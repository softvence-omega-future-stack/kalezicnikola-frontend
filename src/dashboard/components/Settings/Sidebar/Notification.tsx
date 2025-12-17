
import Toggle from "@/common/Toggle";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/store/features/doctorSettings/notificationSettings";
import { toast } from "react-toastify";

export const NotificationSettings: React.FC = () => {
  const { t } = useTranslation();

  // ✅ RTK Query hooks
  const { data, isLoading, isError, refetch } = useGetNotificationSettingsQuery(undefined, {
    // ✅ Refetch on mount to ensure fresh data
    refetchOnMountOrArgChange: true,


  });
  console.log(data)
  
  const [updateSettings, { isLoading: isSaving, isSuccess, isError: isSaveError }] =
    useUpdateNotificationSettingsMutation();

  // Local state for toggles
  const [settings, setSettings] = useState({
    appointmentReminders: false,
    patientUpdates: false,
    callLogs: false,
    taskDeadlines: false,
    securityAlerts: false,
    emailNotifications: false,
  });

  // ✅ Track if there are unsaved changes
  const [hasChanges, setHasChanges] = useState(false);

  // Sync API data to state
  useEffect(() => {
    if (data) {
      console.log("API data received:", data);
      setSettings(data);
      setHasChanges(false);
    }
  }, [data]);

// ✅ Show success toast
useEffect(() => {
  if (isSuccess) {
    toast.success(
      t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.messages.saveSuccess") ||
      "Settings saved successfully!"
    );
    setHasChanges(false);
  }
}, [isSuccess, t]);

// ✅ Show error toast
useEffect(() => {
  if (isSaveError) {
    toast.error(
      t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.messages.saveError") ||
      "Failed to save settings. Please try again."
    );
  }
}, [isSaveError, t]);


  type SettingKey = keyof typeof settings;

  const handleToggle = (key: SettingKey) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] };
      setHasChanges(true); // ✅ Mark as changed
      return newSettings;
    });
  };

  const handleSave = async () => {
    try {
      console.log("Saving settings:", settings);
      await updateSettings(settings).unwrap();
      // ✅ Refetch to ensure sync with backend
      await refetch();
    } catch (error) {
      console.error("Save error:", error);
      // Error message handled by useEffect above
    }
  };

  const handleCancel = () => {
    if (data) {
      setSettings(data);
      setHasChanges(false);
    }
  };

  const items: SettingKey[] = [
    "appointmentReminders",
    "patientUpdates",
    "callLogs",
    "taskDeadlines",
    "securityAlerts",
    "emailNotifications",
  ];

  // ✅ Better loading state
  if (isLoading) {
    return (
      <div className="p-6 bg-white min-h-screen rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526FFF] mx-auto mb-4"></div>
          <p className="text-[#111A2D]">Loading notification settings...</p>
        </div>
      </div>
    );
  }

  // ✅ Better error state
  if (isError) {
   console.log(isError)
    return (
      <div className="p-6 bg-white min-h-screen rounded-3xl">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load notification settings</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-[#526FFF] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen rounded-3xl">
      <h2 className="text-xl font-semibold text-headingBlack">
        {t(
          "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.title"
        )}
      </h2>
      <p className="text-sm text-[#111A2D] mb-6 pb-3">
        {t(
          "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.description"
        )}
      </p>

      {/* ✅ Unsaved changes indicator */}
      {hasChanges && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            {t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.messages.unsavedChanges") || "You have unsaved changes"}
          </p>
        </div>
      )}

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
                <h3 className="text-sm font-semibold text-headingBlack">
                  {item.label}
                </h3>
                <p className="text-sm text-[#111a2D] font-medium w-full sm:w-auto break-words">
                  {item.desc}
                </p>
              </div>

              <Toggle 
                enabled={settings[key]} 
                onToggle={() => handleToggle(key)}
                //disabled={isSaving} 
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:space-x-4 mt-6">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSaving || !hasChanges}
          className="flex-1 py-3 text-[#111A2D] border border-gray-200 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t(
            "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.buttons.cancel"
          )}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="flex-1 py-3 text-white bg-[#526FFF] rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving
            ? t("dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.buttons.saving") || "Saving..."
            : t(
                "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.buttons.saveChanges"
              )}
        </button>
      </div>
    </div>
  );
};



// import Toggle from "@/common/Toggle";
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   useGetNotificationSettingsQuery,
//   useUpdateNotificationSettingsMutation,
// } from "@/store/features/doctorSettings/notificationSettings";

// export const NotificationSettings: React.FC = () => {
//   const { t } = useTranslation();

//   // ✅ RTK Query hooks
//   const { data, isLoading, isError } = useGetNotificationSettingsQuery(undefined); // pass undefined if no argument
//   const [updateSettings, { isLoading: isSaving }] =
//     useUpdateNotificationSettingsMutation();

//   // Local state for toggles
//   const [settings, setSettings] = useState({
//     appointmentReminders: false,
//     patientUpdates: false,
//     callLogs: false,
//     taskDeadlines: false,
//     securityAlerts: false,
//     emailNotifications: false,
//   });

//   // Sync API data to state
//   useEffect(() => {
//     if (data) {
//       setSettings(data);
//     }
//   }, [data]);

//   type SettingKey = keyof typeof settings;

//   const handleToggle = (key: SettingKey) => {
//     setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleSave = async () => {
//     try {
//       await updateSettings(settings).unwrap();
//       alert("Notification settings saved successfully");
//     } catch (error) {
//       alert("Failed to save notification settings");
//       console.log(error)
//     }
//   };

//   const handleCancel = () => {
//     if (data) setSettings(data);
//   };

//   const items: SettingKey[] = [
//     "appointmentReminders",
//     "patientUpdates",
//     "callLogs",
//     "taskDeadlines",
//     "securityAlerts",
//     "emailNotifications",
//   ];

//   // Loading / error handling
//   if (isLoading) return <p>Loading notification settings...</p>;
//   if (isError) return <p>Failed to load notification settings</p>;

//   return (
//     <div className="p-6 bg-white min-h-screen rounded-3xl">
//       <h2 className="text-xl font-semibold text-headingBlack">
//         {t(
//           "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.title"
//         )}
//       </h2>
//       <p className="text-sm text-[#111A2D] mb-6 pb-3">
//         {t(
//           "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.description"
//         )}
//       </p>

//       <div className="space-y-4">
//         {items.map((key) => {
//           const item = t(
//             `dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.items.${key}`,
//             { returnObjects: true }
//           ) as { label: string; desc: string };

//           return (
//             <div
//               key={key}
//               className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-[#EAECF0] last:border-b-0"
//             >
//               <div className="flex-1 pr-0 sm:pr-4 mb-2 sm:mb-0">
//                 <h3 className="text-sm font-semibold text-headingBlack">
//                   {item.label}
//                 </h3>
//                 <p className="text-sm text-[#111a2D] font-medium w-full sm:w-auto break-words">
//                   {item.desc}
//                 </p>
//               </div>

//               <Toggle enabled={settings[key]} onToggle={() => handleToggle(key)} />
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex flex-col md:flex-row gap-3 md:space-x-4 mt-6">
//         <button
//           type="button"
//           onClick={handleCancel}
//           className="flex-1 py-3 text-[#111A2D] border border-gray-200 rounded-xl cursor-pointer"
//         >
//           {t(
//             "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.buttons.cancel"
//           )}
//         </button>
//         <button
//           type="button"
//           onClick={handleSave}
//           disabled={isSaving}
//           className="flex-1 py-3 text-white bg-[#526FFF] rounded-xl cursor-pointer disabled:opacity-50"
//         >
//           {isSaving
//             ? "Saving..."
//             : t(
//                 "dashboard.routes.settings.settingsSidebar.tabs.notificationSettings.buttons.saveChanges"
//               )}
//         </button>
//       </div>
//     </div>
//   );
// };
