


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
          <h2 className="text-2xl font-semibold text-[#171C35] mb-4">Appointments</h2>
          <div className="space-y-3">
            {appointments.map((apt, index) => (
              <div key={index} className="py-3 bg-[#FAFAFA] border-b px-2 border-gray-100 last:border-0 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#171C35]">{apt.type}</span>
                  <div className="flex items-center gap-3 mt-1 text-sm ">
                    <div className="flex items-center gap-1.5 font-bold text-[#171C35]">
                    <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" className='h-3 w-3' alt="" />
                      <span className="text-sm font-normal">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-[#171C35]">
                      <img src="https://i.ibb.co.com/TxG7Rk1Q/clock.png" alt="" />
                      <span className="text-sm font-normal">{apt.time}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded ${
                    apt.status === 'Upcoming' ? 'bg-[#0040FF1A] text-[#0040FF]' : 'bg-[#0080801A] text-[#008080]'
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