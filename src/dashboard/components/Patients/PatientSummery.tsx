import {  ArrowRight } from 'lucide-react';

export default function PatientSummary() {
  const summaryCards = [
    {
      title: 'Next Appointment',
      date: 'April 20, 2024',
      detail: '1:30 PM - Check-up'
    },
    {
      title: 'Active Medications',
      count: '3 Active Prescriptions',
      detail: 'Last updated: Feb 3, 2024'
    },
    {
      title: 'Recent Lab Results',
      type: 'Comprehensive Metabolic Panel',
      detail: 'January 20, 2024'
    },
    {
      title: 'Recent call',
      type: 'Comprehensive Metabolic Panel',
      detail: 'Call Duration : 01h-45min'
    }
  ];

  const appointments = [
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Upcoming' },
    { type: 'Follow-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' },
    { type: 'Check-up', date: '27-09-2025', time: '01:00 AM', status: 'Complete' }
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#171C35] mb-1">Patient Summary</h1>
          <p className="text-base font-medium text-[#111A2D]">Overview of patient's health status and recent activities.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-blue-50 rounded-2xl border border-gray-100 p-5 hover:shadow-md ">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#171C35] mb-7">{card.title}</h3>
                <button className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-[#131831] font-medium">
                  {card.date || card.count || card.type}
                </p>
                <p className="text-sm font-semibold text-[#171C35]">{card.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Appointments Section */}
        <div className="gap- rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-[#171C35] mb-4">Appointments</h2>
          <div className="space-y-3">
            {appointments.map((apt, index) => (
              <div key={index} className="py-3 bg-gray-50 border-b px-2 border-gray-100 last:border-0 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#171C35]">{apt.type}</span>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 font-semibold text-[#111A2D]">
                 
g
                      <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.pn" alt="" />
                      <span className='text-sm font-normal'>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-black">
                        <img src=" https://i.ibb.co.com/TxG7Rk1Q/clock.png" alt="" />
                      <span  className='text-sm font-normal'>{apt.time}</span>
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
    </div>
  );
}
