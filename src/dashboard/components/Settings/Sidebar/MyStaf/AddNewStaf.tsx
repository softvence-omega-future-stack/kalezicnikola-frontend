import { useState } from "react";
import PersonalInfo from "./PersonalInfo";  
import EmployeeDetailsForm from "./EmployedForm";
import home from "../../../../../assets/svgIcon/homeIcon.svg";
import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";
import { useNavigate } from "react-router-dom";


export default function AddNewStaff() {
  const [activeTab, setActiveTab] = useState("personal");
const navigate = useNavigate()
  // Next button handler
  const handleNext = () => {
    if (activeTab === "personal") {
      setActiveTab("employment"); // next tab
    } else {
      console.log("Form Data:", {
        personal: "your personal info state here",
        employment: "your employment info state here",
      });
      alert("Staff data saved (frontend only)");
    }
  };

  return (
    <div className="min-h-screen mt-6">
      <div className=" px-2 sm:px-0 ">
        {/* Header */}
             {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-base py-6 text-gray-600 ">
        <img src={home} alt="" />
        <span onClick={()=> navigate('/dashboard')} className="cursor-pointer" >Dashboard</span>
        <img src={chevron} alt="" />
        <span onClick={()=> navigate('/dashboard/settings')} className="cursor-pointer">Setting</span>
        <img src={chevron} alt="" />
        <span className="text-[#171c35] font-medium">My Staff</span>
      </div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#171c35] mb-1">Personal Information</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-[#171C35] font-medium text-lg ">Add New Staff</h2>
          <p className="text-[#667085] text-sm font-medium mb-4 ">Create a new staff member profile</p>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-2 mb-8 bg-[#FAFAFA] rounded-xl py-2 px-5">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-2.5 text-base font-medium rounded-full transition-colors cursor-pointer ${
                activeTab === "personal"
                  ? "bg-[#DCE2FF] text-[#171c35]"
                  : "text-[#667085]"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("employment")}
              className={`px-6 py-2.5 text-md font-semibold rounded-full transition-colors cursor-pointer ${
                activeTab === "employment"
                  ? "bg-[#DCE2FF] text-[#171c35]"
                  : "text-[#667085]"
              }`}
            >
              Employment
            </button>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "employment" && <EmployeeDetailsForm />}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-[#171c35] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Cancel
            </button>

            <button
              onClick={handleNext}
              className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-white bg-[#526FFF] rounded-xl focus:outline-none transition-colors"
            >
              {activeTab === "personal" ? "Next" : "Save"}

            {/* <button className="w-full px-6 py-3 text-sm font-medium text-white bg-[#526FFF] rounded-xl focus:outline-none transition-colors">
              Next */}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
