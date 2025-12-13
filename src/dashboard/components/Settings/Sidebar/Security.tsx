import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import tickcircl from '../../../../assets/svgIcon/checkcircle.svg';
import Toggle from "@/common/Toggle";
import { useTranslation } from "react-i18next";
import { useGetSecuritySettingsQuery, useUpdateSecuritySettingsMutation } from "@/store/features/doctorSettings/securitySettingApi";
import { toast } from "react-toastify";


interface Settings {
  passwordPolicy: boolean;
  passwordExpiry: string;
  minPasswordLength: string;
  requireUpperLower: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  loginSecurity: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: string;
  maxLoginAttempts: string;
  dataProtection: boolean;
  encryptData: boolean;
  auditLogs: boolean;
}

// CustomDropdown Component with Portal
function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled = false,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  
  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        const dropdown = document.getElementById('dropdown-portal');
        if (dropdown && !dropdown.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full px-4 py-3.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-sm text-[#111a2d] flex items-center justify-between transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
        }`}
      >
        <span className={selectedLabel ? "text-[#111a2d]" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && createPortal(
        <div
          id="dropdown-portal"
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
            zIndex: 99999,
          }}
          className="bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                opt.value === value
                  ? "bg-blue-50 text-[#526FFF] font-medium"
                  : "text-[#111a2d] hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

export default function SecuritySettings() {
  const { t } = useTranslation();

  // ✅ RTK Query hooks
  const { data, isLoading, isError, refetch } = useGetSecuritySettingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  
  const [updateSettings, { isLoading: isSaving, isSuccess, isError: isSaveError }] =
    useUpdateSecuritySettingsMutation();

  const [settings, setSettings] = useState<Settings>({
    passwordPolicy: true,
    passwordExpiry: "",
    minPasswordLength: "",
    requireUpperLower: true,
    requireNumbers: true,
    requireSpecialChars: true,
    loginSecurity: true,
    twoFactorAuth: true,
    sessionTimeout: "",
    maxLoginAttempts: "",
    dataProtection: true,
    encryptData: true,
    auditLogs: true,
  });

  // ✅ Track unsaved changes
  const [hasChanges, setHasChanges] = useState(false);

  // Sync API data to state
  useEffect(() => {
    if (data) {
      console.log("API data received:", data);
      setSettings({
        passwordPolicy: data.passwordPolicy,
        passwordExpiry: data.passwordExpiry,
        minPasswordLength: data.minPasswordLength,
        requireUpperLower: data.requireUpperLower,
        requireNumbers: data.requireNumbers,
        requireSpecialChars: data.requireSpecialChars,
        loginSecurity: data.loginSecurity,
        twoFactorAuth: data.twoFactorAuth,
        sessionTimeout: data.sessionTimeout,
        maxLoginAttempts: data.maxLoginAttempts,
        dataProtection: data.dataProtection,
        encryptData: data.encryptData,
        auditLogs: data.auditLogs,
      });
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

  const handleToggle = (field: keyof Settings) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [field]: !prev[field] };
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleInputChange = (field: keyof Settings, value: string) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [field]: value };
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Saving security settings:", settings);
      await updateSettings(settings).unwrap();
      await refetch();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleCancel = () => {
    if (data) {
      setSettings({
        passwordPolicy: data.passwordPolicy,
        passwordExpiry: data.passwordExpiry,
        minPasswordLength: data.minPasswordLength,
        requireUpperLower: data.requireUpperLower,
        requireNumbers: data.requireNumbers,
        requireSpecialChars: data.requireSpecialChars,
        loginSecurity: data.loginSecurity,
        twoFactorAuth: data.twoFactorAuth,
        sessionTimeout: data.sessionTimeout,
        maxLoginAttempts: data.maxLoginAttempts,
        dataProtection: data.dataProtection,
        encryptData: data.encryptData,
        auditLogs: data.auditLogs,
      });
      setHasChanges(false);
    }
  };

  // ✅ Reusable Toggle Row
  const ToggleRow: React.FC<{ field: keyof Settings; label: string }> = ({ field, label }) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-[#111A2D]">{label}</span>
      <Toggle 
        enabled={settings[field] as boolean} 
        onToggle={() => handleToggle(field)}
        //disabled={isSaving}
      />
    </div>
  );

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white rounded-2xl p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526FFF] mx-auto mb-4"></div>
          <p className="text-[#111A2D]">Loading security settings...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-white rounded-2xl p-6">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load security settings</p>
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
    <div className="min-h-screen">
      <div className="bg-white rounded-2xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">
            {t("dashboard.routes.settings.settingsSidebar.tabs.security.title")}
          </h1>
          <p className="text-sm font-medium text-[#111A2D]">
            {t("dashboard.routes.settings.settingsSidebar.tabs.security.description")}
          </p>
        </div>

        {/* ✅ Unsaved changes warning */}
        {hasChanges && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {t("dashboard.routes.settings.settingsSidebar.tabs.security.unsavedChanges") || "You have unsaved changes"}
            </p>
          </div>
        )}

        {/* Login Security Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171c35] mb-4">
            {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.title")}
          </h2>
          <ToggleRow
            field="loginSecurity"
            label={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.enableLoginSecurity")}
          />

          <div className="flex items-center mb-6 gap-2">
            <img src={tickcircl} alt="" />
            <span className="text-sm font-semibold text-[#111A2D]">
              {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.twoFactorAuth")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Session Timeout */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">
                {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.sessionTimeout")}
              </label>
              <CustomDropdown
                value={settings.sessionTimeout}
                onChange={(val) => handleInputChange('sessionTimeout', val)}
                options={[
                  { value: "7", label: "7 days" },
                  { value: "14", label: "14 days" },
                  { value: "21", label: "21 days" },
                ]}
                placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.sessionTimeout")}
                disabled={isSaving}
              />
            </div>

            {/* Max Login Attempts */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">
                {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.maxLoginAttempts")}
              </label>
              <input
                type="number"
                className="py-3 px-6 w-full border border-gray-300 rounded-lg disabled:opacity-50"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
                placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.maxLoginAttempts")}
                disabled={isSaving}
              />
            </div>
          </div>

          {/* Data Protection Section */}
          <div className="mb-8 col-span-1 md:col-span-2 mt-8">
            <h2 className="text-lg font-semibold text-[#171c35] mb-4">
              {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.title")}
            </h2>
            <ToggleRow
              field="dataProtection"
              label={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.enableDataProtection")}
            />

            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-2">
                <img src={tickcircl} alt="" />
                <span className="text-sm font-semibold text-[#111A2D]">
                  {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.encryptData")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img src={tickcircl} alt="" />
                <span className="text-sm font-semibold text-[#111A2D]">
                  {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.auditLogs")}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2 mt-6">
            <button 
              onClick={handleCancel}
              disabled={isSaving || !hasChanges}
              className="w-full px-6 py-3.5 text-sm font-medium text-[#111c35] bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("dashboard.routes.settings.settingsSidebar.tabs.security.buttons.cancel")}
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={isSaving || !hasChanges}
              className="w-full px-6 py-3.5 text-sm font-medium text-white bg-[#526FFF] rounded-xl hover:bg-[#4158D9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving 
                ? t("dashboard.routes.settings.settingsSidebar.tabs.security.buttons.saving") || "Saving..."
                : t("dashboard.routes.settings.settingsSidebar.tabs.security.buttons.saveChanges")
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// import { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { ChevronDown } from "lucide-react";
// import tickcircl from '../../../../assets/svgIcon/checkcircle.svg';
// import Toggle from "@/common/Toggle";
// import { useTranslation } from "react-i18next";

// interface Settings {
//   passwordPolicy: boolean;
//   passwordExpiry: string;
//   minPasswordLength: string;
//   requireUpperLower: boolean;
//   requireNumbers: boolean;
//   requireSpecialChars: boolean;
//   loginSecurity: boolean;
//   twoFactorAuth: boolean;
//   sessionTimeout: string;
//   maxLoginAttempts: string;
//   dataProtection: boolean;
//   encryptData: boolean;
//   auditLogs: boolean;
// }

// // CustomDropdown Component with Portal
// function CustomDropdown({
//   value,
//   onChange,
//   options,
//   placeholder = "Select",
// }: {
//   value: string;
//   onChange: (val: string) => void;
//   options: { value: string; label: string }[];
//   placeholder?: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const buttonRef = useRef<HTMLDivElement>(null);
//   const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  
//   const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

//   useEffect(() => {
//     if (open && buttonRef.current) {
//       const rect = buttonRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.bottom + window.scrollY + 8,
//         left: rect.left + window.scrollX,
//         width: rect.width,
//       });
//     }
//   }, [open]);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
//         const dropdown = document.getElementById('dropdown-portal');
//         if (dropdown && !dropdown.contains(e.target as Node)) {
//           setOpen(false);
//         }
//       }
//     };

//     if (open) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [open]);

//   return (
//     <>
//       <div
//         ref={buttonRef}
//         onClick={() => setOpen(!open)}
//         className="w-full px-4 py-3.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-sm text-[#111a2d] cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
//       >
//         <span className={selectedLabel ? "text-[#111a2d]" : "text-gray-400"}>
//           {selectedLabel || placeholder}
//         </span>
//         <ChevronDown
//           className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
//         />
//       </div>

//       {open && createPortal(
//         <div
//           id="dropdown-portal"
//           style={{
//             position: 'absolute',
//             top: `${position.top}px`,
//             left: `${position.left}px`,
//             width: `${position.width}px`,
//             zIndex: 99999,
//           }}
//           className="bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
//         >
//           {options.map((opt) => (
//             <div
//               key={opt.value}
//               onClick={() => {
//                 onChange(opt.value);
//                 setOpen(false);
//               }}
//               className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
//                 opt.value === value
//                   ? "bg-blue-50 text-[#526FFF] font-medium"
//                   : "text-[#111a2d] hover:bg-gray-100"
//               }`}
//             >
//               {opt.label}
//             </div>
//           ))}
//         </div>,
//         document.body
//       )}
//     </>
//   );
// }

