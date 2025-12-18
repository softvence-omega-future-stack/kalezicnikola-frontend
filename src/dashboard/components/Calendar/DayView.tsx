import { useState } from "react";
import { useTranslation } from 'react-i18next';
import type { Appointment } from "./CalendarView";

interface DayViewProps {
  selectedDate: Date;
  appointments: Appointment[];
}

const DayView: React.FC<DayViewProps> = ({ selectedDate, appointments }) => {
  const { t } = useTranslation();
  const [currentDate] = useState(selectedDate ?? new Date()); 

  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dayOfMonth = currentDate.getDate();

  const timeSlots = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'
  ];

  // Filter appointments that belong to the selected day
  const dayAppointments = appointments.filter(a =>
    new Date(a.appointmentDate).toDateString() === currentDate.toDateString()
  );

  return (
    <div>
      <div className="bg-white rounded-[32px] py-10 -mt-2">
        {/* Day Header with Date Badge */}
        <div className="flex border-b border-gray-200 pl-20">
          <div className="w-20 shrink-0 flex items-center justify-center py-4">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-600 mb-1">{dayOfWeek}</span>
              <div className="w-10 h-10 rounded-full bg-[#526FFF] flex items-center justify-center">
                <span className="text-white font-medium text-lg">{dayOfMonth}</span>
              </div>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>

        {/* Time Grid */}
        <div className="relative">
           {/* GTM + William Brooks Row */}
           <div className="flex" style={{ height: '50px' }}>
             <div className="w-20 flex-shrink-0 px-4 py-2 text-right">
               <span className="text-sm text-gray-500">{t('dashboard.routes.dashboard.calendar.timeZone')}</span>
             </div>
             {/* <div className="flex-1 border-l border-b border-gray-200">
               <div className="bg-[#526FFF] text-white rounded-[8px] px-3 text-sm font-medium h-full flex items-center">
                 {appointments.length > 0 ? `${appointments[0].patient.firstName} ${appointments[0].patient.lastName}` : 'Unassigned'}
               </div>
             </div> */}
             <div className="flex-1 border-l border-b border-gray-200">
              {dayAppointments.length > 0 ? (
                dayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-[#526FFF] text-white rounded-[8px] px-3 text-sm font-medium h-full flex items-center mb-1"
                  >
                    {`${apt.patient.firstName} ${apt.patient.lastName}`}
                  </div>
                ))
              ) : (
                <div className="bg-gray-100 text-gray-500 rounded-[8px] px-3 text-sm font-medium h-full flex items-center">
                  Unassigned
                </div>
              )}
            </div>

           </div>

           {/* Time Slots */}
          {timeSlots.map((time, index) => (
            <div key={index} className="flex" style={{ height: '43px' }}>
              <div className="w-20 flex-shrink-0 px-4 py-2 text-right">
                <span className="text-xs text-gray-500">{time}</span>
              </div>
              <div className="flex-1 border-l border-b border-gray-100 relative">
                {/* Render appointments for this time slot */}
                {dayAppointments
                    .filter(a => {
                      const slotHour = parseInt(a.scheduleSlot.startTime.split(':')[0]);
                      return slotHour === (index + 7); // 7AM = index 0
                    })
                    .sort((a, b) => {
                      const timeA = new Date(`1970-01-01T${a.scheduleSlot.startTime}:00`);
                      const timeB = new Date(`1970-01-01T${b.scheduleSlot.startTime}:00`);
                      return timeA.getTime() - timeB.getTime();
                  })      
                  .map((a, i) => (
                    <div
                      key={i}
                      className="absolute left-2 right-2 bg-indigo-100 text-indigo-800 rounded-lg px-2 py-1 text-xs font-medium truncate"
                    >
                      {a.patient.firstName} {a.patient.lastName} ({a.scheduleSlot.startTime})
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Optional: current time indicator */}
          <div
            className="absolute left-20 right-0 pointer-events-none z-20"
            style={{
              top: `${43 + (new Date().getHours() - 7) * 43}px` // 7AM = index 0
            }}
          >
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 -ml-1.5"></div>
              <div className="flex-1 h-px bg-indigo-600"></div>
            </div>
          </div>
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


