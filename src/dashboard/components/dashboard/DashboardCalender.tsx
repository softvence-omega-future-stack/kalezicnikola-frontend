// import React, { useState, useEffect, useRef } from 'react';
// import { Plus } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// import DayView from '../Calendar/DayView';
// import CalendarMonthView from '../Calendar/MonthView';
// import NewAppointmentModal from './NewAppointmentModal';
// import CalendarHeader from '../Calendar/CalendarHeader';
// import { useAppSelector } from '@/store/hook';
// import CalendarWeekView from '../Calendar/WeekView';
// import axios from 'axios';

// export interface Appointment {
//   id: string;
//   patientId: string;
//   insuranceId: string;
//   doctorId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   dob: string | null;
//   gender: string | null;
//   bloodGroup: string | null;
//   scheduleSlotId: string;
//   appointmentDate: string;
//   appointmentDetails: string;
//   address: string;
//   status: string;
//   type: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   scheduleSlot: {
//     id: string;
//     startTime: string; // "09:00"
//     endTime: string;   // "10:00"
//   };
//   patient: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     insuranceId: string;
//     gender: string | null;
//     dob: string | null;
//   };
// }
// interface DashboardCalendarProps {
//   onHeightChange?: (height: number) => void;
// }

// const DashboardCalendar: React.FC<DashboardCalendarProps> = ({ onHeightChange }) => {
//   const { t } = useTranslation();
//   const { accessToken } = useAppSelector((state) => state.auth);
//   const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('month');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const calendarRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//       const fetchAppointments = async () => {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointment/all`,
//               {
//                 headers: { Authorization: `Bearer ${accessToken}` },
//               });
//           setAppointments(res.data.data.appointments);
//           console.log(res.data.data.appointments);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       fetchAppointments();
//     }, [accessToken]);

//     const normalizeAppointments = appointments.map(a => ({
//       ...a,
//       date: new Date(a.appointmentDate)
//     }));

//     // Filter appointments by day
//     const filterByDay = (selectedDate: Date) => {
//       return normalizeAppointments.filter(a =>
//         a.date.toDateString() === selectedDate.toDateString()
//       );
//     };

//     // Filter appointments by week
//     const filterByWeek = (selectedDate: Date) => {
//       const startOfWeek = new Date(selectedDate);
//       startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

//       const endOfWeek = new Date(startOfWeek);
//       endOfWeek.setDate(startOfWeek.getDate() + 6);

//       return normalizeAppointments.filter(a =>
//         a.date >= startOfWeek && a.date <= endOfWeek
//       );
//     };

//     // Filter appointments by month
//     const filterByMonth = (selectedDate: Date) => {
//       const month = selectedDate.getMonth();
//       const year = selectedDate.getFullYear();

//       return normalizeAppointments.filter(a =>
//         a.date.getMonth() === month && a.date.getFullYear() === year
//       );
//     };

//   const handleViewChange = (type: 'day' | 'week' | 'month') => {
//     setViewType(type);
//   };

//   const updateHeight = () => {
//     if (containerRef.current && onHeightChange) {
//       setTimeout(() => {
//         const height = containerRef.current?.scrollHeight || 0;
//         onHeightChange(height);
//       }, 100);
//     }
//   };

//   useEffect(() => {
//     updateHeight();
//   }, [viewType]);

//   useEffect(() => {
//     if (!calendarRef.current) return;

//     const observer = new MutationObserver(() => {
//       updateHeight();
//     });

//     observer.observe(calendarRef.current, {
//       childList: true,
//       subtree: true,
//       attributes: true,
//     });

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     window.addEventListener('resize', updateHeight);
//     return () => window.removeEventListener('resize', updateHeight);
//   }, []);

//   useEffect(() => {
//     updateHeight();
//   }, []);

//   return (
//     <div ref={containerRef} className="bg-white rounded-2xl p-4 sm:p-6 xl:pb-11 -mt-16">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-semibold text-[#171C35]">{t('dashboard.routes.dashboard.calendar.title')}</h1>

//         {/* Controls */}
//         <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center gap-2 px-3 sm:px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-[8px] border border-gray-300 cursor-pointer w-full sm:w-auto justify-center"
//           >
//             <Plus size={16} />
//             {t('dashboard.routes.dashboard.calendar.addAppointment')}
//           </button>
//         </div>
//       </div>

//       {/* Top Navigation */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full relative z-100">
//           <CalendarHeader
//             selectedDate={selectedDate}
//             onDateChange={(date: Date) => setSelectedDate(date)}
//           />

//           <div className="relative w-full sm:w-auto">
//             <select
//               value={viewType}
//               onChange={(e) =>
//                 handleViewChange(e.target.value as 'day' | 'week' | 'month')
//               }
//               className="appearance-none rounded-[8px] w-full px-3 py-2 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8"
//             >
//               <option value="day">{t('dashboard.routes.dashboard.calendar.viewTypes.day')}</option>
//               <option value="week">{t('dashboard.routes.dashboard.calendar.viewTypes.week')}</option>
//               <option value="month">{t('dashboard.routes.dashboard.calendar.viewTypes.month')}</option>
//             </select>

