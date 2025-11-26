import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import DayView from './DayView';
import CalendarWeekView from './WeekView';
import CalendarMonthView from './MonthView';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg';
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg';
import NewAppointmentModal from '../dashboard/NewAppointmentModal';
import CalendarHeader from './CalendarHeader';
import { useNavigate } from 'react-router-dom';

const CalendarView: React.FC = () => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('day');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
  ];

  const handleViewChange = (type: 'day' | 'week' | 'month') => {
    setViewType(type);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screen mt-[30px]">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <img src={homeIcon} alt="" className="w-4 h-4" />
          <img src={chevronIcon} alt="" />
          <span onClick={() => navigate('/dashboard')} className='cursor-pointer'>Dashboard</span>
          <img src={chevronIcon} alt="" />
          <span className="text-[#171C35] text-sm font-semibold">Calendar</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-3.5">
        <h1 className="text-xl md:text-xl font-semibold text-[#171C35] mb-4 sm:mb-6">Calendar</h1>

        {/* Top Controls */}
        <div className="rounded-lg pt-6 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div>
            <CalendarHeader />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">

            {/* Custom Dropdown */}
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="w-full sm:w-36 flex items-center justify-between 
                  border border-gray-300 rounded-[8px] px-4 py-2.5 
                  text-sm text-gray-700 cursor-pointer "
              >
                {options.find((item) => item.value === viewType)?.label}
                <ChevronDown className={` transition ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div
                  className="absolute mt-2 w-full sm:w-[295px] bg-white shadow-lg rounded-[8px] 
                    border border-gray-200 z-10"
                >
                  {options.map((item) => (
                    <div
                      key={item.value}
                      onClick={() => {
                        handleViewChange(item.value as 'day' | 'week' | 'month');
                        setOpen(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100
                        ${item.value === viewType ? "bg-gray-50 font-medium text-indigo-600" : "text-gray-700"}
                      `}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Appointment Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 sm:px-4 py-2.5 text-sm text-[#111A2D] 
                hover:bg-gray-50 rounded-[8px] border border-gray-300 
                w-full sm:w-auto justify-center cursor-pointer"
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
