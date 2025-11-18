import React, { useState } from "react";

import ParsonalInfo from "./ParsonalInfo";
import PatientSummary from "./PatientSummery";
import Appointment from "./Appointment";
import PrescriptionsPage from "./Prescription";
import LabResultsPage from "./LabResults";

import homeIcon from "../../../assets/svgIcon/homeIcon.svg";
import chevronIcon from "../../../assets/svgIcon/chevronnRight.svg";

const PatientProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");

  const tabs = [
    "Personal Info",
    "Patient Summary",
    "Appointment",
    "Prescriptions",
    "Lab Results",
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Header Navigation */}
      <div className="px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button className="text-gray-400 hover:text-gray-600">
            <img src={homeIcon} alt="" />
          </button>

          <img src={chevronIcon} alt="" className="text-gray-400" />
          <span className="text-gray-600">Dashboard</span>

          <img src={chevronIcon} alt="" className="text-gray-400" />
          <span className="text-gray-600">Patients</span>

          <img src={chevronIcon} alt="" className="text-gray-400" />
          <span className="text-[#171C35] font-medium">Patient Profile</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h1 className="text-2xl font-semibold text-[#171C35] mb-5 sm:mb-9">
          Zur Patientenakte
        </h1>

        {/* Profile Section START */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">

          {/* Left: Patient Info + Photo */}
          <div className="xl:col-span-2 bg-[#E5E9FF] rounded-[24px] p-4 sm:p-6 flex flex-col xl:flex-row justify-between items-start gap-4">
            
            {/* Patient Info */}
            <div className="flex-1 pr-0 xl:pr-6 w-full">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] mb-1">
                Jonathon Sanders
              </h2>
              <p className="text-sm font-medium text-[#171C35] mb-4">
                Insurance ID: #P170025
              </p>

              {/* First Row */}
              <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-gray-300 pb-3 mb-4">
                <div>
                  <div className="text-sm text-[#111A2D]">Treatment Phase</div>
                  <div className="font-semibold text-[#171C35]">
                    Initial Inspection
                  </div>
                </div>

                <div>
                  <div className="text-sm text-[#111A2D]">Diagnosis</div>
                  <div className="font-semibold text-[#171C35]">
                    Chronic Headache
                  </div>
                </div>

                <div>
                  <div className="text-sm text-[#111A2D]">Blood Sugar</div>
                  <div className="text-2xl font-semibold text-[#171C35]">
                    90 <span className="text-sm">mg/dl</span>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="flex flex-wrap gap-x-14 gap-y-4">
                <div>
                  <div className="text-sm text-[#111A2D]">Last Visited</div>
                  <div className="font-semibold text-[#171C35]">
                    30 Apr 2025
                  </div>
                </div>

                <div>
                  <div className="text-sm text-[#111A2D]">Phone</div>
                  <div className="font-semibold text-[#171C35]">
                    +1 54546 45648
                  </div>
                </div>

                <div>
                  <div className="text-sm text-[#111A2D]">Email</div>
                  <div className="font-semibold text-[#171C35]">
                    username@gmail.com
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full sm:w-[260px] md:w-[300px] h-[320px] sm:h-[360px] xl:h-[370px] rounded-[28px] overflow-hidden bg-white self-center xl:self-auto">
              <img
                src="https://i.ibb.co.com/d0ZCyRCP/patient-Profile-Icon.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* ESR */}
            <div className="bg-[#E5DFF5] rounded-3xl p-4">
              <div className="text-sm text-[#171C35] mb-1">
                ESR <span className="text-[#FF3D3D]">(Critical)</span>
              </div>
              <div className="text-2xl font-semibold text-[#171C35]">
                65 <span className="text-sm">mm/hr</span>
              </div>
              <div className="text-sm text-[#171C35] mt-1">
                Inflammation (25% Increase)
              </div>
            </div>

            {/* Vitamin D */}
            <div className="bg-[#D0E1F5] rounded-3xl p-4">
              <div className="text-sm text-[#171C35] mb-1">
                Vitamin D{" "}
                <span className="font-bold text-[#FF6200]">(Minor)</span>
              </div>
              <div className="text-2xl font-semibold text-[#171C35]">
                28 <span className="text-sm">ng/ml</span>
              </div>
              <div className="text-sm text-[#171C35] mt-1">
                Stable but declining (15% Drop)
              </div>
            </div>

            {/* Overall Status */}
            <div className="bg-[#FADACA] rounded-3xl p-4 sm:col-span-2">
              <div className="text-sm text-[#171C35] mb-1">Overall Status</div>
              <div className="text-xl font-semibold text-[#171C35] mb-1">
                All Markers Stable
              </div>
              <div className="text-sm text-[#111A2D]">
                No alerts generated at this time
              </div>
            </div>
          </div>
        </div>
        {/* Profile Section END */}

        {/* History Section */}
        <div className="bg-white rounded-2xl">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35]">
              Jonathon Sanders, History
            </h2>
          </div>

          {/* Tabs */}
          <div className="bg-gray-50 py-2 mx-4 rounded-2xl overflow-x-auto">
            <div className="flex px-4 sm:px-6 gap-2 sm:gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 text-sm whitespace-nowrap rounded-xl transition cursor-pointer 
                  ${
                    activeTab === tab
                      ? "bg-[#DCE2FF] text-[#171C35]"
                      : "text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6  ">
            {activeTab === "Personal Info" && <ParsonalInfo />}
            {activeTab === "Patient Summary" && <PatientSummary />}
            {activeTab === "Appointment" && <Appointment />}
            {activeTab === "Prescriptions" && <PrescriptionsPage />}
            {activeTab === "Lab Results" && <LabResultsPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