//             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Calendar Content */}
//       <div ref={calendarRef} className="overflow-x-auto z-10">
//         {/* {viewType === 'day' && <DayView />}
//         {viewType === 'week' && <WeeklyCalendar />}
//         {viewType === 'month' && <CalendarMonthView />} */}
//         {viewType === 'day' && (
//             <DayView
//               selectedDate={selectedDate}
//               appointments={filterByDay(selectedDate)}
//             />
//           )}

//           {viewType === 'week' && (
//             <CalendarWeekView
//               selectedDate={selectedDate}
//               appointments={filterByWeek(selectedDate)}
//             />
//           )}

//           {viewType === 'month' && (
//             <CalendarMonthView
//               selectedDate={selectedDate ?? new Date()} // fallback
//               appointments={filterByMonth(selectedDate ?? new Date())}
//             />
//           )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <NewAppointmentModal onClose={() => setIsModalOpen(false)} />
//       )}
//     </div>
//   );
// };

// export default DashboardCalendar;


import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAppSelector } from '@/store/hook';

import DayView from '../Calendar/DayView';
import CalendarWeekView from '../Calendar/WeekView';
import CalendarMonthView from '../Calendar/MonthView';
import CalendarHeader from '../Calendar/CalendarHeader';
import NewAppointmentModal from './NewAppointmentModal';

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
    startTime: string;
    endTime: string;
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

interface DashboardCalendarProps {
  onHeightChange?: (height: number) => void;
}

const DashboardCalendar: React.FC<DashboardCalendarProps> = ({ onHeightChange }) => {
  const { t } = useTranslation();
  const { accessToken } = useAppSelector(state => state.auth);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // NEW: loading state

  const calendarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch appointments
  useEffect(() => {
    if (!accessToken) return;

    const token = accessToken.replace(/^"|"$/g, ""); // remove extra quotes

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointment/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data.data.appointments || []);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [accessToken]);

  // Memoized normalized appointments
  const normalizedAppointments = useMemo(
    () =>
      appointments.map(a => ({
        ...a,
        date: new Date(a.appointmentDate),
      })),
    [appointments]
  );

  // Filter helpers
  const filterByDay = useMemo(() => {
    return normalizedAppointments.filter(a => a.date.toDateString() === selectedDate.toDateString());
  }, [normalizedAppointments, selectedDate]);

  const filterByWeek = useMemo(() => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return normalizedAppointments.filter(a => a.date >= startOfWeek && a.date <= endOfWeek);
  }, [normalizedAppointments, selectedDate]);

  const filterByMonth = useMemo(() => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    return normalizedAppointments.filter(a => a.date.getMonth() === month && a.date.getFullYear() === year);
  }, [normalizedAppointments, selectedDate]);

  // Update container height
  const updateHeight = () => {
    if (containerRef.current && onHeightChange) {
      setTimeout(() => {
        const height = containerRef.current?.scrollHeight || 0;
        onHeightChange(height);
      }, 100);
    }
  };

  useEffect(() => updateHeight(), [viewType, filterByDay, filterByWeek, filterByMonth]);
  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (!calendarRef.current) return;

    const observer = new MutationObserver(() => updateHeight());
    observer.observe(calendarRef.current, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-white rounded-2xl p-4 sm:p-6 xl:pb-11 -mt-16" style={{ fontFamily: "Urbanist, sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-[#171C35]">{t('dashboard.routes.dashboard.calendar.title')}</h1>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-[8px] border border-gray-300 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Plus size={16} />
            {t('dashboard.routes.dashboard.calendar.addAppointment')}
          </button>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <CalendarHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <div className="relative w-full sm:w-auto">
          <select
            value={viewType}
            onChange={e => setViewType(e.target.value as 'day' | 'week' | 'month')}
               className="appearance-none rounded-[8px] w-full px-3 py-2 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8"
          >
            <option value="day">{t('dashboard.routes.dashboard.calendar.viewTypes.day')}</option>
            <option value="week">{t('dashboard.routes.dashboard.calendar.viewTypes.week')}</option>
            <option value="month">{t('dashboard.routes.dashboard.calendar.viewTypes.month')}</option>
          </select>             
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

        </div>
      </div>

      {/* Calendar Content */}
      <div ref={calendarRef} className="overflow-x-auto z-10">
        {loading ? (
          <div className="text-gray-500 text-lg">Loading...</div> // You can replace with spinner component
        ) : (
          <>
            {viewType === 'day' && <DayView selectedDate={selectedDate} appointments={filterByDay} />}
            {viewType === 'week' && <CalendarWeekView selectedDate={selectedDate} appointments={filterByWeek} />}
            {viewType === 'month' && <CalendarMonthView selectedDate={selectedDate} appointments={filterByMonth} />}
          </>
        )}
      </div>
      {/* <div ref={calendarRef} className="overflow-x-auto z-10">
        {viewType === 'day' && <DayView selectedDate={selectedDate} appointments={filterByDay} />}
        {viewType === 'week' && <CalendarWeekView selectedDate={selectedDate} appointments={filterByWeek} />}
        {viewType === 'month' && <CalendarMonthView selectedDate={selectedDate} appointments={filterByMonth} />}
      </div> */}

      {/* Appointment Modal */}
      {isModalOpen && <NewAppointmentModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default DashboardCalendar;
