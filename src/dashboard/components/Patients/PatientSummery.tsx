import { ArrowUpRight } from 'lucide-react';

export default function PatientSummary() {
  const summaryCards = [
    {
      title: 'Next Appointment',
      date: 'April 20, 2024',
      detail: '1:30 PM - Check-up',
      bgColor: 'bg-[#EDF0FF]'
    },
    {
      title: 'Active Medications',
      count: '3 Active Prescriptions',
      detail: 'Last updated: Feb 3, 2024',
      bgColor: 'bg-[#EDF0FF]'
    },
    {
      title: 'Recent Lab Results',
      type: 'Comprehensive Metabolic Panel',
      detail: 'January 20, 2024',
      bgColor: 'bg-[#EDF0FF]'
    },
    {
      title: 'Recent call',
      type: 'Call Type: Follow-up',
      detail: 'Call Duration: 01h 45min',
      bgColor: 'bg-[#EDF0FF]'
    }
  ];

  const appointments = [
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Upcoming' },
    { type: 'Follow-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
      { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
      { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete'},
      { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-base font-semibold text-[#171C35] mb-1">Patient Summary</h1>
        <p className="text-base font-medium text-[#111A2D]">Overview of patient's health status and recent activities.</p>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className={`relative flex-1  h-[150px] p-6 rounded-[28px] overflow-hidden ${card.bgColor}`}
          >
            <h3 className="text-xl font-semibold text-[#171C35] mb-3">{card.title}</h3>
            <p className="text-sm font-medium text-[#1318319C]">
              {card.date || card.count || card.type}
            </p>
            <p className="text-sm font-semibold text-[#171C35] mt-2">{card.detail}</p>

            {/* Bottom-right arrow */}
<div className="absolute -top-4 -right-2 w-[70px] h-[70px]">
  {/* Outer light circle */}
  <div className="absolute inset-0 bg-white rounded-full"></div>

  {/* Inner black circle (centered arrow) */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
      <ArrowUpRight className="w-5 h-5" />
    </div>
  </div>
</div>


          </div>
        ))}
      </div>

      {/* Appointments Section */}
      <div className="rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-[#171C35] mb-4">Appointments</h2>
        <div className="space-y-3">
          {appointments.map((apt, index) => (
            <div
              key={index}
              className="py-3 bg-[#FAFAFA] border-b px-2 border-gray-100 last:border-0 rounded-2xl flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold text-[#171C35]">{apt.type}</span>
                <div className="flex items-center gap-3 mt-1 text-sm text-[#111A2D]">
                  <div className="flex items-center gap-1.5 text-sm  text-[#111A2D]">
                    <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" className='h-3 w-3' alt="" />
                    <span className="text-sm font-normal">{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5  text-[#111A2D]">
                    <img src="https://i.ibb.co.com/TxG7Rk1Q/clock.png" alt="" />
                    <span className="text-sm font-normal">{apt.time}</span>
                  </div>
                </div>
              </div>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-[8px] ${
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
  );
}
