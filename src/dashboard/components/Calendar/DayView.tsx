import { useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import type { Appointment } from "./CalendarView";

interface DayViewProps {
  selectedDate: Date;
  appointments: Appointment[];
}

const DayView: React.FC<DayViewProps> = ({ selectedDate, appointments }) => {
  const { t } = useTranslation();
  
  const [currentDate, setCurrentDate] = useState(selectedDate ?? new Date());


  const weekDays = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); 
    startOfWeek.setDate(diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  }, [currentDate]);

 
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return `${hour} ${ampm}`;
  });

  const dayAppointments = appointments.filter(a =>
    new Date(a.appointmentDate).toDateString() === currentDate.toDateString()
  );

  return (
    <div className="bg-white rounded-[32px] py-6 shadow-sm border border-gray-100">
   
      <div className="flex justify-between px-10 border-b border-gray-100 pb-6">
        {weekDays.map((date, index) => {
          const isSelected = date.toDateString() === currentDate.toDateString();
          return (
            <button
              key={index}
              onClick={() => setCurrentDate(date)} 
              className="flex flex-col items-center group cursor-pointer"
            >
              <span className={`text-xs font-medium mb-2 ${isSelected ? 'text-[#526FFF]' : 'text-headingBlack]'}`}>
                {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isSelected ? 'bg-[#526FFF] text-white' : 'hover:bg-gray-100 bg-gray-50 text-gray-700'
              }`}>
                <span className="font-semibold">{date.getDate()}</span>
              </div>
            </button>
          );
        })}
      </div>

      
      <div className="overflow-y-auto max-h-[600px] relative custom-scrollbar">
        {/* Timezone Row */}
        <div className="flex border-b border-gray-50" style={{ height: '50px' }}>
          <div className="w-20 flex-shrink-0 px-4 py-2 text-right border-r border-gray-50">
            <span className="text-xs md:text-base text-headingBlack font-medium uppercase">{t('GMT+06')}</span>
          </div>
          <div className="flex-1 p-1 bg-blue-50">
             {dayAppointments.length > 0 ? (
                <div className="bg-indigo-50 text-[#526FFF] rounded-lg px-3 py-1 text-xs md:text-base font-medium inline-block">
                  {dayAppointments.length} {t("dashboard.routes.calendar.day.todayAppointments")}
                </div>
             ) : (
                <span className="text-sm md:text-base text-gray-700  ml-2 italic">Unassigned</span>
             )}
          </div>
        </div>

        {/* Time Slots Mapping */}
        <div className="relative">
          {timeSlots.map((time, index) => (
            <div key={index} className="flex border-b border-gray-50" style={{ height: '60px' }}>
              <div className="w-20 shrink-0 px-4 py-2 text-right border-r border-gray-50">
                <span className="text-xs md:text-base text-headingBlack">{time}</span>
              </div>
              <div className="flex-1 relative">
                {dayAppointments
                  .filter(a => {
                    const slotHour = parseInt(a.scheduleSlot.startTime.split(':')[0]);
                    const isPM = a.scheduleSlot.startTime.toLowerCase().includes('pm');
                    const normalizedHour = isPM && slotHour !== 12 ? slotHour + 12 : (!isPM && slotHour === 12 ? 0 : slotHour);
                    return normalizedHour === index;
                  })
                  .map((a, i) => (
                    <div
                      key={i}
                      className="absolute inset-x-2 top-1 bottom-1 bg-[#526FFF] text-white rounded-xl px-4 py-2 text-xs shadow-md z-10"
                    >
                      <p className="font-bold">{a.patient.firstName} {a.patient.lastName}</p>
                      <p className="opacity-80">{a.scheduleSlot.startTime}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Current Time Indicator */}
          {currentDate.toDateString() === new Date().toDateString() && (
         <div
            className="absolute left-20 right-0 pointer-events-none z-20"
            style={{
              top: `${43 + (new Date().getHours() - 7) * 43}px` 
            }}
          >
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 -ml-1.5"></div>
              <div className="flex-1 h-px bg-indigo-600"></div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;


// Romica Apu
// import { useState } from "react";
// import { useTranslation } from 'react-i18next';
// import type { Appointment } from "./CalendarView";

// interface DayViewProps {
//   selectedDate: Date;
//   appointments: Appointment[];
// }

// const DayView: React.FC<DayViewProps> = ({ selectedDate, appointments }) => {
//   const { t } = useTranslation();
//   const [currentDate] = useState(selectedDate ?? new Date()); 
//   const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
//   const dayOfMonth = currentDate.getDate();

//   const timeSlots = [
//     '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM'
//   ];

//   // const dayAppointments = appointments.filter(a =>
//   //   new Date(a.appointmentDate).toDateString() === currentDate.toDateString()
//   // );
  
//   return (
//     <div>
//       {/* Calendar Grid */}
//       <div className="bg-white rounded-[32px] py-10 -mt-2">
//         {/* Day Header with Date Badge */}
//         <div className="flex border-b border-gray-200 pl-20">
//           <div className="w-20 shrink-0 flex items-center justify-center py-4">
//             <div className="flex flex-col items-center">
//               <span className="text-xs font-medium text-gray-600 mb-1">{dayOfWeek}</span>
//               <div className="w-10 h-10 rounded-full bg-[#526FFF] flex items-center justify-center">
//                 <span className="text-white font-medium text-lg">{dayOfMonth}</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1"></div>
//         </div>

//         {/* Time Grid Container */}
//         <div className="relative">
//           {/* GTM + William Brooks Row */}
//           <div className="flex" style={{ height: '50px' }}>
//             <div className="w-20 flex-shrink-0 px-4 py-2 text-right">
//               <span className="text-sm text-gray-500">{t('dashboard.routes.dashboard.calendar.timeZone')}</span>
//             </div>
//             <div className="flex-1 border-l border-b border-gray-200">
//               <div className="bg-[#526FFF] text-white rounded-[8px] px-3 text-sm font-medium h-full flex items-center">
//                 William Brooks
//               </div>
//             </div>
//           </div>

//           {/* Time Slots */}
//           <div>
//             {timeSlots.map((time, index) => (
//               <div 
//                 key={index}
//                 className="flex"
//                 style={{ height: '43px' }}
//               >
//                 <div className="w-20 flex-shrink-0 px-4 py-5 text-right">
//                   <span className="text-xs text-gray-500">{time}</span>
//                 </div>
//                 <div className="flex-1 border-l border-b border-gray-100"></div>
//               </div>
//             ))}
//           </div>

//           {/* Current Time Indicator */}
//           <div 
//             className="absolute left-20 right-0 pointer-events-none z-20"
//             style={{ top: `${43 + (3.5 * 43)}px` }}
//           >
//             <div className="flex items-center">
//               <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 -ml-1.5"></div>
//               <div className="flex-1 h-px bg-indigo-600"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DayView;


