import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import AllApointment from './AllApointment';
import Patient from './Patient';
import home from '../../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../../assets/svgIcon/chevronnRight.svg';
import edit from '../../../../assets/svgIcon/edit2.svg';
import karen from '../../../../assets/svgIcon/karen.svg';
import AppointmentsList from '../AppointmentSidebar';
import axios from 'axios';
import { useAppSelector } from '@/store/hook';

export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState('allAppointments');
  const navigate = useNavigate();
  const { t } = useTranslation();
   const { accessToken } = useAppSelector((state) => state.auth);
  // const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    gender: "",
    specialities: [] as string[],
    experience: "",
    profilePic: karen,
  });

  useEffect(() => {
  const fetchUserData = async () => {

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/my-profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = response.data.data.profile;
    console.log("Profile Data:", profile);

    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "N/A",
      phoneNumber: profile.phone || "N/A",
      address: profile.address || "N/A",
      dob: profile.dob ? profile.dob.split("T")[0] : "N/A", // Convert ISO -> YYYY-MM-DD
      gender: profile.gender || "",
      specialities: profile.specialities || [],
      experience: profile.experience ,
      profilePic: profile.photo || karen,
    });
  };

  fetchUserData();
}, []);

  const tabs = [
    { key: 'allAppointments', label: t('dashboard.doctorProfile.tabs.allAppointments') },
    { key: 'patients', label: t('dashboard.doctorProfile.tabs.patients') },
  ];

  return (
    <div className="min-h-screen mt-[30px] p-6">
      {/* Breadcrumb */}
      <div className="mb-3.5">
        <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <img src={home} alt="" className="w-4 h-4" />
          <img src={chevron} alt="" className="w-3 h-3" />
          <span onClick={() => navigate('/dashboard')} className="cursor-pointer hover:text-gray-900">
            {t('dashboard.doctorProfile.breadcrumb.dashboard')}
          </span>
          <img src={chevron} alt="" className="w-3 h-3" />
          <span>{t('dashboard.doctorProfile.breadcrumb.doctor')}</span>
          <img src={chevron} alt="" className="w-3 h-3" />
          <span className="text-[#111a2d] text-sm font-semibold">
            {t('dashboard.doctorProfile.breadcrumb.profile')}
          </span>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-semibold text-[#171C35] mb-8 lg:mb-20">
        {t('dashboard.doctorProfile.pageTitle')}
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profile Card */}
          <div className="bg-[#E5E9FF] rounded-2xl shadow-sm p-4 sm:p-6 mt-10 lg:mt-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0 -mt-16 sm:-mt-20">
                <img
                  src={karen}
                  alt="Doctor"
                  className="w-[180px] h-[220px] sm:w-[222px] sm:h-[270px] rounded-2xl object-cover bg-gray-200 mx-auto sm:mx-0"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] truncate">
                      {/* {t('dashboard.doctorProfile.profile.name')} */}
                      {formData.firstName} {formData.lastName}
                    </h2>
                    <p className="text-sm font-medium text-[#171C35]">
                      {/* {t('dashboard.doctorProfile.profile.degree')} */}
                      {formData.specialities.length === 0 ? ' General Practitioner' : ` - ${formData.specialities.join(', ')}`}

                      
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-50 text-black font-semibold cursor-pointer rounded-2xl hover:bg-white/50 transition-colors flex-shrink-0">
                    <img src={edit} alt="" className="w-4 h-4" />
                    <span>{t('dashboard.doctorProfile.profile.edit')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-[#111a2d] mb-1">{t('dashboard.doctorProfile.profile.email')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35] truncate">
                      {formData.email}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[#111a2d] mb-1">{t('dashboard.doctorProfile.profile.phone')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {formData.phoneNumber}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[#111A2D] mb-1">{t('dashboard.doctorProfile.profile.experience')}</p>
                    <p className="text-xl sm:text-2xl font-semibold text-[#171c35]">
                        {formData.experience
                        ? `${formData.experience} ${t('dashboard.doctorProfile.profile.years')}`
                        : <div className='font-semibold text-[#171c35] text-base'>N/A</div>
                        }

                    </p>
                  </div>
                </div>

                <div className="mt-4 min-w-0">
                  <p className="text-sm text-[#111A2D] mb-1">{t('dashboard.doctorProfile.profile.address')}</p>
                  <p className="text-sm sm:text-base font-semibold text-[#171c35] break-words">
                    {/* 123 Medical Center Blvd, Suite 456, New York, NY 10001 */}
                    {formData.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white">
            <div className="flex gap-2 sm:gap-4 bg-[#FAFAFA] p-2 rounded-2xl mb-6 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm sm:text-base font-medium transition-colors rounded-[12px] whitespace-nowrap cursor-pointer ${
                    activeTab === tab.key ? 'bg-[#DCE2FF] text-[#171C35]' : 'text-[#667085]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-w-0">
              {activeTab === 'allAppointments' ? <AllApointment /> : <Patient />}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 ">
         <AppointmentsList/>
        </div>
      </div>
    </div>
  );
}



// // ==================== DoctorProfile.tsx ====================
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';


// import AllApointment from './AllApointment';
// import Patient from './Patient';
// import home from '../../../../assets/svgIcon/homeIcon.svg';
// import chevron from '../../../../assets/svgIcon/chevronnRight.svg';
// import edit from '../../../../assets/svgIcon/edit2.svg';
// import karen from '../../../../assets/svgIcon/karen.svg';
// import AppointmentsList from '../AppointmentSidebar';

// import { useGetMyProfileQuery } from '@/store/features/doctorSettings/doctorProfileApi';
// import EditProfileModal from './EditProfileModal';

// export default function DoctorProfile() {
//   const [activeTab, setActiveTab] = useState('allAppointments');
//   const [showEditModal, setShowEditModal] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   // ✅ Fetch profile data
//   const { data: profile, isLoading, isError, refetch } = useGetMyProfileQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const tabs = [
//     { key: 'allAppointments', label: t('dashboard.doctorProfile.tabs.allAppointments') },
//     { key: 'patients', label: t('dashboard.doctorProfile.tabs.patients') },
//   ];

//   // ✅ Calculate years of experience
//   const calculateExperience = (createdAt: string) => {
//     const years = new Date().getFullYear() - new Date(createdAt).getFullYear();
//     return years > 0 ? years : 0;
//   };

//   // ✅ Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen mt-[30px] p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526FFF] mx-auto mb-4"></div>
//           <p className="text-[#111A2D]">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Error state
//   if (isError) {
//     return (
//       <div className="min-h-screen mt-[30px] p-6">
//         <div className="text-center py-12 bg-white rounded-2xl">
//           <p className="text-red-500 mb-4">Failed to load profile</p>
//           <button
//             onClick={() => refetch()}
//             className="px-4 py-2 bg-[#526FFF] text-white rounded-lg"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen mt-[30px] p-6">
//       {/* Breadcrumb */}
//       <div className="mb-3.5">
//         <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
//           <img src={home} alt="" className="w-4 h-4" />
//           <img src={chevron} alt="" className="w-3 h-3" />
//           <span onClick={() => navigate('/dashboard')} className="cursor-pointer hover:text-gray-900">
//             {t('dashboard.doctorProfile.breadcrumb.dashboard')}
//           </span>
//           <img src={chevron} alt="" className="w-3 h-3" />
//           <span>{t('dashboard.doctorProfile.breadcrumb.doctor')}</span>
//           <img src={chevron} alt="" className="w-3 h-3" />
//           <span className="text-[#111a2d] text-sm font-semibold">
//             {t('dashboard.doctorProfile.breadcrumb.profile')}
//           </span>
//         </div>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-xl sm:text-2xl font-semibold text-[#171C35] mb-8 lg:mb-20">
//         {t('dashboard.doctorProfile.pageTitle')}
//       </h1>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-4">
//           {/* Profile Card */}
//           <div className="bg-[#E5E9FF] rounded-2xl shadow-sm p-4 sm:p-6 mt-10 lg:mt-0">
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
//               <div className="flex-shrink-0 -mt-16 sm:-mt-20">
//                 <img
//                   src={profile?.photo || karen}
//                   alt="Doctor"
//                   className="w-[180px] h-[220px] sm:w-[222px] sm:h-[270px] rounded-2xl object-cover bg-gray-200 mx-auto sm:mx-0"
//                 />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
//                   <div className="min-w-0">
//                     <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] truncate">
//                       {profile?.firstName} {profile?.lastName}
//                     </h2>
//                     <p className="text-sm font-medium text-[#171C35]">
//                       {profile?.specialization || t('dashboard.doctorProfile.profile.degree')}
//                     </p>
//                   </div>
//                   <button 
//                     onClick={() => setShowEditModal(true)}
//                     className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-50 text-black font-semibold cursor-pointer rounded-2xl hover:bg-white/50 transition-colors flex-shrink-0"
//                   >
//                     <img src={edit} alt="" className="w-4 h-4" />
//                     <span>{t('dashboard.doctorProfile.profile.edit')}</span>
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                   <div className="min-w-0">
//                     <p className="text-sm text-[#111a2d] mb-1">{t('dashboard.doctorProfile.profile.email')}</p>
//                     <p className="text-sm sm:text-base font-semibold text-[#171c35] truncate">
//                       {profile?.email}
//                     </p>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm text-[#111a2d] mb-1">{t('dashboard.doctorProfile.profile.phone')}</p>
//                     <p className="text-sm sm:text-base font-semibold text-[#171c35]">
//                       {profile?.phone || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm text-[#111A2D] mb-1">{t('dashboard.doctorProfile.profile.experience')}</p>
//                     <p className="text-xl sm:text-2xl font-semibold text-[#171c35]">
//                       {calculateExperience(profile?.createdAt || '')} <span className="text-sm sm:text-base font-semibold">{t('dashboard.doctorProfile.profile.years')}</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-4 min-w-0">
//                   <p className="text-sm text-[#111A2D] mb-1">{t('dashboard.doctorProfile.profile.address')}</p>
//                   <p className="text-sm sm:text-base font-semibold text-[#171c35] break-words">
//                     {profile?.address 
//                       ? `${profile.address}${profile.city ? `, ${profile.city}` : ''}${profile.state ? `, ${profile.state}` : ''}${profile.zipCode ? ` ${profile.zipCode}` : ''}`
//                       : '123 Medical Center Blvd, Suite 456, New York, NY 10001'
//                     }
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tabs Section */}
//           <div className="p-4 sm:p-6 rounded-2xl bg-white">
//             <div className="flex gap-2 sm:gap-4 bg-[#FAFAFA] p-2 rounded-2xl mb-6 overflow-x-auto">
//               {tabs.map(tab => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key)}
//                   className={`px-4 py-2 text-sm sm:text-base font-medium transition-colors rounded-[12px] whitespace-nowrap cursor-pointer ${
//                     activeTab === tab.key ? 'bg-[#DCE2FF] text-[#171C35]' : 'text-[#667085]'
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             <div className="min-w-0">
//               {activeTab === 'allAppointments' ? <AllApointment /> : <Patient />}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="lg:col-span-1">
//           <AppointmentsList />
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && profile && (
//         <EditProfileModal
//           isOpen={showEditModal}
//           onClose={() => setShowEditModal(false)}
//           profileData={profile}
//           onSuccess={() => {
//             refetch();
//             setShowEditModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }


