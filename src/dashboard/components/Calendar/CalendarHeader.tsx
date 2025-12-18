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
  
  // Ensure selectedDate is always valid
  const safeSelectedDate = selectedDate || new Date();
  
  const currentMonth = safeSelectedDate.getMonth();
  const currentYear = safeSelectedDate.getFullYear();
  const currentDate = safeSelectedDate.getDate();

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Get day name
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = dayNames[safeSelectedDate.getDay()];

  const handlePrevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    onDateChange(newDate);
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, currentDate);
    onDateChange(newDate);
    setMonthDropdownOpen(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, currentMonth, currentDate);
    onDateChange(newDate);
    setYearDropdownOpen(false);
  };

  const handleDateSelect = (date: number) => {
    const newDate = new Date(currentYear, currentMonth, date);
    onDateChange(newDate);
    setDateDropdownOpen(false);
  };

  // Update month dropdown position
  useEffect(() => {
    if (monthDropdownOpen && monthRef.current) {
      const rect = monthRef.current.getBoundingClientRect();
      setMonthPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [monthDropdownOpen]);

  // Update year dropdown position
  useEffect(() => {
    if (yearDropdownOpen && yearRef.current) {
      const rect = yearRef.current.getBoundingClientRect();
      setYearPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [yearDropdownOpen]);

  // Update date dropdown position
  useEffect(() => {
    if (dateDropdownOpen && dateRef.current) {
      const rect = dateRef.current.getBoundingClientRect();
      setDatePosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [dateDropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        const monthDropdown = document.getElementById('month-dropdown-portal');
        if (monthDropdown && !monthDropdown.contains(event.target as Node)) {
          setMonthDropdownOpen(false);
        }
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        const yearDropdown = document.getElementById('year-dropdown-portal');
        if (yearDropdown && !yearDropdown.contains(event.target as Node)) {
          setYearDropdownOpen(false);
        }
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        const dateDropdown = document.getElementById('date-dropdown-portal');
        if (dateDropdown && !dateDropdown.contains(event.target as Node)) {
          setDateDropdownOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to add ordinal suffix
  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return (
    <div className="flex items-center w-full sm:w-auto relative">
      {/* Prev Month */}
      <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
        <ChevronLeft size={20} className="text-gray-600 cursor-pointer" />
      </button>

      {/* Month Dropdown */}
      <div ref={monthRef} className="relative">
        <div
          onClick={() => {
            setMonthDropdownOpen(!monthDropdownOpen);
            setYearDropdownOpen(false);
            setDateDropdownOpen(false);
          }}
          className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
        >
          {months[currentMonth]}
        </div>
      </div>

      {/* Month Dropdown Portal */}
      {monthDropdownOpen && createPortal(
        <div
          id="month-dropdown-portal"
          style={{
            position: 'absolute',
            top: `${monthPosition.top}px`,
            left: `${monthPosition.left}px`,
            minWidth: `${monthPosition.width}px`,
            zIndex: 99999,
          }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg max-h-48 overflow-y-auto w-32 sm:w-40"
        >
          {months.map((month, index) => (
            <div
              key={month}
              onClick={() => handleMonthSelect(index)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm sm:text-base"
            >
              {month}
            </div>
          ))}
        </div>,
        document.body
      )}

      {/* Date Dropdown - NEW */}
      <div ref={dateRef} className="relative">
        <div
          onClick={() => {
            setDateDropdownOpen(!dateDropdownOpen);
            setMonthDropdownOpen(false);
            setYearDropdownOpen(false);
          }}
          className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
        >
          {currentDayName}, {getOrdinal(currentDate)}
        </div>
      </div>

      {/* Date Dropdown Portal - NEW */}
      {dateDropdownOpen && createPortal(
        <div
          id="date-dropdown-portal"
          style={{
            position: 'absolute',
            top: `${datePosition.top}px`,
            left: `${datePosition.left}px`,
            minWidth: `${datePosition.width}px`,
            zIndex: 99999,
          }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg max-h-64 overflow-y-auto w-40 sm:w-48"
        >
          {dates.map((date) => {
            const tempDate = new Date(currentYear, currentMonth, date);
            const dayName = dayNames[tempDate.getDay()];
            return (
              <div
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm sm:text-base ${
                  date === currentDate ? 'bg-indigo-50 font-semibold' : ''
                }`}
              >
                {dayName}, {getOrdinal(date)}
              </div>
            );
          })}
        </div>,
        document.body
      )}

      {/* Year Dropdown */}
      <div ref={yearRef} className="relative">
        <div
          onClick={() => {
            setYearDropdownOpen(!yearDropdownOpen);
            setMonthDropdownOpen(false);
            setDateDropdownOpen(false);
          }}
          className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
        >
          {currentYear}
        </div>
      </div>

      {/* Year Dropdown Portal */}
      {yearDropdownOpen && createPortal(
        <div
          id="year-dropdown-portal"
          style={{
            position: 'absolute',
            top: `${yearPosition.top}px`,
            left: `${yearPosition.left}px`,
            minWidth: `${yearPosition.width}px`,
            zIndex: 99999,
          }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg max-h-48 overflow-y-auto w-24 sm:w-32"
        >
          {years.map((year) => (
            <div
              key={year}
              onClick={() => handleYearSelect(year)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm sm:text-base"
            >
              {year}
            </div>
          ))}
        </div>,
        document.body
      )}

      {/* Next Month */}
      <button onClick={handleNextMonth} className="hover:bg-gray-100 rounded">
        <ChevronRight size={20} className="text-gray-600 cursor-pointer" />
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