import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Appointment } from './CalendarView';

interface WeekViewProps {
  selectedDate: Date;
  appointments: Appointment[];
}

interface WeekAppointment {
  dayIndex: number; // 0 = Sun ... 6 = Sat
  startHour: number; // decimal hour (e.g., 9.5 for 9:30)
  endHour: number;
  name: string;
  color: string;
  borderColor: string;
}

const CalendarWeekView: React.FC<WeekViewProps> = ({ selectedDate, appointments }) => {
  const { t } = useTranslation();

  // Days in the week (Sunday → Saturday)
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Sunday

  const days = Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);
    return {
      day: t(`dashboard.routes.dashboard.calendar.weekDays.${['sun','mon','tue','wed','thu','fri','sat'][i]}`),
      date: dayDate.getDate(),
      dateObj: dayDate
    };
  });

  // Map appointments for the current week
  const weekAppointments: WeekAppointment[] = appointments.map((apt, idx) => {
    const aptDate = new Date(apt.appointmentDate);
    const dayIndex = aptDate.getDay(); // 0 = Sunday
    const [startHourStr, startMinStr] = apt.scheduleSlot.startTime.split(':');
    const [endHourStr, endMinStr] = apt.scheduleSlot.endTime.split(':');
    const startHour = parseInt(startHourStr) + parseInt(startMinStr) / 60;
    const endHour = parseInt(endHourStr) + parseInt(endMinStr) / 60;

    return {
      dayIndex,
      startHour,
      endHour,
      name: `${apt.patient.firstName} ${apt.patient.lastName}`,
      color: ['bg-[#EDF9F5]', 'bg-[#F1ECFF]', 'bg-red-100', 'bg-purple-100'][idx % 4],
      borderColor: ['border-teal-500', 'border-purple-500', 'border-red-400', 'border-purple-500'][idx % 4],
    };
  });

  const timeSlots = ['Time', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];

  return (
    <div className="bg-white rounded-2xl p-2 sm:p-4 md:p-6 overflow-x-auto">
      <div className="min-w-[600px] md:min-w-full">
        {/* Header */}
        <div className="grid gap-0" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
          <div className="h-16"></div>
          {days.map((day, index) => (
            <div key={index} className="p-2 text-center h-16 flex flex-col justify-center">
              <div className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 mb-1">
                <span className="hidden sm:inline">{day.day}</span>
                <span className="sm:hidden">{day.day.charAt(0)}</span>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-normal text-gray-900">{day.date}</div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="grid gap-0" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
          {/* Time labels column */}
          <div className="flex flex-col">
            {timeSlots.slice(1).map((time, index) => (
              <div key={index} className="h-[100px] flex items-start justify-end px-1 sm:px-2 text-[10px] sm:text-xs md:text-base text-[#171C35] border-b border-gray-200">
                {time}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((_, dayIndex) => (
            <div key={dayIndex} className="border-l border-b border-gray-200 relative min-h-[900px]">
              {/* Hour lines */}
              {timeSlots.slice(1).map((_, idx) => (
                <div key={idx} className="border-b border-gray-200 h-[100px] w-full"></div>
              ))}

              {/* Appointments */}
              {weekAppointments
                .filter(apt => apt.dayIndex === dayIndex)
                .map((apt, aptIndex) => {
                  const startHour = 9; // starting hour of grid
                  const topOffset = (apt.startHour - startHour) * 100; // px
                  const height = (apt.endHour - apt.startHour) * 100; // px

                  return (
                    <div
                      key={aptIndex}
                      className={`${apt.color} border-l-4 ${apt.borderColor} absolute rounded-l-md`}
                      style={{
                        top: `${topOffset}px`,
                        left: '4px',
                        right: '4px',
                        height: `${height}px`,
                        padding: '6px',
                      }}
                    >
                      <div className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 truncate">
                        {apt.name}
                      </div>
                      <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 mt-1">
                        {`${Math.floor(apt.startHour)}:${apt.startHour % 1 ? '30' : '00'} - ${Math.floor(apt.endHour)}:${apt.endHour % 1 ? '30' : '00'}`}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CalendarWeekView;

// Romica Apu
// import { useTranslation } from 'react-i18next';
// import type { Appointment } from './CalendarView';

// interface WeekViewProps {
//   selectedDate: Date;
//   appointments: Appointment[];
// }

// const CalendarWeekView: React.FC<WeekViewProps> = ({ selectedDate, appointments }) => {
//   const { t } = useTranslation();
  
//   const days = [
//     { day: t('dashboard.routes.dashboard.calendar.weekDays.sun'), date: '28' },
//     { day: t('dashboard.routes.dashboard.calendar.weekDays.mon'), date: '29' },
//     { day: t('dashboard.routes.dashboard.calendar.weekDays.tue'), date: '30' },
//     { day: t('dashboard.routes.dashboard.calendar.weekDays.wed'), date: '1' },
//     { day: t('dashboard.routes.dashboard.calendar.weekDays.thu'), date: '2' },
//     { day: t('dashboard.routes.dashboard.calendar.weekDays.fri'), date: '3' },
//     { day: t('dashboard.routes.dashboard.calendar.weekDays.sat'), date: '4' }
//   ];

//   const timeSlots = [t('dashboard.routes.dashboard.calendar.timeZone'), '9 AM', '10 AM', '11 AM', '12 AM', '1 PM'];

//   const appointments = [
//     { day: 0, time: 1, name: 'Floyd Miles', hour: '9:00 AM', color: 'bg-[#EDF9F5]', borderColor: 'border-teal-500' },
//     { day: 0, time: 1.5, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-[#F1ECFF]', borderColor: 'border-purple-500' },
//     { day: 0, time: 3, name: 'Floyd Miles', hour: '11:30 AM', color: 'bg-red-100', borderColor: 'border-red-400' },
//     { day: 1, time: 2, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-purple-100', borderColor: 'border-purple-500' },
//     { day: 2, time: 1.2, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-red-100', borderColor: 'border-red-400' },
//     { day: 2, time: 4, name: 'Floyd Miles', hour: '12:00 PM', color: 'bg-purple-100', borderColor: 'border-purple-500' },
//     { day: 3, time: 2.8, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-teal-100', borderColor: 'border-teal-500' },
//     { day: 4, time: 3.5, name: 'Floyd Miles', hour: '12:00 PM', color: 'bg-red-100', borderColor: 'border-red-400' },
//     { day: 1, time: 5, name: 'Floyd Miles', hour: '1:00 PM', color: 'bg-teal-100', borderColor: 'border-teal-500' },
//     { day: 6, time: 2, name: 'Floyd Miles', hour: '10:00 AM', color: 'bg-purple-100', borderColor: 'border-purple-500' }
//   ];

//   return (
//     <div className="bg-white rounded-2xl p-2 sm:p-4 md:p-6 overflow-x-auto">
//       <div className="min-w-[600px] md:min-w-full">
//         {/* Header */}
//         <div className="grid gap-0" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
//           <div className="h-16"></div>
//           {days.map((day, index) => (
//             <div key={index} className="p-2 text-center h-16 flex flex-col justify-center">
//               <div className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 mb-1">
//                 <span className="hidden sm:inline">{day.day}</span>
//                 <span className="sm:hidden">{day.day.charAt(0)}</span>
//               </div>
//               <div className="text-lg sm:text-xl md:text-2xl font-normal text-gray-900">{day.date}</div>
//             </div>
//           ))}
//         </div>

//         {/* Time Grid */}
//         <div className="relative">
//           {timeSlots.map((time, timeIndex) => (
//             <div
//               key={timeIndex}
//               className="grid gap-0"
//               style={{ gridTemplateColumns: '80px repeat(7, 1fr)', height: '100px' }}
//             >
//               {/* Time Label */}
//               <div
//                 className={`px-1 sm:px-2 text-[10px] sm:text-xs md:text-base text-[#171C35] leading-4 border-r border-gray-200 flex justify-end ${
//                   timeIndex === 0 ? 'items-center -mt-1 sm:-mt-2' : 'items-start'
//                 }`}
//               >
//                 {time}
//               </div>

//               {/* Day Columns */}
//               {days.map((_, dayIndex) => (
//                 <div key={dayIndex} className="border-l border-b border-gray-200 relative">
//                   {appointments
//                     .filter(apt => apt.day === dayIndex && Math.floor(apt.time) === timeIndex)
//                     .map((apt, aptIndex) => {
//                       const topOffset = (apt.time - timeIndex) * 100;
//                       return (
//                         <div
//                           key={aptIndex}
//                           className={`${apt.color} border-l-4 ${apt.borderColor} absolute rounded-l-md`}
//                           style={{
//                             top: `${topOffset}px`,
//                             left: '4px',
//                             right: '4px',
//                             height: '50px',
//                             padding: '6px'
//                           }}
//                         >
//                           <div className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 truncate">
//                             {apt.name}
//                           </div>
//                           <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 mt-1">
//                             {apt.hour}
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
