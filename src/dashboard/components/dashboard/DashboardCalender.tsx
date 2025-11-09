import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, ChevronDown } from "lucide-react";
import NewAppointmentModal from "./NewAppointmentModal";

const CalendarView: React.FC = () => {
  const [currentMonth, ] = useState("September 2025");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Event color mapping (3 types)
  const eventColors = [ "bg-purple-50", "bg-green-50", "bg-orange-50" ];

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
    <div className="bg-white rounded-2xl p-5 -mt-15 ml-1 ">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#171C35">Calendar</h2>
        <button  onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-[8px] text-sm text-[#111A2D] hover:bg-gray-50">
          <Plus className="w-4 h-4" />
          Appointment
        </button>
      </div>

      {/* Month + View Selector */}
      <div className="flex items-center justify-start mb-6">
        <div className="flex items-center gap-4">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-medium text-[#171C35]">{currentMonth}</h3>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <span className="flex text-[#111A2D] text-sm items-center">  Week <ChevronDown className="w-4 h-4" /></span>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"].map((day) => (
          <div
            key={day}
            className="bg-white pt-4 pl-4 pr-16 pb-17 text-center text-xs font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day, idx) => {
          const bgColor = day.event
            ? eventColors[day.event.colorIndex % eventColors.length]
            : "bg-white";

          return (
            <div
              key={idx}
              className={`p-3 min-h-[80px] ${bgColor} ${
                day.month ? "text-gray-300" : "text-gray-900"
              }`}
            >
              <div className="text-lg font-medium">{day.date}</div>

              {day.event && (
                <div className="mt-2">
                  <div className="text-sm font-medium">{day.event.name}</div>
                  <div className="text-xs text-gray-900 flex items-center gap-1 ">
                    {day.event.time}
                   
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
        {/* Modal show conditionally */}
      {isModalOpen && (
        <NewAppointmentModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CalendarView;
