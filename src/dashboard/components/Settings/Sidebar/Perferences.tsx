import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import Toggle from "@/common/Toggle";
import { useTranslation } from "react-i18next";

interface DropdownOption {
  value: string;
  label: string;
}

interface Settings {
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  language: string;
  calendarView: string;
  appointmentDuration: string;
  allowOnlineBooking: boolean;
  requireApproval: boolean;
  sendReminders: boolean;
  reminderTime: string;
  bufferTime: string;
}

type BooleanField = "allowOnlineBooking" | "requireApproval" | "sendReminders";

function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  value: string;
  onChange: (val: string) => void;
  options: DropdownOption[];
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
        const dropdown = document.getElementById("dropdown-portal");
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
        className="w-full h-12 px-4 border border-[#D0D5DD] rounded-lg text-sm text-[#111a2d] cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <span className={selectedLabel ? "text-[#111a2d]" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open &&
        createPortal(
          <div
            id="dropdown-portal"
            style={{
              position: "absolute",
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
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                  opt.value === value
                    ? "bg-blue-50 text-[#526FFF] font-medium"
                    : "text-[#111a2d] hover:bg-gray-100"
                }`}
              >
                {opt.label}
                {opt.value === value && <Check size={16} className="text-[#526FFF]" />}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default function Performances() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<Settings>({
    timezone: "",
    dateFormat: "",
    timeFormat: "",
    language: "",
    calendarView: "Day",
    appointmentDuration: "30 min..",
    allowOnlineBooking: true,
    requireApproval: true,
    sendReminders: false,
    reminderTime: "24 hours before",
    bufferTime: "15 minutes",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggle = (field: BooleanField) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = () => {
    console.log("Saving Settings:", settings);
    setToastMessage(t("dashboard.routes.settings.settingsSidebar.tabs.performances.toast.settingsSaved"));
    setTimeout(() => setToastMessage(null), 3000);
  };

  const ToggleSwitch: React.FC<{ field: BooleanField; label: string }> = ({ field, label }) => (
    <div className="flex items-center">
      <Toggle enabled={settings[field]} onToggle={() => handleToggle(field)} />
      <span
        className="ml-3 text-sm font-semibold text-[#111a2d] select-none cursor-pointer"
        onClick={() => handleToggle(field)}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 rounded-3xl">
      <div className="rounded-3xl p-6 md:p-8 lg:pb-10">
        {/* Regional Settings */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">
            {t("dashboard.routes.settings.settingsSidebar.tabs.performances.regionalSettings.title")}
          </h1>
          <p className="text-sm font-medium text-gray-600">
            {t("dashboard.routes.settings.settingsSidebar.tabs.performances.regionalSettings.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { key: "timezone", optionsKey: "timezoneOptions" },
            { key: "dateFormat", optionsKey: "dateFormatOptions" },
            { key: "timeFormat", optionsKey: "timeFormatOptions" },
            { key: "language", optionsKey: "languageOptions" },
          ].map((item) => (
            <div key={item.key}>
              <label className="block text-base font-medium text-[#111A2D] mb-2">
                {t(
                  `dashboard.routes.settings.settingsSidebar.tabs.performances.regionalSettings.${item.key}`
                )}
              </label>
              <CustomDropdown
                value={settings[item.key as keyof Settings] as string}
                onChange={(val) =>
                  setSettings({ ...settings, [item.key]: val })
                }
                placeholder={t(
                  `dashboard.routes.settings.settingsSidebar.tabs.performances.regionalSettings.${item.key}`
                )}
                options={Object.entries(
                  t(
                    `dashboard.routes.settings.settingsSidebar.tabs.performances.regionalSettings.${item.optionsKey}`,
                    { returnObjects: true }
                  )
                ).map(([value, label]) => ({ value, label }))}
              />
            </div>
          ))}
        </div>

        {/* Calendar Preferences */}
        <div className="mb-8 border-t pt-6 border-gray-100">
          <h2 className="text-lg font-semibold text-[#171C35] mb-6">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.performances.calendarPreferences.title"
            )}
          </h2>

          {[
            { key: "calendarView", optionsKey: "calendarViewOptions" },
            { key: "appointmentDuration", optionsKey: "appointmentDurationOptions" },
          ].map((item) => (
            <div className="mb-4" key={item.key}>
              <label className="block text-base font-medium text-[#171C35] mb-2">
                {t(
                  `dashboard.routes.settings.settingsSidebar.tabs.performances.calendarPreferences.${item.key}`
                )}
              </label>
              <CustomDropdown
                value={settings[item.key as keyof Settings] as string}
                onChange={(val) =>
                  setSettings({ ...settings, [item.key]: val })
                }
                options={Object.entries(
                  t(
                    `dashboard.routes.settings.settingsSidebar.tabs.performances.calendarPreferences.${item.optionsKey}`,
                    { returnObjects: true }
                  )
                ).map(([value, label]) => ({ value, label }))}
              />
            </div>
          ))}
        </div>

        {/* Online Booking & Reminders */}
        <div className="mb-8 border-t pt-6 border-gray-100">
          <h2 className="text-lg font-semibold text-[#171C35] mb-6">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.performances.onlineBookingReminders.title"
            )}
          </h2>

          <div className="space-y-4 mb-6">
            <ToggleSwitch
              field="allowOnlineBooking"
              label={t(
                "dashboard.routes.settings.settingsSidebar.tabs.performances.onlineBookingReminders.allowOnlineBooking"
              )}
            />
            <ToggleSwitch
              field="requireApproval"
              label={t(
                "dashboard.routes.settings.settingsSidebar.tabs.performances.onlineBookingReminders.requireApproval"
              )}
            />
            <ToggleSwitch
              field="sendReminders"
              label={t(
                "dashboard.routes.settings.settingsSidebar.tabs.performances.onlineBookingReminders.sendReminders"
              )}
            />
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${
              settings.sendReminders ? "opacity-100" : "opacity-50 pointer-events-none"
            }`}
          >
            {[
              { key: "reminderTime", optionsKey: "reminderTimeOptions" },
              { key: "bufferTime", optionsKey: "bufferTimeOptions" },
            ].map((item) => (
              <div key={item.key}>
                <label className="block text-sm font-medium text-[#111a2d] mb-2">
                  {t(
                    `dashboard.routes.settings.settingsSidebar.tabs.performances.onlineBookingReminders.${item.key}`
                  )}
                </label>
                <CustomDropdown
                  value={settings[item.key as keyof Settings] as string}
                  onChange={(val) =>
                    setSettings({ ...settings, [item.key]: val })
                  }
                  options={Object.entries(
                    t(
                      `dashboard.routes.settings.settingsSidebar.tabs.performances.onlineBookingReminders.${item.optionsKey}`,
                      { returnObjects: true }
                    )
                  ).map(([value, label]) => ({ value, label }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
          <button className="w-full h-12 text-base font-medium text-[#111a2d] bg-white border cursor-pointer border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.performances.buttons.cancel"
            )}
          </button>

          <button
            onClick={handleSaveChanges}
            className="w-full h-12 text-base font-medium text-white bg-[#526FFF] cursor-pointer rounded-xl hover:bg-[#4158D9] transition-colors"
          >
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.performances.buttons.saveChanges"
            )}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-[999999]">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl transition-all">
            <div className="flex items-center space-x-2">
              <Check size={20} />
              <span className="font-medium">{toastMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
