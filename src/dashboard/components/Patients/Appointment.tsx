import { Calendar, Clock } from "lucide-react";


const Appointment = () => {
      const appointments = [
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Upcoming' },
    { type: 'Follow-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' }
  ];
  return (
    <div>
          <div className="gap- rounded-lg p-6">
          <h2 className="text-2xl font-bold text-black mb-4">Appointments</h2>
          <div className="space-y-3">
            {appointments.map((apt, index) => (
              <div key={index} className="py-3 bg-gray-50 border-b px-2 border-gray-100 last:border-0 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">{apt.type}</span>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <Calendar className="w-3.5 h-3.5 " />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-black">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded ${
                    apt.status === 'Upcoming'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-teal-50 text-teal-700'
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Appointment