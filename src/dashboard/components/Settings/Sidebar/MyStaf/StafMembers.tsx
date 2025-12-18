// import { useState } from 'react';
// import { Plus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import propfilePic from '../../../../../assets/svgIcon/srahSosnan.svg';

// export default function StaffManagement() {
//   const { t } = useTranslation();
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   const staffMembers = [
//     { id: 1, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Cardiologist', email: 'sarah@clinic.com', status: 'Active' },
//     { id: 2, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Neurologist', email: 'sarah@clinic.com', status: 'Inactive' },
//     { id: 3, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Head Nurse', email: 'sarah@clinic.com', status: 'Active' },
//     { id: 4, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Lab Technician', email: 'sarah@clinic.com', status: 'Inactive' },
//     { id: 5, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Pharmacist', email: 'sarah@clinic.com', status: 'Inactive' },
//     { id: 6, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Receptionist', email: 'sarah@clinic.com', status: 'Active' },
//     { id: 7, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Neurologist', email: 'sarah@clinic.com', status: 'Active' },
//     { id: 8, name: 'Sarah Johnson', srn: 'SRN-10101', joined: 'May 15, 2012', role: 'Cardiologist', email: 'sarah@clinic.com', status: 'Active' },
//   ]

//   return (
//     <div className="min-h-screen bg-[#F3F6F6]">
//       <div className="bg-white rounded-2xl p-6 lg:pb-20">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//           <h2 className="text-xl font-semibold text-[#1a1c21]">{t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.title')}</h2>
//           <button
//             onClick={() => navigate('staff/add')}
//             className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#111A2D] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addButton')}
//           </button>
//         </div>

//         {/* Table */}
//         <div className="w-full overflow-x-auto">
//           <table className="min-w-[650px] w-full">
//             <thead>
//               <tr>
//                 <th className="text-left py-3 px-3 whitespace-nowrap">{t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.columns.name')}</th>
//                 <th className="text-left py-3 px-3 whitespace-nowrap">{t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.columns.joined')}</th>
//                 <th className="text-left py-3 px-3 whitespace-nowrap">{t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.columns.role')}</th>
//                 <th className="text-left py-3 px-3 whitespace-nowrap">{t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.columns.contact')}</th>
//                 <th className="text-left py-3 px-3 whitespace-nowrap">{t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.columns.status')}</th>
//                 <th className="text-left py-3 px-3 whitespace-nowrap">{t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.columns.profile')}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {staffMembers.map((staff) => (
//                 <tr key={staff.id} className="border-b border-gray-100">
//                   {/* NAME */}
//                   <td className="py-3 px-3 whitespace-nowrap flex items-center gap-3">
//                     <img src={propfilePic} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
//                     <div>
//                       <p className="text-base font-medium text-[#111A2D]">{staff.name}</p>
//                       <p className="text-sm text-[#111A2D]">{staff.srn}</p>
//                     </div>
//                   </td>
//                   {/* JOINED */}
//                   <td className="py-3 px-3 text-sm font-medium text-[#1a1c21]">{staff.joined}</td>
//                   {/* ROLE */}
//                   <td className="py-3 px-3 text-sm font-medium text-[#111A2D]">{staff.role}</td>
//                   {/* EMAIL */}
//                   <td className="py-3 px-3 text-sm font-medium text-[#111A2D]">{staff.email}</td>
//                   {/* STATUS */}
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <span
//                       className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${
//                         staff.status === 'Active' ? 'bg-[#0080801A] text-[#008080]' : 'bg-[#FF1C331A] text-[#FF1C33]'
//                       }`}
//                     >
//                       <span
//                         className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-[#008080]' : 'bg-[#FF1C33]'}`}
//                       ></span>
//                       {staff.status === 'Active' ? t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.status.active') : t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.status.inactive')}
//                     </span>
//                   </td>
//                   {/* VIEW PROFILE */}
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <button
//                       onClick={() => navigate(`staff/profile/${staff.id}`)}
//                       className="flex items-center gap-1 text-sm text-[#526FFF] font-medium cursor-pointer"
//                     >
//                       {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.viewProfile')}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
//           <p className="text-sm font-medium text-[#000000]">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.table.showing', { start: 1, end: staffMembers.length, total: 63 })}
//           </p>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 text-base font-semibold text-[#111A2D] bg-[#F3F6F6] border border-gray-300 rounded-xl disabled:opacity-50"
//             >
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.pagination.previous')}
//             </button>
//             <button
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-4 py-2 text-base font-semibold text-[#1a1c21] bg-[#F3F6F6] border border-gray-300 rounded-xl"
//             >
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.pagination.next')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import propfilePic from '../../../../../assets/svgIcon/srahSosnan.svg';
import { useAppSelector } from '@/store/hook';

export default function StaffManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector(state => state.auth);

  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStaff, setTotalStaff] = useState(0);

  // Fetch staff from backend
  const fetchStaff = async (page = 1, limit = 10) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/staffs?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStaffMembers(res.data.data.staffs);
      setTotalStaff(res.data.data.pagination.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStaff(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#F3F6F6]">
      <div className="bg-white rounded-2xl p-6 lg:pb-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-[#1a1c21]">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.title')}
          </h2>
          <button
            onClick={() => navigate('staff/add')}
            className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#111A2D] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addButton')}
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[650px] w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-3 whitespace-nowrap">{t('Name')}</th>
                <th className="text-left py-3 px-3 whitespace-nowrap">{t('Joined')}</th>
                <th className="text-left py-3 px-3 whitespace-nowrap">{t('Role')}</th>
                <th className="text-left py-3 px-3 whitespace-nowrap">{t('Email')}</th>
                <th className="text-left py-3 px-3 whitespace-nowrap">{t('Status')}</th>
                <th className="text-left py-3 px-3 whitespace-nowrap">{t('Profile')}</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="border-b border-gray-100">
                  <td className="py-3 px-3 whitespace-nowrap flex items-center gap-3">
                    <img
                      src={staff.photo ? staff.photo : propfilePic}
                      alt={staff.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-base font-medium text-[#111A2D]">
                        {staff.firstName} {staff.lastName}
                      </p>
                      <p className="text-sm text-[#111A2D]">{staff.employmentId}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-sm font-medium text-[#1a1c21]">
                    {staff.joinDate ? new Date(staff.joinDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-3 text-sm font-medium text-[#111A2D]">
                    {staff.position || staff.department || '-'}
                  </td>
                  <td className="py-3 px-3 text-sm font-medium text-[#111A2D]">{staff.email}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${
                        staff.employmentStatus === 'ACTIVE'
                          ? 'bg-[#0080801A] text-[#008080]'
                          : 'bg-[#FF1C331A] text-[#FF1C33]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          staff.employmentStatus === 'ACTIVE' ? 'bg-[#008080]' : 'bg-[#FF1C33]'
                        }`}
                      ></span>
                      {staff.employmentStatus === 'ACTIVE' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`staff/profile/${staff.id}`)}
                      className="flex items-center gap-1 text-sm text-[#526FFF] font-medium cursor-pointer"
                    >
                      {t('View Profile')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
          <p className="text-sm font-medium text-[#000000]">
            {`Showing ${1} to ${staffMembers.length} of ${totalStaff} staff`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-base font-semibold text-[#111A2D] bg-[#F3F6F6] border border-gray-300 rounded-xl disabled:opacity-50 cursor-pointer"
            >
              {t('Previous')}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 text-base font-semibold text-[#1a1c21] bg-[#F3F6F6] border border-gray-300 rounded-xl cursor-pointer"
            >
              {t('Next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

