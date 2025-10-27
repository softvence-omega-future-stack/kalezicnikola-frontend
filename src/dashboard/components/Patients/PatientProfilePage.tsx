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
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
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
        <h1 className="text-2xl font-semibold text-[#171C35] mb-6">Patient Profile</h1>

    
{/* Profile Section */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
  {/* Left: Patient Info + Photo inside same card */}
  <div className="bg-indigo-50 rounded-2xl p-6 flex justify-between items-start h-full">
    {/* Patient Info */}
    <div className="flex-1 pr-6 w-[800px] h-[251px] ">
      <h2 className="text-2xl font-semibold text-[#171C35] mb-1">Jonathon Sanders</h2>
      <p className="text-sm text-[#171C35]  mb-4">Insurance ID: #P170025</p>

      {/* First Row - Treatment, Diagnosis, Blood Sugar */}
      <div className="flex flex-wrap justify-between border-b border-gray-300 pb-3 mb-4">
        <div>
          <div className="text-base text-[#171C35]]">Treatment Phase</div>
          <div className="text-base font-semibold text-[#171C35]">Initial Inspection</div>
        </div>
        <div>
          <div className="text-base text-[#171C35]">Diagnosis</div>
          <div className="text-base font-semibold text-[#171C35]">Chronic Headache</div>
        </div>
        <div>
          <div className="text-lg text-[#171C35]">Blood Sugar</div>
          <div className="text-2xl font-semibold text-[#171C35]">
            90 <span className="text-sm">mg/dl</span>
          </div>
        </div>
      </div>

      {/* Second Row - Last Visited, Phone, Email */}
      <div className="flex flex-wrap justify-between">
        <div>
          <div className="text-lg text-gray-800">Last Visited</div>
          <div className="text-lg font-bold text-[#171C35]">30 Apr 2025</div>
        </div>
        <div>
          <div className="text-lg text-gray-800">Phone</div>
          <div className="text-lg font-bold text-[#171C35]">+1 54546 45648</div>
        </div>
        <div>
          <div className="text-lg text-gray-800">Email</div>
          <div className="text-lg font-bold text-[#171C35]">username@gmail.com</div>
        </div>
      </div>
    </div>

    {/* Patient Photo (inside card) */}
    <div className="h-[270px] w-[222px] rounded-2xl overflow-hidden bg-gradient-to-b -mt-20 from-blue-50 to-purple-50 shadow-md">
    
    <img src="https://i.ibb.co.com/d0ZCyRCP/patient-Profile-Icon.png" className='' alt="" />
    </div>
  </div>

  {/* Right: 3 Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* ESR Card */}
    <div className="bg-purple-100 rounded-2xl p-4">
      <div className="text-lg text-red-600 font-medium mb-1">
        ESR <span className="font-bold">(Critical)</span>
      </div>
      <div className="text-3xl font-bold text-[#171C35]">
        65 <span className="text-sm font-bold">mm/hr</span>
      </div>
      <div className="text-sm text-gray-700 mt-1">Inflammation (25% Increase)</div>
    </div>

    {/* Vitamin D Card */}
    <div className="bg-blue-100 rounded-2xl p-4">
      <div className="text-lg text-orange-600 font-bold mb-1">
        Vitamin D <span className="font-bold">(Minor)</span>
      </div>
      <div className="text-3xl font-bold text-[#171C35]">
        28 <span className="text-sm font-bold">ng/ml</span>
      </div>
      <div className="text-sm text-gray-700 mt-1">
        Stable but declining (15% Drop)
      </div>
    </div>

    {/* Overall Status */}
    <div className="bg-orange-100 rounded-2xl p-4 md:col-span-2">
      <div className="text-lg text-[#171C35] font-bold mb-2">Overall Status</div>
      <div className="text-xl font-bold text-[#171C35] mb-1">All Markers Stable</div>
      <div className="text-sm text-gray-800">No alerts generated at this time</div>
    </div>
  </div>
</div>




        {/* History Section */}
        <div className="bg-white rounded-lg ">
          <div className="p-6 ">
            <h2 className="text-lg font-semibold text-[#171C35]">Jonathon Sanders, History</h2>
          </div>

          {/* Tabs */}
          <div className=" border-gray-200">
            <div className="flex px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl -mb-px ${
                    activeTab === tab
                      ? 'bg-[#DCE2FF] text-[#171C35] rounded-xl'
                      : 'border-transparent text-gray-600 hover:text-[#171C35]'
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