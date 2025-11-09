import { useState } from "react";


const DayView = () => {
    const [currentDate, ] = useState(new Date(2025, 8, 29)); 
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dayOfMonth = currentDate.getDate();

  const timeSlots = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM'
  ];
  return (
    <div>
       {/* Calendar Grid */}
        <div className="bg-white rounded-[32px] min-h-screen -mt-2">
          {/* Day Header with Date Badge */}
          <div className="flex border-b border-gray-200 pl-20">
            <div className="w-20 flex-shrink-0 flex items-center justify-center py-4">
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-gray-600 mb-1">{dayOfWeek}</span>
                <div className="w-10 h-10 rounded-full bg-[#526FFF] flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{dayOfMonth}</span>
                </div>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>

          {/* Time Grid Container */}
          <div className="relative">
            {/* GTM + William Brooks Row - BEFORE 7 AM border */}
            <div className="flex" style={{ height: '50px' }}>
              <div className="w-20 flex-shrink-0 px-4 py-2 text-right">
                <span className="text-sm text-gray-500">GTM+06</span>
              </div>
              <div className="flex-1   border-l border-b border-gray-200">
                <div className="bg-[#526FFF] text-white rounded-[8px] px-3  text-sm font-medium h-full flex items-center">
                  William Brooks
                </div>
              </div>
            </div>

            {/* Time Slots starting from 7 AM */}
            <div>
              {timeSlots.map((time, index) => (
                <div 
                  key={index}
                  className="flex"
                  style={{ height: '43px' }}
                >
                  <div className="w-20 flex-shrink-0 px-4 py-5 text-right">
                    <span className="text-xs text-gray-500">{time}</span>
                  </div>
                  <div className="flex-1 border-l border-b border-gray-100"></div>
                </div>
              ))}
            </div>

            {/* Current Time Indicator - 10:30 AM (after GTM row + 3.5 rows) */}
            <div 
              className="absolute left-20 right-0 pointer-events-none z-20"
              style={{ top: `${43 + (3.5 * 43)}px` }}
            >
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 -ml-1.5"></div>
                <div className="flex-1 h-px bg-indigo-600"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DayView
