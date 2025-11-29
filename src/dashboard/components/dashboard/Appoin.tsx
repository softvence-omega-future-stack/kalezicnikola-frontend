import { CalendarDays } from "lucide-react";
import { useState } from "react";

export default function CustomDateInput() {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full ">
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`
          w-full bg-white border border-gray-300 rounded-lg py-4.5 px-4 pr-10 text-sm
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer
          appearance-none
          [&::-webkit-calendar-picker-indicator]:opacity-0
          [&::-webkit-calendar-picker-indicator]:absolute
          [&::-webkit-calendar-picker-indicator]:right-0
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          ${!value ? "text-transparent" : "text-gray-900"}
        `}
      />

      {!value && (
        <span className="absolute left-4 top-4.5 text-gray-400 pointer-events-none text-sm">
          Select Date
        </span>
      )}

      <CalendarDays
        size={20}
        className="absolute right-3 top-4.5 text-gray-500 pointer-events-none"
      />
    </div>
  );
}