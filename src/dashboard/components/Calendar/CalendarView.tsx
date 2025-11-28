import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { createPortal } from 'react-dom';
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const options = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
  ];

  const handleViewChange = (type: 'day' | 'week' | 'month') => {
    setViewType(type);
  };

  // Update dropdown position when opened
  useEffect(() => {
    if (open && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        const dropdown = document.getElementById('calendar-view-dropdown-portal');
        if (dropdown && !dropdown.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

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
            <div className="relative w-full sm:w-auto">
              <button
                ref={dropdownRef}
                onClick={() => setOpen(!open)}
                className="w-full sm:w-36 flex items-center justify-between 
                  border border-gray-300 rounded-[8px] px-4 py-2.5 
                  text-sm text-gray-700 cursor-pointer"
              >
                {options.find((item) => item.value === viewType)?.label}
                <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
              </button>
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

      {/* Dropdown Portal */}
      {open && createPortal(
        <div
          id="calendar-view-dropdown-portal"
          style={{
            position: 'absolute',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            minWidth: '295px',
            zIndex: 99999,
          }}
          className="bg-white shadow-lg rounded-[8px] border border-gray-200 overflow-hidden"
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
        </div>,
        document.body
      )}

      {/* Appointment Modal */}
      {isModalOpen && (
        <NewAppointmentModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CalendarView;