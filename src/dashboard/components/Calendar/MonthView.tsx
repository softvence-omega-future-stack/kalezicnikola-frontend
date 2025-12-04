// import React from 'react';

// const CalendarMonthView: React.FC = () => {
//   // Event color mapping (3 types)
//   const eventColors = ["bg-purple-50", "bg-green-50", "bg-orange-50"];

//   const calendarDays = [
//     { date: 29, month: "prev" },
//     { date: 30, month: "prev" },
//     { date: 31, month: "prev" },
//     { date: 1 },
//     { date: 2 },
//     { date: 3 },
//     { date: 4 },
//     { date: 5 },
//     { date: 6 },
//     { date: 7 },
//     { date: 8 },
//     { date: 9, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 0 } },
//     { date: 10 },
//     { date: 11, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 1 } },
//     { date: 12 },
//     { date: 13 },
//     { date: 14 },
//     { date: 15 },
//     { date: 16 },
//     { date: 17 },
//     { date: 18 },
//     { date: 19 },
//     { date: 20 },
//     { date: 21 },
//     { date: 22, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 2 } },
//     { date: 23 },
//     { date: 24 },
//     { date: 25 },
//     { date: 26 },
//     { date: 27 },
//     { date: 28 },
//     { date: 29 },
//     { date: 30 },
//     { date: 1, month: "next" },
//   ];

//   return (
//     // Responsive container padding/sizing
//     <div className="rounded-2xl p-2 md:p-4"> 

//       {/* Main Content */}
//       <div className="">
        
//         {/* Calendar Grid */}
//         <div className="grid grid-cols-7 gap-px bg-[#E8E8E8] rounded-2xl overflow-hidden"> 
//           {/* Day Headers (MON, TUE, etc.) */}
//           {["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"].map((day) => (
//             <div
//               key={day}
//               // Smaller padding and text size on mobile (default)
//               // Larger on medium screens (md:)
//               className="bg-white py-2 px-1 text-xs font-medium text-[#667085] text-center md:py-3 md:px-4 md:text-base"
//             >
//               <span className="hidden sm:inline">{day}</span>
//               {/* Show only the first letter on small screens for compactness */}
//               <span className="sm:hidden">{day.charAt(0)}</span> 
//             </div>
//           ))}

//           {/* Calendar Day Cells */}
//           {calendarDays.map((day, idx) => {
//             const bgColor = day.event
//               ? eventColors[day.event.colorIndex % eventColors.length]
//               : "bg-white";

//             return (
//               <div
//                 key={idx}
//                 // Reduced minimum height and padding on mobile
//                 // Increased text size and height on medium screens
//                 className={`p-1 min-h-[60px] md:p-3 md:min-h-[80px] ${bgColor} ${
//                   day.month ? "text-gray-400" : "text-[#667085]" // Changed text-[gray-300] to text-gray-400 for better Tailwind class adherence
//                 }`}
//               >
//                 {/* Date Number */}
//                 <div className="text-sm font-medium md:text-lg">{day.date}</div> 

//                 {day.event && (
//                   <div className="mt-1 md:mt-2">
//                     {/* Event Name - Truncate on mobile, small text */}
//                     <div className="text-xs font-medium truncate md:text-sm">{day.event.name}</div>
//                     {/* Event Time - Extra small text */}
//                     <div className="text-[10px] text-gray-700 flex items-center gap-1 md:text-xs"> 
//                       {day.event.time}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarMonthView;


import React from 'react';
import { useTranslation } from 'react-i18next';

