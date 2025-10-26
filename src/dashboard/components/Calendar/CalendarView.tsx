import React, { useState } from 'react';
import { Home, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import DayView from './DayView';
import CalendarWeekView from './WeekView';
import CalendarMonthView from './MonthView';

const CalendarView: React.FC = () => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('day');
  const [currentDate] = useState(new Date(2025, 8, 29));

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handleViewChange = (type: 'day' | 'week' | 'month') => setViewType(type);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Home size={18} />
          <ChevronRight size={12} />
          <span>Dashboard</span>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Calendar</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Calendar</h1>

        {/* Top Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-base sm:text-lg font-medium text-gray-900 min-w-[140px]">{monthYear}</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <select
              value={viewType}
              onChange={(e) => handleViewChange(e.target.value as 'day' | 'week' | 'month')}
              className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full sm:w-auto"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>

            <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded border border-gray-300 cursor-pointer w-full sm:w-auto justify-center">
              <Plus size={16} />
              Appointment
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="overflow-x-auto">
          {viewType === 'day' && <DayView />}
          {viewType === 'week' && <CalendarWeekView />}
          {viewType === 'month' && <CalendarMonthView />}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