// export default function SecuritySettings() {
//   const { t } = useTranslation();

//   const [settings, setSettings] = useState<Settings>({
//     passwordPolicy: true,
//     passwordExpiry: "",
//     minPasswordLength: "",
//     requireUpperLower: true,
//     requireNumbers: true,
//     requireSpecialChars: true,
//     loginSecurity: true,
//     twoFactorAuth: true,
//     sessionTimeout: "",
//     maxLoginAttempts: "",
//     dataProtection: true,
//     encryptData: true,
//     auditLogs: true,
//   });

//   const handleToggle = (field: keyof Settings) => {
//     setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleSaveChanges = () => {
//     console.log("Saved Security Settings:", settings);
//     alert(t("dashboard.routes.settings.settingsSidebar.tabs.security.alertSaved"));
//   };

//   // ✅ Reusable Toggle Row
//   const ToggleRow: React.FC<{ field: keyof Settings; label: string }> = ({ field, label }) => (
//     <div className="flex items-center justify-between mb-4">
//       <span className="text-sm font-semibold text-[#111A2D]">{label}</span>
//       <Toggle enabled={settings[field] as boolean} onToggle={() => handleToggle(field)} />
//     </div>
//   );

//   return (
//     <div className="min-h-screen">
//       <div className="bg-white rounded-2xl p-6 md:p-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-xl font-semibold text-[#171C35] mb-1">{t("dashboard.routes.settings.settingsSidebar.tabs.security.title")}</h1>
//           <p className="text-sm font-medium text-[#111A2D]">
//             {t("dashboard.routes.settings.settingsSidebar.tabs.security.description")}
//           </p>
//         </div>

//         {/* Login Security Section */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-[#171c35] mb-4">
//             {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.title")}
//           </h2>
//           <ToggleRow
//             field="loginSecurity"
//             label={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.enableLoginSecurity")}
//           />

//           <div className="flex items-center mb-6 gap-2">
//             <img src={tickcircl} alt="" />
//             <span className="text-sm font-semibold text-[#111A2D]">
//               {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.twoFactorAuth")}
//             </span>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Session Timeout */}
//             <div>
//               <label className="block text-base font-medium text-[#171C35] mb-2">
//                 {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.sessionTimeout")}
//               </label>
//               <CustomDropdown
//                 value={settings.sessionTimeout}
//                 onChange={(val) => setSettings({ ...settings, sessionTimeout: val })}
//                 options={[
//                   { value: "7", label: "7 days" },
//                   { value: "14", label: "14 days" },
//                   { value: "21", label: "21 days" },
//                 ]}
//                 placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.sessionTimeout")}
//               />
//             </div>

//             {/* Max Login Attempts */}
//             <div>
//               <label className="block text-base font-medium text-[#171C35] mb-2">
//                 {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.maxLoginAttempts")}
//               </label>
//               <input
//                 type="number"
//                 className="py-3 px-6 w-full border border-gray-300 rounded-lg"
//                 value={settings.maxLoginAttempts}
//                 onChange={(e) =>
//                   setSettings({ ...settings, maxLoginAttempts: e.target.value })
//                 }
//                 placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.maxLoginAttempts")}
//               />
//             </div>
//           </div>

//           {/* Data Protection Section */}
//           <div className="mb-8 col-span-1 md:col-span-2 mt-8">
//             <h2 className="text-lg font-semibold text-[#171c35] mb-4">
//               {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.title")}
//             </h2>
//             <ToggleRow
//               field="dataProtection"
//               label={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.enableDataProtection")}
//             />

//             <div className="space-y-3 mt-3">
//               <div className="flex items-center gap-2">
//                 <img src={tickcircl} alt="" />
//                 <span className="text-sm font-semibold text-[#111A2D]">
//                   {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.encryptData")}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <img src={tickcircl} alt="" />
//                 <span className="text-sm font-semibold text-[#111A2D]">
//                   {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.dataProtection.auditLogs")}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2 mt-6">
//             <button className="w-full px-6 py-3.5 text-sm font-medium text-[#111c35] bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
//               {t("dashboard.routes.settings.settingsSidebar.tabs.security.buttons.cancel")}
//             </button>
//             <button
//               onClick={handleSaveChanges}
//               className="w-full px-6 py-3.5 text-sm font-medium text-white bg-[#526FFF] rounded-xl hover:bg-[#4158D9] transition-colors"
//             >
//               {t("dashboard.routes.settings.settingsSidebar.tabs.security.buttons.saveChanges")}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
