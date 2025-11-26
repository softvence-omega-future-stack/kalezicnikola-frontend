import { useState } from "react";
import CustomDropdown from "./CustomDropdown";


export default function Performances() {
  const [settings, setSettings] = useState({
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

  const handleToggle = (field: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-3xl p-6 md:p-8 lg:pb-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#171C35] mb-1">Regional Settings</h1>
          <p className="text-sm font-medium text-[#111A2D]">Configure time, date, and regional preferences</p>
        </div>

        {/* Regional Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Timezone */}
          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Timezone</label>
            <CustomDropdown
              value={settings.timezone}
              onChange={(val) => setSettings({ ...settings, timezone: val })}
              placeholder="Select your timezone"
              options={[
                { value: "pst", label: "Pacific Standard Time" },
                { value: "est", label: "Eastern Standard Time" },
              ]}
            />
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Date Format</label>
            <CustomDropdown
              value={settings.dateFormat}
              onChange={(val) => setSettings({ ...settings, dateFormat: val })}
              placeholder="Select your date format"
              options={[
                { value: "mdy", label: "MM/DD/YYYY" },
                { value: "dmy", label: "DD/MM/YYYY" },
              ]}
            />
          </div>

          {/* Time Format */}
          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Time Format</label>
            <CustomDropdown
              value={settings.timeFormat}
              onChange={(val) => setSettings({ ...settings, timeFormat: val })}
              placeholder="Select your time format"
              options={[
                { value: "12h", label: "12 Hour" },
                { value: "24h", label: "24 Hour" },
              ]}
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-base font-medium text-[#111A2D] mb-2">Language</label>
            <CustomDropdown
              value={settings.language}
              onChange={(val) => setSettings({ ...settings, language: val })}
              placeholder="Select Language"
              options={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
              ]}
            />
          </div>
        </div>

        {/* Calendar */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171C35] mb-6">Calendar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Calendar View */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">Default Calendar View</label>
              <CustomDropdown
                value={settings.calendarView}
                onChange={(val) => setSettings({ ...settings, calendarView: val })}
                options={[
                  { value: "Day", label: "Day" },
                  { value: "Week", label: "Week" },
                  { value: "Month", label: "Month" },
                ]}
              />
            </div>

            {/* Appointment Duration */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">
                Default Appointment Duration
              </label>
              <CustomDropdown
                value={settings.appointmentDuration}
                onChange={(val) => setSettings({ ...settings, appointmentDuration: val })}
                options={[
                  { value: "15 min..", label: "15 min.." },
                  { value: "30 min..", label: "30 min.." },
                  { value: "45 min..", label: "45 min.." },
                  { value: "60 min..", label: "60 min.." },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Appointment Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171C35] mb-6">Appointment Settings</h2>

          {/* Toggle Switches */}
          <div className="space-y-4 mb-6">
            {/* Allow Online Booking */}
            <div className="flex items-center">
              <button
                onClick={() => handleToggle("allowOnlineBooking")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.allowOnlineBooking ? "bg-[#526FFF]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.allowOnlineBooking ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-semibold text-[#111a2d]">
                Allow online appointment booking
              </span>
            </div>

            {/* Require Approval */}
            <div className="flex items-center">
              <button
                onClick={() => handleToggle("requireApproval")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.requireApproval ? "bg-[#526FFF]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.requireApproval ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-semibold text-[#111A2D]">
                Require approval for online bookings
              </span>
            </div>

            {/* Send Reminders */}
            <div className="flex items-center">
              <button
                onClick={() => handleToggle("sendReminders")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.sendReminders ? "bg-[#526FFF]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.sendReminders ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-semibold text-[#111a2d]">
                Send appointment reminders
              </span>
            </div>
          </div>

          {/* Reminder Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Reminder Time */}
            <div>
              <label className="block text-sm font-normal text-[#111a2d] mb-2">Reminder Time</label>
              <CustomDropdown
                value={settings.reminderTime}
                onChange={(val) => setSettings({ ...settings, reminderTime: val })}
                options={[
                  { value: "1 hour before", label: "1 hour before" },
                  { value: "24 hours before", label: "24 hours before" },
                  { value: "48 hours before", label: "48 hours before" },
                ]}
              />
            </div>

            {/* Buffer Time */}
            <div>
              <label className="block text-sm font-normal text-[#111a2d] mb-2">
                Buffer Time Between Appointments
              </label>
              <CustomDropdown
                value={settings.bufferTime}
                onChange={(val) => setSettings({ ...settings, bufferTime: val })}
                options={[
                  { value: "5 minutes", label: "5 minutes" },
                  { value: "15 minutes", label: "15 minutes" },
                  { value: "30 minutes", label: "30 minutes" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="w-full px-6 py-2.5 text-sm font-medium text-[#111a2d] bg-white border border-gray-300 rounded-xl">
            Cancel
          </button>

          <button className="w-full px-6 py-2.5 text-sm font-medium text-white bg-[#526FFF] rounded-xl">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
