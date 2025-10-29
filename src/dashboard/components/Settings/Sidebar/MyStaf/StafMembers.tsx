import { useState } from 'react';
import { ChevronRight, Home, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#F3F6F6] p-4 md:p-8">
      <div className="">
        {/* Breadcrumb & Stats */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
          {/* Left side - Breadcrumb & Title */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            <ChevronRight size={12}/>
              <span>Settings</span>
            <ChevronRight size={12}/>
              <span className="text-[#1a1c21] font-medium">My Staff</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1a1c21]">Settings</h1>
          </div>

          {/* Right side - Stats */}
          <div className="flex flex-wrap gap-4">
            <div className=" px-6 py-3 min-w-[120px]">
              <p className="text-sm text-[#111A2D] font-semibold mb-1">Total Staff</p>
              <p className="text-[32px] font-medium text-[#171C35]">63</p>
            </div>
            <div className=" px-6 py-3 min-w-[120px]">
              <p className="text-sm text-[#111A2D] font-semibold mb-1">Active Staff</p>
              <p className="text-[32px] font-medium text-#171C35]">54</p>
            </div>
            <div className=" px-6 py-3 min-w-[120px]">
              <p className="text-sm text-[#111A2D] font-semibold mb-1">On Leave</p>
              <p className="text-[32px] font-medium text-[#171C35]">8</p>
            </div>
            <button className="w-12 h-12 bg-[#526FFF] rounded-lg flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

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
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  </th>
                  <th className="text-left py-4 px-6 text-base font-semibold text-[#171C35]">Patient Name</th>
                  <th className="text-left py-4 px-6 text-base font-semibold text-[#171C35]">Joined</th>
                  <th className="text-left py-4 px-6 text-base font-semibold text-[#171C35]">Role</th>
                  <th className="text-left py-4 px-6 text-base font-semibold text-[#171C35]">Contact</th>
                  <th className="text-left py-4 px-6 text-base font-semibold text-[#171C35]">Status</th>
                  <th className="text-left py-4 px-6 text-base font-semibold text-[#171C35]">Profile</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((staff) => (
                  <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://i.ibb.co/XZV3J9Gd/tabler-list.png?img=${staff.id}`}
                          alt={staff.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-[#111A2D]">{staff.name}</p>
                          <p className="text-sm font-medium text-[#111A2D]">{staff.srn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-[#1a1c21]">{staff.joined}</td>
                    <td className="py-4 px-6 text-sm font-medium text-[#111A2D]">{staff.role}</td>
                    <td className="py-4 px-6 text-sm font-medium text-[#111A2D]">{staff.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                        staff.status === 'Active' 
                          ? 'bg-[#0080801A] text-[#008080]' 
                          : 'bg-[#FF1C331A] text-[#FF1C33]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          staff.status === 'Active' ? 'bg-[#008080]' : 'bg-[#FF1C33]'
                        }`}></span>
                        {staff.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="flex items-center gap-1 text-sm text-[#526FFF]  font-medium">
                        View Profile
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile/Tablet */}
          <div className="lg:hidden divide-y divide-gray-100">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 mt-1" />
                  <img 
                    src={`https://i.pravatar.cc/150?img=${staff.id}`}
                    alt={staff.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1c21]">{staff.name}</p>
                    <p className="text-xs text-gray-600">{staff.srn}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    staff.status === 'Active' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      staff.status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                    }`}></span>
                    {staff.status}
                  </span>
                </div>
                <div className="ml-14 space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Joined:</span>
                    <span className="text-[#1a1c21]">{staff.joined}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Role:</span>
                    <span className="text-[#1a1c21]">{staff.role}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Contact:</span>
                    <span className="text-[#1a1c21]">{staff.email}</span>
                  </div>
                </div>
                <div className="ml-14">
                  <button    onClick={() => navigate(`staff/profile/${staff.id}`)}
                   className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Profile
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">Showing 1-8 of 63 staff members</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="px-4 py-2 text-md font-semibold text-[#1a1c21] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 text-md font-semibold text-[#1a1c21] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}