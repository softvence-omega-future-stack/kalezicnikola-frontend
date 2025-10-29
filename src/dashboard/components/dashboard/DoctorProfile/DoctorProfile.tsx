import  { useState } from 'react';
import { ChevronRight, Home,  } from 'lucide-react';
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
    <div className="min-h-screen bg-[#EFF1F1E5]">
      {/* Header */}
      <div className="  px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <span><ChevronRight size={12}/></span>
          <span>Dashboard</span>
          <span><ChevronRight size={12}/></span>
          <span>Doctor</span>
         <span><ChevronRight size={12}/></span>
          <span className="text-[#111a2d] font-medium">Doctor Profile</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#171C35] mb-20">Doctor Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
         <div className="bg-[#E5E9FF] rounded-2xl shadow-sm p-6">
  <div className="flex flex-col sm:flex-row gap-6 ">
    {/* Profile Image */}
    <div className="flex-shrink-0 -mt-20"> 
      <img
        src="https://i.ibb.co.com/tM6Sb5kF/KarenNix.png"
        alt="Doctor"
        className="w-[222px] h-[270px] rounded-2xl object-cover bg-gray-200"
      />
    </div>

    {/* Profile Info */}
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#171C35]">Keren nix</h2>
          <p className="text-sm font-medium text-[#171C35]">MBBS, M.D. Cardiology</p>
        </div>
        <button className="mt-2 sm:mt-0 flex items-center gap-2 px-4 py-2 text-2xl border border-gray-50 text-black font-semibold cursor-pointer rounded-2xl">
        <img src="https://i.ibb.co.com/npcq8wc/Edit.png" alt="" />
          <span>Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-[#111a2d]mb-1">Email</p>
          <p className="text-base font-semibold text-[#171c35]">username@gmail.com</p>
        </div>
        <div>
          <p className="text-sm text-[#111a2d]mb-1">Phone</p>
          <p className="text-base font-semibold text-[#171c35]">+1 54564 45048</p>
        </div>
        <div>
          <p className="text-sm text-[#111A2D] mb-1">Experience</p>
          <p className="text-2xl font-semibold text-[#171c35]">08 <span className="text-base font-semibold">years</span></p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-[#111A2D] mb-1">Address</p>
        <p className="text-base font-semibold text-[#171c35]">123 Medical Center Blvd, Suite 456, New York, NY 10001</p>
      </div>
    </div>
  </div>
</div>


          <div className=' p-6 rounded-2xl bg-white '>
              {/* Tabs */}
            <div className="flex gap-4  bg-[#FAFAFA] p-2 rounded-2xl mb-6">
              {['All Appointment', 'Patients'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 text-base text-[#171C35] font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-[#DCE2FF] px-4 py-2 rounded-[12px]  '
                      : 'text-[#667085] font-medium text-base'
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
