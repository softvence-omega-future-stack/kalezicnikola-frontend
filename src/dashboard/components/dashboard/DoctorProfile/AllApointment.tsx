import { Calendar, Clock } from "lucide-react"


const AllApointment = () => {
      const appointments = [
    { id: 1, type: 'Check-up', date: '27-09-2050', time: '09:00 AM', status: 'Upcoming' },
    { id: 2, type: 'Follow-up', date: '27-09-2050', time: '09:00 AM', status: 'Complete' },
    { id: 3, type: 'Check-up', date: '27-09-2050', time: '09:00 AM', status: 'Complete' },
    { id: 4, type: 'Check-up', date: '27-09-2050', time: '09:00 AM', status: 'Complete' },
    { id: 5, type: 'Check-up', date: '27-09-2050', time: '09:00 AM', status: 'Complete' },
  ];
  return (
    <div className="">
        <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Appointment History</h3>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                       
                        <div>
                          <p className="text-lg font-medium text-gray-900">{apt.type}</p>
                          <div className="flex items-center gap-2 mt-2 ">
                             <Calendar size={6} className="w-5 h-5 text-gray-700 font-semibold" />
                            <span className=" text-gray-800">{apt.date}</span>
                            <span className=" text-gray-800 flex items-center gap-2"><Clock className="font-bold text-sm" size={14}/>{apt.time}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-lg font-medium ${
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

export default AllApointment