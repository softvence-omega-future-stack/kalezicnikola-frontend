import React from 'react';


interface Appointment {
  name: string;
  time: string;
  day: number;
  startHour: number;
  duration: number;
  color: string;
}

const CalendarWeekView: React.FC = () => {

  
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dates = [28, 29, 30, 1, 2, 3, 4];
  
  const timeSlots = [
    '9 AM', '10 AM', '11 AM', '12 AM', '1 PM'
  ];

  const appointments: Appointment[] = [
    { name: 'Floyd Miles', time: '9:00 AM', day: 1, startHour: 9, duration: 0.5, color: 'bg-teal-50 border-l-4 border-teal-500' },
    { name: 'Floyd Miles', time: '9:30 AM', day: 1, startHour: 9.5, duration: 0.5, color: 'bg-purple-50 border-l-4 border-purple-500' },
    { name: 'Floyd Miles', time: '9:30 AM', day: 2, startHour: 9, duration: 0.5, color: 'bg-pink-50 border-l-4 border-pink-500' },
    { name: 'Floyd Miles', time: '9:30 AM', day: 4, startHour: 10, duration: 0.5, color: 'bg-purple-50 border-l-4 border-purple-500' },
    { name: 'Floyd Miles', time: '10:00 AM', day: 6, startHour: 10, duration: 0.5, color: 'bg-purple-50 border-l-4 border-purple-500' },
    { name: 'Floyd Miles', time: '11:30 AM', day: 1, startHour: 11.5, duration: 0.5, color: 'bg-red-50 border-l-4 border-red-500' },
    { name: 'Floyd Miles', time: '9:30 AM', day: 3, startHour: 11, duration: 0.5, color: 'bg-teal-50 border-l-4 border-teal-500' },
    { name: 'Floyd Miles', time: '12:00 PM', day: 5, startHour: 12, duration: 0.5, color: 'bg-red-50 border-l-4 border-red-500' },
    { name: 'Floyd Miles', time: '12:00 PM', day: 2, startHour: 12, duration: 0.5, color: 'bg-purple-50 border-l-4 border-purple-500' },
    { name: 'Floyd Miles', time: '1:00 PM', day: 1, startHour: 13, duration: 0.5, color: 'bg-teal-50 border-l-4 border-teal-500' },
  ];

  

  return (
    <div className="min-h-screen bg-gray-50">
     

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl  border border-gray-100 overflow-x-auto">
          {/* Week Days Header */}
          <div className="flex border-b border-gray-200">
            <div className="w-20 flex-shrink-0"></div>
            {weekDays.map((day, index) => (
              <div key={index} className="flex-1 min-w-[100px] text-center py-3 border-l border-gray-200">
                <div className="text-xs font-medium text-gray-600 mb-1">{day}</div>
                <div className="text-lg font-medium text-gray-900">{dates[index]}</div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="relative">
            {/* GTM Row */}
            <div className="flex" style={{ height: '43px' }}>
              <div className="w-20 flex-shrink-0 px-3 py-2 text-right">
                <span className="text-xs text-gray-500">GTM+06</span>
              </div>
              {weekDays.map((_, index) => (
                <div key={index} className="flex-1 min-w-[100px] border-l border-b border-gray-200"></div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="flex" style={{ height: '86px' }}>
                <div className="w-20 flex-shrink-0 px-3 py-2 text-right">
                  <span className="text-xs text-gray-500">{time}</span>
                </div>
                {weekDays.map((_, dayIndex) => (
                  <div key={dayIndex} className="flex-1 min-w-[100px] border-l border-b border-gray-100 relative">
                   {appointments
  .filter(apt => {
    const slotHour = 9 + timeIndex; // timeIndex 0 = 9 AM
    return apt.day === dayIndex && Math.floor(apt.startHour) === slotHour;
  })
  .map((apt, aptIndex) => {
    const offset = (apt.startHour - Math.floor(apt.startHour)) * 86;
    return (
      <div
        key={aptIndex}
        className={`absolute left-1 right-1 ${apt.color} rounded-md p-2 text-xs`}
        style={{
          top: `${offset}px`,
          height: `${apt.duration * 86}px`
        }}
      >
        <div className="font-medium text-gray-900">{apt.name}</div>
        <div className="text-gray-600 text-xs">{apt.time}</div>
      </div>
    );
  })}

                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    
  );
};

export default CalendarWeekView;