const CalendarMonthView: React.FC = () => {
  const { t } = useTranslation();
  const eventColors = ["bg-purple-50", "bg-green-50", "bg-orange-50"];

  const weekDays = [
    t('dashboard.routes.dashboard.calendar.weekDaysFull.monday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.tuesday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.wednesday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.thursday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.friday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.saturday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.sunday')
  ];

  const calendarDays = [
    { date: 29, month: "prev" },
    { date: 30, month: "prev" },
    { date: 31, month: "prev" },
    { date: 1 },
    { date: 2 },
    { date: 3 },
    { date: 4 },
    { date: 5 },
    { date: 6 },
    { date: 7 },
    { date: 8 },
    { date: 9, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 0 } },
    { date: 10 },
    { date: 11, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 1 } },
    { date: 12 },
    { date: 13 },
    { date: 14 },
    { date: 15 },
    { date: 16 },
    { date: 17 },
    { date: 18 },
    { date: 19 },
    { date: 20 },
    { date: 21 },
    { date: 22, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 2 } },
    { date: 23 },
    { date: 24 },
    { date: 25 },
    { date: 26 },
    { date: 27 },
    { date: 28 },
    { date: 29 },
    { date: 30 },
    { date: 1, month: "next" },
  ];

  return (
    <div className="rounded-2xl p-2 md:p-4 bg-white overflow-x-auto"> 
      <div className="min-w-[400px] md:min-w-full">
        <div className="border border-[#E8E8E8] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-7"> 
            {/* Day Headers */}
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`bg-white py-2 px-1 text-xs font-medium text-[#667085] text-center md:py-3 md:px-4 md:text-base border-b border-[#E8E8E8] ${
                  index !== 6 ? 'border-r border-[#E8E8E8]' : ''
                }`}
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.charAt(0)}</span>
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, idx) => {
              const bgColor = day.event
                ? eventColors[day.event.colorIndex % eventColors.length]
                : day.month 
                  ? "bg-gray-50" 
                  : "bg-white";
              
              const isLastColumn = (idx % 7) === 6;
              const isLastRow = idx >= 28;

              return (
                <div
                  key={idx}
                  className={`p-1 h-[80px] md:p-3 md:h-[100px] ${bgColor} ${
                    day.month ? "text-gray-400" : "text-[#667085]"
                  } flex flex-col ${!isLastColumn ? 'border-r border-[#E8E8E8]' : ''} ${!isLastRow ? 'border-b border-[#E8E8E8]' : ''}`}
                >
                  <div className="text-sm font-medium md:text-lg mb-1">{day.date}</div>

                  {day.event && (
                    <div className="flex-1 overflow-hidden">
                      <div className="text-xs font-medium truncate md:text-sm">{day.event.name}</div>
                      <div className="text-[10px] text-gray-700 flex items-center gap-1 md:text-xs">
                        {day.event.time}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarMonthView;



// import React from 'react';

// const CalendarMonthView: React.FC = () => {
//   const eventColors = ["bg-purple-50", "bg-green-50", "bg-orange-50"];

//   const calendarDays = [
//     { date: 29, month: "prev" },
//     { date: 30, month: "prev" },
//     { date: 31, month: "prev" },
//     { date: 1 },
//     { date: 2 },
//     { date: 3 },
//     { date: 4 },
//     { date: 5 },
//     { date: 6 },
//     { date: 7 },
//     { date: 8 },
//     { date: 9, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 0 } },
//     { date: 10 },
//     { date: 11, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 1 } },
//     { date: 12 },
//     { date: 13 },
//     { date: 14 },
//     { date: 15 },
//     { date: 16 },
//     { date: 17 },
//     { date: 18 },
//     { date: 19 },
//     { date: 20 },
//     { date: 21 },
//     { date: 22, event: { name: "Floyd Miles", time: "6:00-7:00", colorIndex: 2 } },
//     { date: 23 },
//     { date: 24 },
//     { date: 25 },
//     { date: 26 },
//     { date: 27 },
//     { date: 28 },
//     { date: 29 },
//     { date: 30 },
//     { date: 1, month: "next" },
//     { date: 2, month: "next" },
//     { date: 3, month: "next" },
//     { date: 4, month: "next" },
//     { date: 5, month: "next" },
//     { date: 6, month: "next" },
//   ];

//   return (
//     <div className="rounded-2xl p-2 md:p-4 overflow-x-auto"> 
//       <div className="min-w-[400px] md:min-w-full">
//         <div className="border border-[#E8E8E8] rounded-2xl overflow-hidden">
//           <div className="grid grid-cols-7"> 
//             {/* Day Headers */}
//             {["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"].map((day, index) => (
//               <div
//                 key={day}
//                 className={`bg-white py-2 px-1 text-xs font-medium text-[#667085] text-center md:py-3 md:px-4 md:text-base border-b border-[#E8E8E8] ${
//                   index !== 6 ? 'border-r border-[#E8E8E8]' : ''
//                 }`}
//               >
//                 <span className="hidden sm:inline">{day}</span>
//                 <span className="sm:hidden">{day.charAt(0)}</span>
//               </div>
//             ))}

//             {/* Calendar Days */}
//             {calendarDays.map((day, idx) => {
//               const bgColor = day.event
//                 ? eventColors[day.event.colorIndex % eventColors.length]
//                 : day.month 
//                   ? "bg-gray-50" 
//                   : "bg-white";
              
//               const isLastColumn = (idx % 7) === 6;
//               const isLastRow = idx >= 35;

//               return (
//                 <div
//                   key={idx}
//                   className={`p-1 h-[80px] md:p-3 md:h-[100px] ${bgColor} ${
//                     day.month ? "text-gray-400" : "text-[#667085]"
//                   } flex flex-col ${!isLastColumn ? 'border-r border-[#E8E8E8]' : ''} ${!isLastRow ? 'border-b border-[#E8E8E8]' : ''}`}
//                 >
//                   <div className="text-sm font-medium md:text-lg mb-1">{day.date}</div>

//                   {day.event && (
//                     <div className="flex-1 overflow-hidden">
//                       <div className="text-xs font-medium truncate md:text-sm">{day.event.name}</div>
//                       <div className="text-[10px] text-gray-700 flex items-center gap-1 md:text-xs">
//                         {day.event.time}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarMonthView;