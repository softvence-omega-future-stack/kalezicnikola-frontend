import  { useState } from 'react';
import { Home, Edit2 } from 'lucide-react';
import AppointmentList from './AppointmentSidebar';
import AllApointment from './AllApointment';
import Patient from './Patient';

export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState('All Appointment');



//   const todayAppointments = [
//     { name: 'William Brooks', id: '+2345789', diagnosis: 'Headache', time: '9:30 - 09:45 am' },
//     { name: 'Leslie Alexander', time: '08:00 - 09:00 AM', isNew: true },
//     { name: 'Jane Cooper', time: '10:00 - 10:30 AM' },
//     { name: 'Esther Howard', time: '11:00 - 11:45 AM', diagnosis: 'Fever' },
//     { name: 'Cody Fisher', time: '12:00 - 12:30 PM' },
//     { name: 'Brooklyn Simmons', time: '01:00 - 01:45 PM' },
//   ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span>Dashboard</span>
          <span>/</span>
          <span>Doctor</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Doctor Profile</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-20">Doctor Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
         <div className="bg-indigo-100 rounded-2xl shadow-sm p-6">
  <div className="flex flex-col sm:flex-row gap-6 ">
    {/* Profile Image */}
    <div className="flex-shrink-0 -mt-20"> 
      <img
        src="https://i.ibb.co.com/qwJ83Rb/Screenshot-2025-10-23-153749.png"
        alt="Doctor"
        className="w-[222px] h-[270px] rounded-2xl object-cover bg-gray-200"
      />
    </div>

    {/* Profile Info */}
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Keren nix</h2>
          <p className="text-xl font-semibold text-gray-900">MBBS, M.D. Cardiology</p>
        </div>
        <button className="mt-2 sm:mt-0 flex items-center gap-2 px-4 py-2 text-xl border border-gray-300 text-black font-semibold cursor-pointer rounded-lg">
          <Edit2 className="w-6 h-6" />
          <span>Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-lg text-gray-900 mb-1">Email</p>
          <p className="text-lg font-bold text-gray-900">username@gmail.com</p>
        </div>
        <div>
          <p className="text-lg text-gray-900 mb-1">Phone</p>
          <p className="text-lg font-bold text-gray-900">+1 54564 45048</p>
        </div>
        <div>
          <p className="text-lg text-gray-900 mb-1">Experience</p>
          <p className="text-2xl font-bold text-gray-900">08 <span className="text-xl font-bold">years</span></p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-lg text-gray-900 mb-1">Address</p>
        <p className="text-lg font-bold text-gray-900">123 Medical Center Blvd, Suite 456, New York, NY 10001</p>
      </div>
    </div>
  </div>
</div>


            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200">
              {['All Appointment', 'Patients'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 text-xl font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-indigo-100 px-4 py-2 rounded-xl  '
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'All Appointment' ? (
              <div>
                <AllApointment/>
              </div>
            ) : (
              <div>
              <Patient/>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <AppointmentList/>
          </div>
        </div>
    </div>
    </div>
  );
}
