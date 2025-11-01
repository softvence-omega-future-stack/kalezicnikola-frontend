import  { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Performances() {
  const [settings, setSettings] = useState({
    timezone: '',
    dateFormat: '',
    timeFormat: '',
    language: '',
    calendarView: 'Day',
    appointmentDuration: '30 min..',
    allowOnlineBooking: true,
    requireApproval: true,
    sendReminders: false,
    reminderTime: '24 hours before',
    bufferTime: '15 minutes'
  });

 const handleToggle = (field: keyof typeof settings) => {
  setSettings(prev => ({ ...prev, [field]: !prev[field] }));
};

  return (
    <div className="min-h-screen ">
      <div className=" bg-white rounded-[24px] p-6 md:p-8">
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
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              >
                <option value="">Select your time zone</option>
                <option value="pst">Pacific Standard Time</option>
                <option value="est">Eastern Standard Time</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Date Format */}
          <div>
            <label className="block  text-base font-medium text-[#111A2D]  mb-2">Date Format</label>
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.dateFormat}
                onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
              >
                <option value="">Select your date format</option>
                <option value="mdy">MM/DD/YYYY</option>
                <option value="dmy">DD/MM/YYYY</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Time Format */}
          <div>
            <label className="block  text-base font-medium text-[#111A2D]  mb-2">Time Format</label>
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.timeFormat}
                onChange={(e) => setSettings({...settings, timeFormat: e.target.value})}
              >
                <option value="">Select your time format</option>
                <option value="12h">12 Hour</option>
                <option value="24h">24 Hour</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block  text-base font-medium text-[#111A2D] mb-2">Language</label>
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 text-sm text-gray-500 bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171C35]  mb-6">Calendar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Calendar View */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">Default Calendar View</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-[#111a2d] bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.calendarView}
                  onChange={(e) => setSettings({...settings, calendarView: e.target.value})}
                >
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Default Appointment Duration */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">Default Appointment Duration</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-[#111a2d] bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.appointmentDuration}
                  onChange={(e) => setSettings({...settings, appointmentDuration: e.target.value})}
                >
                  <option value="15 min..">15 min..</option>
                  <option value="30 min..">30 min..</option>
                  <option value="45 min..">45 min..</option>
                  <option value="60 min..">60 min..</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#171C35] mb-6">Appointment Settings</h2>
          
          {/* Toggle Switches */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <button
                onClick={() => handleToggle('allowOnlineBooking')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowOnlineBooking ? 'bg-[#526FFF]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.allowOnlineBooking ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-semibold text-[#111a2d]">Allow online appointment booking</span>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => handleToggle('requireApproval')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.requireApproval ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.requireApproval ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-semibold text-[#111A2D]">Require approval for online bookings</span>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => handleToggle('sendReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.sendReminders ? 'bg-[#526FFF]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.sendReminders ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-semibold text-[#111a2d]">Send appointment reminders</span>
            </div>
          </div>

          {/* Reminder Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reminder Time */}
            <div>
              <label className="block text-sm font-normal text-[#111a2d] mb-2">Reminder Time</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-[#111a2d] bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.reminderTime}
                  onChange={(e) => setSettings({...settings, reminderTime: e.target.value})}
                >
                  <option value="1 hour before">1 hour before</option>
                  <option value="24 hours before">24 hours before</option>
                  <option value="48 hours before">48 hours before</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Buffer Time */}
            <div>
              <label className="block text-sm font-normal text-[#111a2d] mb-2">Buffer Time Between Appointments</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 text-sm text-[#111a2d] bg-white border border-gray-300 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={settings.bufferTime}
                  onChange={(e) => setSettings({...settings, bufferTime: e.target.value})}
                >
                  <option value="5 minutes">5 minutes</option>
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="w-full px-6 py-2.5 text-sm font-medium text-[#111a2d] bg-white border border-gray-300 rounded-[8px] focus:outline-none  transition-colors">
            Cancel
          </button>
          <button className="w-full px-6 py-2.5 text-sm font-medium text-white bg-[#526FFF] rounded-[8px] focus:outline-none  transition-colors cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}