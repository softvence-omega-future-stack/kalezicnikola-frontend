import { useState } from 'react';
import {  Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import propfilePic from '../../../../../assets/svgIcon/srahSosnan.svg'


export default function StaffManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const staffMembers = [
    { id: 1, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Cardiologist', email: 'sarah@clinic.com', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Neurologist', email: 'sarah@clinic.com', status: 'Inactive' },
    { id: 3, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Head Nurse', email: 'sarah@clinic.com', status: 'Active' },
    { id: 4, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Lab Technician', email: 'sarah@clinic.com', status: 'Inactive' },
    { id: 5, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Pharmacist', email: 'sarah@clinic.com', status: 'Inactive' },
    { id: 6, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Receptionist', email: 'sarah@clinic.com', status: 'Active' },
    { id: 7, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Neurologist', email: 'sarah@clinic.com', status: 'Active' },
    { id: 8, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Cardiologist', email: 'sarah@clinic.com', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F6F6] ">
      <div className="">
     
     

        {/* Staff Management Card */}
        <div className="bg-white rounded-2xl ">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#1a1c21]">Staff Management</h2>
            <button   onClick={() => navigate('staff/add')} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#111A2D] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="w-4 h-4" />
              Add New Staff
            </button>
          </div>

       
       {/* Table - Desktop */}
<div className="w-full overflow-x-auto">
  <table className="min-w-[650px] w-full">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="text-left py-3 px-3 whitespace-nowrap">
          <div className="flex items-center gap-3">
            
            <span className="text-sm font-semibold text-[#171C35]">
              Patient Name
            </span>
          </div>
        </th>

        <th className="text-left py-3 px-3 text-sm font-semibold text-[#171C35] whitespace-nowrap">
          Joined
        </th>

        <th className="text-left py-3 px-3 text-sm font-semibold text-[#171C35] whitespace-nowrap">
          Role
        </th>

        <th className="text-left py-3 px-3 text-sm font-semibold text-[#171C35] whitespace-nowrap">
          Contact
        </th>

        <th className="text-left py-3 px-3 text-sm font-semibold text-[#171C35] whitespace-nowrap">
          Status
        </th>

        <th className="text-left py-3 px-3 text-sm font-semibold text-[#171C35] whitespace-nowrap">
          Profile
        </th>
      </tr>
    </thead>

    <tbody>
      {staffMembers.map((staff) => (
        <tr key={staff.id} className="border-b border-gray-100">
          {/* NAME */}
          <td className="py-3 px-3 whitespace-nowrap">
            <div className="flex items-center gap-3">
         

              <div className="flex items-center gap-3">
                <img
                  src={propfilePic}
                  alt={staff.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

            <div className="">
  <p className="text-sm font-medium text-[#111A2D] whitespace-normal leading-tight max-w-[120px]">
    {staff.name}
  </p>
  <p className="text-xs text-[#111A2D]">{staff.srn}</p>
</div>

              </div>
            </div>
          </td>

          {/* JOINED */}
          <td className="py-3 px-3 text-xs font-medium text-[#1a1c21] whitespace-nowrap">
            {staff.joined}
          </td>
          {/* <td className="py-3 px-3 text-xs font-medium text-[#1a1c21] whitespace-nowrap">
            {staff.joined}
          </td> */}

          {/* ROLE */}
          <td className="py-3 px-3 text-xs font-medium text-[#111A2D] whitespace-nowrap">
            {staff.role}
          </td>

          {/* EMAIL */}
          <td className="py-3 px-3 text-xs font-medium text-[#111A2D] whitespace-nowrap">
            {staff.email}
          </td>

          {/* STATUS */}
          <td className="py-3 px-3 whitespace-nowrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                staff.status === "Active"
                  ? "bg-[#0080801A] text-[#008080]"
                  : "bg-[#FF1C331A] text-[#FF1C33]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  staff.status === "Active" ? "bg-[#008080]" : "bg-[#FF1C33]"
                }`}
              ></span>
              {staff.status}
            </span>
          </td>

          {/* VIEW PROFILE */}
          <td className="py-3 px-3 whitespace-nowrap">
            <button
              onClick={() => navigate(`staff/profile/${staff.id}`)}
              className="flex items-center gap-1 text-xs text-[#526FFF] font-medium whitespace-nowrap cursor-pointer"
            >
              View Profile
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
 </div>
         {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
            <p className="text-sm font-medium text-[#000000]">Showing 1-8 of 63 staff members</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="px-4 py-2 text-basae font-semibold text-[#111A2D] bg-[#F3F6F6] border border-gray-300 rounded-xl  transition-colors disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 text-base font-semibold text-[#1a1c21] bg-[#F3F6F6] border border-gray-300 rounded-xl  transition-colors"
              >
                Next
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}