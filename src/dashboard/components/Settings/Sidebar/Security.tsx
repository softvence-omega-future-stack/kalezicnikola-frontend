import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import tickcircl from '../../../../assets/svgIcon/checkcircle.svg';
import Toggle from "@/common/Toggle"; // ✅ import your Toggle component

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
    alert("Your changes have been saved!");
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
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">Security Settings</h1>
          <p className="text-sm font-medium text-[#111A2D]">
            Configure security and privacy settings for your clinic
          </p>
        </div>

        {/* Password Policy Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171C35] mb-4">Password Policy</h2>
          <ToggleRow field="passwordPolicy" label="Enable Password Policy" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Password Expiry */}
            <div>
              <label className="block text-base  font-medium text-[#171c35] mb-2">Password Expiry</label>
              <CustomDropdown
                value={settings.passwordExpiry}
                onChange={(val) => setSettings({ ...settings, passwordExpiry: val })}
                options={[
                  { value: "30", label: "30 days" },
                  { value: "60", label: "60 days" },
                  { value: "90", label: "90 days" },
                ]}
                placeholder="Select days"
              />
            </div>

            {/* Minimum Password Length */}
            <div>
              <label className="block text-base font-medium text-[#171c35] mb-2">
                Minimum Password Length
              </label>
              <CustomDropdown
                value={settings.minPasswordLength}
                onChange={(val) => setSettings({ ...settings, minPasswordLength: val })}
                options={[
                  { value: "8", label: "8 characters" },
                  { value: "12", label: "12 characters" },
                  { value: "16", label: "16 characters" },
                ]}
                placeholder="Select minimum password length"
              />
            </div>
          </div>

          {/* Password Requirements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={tickcircl} alt="" />
              <span className="text-sm font-semibold text-[#111A2D]">Require uppercase & lowercase letters (Default)</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={tickcircl} alt="" />
              <span className="text-sm font-semibold text-[#111A2D]">Require numbers (Default)</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={tickcircl} alt="" />
              <span className="text-sm font-semibold text-[#111A2D]">Require special characters (Default)</span>
            </div>
          </div>
        </div>

        {/* Login Security Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171c35] mb-4">Login Security</h2>
          <ToggleRow field="loginSecurity" label="Enable Login Security" />

          <div className="flex items-center mb-6 gap-2">
            <img src={tickcircl} alt="" />
            <span className="text-sm font-semibold text-[#111A2D]">Enforce two-factor authentication (Default)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Session Timeout */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">Session Timeout</label>
              <CustomDropdown
                value={settings.sessionTimeout}
                onChange={(val) => setSettings({ ...settings, sessionTimeout: val })}
                options={[
                  { value: "15", label: "15 minutes" },
                  { value: "30", label: "30 minutes" },
                  { value: "60", label: "60 minutes" },
                ]}
                placeholder="Select session timeout"
              />
            </div>

            {/* Max Login Attempts */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">Maximum Login Attempts</label>
              <CustomDropdown
                value={settings.maxLoginAttempts}
                onChange={(val) => setSettings({ ...settings, maxLoginAttempts: val })}
                options={[
                  { value: "3", label: "3 attempts" },
                  { value: "5", label: "5 attempts" },
                  { value: "10", label: "10 attempts" },
                ]}
                placeholder="Select max attempts"
              />
            </div>
          </div>
        </div>

        {/* Data Protection Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171c35] mb-4">Data Protection</h2>
          <ToggleRow field="dataProtection" label="Enable Data Protection" />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={tickcircl} alt="" />
              <span className="text-sm font-semibold text-[#111A2D]">Encrypt sensitive data (Default)</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={tickcircl} alt="" />
              <span className="text-sm font-semibold text-[#111A2D]">Enable audit logs (Default)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="w-full px-6 py-3.5 text-sm font-medium text-[#111c35] bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="w-full px-6 py-3.5 text-sm font-medium text-white bg-[#526FFF] rounded-xl hover:bg-[#4158D9] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
