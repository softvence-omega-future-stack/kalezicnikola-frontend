import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function CalendarHeader({ selectedDate, onDateChange }: CalendarHeaderProps) {
  const { t } = useTranslation();
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [monthPosition, setMonthPosition] = useState({ top: 0, left: 0, width: 0 });
  const [yearPosition, setYearPosition] = useState({ top: 0, left: 0, width: 0 });
  const [datePosition, setDatePosition] = useState({ top: 0, left: 0, width: 0 });

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  const months = [
    t('dashboard.routes.dashboard.calendar.months.january'),
    t('dashboard.routes.dashboard.calendar.months.february'),
    t('dashboard.routes.dashboard.calendar.months.march'),
    t('dashboard.routes.dashboard.calendar.months.april'),
    t('dashboard.routes.dashboard.calendar.months.may'),
    t('dashboard.routes.dashboard.calendar.months.june'),
    t('dashboard.routes.dashboard.calendar.months.july'),
    t('dashboard.routes.dashboard.calendar.months.august'),
    t('dashboard.routes.dashboard.calendar.months.september'),
    t('dashboard.routes.dashboard.calendar.months.october'),
    t('dashboard.routes.dashboard.calendar.months.november'),
    t('dashboard.routes.dashboard.calendar.months.december')
  ];

  const years = Array.from({ length: 31 }, (_, i) => 2000 + i);
  const safeSelectedDate = selectedDate || new Date();
  
  const currentMonth = safeSelectedDate.getMonth();
  const currentYear = safeSelectedDate.getFullYear();
  const currentDate = safeSelectedDate.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  const dayNames = [
    t('dashboard.routes.dashboard.calendar.weekDaysFull.sunday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.monday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.tuesday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.wednesday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.thursday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.friday'),
    t('dashboard.routes.dashboard.calendar.weekDaysFull.saturday')
  ];
  
  const currentDayName = dayNames[safeSelectedDate.getDay()];

  const handlePrevMonth = () => onDateChange(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => onDateChange(new Date(currentYear, currentMonth + 1, 1));

  const handleMonthSelect = (monthIndex: number) => {
    onDateChange(new Date(currentYear, monthIndex, currentDate));
    setMonthDropdownOpen(false);
  };

  const handleYearSelect = (year: number) => {
    onDateChange(new Date(year, currentMonth, currentDate));
    setYearDropdownOpen(false);
  };

  const handleDateSelect = (date: number) => {
    onDateChange(new Date(currentYear, currentMonth, date));
    setDateDropdownOpen(false);
  };

  // Dropdown positioning logic (unchanged)
  useEffect(() => {
    const updatePositions = () => {
      if (monthDropdownOpen && monthRef.current) {
        const rect = monthRef.current.getBoundingClientRect();
        setMonthPosition({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width });
      }
      if (yearDropdownOpen && yearRef.current) {
        const rect = yearRef.current.getBoundingClientRect();
        setYearPosition({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width });
      }
      if (dateDropdownOpen && dateRef.current) {
        const rect = dateRef.current.getBoundingClientRect();
        setDatePosition({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width });
      }
    };
    updatePositions();
  }, [monthDropdownOpen, yearDropdownOpen, dateDropdownOpen]);

  // Click outside logic (unchanged)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targets = ['month', 'year', 'date'];
      targets.forEach(type => {
        const ref = type === 'month' ? monthRef : type === 'year' ? yearRef : dateRef;
        const setOpen = type === 'month' ? setMonthDropdownOpen : type === 'year' ? setYearDropdownOpen : setDateDropdownOpen;
        if (ref.current && !ref.current.contains(event.target as Node)) {
          const portal = document.getElementById(`${type}-dropdown-portal`);
          if (portal && !portal.contains(event.target as Node)) setOpen(false);
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return (
    <div className="flex items-center w-full sm:w-auto space-x-1">
      {/* Prev Month */}
      <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
        <ChevronLeft size={18} className="text-gray-500" />
      </button>


      {/* Date Dropdown */}
      <div ref={dateRef} className="relative">
        <div
          onClick={() => { setDateDropdownOpen(!dateDropdownOpen); setMonthDropdownOpen(false); setYearDropdownOpen(false); }}
          className="text-sm sm:text-lg font-medium text-[#171C35] cursor-pointer px-1.5 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
        >
          
          <span className="sm:hidden">{currentDayName.substring(0, 3)}, </span>
          <span className="hidden sm:inline">{currentDayName}, </span>
          {getOrdinal(currentDate)}
        </div>
      </div>

      {/* Date Dropdown Portal */}
      {dateDropdownOpen && createPortal(
        <div id="date-dropdown-portal" style={{ position: 'absolute', top: `${datePosition.top}px`, left: `${datePosition.left}px`, minWidth: '160px', zIndex: 9999 }} className="bg-white border border-gray-100 shadow-xl rounded-xl max-h-64 overflow-y-auto">
          {dates.map((date) => {
            const tempDate = new Date(currentYear, currentMonth, date);
            const dName = dayNames[tempDate.getDay()];
            return (
              <div key={date} onClick={() => handleDateSelect(date)} className={`px-4 py-2.5 cursor-pointer hover:bg-indigo-50 text-sm ${date === currentDate ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700'}`}>
                {dName.substring(0, 3)}, {getOrdinal(date)}
              </div>
            );
          })}
        </div>,
        document.body
      )}

      {/* Month Dropdown */}
      <div ref={monthRef} className="relative">
        <div
          onClick={() => { setMonthDropdownOpen(!monthDropdownOpen); setYearDropdownOpen(false); setDateDropdownOpen(false); }}
          className="text-sm sm:text-lg font-medium text-[#171C35] cursor-pointer px-1.5 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
        >
          {/* মোবাইলে শর্ট (যেমন: Dec), বড় স্ক্রিনে ফুল (যেমন: December) */}
          <span className="sm:hidden">{months[currentMonth].substring(0, 3)}</span>
          <span className="hidden sm:inline">{months[currentMonth]}</span>
        </div>
      </div>

      {/* Month Dropdown Portal */}
      {monthDropdownOpen && createPortal(
        <div id="month-dropdown-portal" style={{ position: 'absolute', top: `${monthPosition.top}px`, left: `${monthPosition.left}px`, minWidth: '120px', zIndex: 9999 }} className="bg-white border border-gray-100 shadow-xl rounded-xl max-h-60 overflow-y-auto">
          {months.map((month, index) => (
            <div key={month} onClick={() => handleMonthSelect(index)} className="px-4 py-2.5 cursor-pointer hover:bg-indigo-50 text-sm hover:text-indigo-600 transition-colors">
              {month}
            </div>
          ))}
        </div>,
        document.body
      )}


      {/* Year Dropdown */}
      <div ref={yearRef} className="relative">
        <div
          onClick={() => { setYearDropdownOpen(!yearDropdownOpen); setMonthDropdownOpen(false); setDateDropdownOpen(false); }}
          className="text-sm sm:text-lg font-medium text-[#171C35] cursor-pointer px-1.5 py-1 rounded hover:bg-gray-50"
        >
          {currentYear}
        </div>
      </div>

      {/* Year Dropdown Portal */}
      {yearDropdownOpen && createPortal(
        <div id="year-dropdown-portal" style={{ position: 'absolute', top: `${yearPosition.top}px`, left: `${yearPosition.left}px`, minWidth: '100px', zIndex: 9999 }} className="bg-white border border-gray-100 shadow-xl rounded-xl max-h-60 overflow-y-auto">
          {years.map((year) => (
            <div key={year} onClick={() => handleYearSelect(year)} className={`px-4 py-2.5 cursor-pointer hover:bg-indigo-50 text-sm ${year === currentYear ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700'}`}>
              {year}
            </div>
          ))}
        </div>,
        document.body
      )}

      {/* Next Month */}
      <button onClick={handleNextMonth} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
        <ChevronRight size={18} className="text-gray-500" />
      </button>
    </div>
  );
}


// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface CalendarHeaderProps {
//   currentDate: Date;
//   onDateChange: (date: Date) => void;
// }

// export default function CalendarHeader({ currentDate, onDateChange }: CalendarHeaderProps) {
//   const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
//   const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const years = Array.from({ length: 31 }, (_, i) => 2000 + i);

//   const handlePrevMonth = () => {
//     onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const handleMonthSelect = (monthIndex: number) => {
//     onDateChange(new Date(currentDate.getFullYear(), monthIndex, 1));
//     setMonthDropdownOpen(false);
//   };

//   const handleYearSelect = (year: number) => {
//     onDateChange(new Date(year, currentDate.getMonth(), 1));
//     setYearDropdownOpen(false);
//   };

//   return (
//     <div className="flex items-center gap-3 w-full sm:w-auto relative">
//       <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
//         <ChevronLeft size={20} className="text-gray-600 cursor-pointer" />
//       </button>

//       <div className="relative">
//         <div
//           onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
//           className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer"
//         >
//           {months[currentDate.getMonth()]}
//         </div>
//         {monthDropdownOpen && (
//           <div className="absolute top-full left-0 mt-1 bg-white z-10 shadow-md rounded max-h-48 overflow-auto w-32 border border-gray-200">
//             {months.map((month, index) => (
//               <div
//                 key={month}
//                 onClick={() => handleMonthSelect(index)}
//                 className="px-3 py-2 cursor-pointer hover:bg-gray-100"
//               >
//                 {month}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="relative">
//         <div
//           onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
//           className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer"
//         >
//           {currentDate.getFullYear()}
//         </div>
//         {yearDropdownOpen && (
//           <div className="absolute top-full left-0 mt-1 bg-white z-10 shadow-md rounded max-h-48 overflow-auto w-24 border border-gray-200">
//             {years.map((year) => (
//               <div
//                 key={year}
//                 onClick={() => handleYearSelect(year)}
//                 className="px-3 py-2 cursor-pointer hover:bg-gray-100"
//               >
//                 {year}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
//         <ChevronRight size={20} className="text-gray-600 cursor-pointer" />
//       </button>
//     </div>
//   );
// }