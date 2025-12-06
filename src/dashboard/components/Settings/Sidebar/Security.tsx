import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import tickcircl from '../../../../assets/svgIcon/checkcircle.svg';
import Toggle from "@/common/Toggle";
import { useTranslation } from "react-i18next";

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
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
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
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-sm text-[#111a2d] cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
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

  const handleToggle = (field: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = () => {
    console.log("Saved Security Settings:", settings);
    alert(t("dashboard.routes.settings.settingsSidebar.tabs.security.alertSaved"));
  };

  // ✅ Reusable Toggle Row
  const ToggleRow: React.FC<{ field: keyof Settings; label: string }> = ({ field, label }) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-[#111A2D]">{label}</span>
      <Toggle enabled={settings[field] as boolean} onToggle={() => handleToggle(field)} />
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-2xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">{t("dashboard.routes.settings.settingsSidebar.tabs.security.title")}</h1>
          <p className="text-sm font-medium text-[#111A2D]">
            {t("dashboard.routes.settings.settingsSidebar.tabs.security.description")}
          </p>
        </div>

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
                onChange={(val) => setSettings({ ...settings, sessionTimeout: val })}
                options={[
                  { value: "7", label: "7 days" },
                  { value: "14", label: "14 days" },
                  { value: "21", label: "21 days" },
                ]}
                placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.sessionTimeout")}
              />
            </div>

            {/* Max Login Attempts */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">
                {t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.maxLoginAttempts")}
              </label>
              <input
                type="number"
                className="py-3 px-6 w-full border border-gray-300 rounded-lg"
                value={settings.maxLoginAttempts}
                onChange={(e) =>
                  setSettings({ ...settings, maxLoginAttempts: e.target.value })
                }
                placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.security.sections.loginSecurity.maxLoginAttempts")}
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
            <button className="w-full px-6 py-3.5 text-sm font-medium text-[#111c35] bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              {t("dashboard.routes.settings.settingsSidebar.tabs.security.buttons.cancel")}
            </button>
            <button
              onClick={handleSaveChanges}
              className="w-full px-6 py-3.5 text-sm font-medium text-white bg-[#526FFF] rounded-xl hover:bg-[#4158D9] transition-colors"
            >
              {t("dashboard.routes.settings.settingsSidebar.tabs.security.buttons.saveChanges")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
