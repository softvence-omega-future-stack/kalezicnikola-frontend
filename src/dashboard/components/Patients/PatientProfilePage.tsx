import React, { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import ParsonalInfo from './ParsonalInfo';
import PatientSummary from './PatientSummery';
import Appointment from './Appointment';
import PrescriptionsPage from './Prescription';
import LabResultsPage from './LabResults';

const PatientProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Personal Info');

  const tabs = ['Personal Info', 'Patient Summary', 'Appointment', 'Prescriptions', 'Lab Results'];

  return (
    <div className="min-h-screen ">
      {/* Header Navigation */}
      <div className="  px-6 py-3">
        <div className="flex items-center gap-4 text-sm">
          <button className="text-gray-400 hover:text-gray-600">
            <Home size={18} />
          </button>
          <span className="text-gray-400"><ChevronRight size={12}/> </span>
          <span className="text-gray-600">Dashboard</span>
          <span className="text-gray-400"><ChevronRight size={12}/> </span>
          <span className="text-gray-600">Patients</span>
          <span className="text-gray-400"><ChevronRight size={12}/> </span>
          <span className="text-[#171C35] font-medium">Patient Profile</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#171C35] mb-9">Zur Patientenakte</h1>

    
{/* Profile Section */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
  {/* Left Card - Patient Info + Photo */}
  <div className="xl:col-span-2 bg-[#E5E9FF] gap-[30px] rounded-2xl p-6 flex justify-between items-start">
    {/* Patient Info */}
    <div className="flex-1 pr-6">
      <h2 className="text-2xl font-semibold text-[#171C35] mb-1">Jonathon Sanders</h2>
      <p className="text-sm font-medium text-[#171C35] mb-4">Insurance ID: #P170025</p>

      {/* First Row */}
      <div className="flex flex-wrap justify-start gap-14 border-b border-gray-300 pb-3 mb-4">
        <div>
          <div className="text-sm text-[#111A2D]">Treatment Phase</div>
          <div className="text-base font-semibold text-[#171C35]">Initial Inspection</div>
        </div>
        <div>
          <div className="text-sm text-[#111A2D]">Diagnosis</div>
          <div className="text-base font-semibold text-[#171C35]">Chronic Headache</div>
        </div>
        <div>
          <div className="text-sm text-[#111A2D]">Blood Sugar</div>
          <div className="text-2xl font-semibold text-[#171C35]">
            90 <span className="text-sm">mg/dl</span>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-wrap justify-start gap-18">
        <div>
          <div className="text-sm text-[#111A2D]">Last Visited</div>
          <div className="text-base font-semibold text-[#171C35]">30 Apr 2025</div>
        </div>
        <div>
          <div className="text-sm text-[#111A2D]">Phone</div>
          <div className="text-base font-semibold text-[#171C35]">+1 54546 45648</div>
        </div>
        <div>
          <div className="text-sm text-[#111A2D]">Email</div>
          <div className="text-base font-semibold text-[#171C35]">username@gmail.com</div>
        </div>
      </div>
    </div>

    {/* Patient Photo */}
    <div className="h-[370px] w-[300px] rounded-2xl overflow-hidden  -mt-20 bg-white ">
      <img src="https://i.ibb.co.com/d0ZCyRCP/patient-Profile-Icon.png" className="h-full w-full object-cover" alt="" />
    </div>
  </div>

  {/* Right Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:col-span-1">
    {/* ESR Card */}
    <div className="bg-[#E5DFF5] rounded-2xl p-4">
      <div className="text-sm text-[#171C35] font-normal mb-1">
        ESR <span className="text-[#FF3D3D] ">(Critical)</span>
      </div>
      <div className="text-2xl font-semibold text-[#171C35]">
        65 <span className="text-sm">mm/hr</span>
      </div>
      <div className="text-sm text-[#171C35] mt-1">Inflammation (25% Increase)</div>
    </div>

    {/* Vitamin D Card */}
    <div className="bg-[#D0E1F5] rounded-2xl p-4">
      <div className="text-sm text-[#171C35] font-normal mb-1">
        Vitamin D <span className="font-bold text-[#FF6200]">(Minor)</span>
      </div>
      <div className="text-2xl font-semibold text-[#171C35]">
        28 <span className="text-sm ">ng/ml</span>
      </div>
      <div className="text-sm text-[#171C35] mt-1">
        Stable but declining (15% Drop)
      </div>
    </div>

    {/* Overall Status */}
    <div className="bg-[#FADACA] rounded-2xl p-4 md:col-span-2">
      <div className="text-sm text-[#171C35]  mb-2">Overall Status</div>
      <div className="text-xl font-semibold text-[#171C35] mb-1">All Markers Stable</div>
      <div className="text-sm text-[#111A2D]">No alerts generated at this time</div>
    </div>
  </div>
</div>





        {/* History Section */}
        <div className="bg-white rounded-lg ">
          <div className="p-6 ">
            <h2 className="text-2xl font-semibold text-[#171C35]">Jonathon Sanders, History</h2>
          </div>

          {/* Tabs */}
          <div className=" border-gray-200 bg-gray-50 py-2 mx-4 rounded-2xl ">
            <div className="flex px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl -mb-px   ${
                    activeTab === tab
                      ? 'bg-[#DCE2FF] text-[#171C35] rounded-xl'
                      : 'border-transparent text-gray-600 '
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content - Personal Info */}
          {activeTab === 'Personal Info' && (
           <ParsonalInfo/>
          )}

          {/* Other tabs content placeholder */}
          {activeTab == 'Patient Summary' && (
            <div className="">
             <PatientSummary/>
            </div>
          )}
          {/* Other tabs content placeholder */}
          {activeTab == 'Appointment' && (
            <div className="">
             <Appointment/>
            </div>
          )}
          {/* Other tabs content placeholder */}
          {activeTab == 'Prescriptions' && (
            <div className="">
             <PrescriptionsPage/>
            </div>
          )}

          {activeTab == 'Lab Results' && (
            <div className="">
             <LabResultsPage/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;