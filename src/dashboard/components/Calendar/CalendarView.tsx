import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import DayView from './DayView';
import CalendarWeekView from './WeekView';
import CalendarMonthView from './MonthView';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg';
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg';
import NewAppointmentModal from '../dashboard/NewAppointmentModal';


const CalendarView: React.FC = () => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('day');
  const [currentDate] = useState(new Date(2025, 8, 29));
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const handleViewChange = (type: 'day' | 'week' | 'month') => setViewType(type);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screen ">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <img src={homeIcon} alt="" />
          <img src={chevronIcon} alt="" />
          <span>Dashboard</span>
          <img src={chevronIcon} alt="" />
          <span className="text-[#171C35] font-medium">Calendar</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl font-semibold text-[#171C35] mb-4 sm:mb-6">Calendar</h1>

        {/* Top Controls */}
        <div className="rounded-lg p-4 sm:p-5 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-base sm:text-lg font-medium text-[#171C35] min-w-[140px]">{monthYear}</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <select
              value={viewType}
              onChange={(e) => handleViewChange(e.target.value as 'day' | 'week' | 'month')}
              className="border border-gray-300 rounded-xl px-3 py-1 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full sm:w-auto"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>

            <button
              onClick={() => setIsModalOpen(true)} // modal open on click
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-[8px] border border-gray-300 cursor-pointer w-full sm:w-auto justify-center"
            >
              <Plus size={16} />
              Appointment
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="overflow-x-auto rounded-3xl -mt-2">
          {viewType === 'day' && <DayView />}
          {viewType === 'week' && <CalendarWeekView />}
          {viewType === 'month' && <CalendarMonthView />}
        </div>
      </div>

      {/* Appointment Modal */}
      {isModalOpen && (
        <NewAppointmentModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CalendarView;
