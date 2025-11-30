import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [monthPosition, setMonthPosition] = useState({ top: 0, left: 0, width: 0 });
  const [yearPosition, setYearPosition] = useState({ top: 0, left: 0, width: 0 });

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 31 }, (_, i) => 2000 + i); // 2000-2030

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), monthIndex, 1));
    setMonthDropdownOpen(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(prev => new Date(year, prev.getMonth(), 1));
    setYearDropdownOpen(false);
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        monthRef.current && !monthRef.current.contains(event.target as Node)
      ) {
        const monthDropdown = document.getElementById('month-dropdown-portal');
        if (monthDropdown && !monthDropdown.contains(event.target as Node)) {
          setMonthDropdownOpen(false);
        }
      }
      if (
        yearRef.current && !yearRef.current.contains(event.target as Node)
      ) {
        const yearDropdown = document.getElementById('year-dropdown-portal');
        if (yearDropdown && !yearDropdown.contains(event.target as Node)) {
          setYearDropdownOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 w-full sm:w-auto relative">
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
          }}
          className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
        >
          {months[currentDate.getMonth()]}
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

      {/* Year Dropdown */}
      <div ref={yearRef} className="relative">
        <div
          onClick={() => {
            setYearDropdownOpen(!yearDropdownOpen);
            setMonthDropdownOpen(false);
          }}
          className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
        >
          {currentDate.getFullYear()}
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
      <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
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