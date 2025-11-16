import React from 'react';




const CalendarMonthView: React.FC = () => {

  



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
    <div className=" rounded-2xl">
    

      {/* Main Content */}
      <div className="">
       

       {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-[#E8E8E8] rounded-4xl overflow-hidden">
        {["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"].map((day) => (
          <div
            key={day}
            className="bg-white py-3 px-4 text-base font-medium text-[#667085] "
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
                day.month ? "text-[gray-300]" : "text-[#667085]"
              }`}
            >
              <div className="text-lg font-medium">{day.date}</div>

              {day.event && (
                <div className="mt-2">
                  <div className="text-sm font-medium">{day.event.name}</div>
                  <div className="text-xs text-gray-900 flex items-center gap-1 ">
                    {day.event.time}
                    <span className="  rounded flex items-center justify-center text-[10px] ml-4">
                  
   



                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default CalendarMonthView;