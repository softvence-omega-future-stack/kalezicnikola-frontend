import React, { useState } from 'react';
import { Home, ChevronLeft, ChevronRight,  Plus } from 'lucide-react';
import DayView from './DayView';
import CalendarWeekView from './WeekView';
import CalendarMonthView from './MonthView';
// import WeekView from './WeekView';
// import MonthView from './MonthView';

const CalendarView: React.FC = () => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('day');
  const [currentDate,] = useState(new Date(2025, 8, 29)); 

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handleViewChange = (type: 'day' | 'week' | 'month') => {
    setViewType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-4 text-sm">
          <button className="text-gray-400 hover:text-gray-600">
            <Home size={18} />
          </button>
          <span className="text-gray-400 text-xs"><ChevronRight size={12} /></span>
          <span className="text-gray-400 text-xs">Dashboard</span>
          <span className="text-gray-400 text-xs"><ChevronRight size={12}/></span>
          <span className="text-gray-900 font-medium text-xs">Calendar</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Calendar</h1>

        {/* Top Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-base font-medium text-gray-900 min-w-[140px]">{monthYear}</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* View Selector */}
          <div className="flex items-center gap-3">
            <select
              value={viewType}
              onChange={(e) => handleViewChange(e.target.value as 'day' | 'week' | 'month')}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded border border-gray-300 cursor-pointer">
              <Plus size={16} />
              Appointment
            </button>
          </div>
        </div>

        {/* View Content Change */}
        <div>
          {viewType === 'day' && <DayView />}
          {viewType === 'week' && <CalendarWeekView />}
          {viewType === 'month' && <CalendarMonthView />}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
