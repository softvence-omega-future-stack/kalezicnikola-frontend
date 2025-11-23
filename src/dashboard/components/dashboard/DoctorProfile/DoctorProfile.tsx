import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppointmentList from './AppointmentSidebar';
import AllApointment from './AllApointment';
import Patient from './Patient';
import home from '../../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../../assets/svgIcon/chevronnRight.svg';
import edit from '../../../../assets/svgIcon/edit2.svg';
import karen from '../../../../assets/svgIcon/karen.svg';

export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState('All Appointment');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-[30px]">
      {/* Header Breadcrumb */}
      <div className="mb-3.5">
        <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <img src={home} alt="" className="w-4 h-4" />
          <img src={chevron} alt="" className="w-3 h-3" />
          <span 
            onClick={() => navigate('/dashboard')} 
            className="cursor-pointer hover:text-gray-900"
          >
            Dashboard
          </span>
          <img src={chevron} alt="" className="w-3 h-3" />
          <span>Doctor</span>
          <img src={chevron} alt="" className="w-3 h-3" />
          <span className="text-[#111a2d] text-sm font-semibold">Doctor Profile</span>
        </div>
      </div>

      {/* Main Content */}
      <div className=" ">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-[#171C35] mb-8 lg:mb-20">
          Doctor Profile
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left Column - Profile + Tabs */}
          <div className="lg:col-span-2 space-y-4">
            {/* Profile Card */}
            <div className="bg-[#E5E9FF] rounded-2xl shadow-sm p-4 sm:p-6 mt-10 lg:mt-0">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0 -mt-16 sm:-mt-20">
                  <img
                    src={karen}
                    alt="Doctor"
                    className="w-[180px] h-[220px] sm:w-[222px] sm:h-[270px] rounded-2xl object-cover bg-gray-200 mx-auto sm:mx-0"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="min-w-0">
                      <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] truncate">
                        Keren nix
                      </h2>
                      <p className="text-sm font-medium text-[#171C35]">
                        MBBS, M.D. Cardiology
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-50 text-black font-semibold cursor-pointer rounded-2xl hover:bg-white/50 transition-colors flex-shrink-0">
                      <img src={edit} alt="" className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-[#111a2d] mb-1">Email</p>
                      <p className="text-sm sm:text-base font-semibold text-[#171c35] truncate">
                        username@gmail.com
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[#111a2d] mb-1">Phone</p>
                      <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                        +1 54564 45048
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[#111A2D] mb-1">Experience</p>
                      <p className="text-xl sm:text-2xl font-semibold text-[#171c35]">
                        08 <span className="text-sm sm:text-base font-semibold">years</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 min-w-0">
                    <p className="text-sm text-[#111A2D] mb-1">Address</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35] break-words">
                      123 Medical Center Blvd, Suite 456, New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white">
              {/* Tab Navigation */}
              <div className="flex gap-2 sm:gap-4 bg-[#FAFAFA] p-2 rounded-2xl mb-6 overflow-x-auto">
                {['All Appointment', 'Patients'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm sm:text-base font-medium transition-colors rounded-[12px] whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-[#DCE2FF] text-[#171C35]'
                        : 'text-[#667085]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-w-0">
                {activeTab === 'All Appointment' ? (
                  <AllApointment />
                ) : (
                  <Patient />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Appointment List */}
          {/* Always show below on mobile, right side on desktop */}
          <div className="lg:col-span-1 ">
            <AppointmentList />
          </div>
        </div>
      </div>
    </div>
  );
}