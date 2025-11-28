import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

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

function CustomDropdown({ value, onChange, options, placeholder = "Select" }: {
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
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && createPortal(
        <div
          id="dropdown-portal"
          style={{ position: "absolute", top: `${position.top}px`, left: `${position.left}px`, width: `${position.width}px`, zIndex: 99999 }}
          className="bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                opt.value === value ? "bg-blue-50 text-[#526FFF] font-medium" : "text-[#111a2d] hover:bg-gray-100"
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

  const handleToggle = (field: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = () => {
    console.log("Saving Settings:", settings);
    setToastMessage("Settings saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const ToggleSwitch: React.FC<{ field: keyof Settings; label: string }> = ({ field, label }) => (
    <div className="flex items-center">
      <button
        onClick={() => handleToggle(field)}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors cursor-pointer ${
          settings[field] ? "bg-[#526FFF]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            settings[field] ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="ml-3 text-sm font-semibold text-[#111a2d] select-none cursor-pointer" onClick={() => handleToggle(field)}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 rounded-3xl">
      <div className="rounded-3xl p-6 md:p-8 lg:pb-10">

        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">Regional Settings</h1>
          <p className="text-sm font-medium text-gray-600">Configure time, date, and regional preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Timezone</label>
            <CustomDropdown
              value={settings.timezone}
              onChange={(val) => setSettings({ ...settings, timezone: val })}
              placeholder="Select your timezone"
              options={[
                { value: "pst", label: "Pacific Standard Time (PST) UTC-8" },
                { value: "est", label: "Eastern Standard Time (EST) UTC-5" },
                { value: "gmt", label: "Greenwich Mean Time (GMT) UTC+0" },
                { value: "bd", label: "Bangladesh Standard Time (BST) UTC+6" },
              ]}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Date Format</label>
            <CustomDropdown
              value={settings.dateFormat}
              onChange={(val) => setSettings({ ...settings, dateFormat: val })}
              placeholder="Select your date format"
              options={[
                { value: "mdy", label: "MM/DD/YYYY (US)" },
                { value: "dmy", label: "DD/MM/YYYY (EU)" },
                { value: "ymd", label: "YYYY-MM-DD (ISO)" },
              ]}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Time Format</label>
            <CustomDropdown
              value={settings.timeFormat}
              onChange={(val) => setSettings({ ...settings, timeFormat: val })}
              placeholder="Select your time format"
              options={[
                { value: "12h", label: "12 Hour (AM/PM)" },
                { value: "24h", label: "24 Hour (Military)" },
              ]}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Language</label>
            <CustomDropdown
              value={settings.language}
              onChange={(val) => setSettings({ ...settings, language: val })}
              placeholder="Select Language"
              options={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "bn", label: "বাংলা (Bengali)" },
              ]}
            />
          </div>
        </div>

        <div className="mb-8 border-t pt-6 border-gray-100">
          <h2 className="text-lg font-semibold text-[#171C35] mb-6">Calendar Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">Default Calendar View</label>
              <CustomDropdown
                value={settings.calendarView}
                onChange={(val) => setSettings({ ...settings, calendarView: val })}
                options={[
                  { value: "Day", label: "Day" },
                  { value: "Week", label: "Week" },
                  { value: "Month", label: "Month" },
                  { value: "Agenda", label: "Agenda (List)" },
                ]}
              />
            </div>

            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">Default Appointment Duration</label>
              <CustomDropdown
                value={settings.appointmentDuration}
                onChange={(val) => setSettings({ ...settings, appointmentDuration: val })}
                options={[
                  { value: "15 min..", label: "15 minutes" },
                  { value: "30 min..", label: "30 minutes (Standard)" },
                  { value: "45 min..", label: "45 minutes" },
                  { value: "60 min..", label: "60 minutes (Hourly)" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="mb-8 border-t pt-6 border-gray-100">
          <h2 className="text-lg font-semibold text-[#171C35] mb-6">Online Booking & Reminders</h2>

          <div className="space-y-4 mb-6">
            <ToggleSwitch field="allowOnlineBooking" label="Allow patients to book appointments online" />
            <ToggleSwitch field="requireApproval" label="Require manual approval for online bookings" />
            <ToggleSwitch field="sendReminders" label="Send automatic appointment reminders" />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${settings.sendReminders ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
            <div>
              <label className="block text-sm font-medium text-[#111a2d] mb-2">Reminder Time</label>
              <CustomDropdown
                value={settings.reminderTime}
                onChange={(val) => setSettings({ ...settings, reminderTime: val })}
                options={[
                  { value: "1 hour before", label: "1 hour before" },
                  { value: "4 hours before", label: "4 hours before" },
                  { value: "24 hours before", label: "24 hours before (Recommended)" },
                  { value: "48 hours before", label: "48 hours before" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111a2d] mb-2">Buffer Time Between Appointments</label>
              <CustomDropdown
                value={settings.bufferTime}
                onChange={(val) => setSettings({ ...settings, bufferTime: val })}
                options={[
                  { value: "5 minutes", label: "5 minutes" },
                  { value: "10 minutes", label: "10 minutes" },
                  { value: "15 minutes", label: "15 minutes (Standard Cleanup)" },
                  { value: "30 minutes", label: "30 minutes" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
          <button className="w-full h-12 text-base font-medium text-[#111a2d] bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>

          <button
            onClick={handleSaveChanges}
            className="w-full h-12 text-base font-medium text-white bg-[#526FFF] rounded-xl hover:bg-[#4158D9] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

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
