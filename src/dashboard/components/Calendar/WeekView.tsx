

export default function WeeklyCalendar() {
  const days = [
    { day: 'SUN', date: '28' },
    { day: 'MON', date: '29' },
    { day: 'TUE', date: '30' },
    { day: 'WED', date: '1' },
    { day: 'THU', date: '2' },
    { day: 'FRI', date: '3' },
    { day: 'SAT', date: '4' }
  ];

  const timeSlots = [
    'GTM+06',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 AM',
    '1 PM'
  ];

  const appointments = [
    { day: 0, time: 1, name: 'Floyd Miles', hour: '9:00 AM', color: 'bg-teal-100', border: 'border-l-4 border-teal-500' },
    { day: 0, time: 1.5, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-purple-100', border: 'border-l-4 border-purple-500' },
    { day: 0, time: 3, name: 'Floyd Miles', hour: '11:30 AM', color: 'bg-red-100', border: 'border-l-4 border-red-400' },
    { day: 1, time: 2, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-purple-100', border: 'border-l-4 border-purple-500' },
    { day: 2, time: 1.2, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-red-100', border: 'border-l-4 border-red-400' },
    { day: 2, time: 4, name: 'Floyd Miles', hour: '12:00 PM', color: 'bg-purple-100', border: 'border-l-4 border-purple-500' },
    { day: 3, time: 2.8, name: 'Floyd Miles', hour: '9:30 AM', color: 'bg-teal-100', border: 'border-l-4 border-teal-500' },
    { day: 4, time: 3.5, name: 'Floyd Miles', hour: '12:00 PM', color: 'bg-red-100', border: 'border-l-4 border-red-400' },
    { day: 1, time: 5, name: 'Floyd Miles', hour: '1:00 PM', color: 'bg-teal-100', border: 'border-l-4 border-teal-500' },
    { day: 6, time: 2, name: 'Floyd Miles', hour: '10:00 AM', color: 'bg-purple-100', border: 'border-l-4 border-purple-500' }
  ];

  return (
    <div className="min-h-screen  bg-white p-4 sm:p-6">
      <div className="w-[1112px] overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4"></div>
            {days.map((day, index) => (
              <div key={index} className="p-4 text-center border-l border-gray-200">
                <div className="text-xs font-medium text-gray-500 mb-1">{day.day}</div>
                <div className="text-2xl font-normal text-gray-900">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="relative">
            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="grid grid-cols-8 border-b border-gray-200 relative" style={{ height: '100px' }}>
                {/* Time Label */}
                <div className="p-4 text-sm text-gray-600 border-r border-gray-200">
                  {time}
                </div>

                {/* Day Columns */}
                {days.map((_, dayIndex) => (
                  <div key={dayIndex} className="border-l border-gray-200 relative">
                    {/* Appointments */}
                    {appointments
                      .filter(apt => apt.day === dayIndex && Math.floor(apt.time) === timeIndex)
                      .map((apt, aptIndex) => (
                        <div
                          key={aptIndex}
                          className={`absolute ${apt.color} ${apt.border} rounded-lg`}
                          style={{
                            top: `${(apt.time - timeIndex) * 100}px`,
                            left: '4px',
                            right: '4px',
                            height: '70px'
                          }}
                        >
                          <div className="p-4">
                            <div className="text-sm font-medium text-gray-900">{apt.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{apt.hour}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}