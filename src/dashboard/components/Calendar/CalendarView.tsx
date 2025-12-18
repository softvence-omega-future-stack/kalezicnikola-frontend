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
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAppSelector } from '@/store/hook';
import { toast } from 'react-toastify';

export interface Appointment {
  id: string;
  patientId: string;
  insuranceId: string;
  doctorId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string | null;
  gender: string | null;
  bloodGroup: string | null;
  scheduleSlotId: string;
  appointmentDate: string;
  appointmentDetails: string;
  address: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  scheduleSlot: {
    id: string;
    startTime: string; // "09:00"
    endTime: string;   // "10:00"
  };
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    insuranceId: string;
    gender: string | null;
    dob: string | null;
  };
}

const CalendarView: React.FC = () => {
  const { t } = useTranslation();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('day');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  if (params.get("openModal") === "true") {
    setIsModalOpen(true);
  }
}, [location]);


  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const options = [
    { label: t('dashboard.routes.calendar.views.day'), value: 'day' },
    { label: t('dashboard.routes.calendar.views.week'), value: 'week' },
    { label: t('dashboard.routes.calendar.views.month'), value: 'month' },
  ];

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointment/all`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              });
          setAppointments(res.data.data.appointments);
        } catch (error:any) {
          toast.error(error.response?.data?.message );
        }
      };

      fetchAppointments();
    }, [accessToken]);

    const normalizeAppointments = appointments.map(a => ({
      ...a,
      date: new Date(a.appointmentDate)
    }));

    // Filter appointments by day
    const filterByDay = (selectedDate: Date) => {
      return normalizeAppointments.filter(a =>
        a.date.toDateString() === selectedDate.toDateString()
      );
    };

    // Filter appointments by week
    const filterByWeek = (selectedDate: Date) => {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return normalizeAppointments.filter(a =>
        a.date >= startOfWeek && a.date <= endOfWeek
      );
    };

    // Filter appointments by month
    const filterByMonth = (selectedDate: Date) => {
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();

      return normalizeAppointments.filter(a =>
        a.date.getMonth() === month && a.date.getFullYear() === year
      );
    };

  const handleViewChange = (type: 'day' | 'week' | 'month') => {
    setViewType(type);
  };

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
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screen md:mt-[30px]">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <img src={homeIcon} alt="" className="w-4 h-4" />
          <img src={chevronIcon} alt="" />
          <span onClick={() => navigate('/dashboard')} className='cursor-pointer'>{t('dashboard.routes.calendar.breadcrumb.dashboard')}</span>
          <img src={chevronIcon} alt="" />
          <span className="text-[#171C35] text-sm font-semibold">{t('dashboard.routes.calendar.breadcrumb.calendar')}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-3.5">
        <h1 className="text-xl md:text-xl font-semibold text-[#171C35] mb-4 sm:mb-6">{t('dashboard.routes.calendar.header')}</h1>

        {/* Top Controls */}
        <div className="rounded-lg pt-6 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CalendarHeader
              selectedDate={selectedDate}
              onDateChange={(date: Date) => setSelectedDate(date)}
            />

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
              {t('dashboard.routes.calendar.appointment')}
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="overflow-x-auto rounded-3xl -mt-2">
          {/* {viewType === 'day' && <DayView />}
          {viewType === 'week' && <CalendarWeekView />}
          {viewType === 'month' && <CalendarMonthView />} */}
          {viewType === 'day' && (
            <DayView
              selectedDate={selectedDate}
              appointments={filterByDay(selectedDate)}
            />
          )}

          {viewType === 'week' && (
            <CalendarWeekView
              selectedDate={selectedDate}
              appointments={filterByWeek(selectedDate)}
            />
          )}

          {viewType === 'month' && (
            <CalendarMonthView
              selectedDate={selectedDate ?? new Date()} // fallback
              appointments={filterByMonth(selectedDate ?? new Date())}
            />
          )}

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
