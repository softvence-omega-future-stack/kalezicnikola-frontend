import { useState } from "react";
import PersonalInfo from "./PersonalInfo";  
import EmployeeDetailsForm from "./EmployedForm";


export default function AddNewStaff() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Add New Staff</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-2.5 text-md font-semibold rounded-full transition-colors ${
                activeTab === "personal"
                  ? "bg-blue-100 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("employment")}
              className={`px-6 py-2.5 text-md font-semibold rounded-full transition-colors ${
                activeTab === "employment"
                  ? "bg-blue-100 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Employment
            </button>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "employment" && <EmployeeDetailsForm/>}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button className="w-full px-6 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Cancel
            </button>
            <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
