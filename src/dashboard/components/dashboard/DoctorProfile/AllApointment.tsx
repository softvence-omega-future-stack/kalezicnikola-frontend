


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
                <h3 className="text-2xl font-semibold text-[#171C35] mb-4">Appointment History</h3>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-[#FAFAFA] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                       
                        <div>
                          <p className="text-base font-semibold text-[#171c35]">{apt.type}</p>
                          <div className="flex items-center gap-2 mt-2 ">
                               <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" className='h-3 w-3' alt="" />
                            <span className=" text-[#111A2D] text-sm">{apt.date}</span>
                            <span className=" text-[#111A2D] text-sm flex items-center gap-2">
                                 <img src="https://i.ibb.co.com/TxG7Rk1Q/clock.png" alt="" />
                              {apt.time}
                              </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          apt.status === 'Upcoming'
                            ? 'bg-[#0040FF1A] text-[#0040FF]'
                            : 'bg-[#0080801A] text-[#008080]'
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