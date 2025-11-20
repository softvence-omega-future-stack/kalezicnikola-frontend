import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

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

  return (
    <div className="flex items-center gap-3 w-full sm:w-auto relative">
      {/* Prev Month */}
      <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
        <ChevronLeft size={20} className="text-gray-600 cursor-pointer" />
      </button>

      {/* Month */}
      <div className="relative">
        <div
          onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
          className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer"
        >
          {months[currentDate.getMonth()]}
        </div>
        {monthDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white z-10 shadow-md rounded max-h-48 overflow-auto w-32">
            {months.map((month, index) => (
              <div
                key={month}
                onClick={() => handleMonthSelect(index)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {month}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Year */}
      <div className="relative">
        <div
          onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
          className="text-base sm:text-lg font-medium text-[#171C35] cursor-pointer"
        >
          {currentDate.getFullYear()}
        </div>
        {yearDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white z-10 shadow-md rounded max-h-48 overflow-auto w-24">
            {years.map((year) => (
              <div
                key={year}
                onClick={() => handleYearSelect(year)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Month */}
      <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
        <ChevronRight size={20} className="text-gray-600 cursor-pointer" />
      </button>
    </div>
  );
}
