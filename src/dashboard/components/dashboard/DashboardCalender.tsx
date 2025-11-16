import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';


import DayView from '../Calendar/DayView';
import CalendarMonthView from '../Calendar/MonthView';
import WeeklyCalendar from '../Calendar/WeekView';
import NewAppointmentModal from './NewAppointmentModal';


const DashboardCalendar: React.FC = () => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('month'); 
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 29));
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Modal state

  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handleViewChange = (type: 'day' | 'week' | 'month') => {
    setViewType(type);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 -mt-15">


      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-[#171C35]">Calendar</h1>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
          {/* Add Appointment Button */}
          <button
            onClick={() => setIsModalOpen(true)} // ✅ Open modal on click
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-[8px] border border-gray-300 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Plus size={16} />
            Appointment
          </button>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={handlePrev} className="p-1 hover:bg-gray-200 rounded">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <h2 className="text-base sm:text-lg font-medium text-[#171C35]">
            {monthYear}
          </h2>

          <button onClick={handleNext} className="p-1 hover:bg-gray-200 rounded">
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          <div className="ml-3 relative">
            <select
              value={viewType}
              onChange={(e) =>
                handleViewChange(e.target.value as 'day' | 'week' | 'month')
              }
              className="appearance-none rounded-[8px] px-3 py-1 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>

            {/* Icon on the right */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="overflow-x-auto border rounded-3xl">
        {viewType === 'day' && <DayView />}
        {viewType === 'week' && <WeeklyCalendar />}
        {viewType === 'month' && <CalendarMonthView />}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <NewAppointmentModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default DashboardCalendar;
