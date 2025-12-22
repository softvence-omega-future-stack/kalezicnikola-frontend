import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import AllApointment from './AllApointment';
import Patient from './Patient';
import AppointmentsList from '../AppointmentList';

import home from '../../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../../assets/svgIcon/chevronnRight.svg';
import edit from '../../../../assets/svgIcon/edit2.svg';
import karen from '../../../../assets/img/dummyImage.svg';
import { useAppSelector } from '@/store/hook';
import EditProfileModal from './EditProfileModal';

interface DoctorProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // made required and always a string
  experience?: string;
  dob?: string;
  gender?: string;
  address?: string;
  licenceNo?: string;
  emailVerifiedAt?: string | null;
  twoFactorEnabled?: boolean;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  photo?: string;
  specialities: string[];
}

export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState('allAppointments');
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { t } = useTranslation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  const [profileData, setProfileData] = useState<DoctorProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ GET API: Fetch doctor profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/my-profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = response.data.data.profile;
      // Ensure id is a string
      if (profile && typeof profile.id !== 'string') {
        profile.id = String(profile.id);
      }
      // Ensure phone is always a string
      if (!profile.phone) {
        profile.phone = '';
      }
      console.log('Profile Data:', profile);
      setProfileData(profile);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [accessToken]);

  const tabs = [
    { key: 'allAppointments', label: t('dashboard.doctorProfile.tabs.allAppointments') },
    { key: 'patients', label: t('dashboard.doctorProfile.tabs.patients') },
  ];

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>No profile data found.</p>;

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
          <span className="text-subHeadingBlack text-sm font-semibold">
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
              <div className="shrink-0 -mt-16 sm:-mt-20">
                <img
                  src={profileData.photo || karen}
                  alt="Doctor"
                  className="w-[180px] h-[220px] sm:w-[222px] sm:h-[370px] rounded-2xl object-cover bg-gray-300 mx-auto sm:mx-0"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] truncate">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-sm font-medium text-[#171C35]">
                      {profileData.specialities.length === 0
                        ? ' General Practitioner'
                        : ` - ${profileData.specialities.join(', ')}`}
                    </p>
                  </div>
                  <button
                    onClick={openEditModal}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-50 text-black font-semibold cursor-pointer rounded-2xl hover:bg-white/50 transition-colors flex-shrink-0"
                  >
                    <img src={edit} alt="" className="w-4 h-4" />
                    <span>{t('dashboard.doctorProfile.profile.edit')}</span>
                  </button>
                </div>

                {/* Credentials Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.email')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35] truncate">
                      {profileData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.phone')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.phone || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.experience')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.experience || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('DOB')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.dob ? new Date(profileData.dob).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.gender')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.gender || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.address')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35] break-words">
                      {profileData.address || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.licenseNumber')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.licenceNo || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.emailVerified')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.emailVerifiedAt ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.2FAEnabled')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.twoFactorEnabled ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.lastLogin')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.lastLoginAt ? new Date(profileData.lastLoginAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.accountCreated')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.createdAt ? new Date(profileData.createdAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.lastUpdated')}</p>
                    <p className="text-sm sm:text-base font-semibold text-[#171c35]">
                      {profileData.updatedAt ? new Date(profileData.updatedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white">
            <div className="flex gap-2 sm:gap-4 bg-[#FAFAFA] p-2 rounded-2xl mb-6 overflow-x-auto">
              {tabs.map((tab) => (
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
        <div className="lg:col-span-1">
          <AppointmentsList selectedDate={new Date()} />
        </div>
      </div>

      {/* Edit Modal */}
   {profileData && (
  <EditProfileModal
    isOpen={isEditOpen}
    onClose={closeEditModal}
    profileData={profileData as any}  // ✅ Quick fix with type casting
    onSuccess={() => {
      fetchProfile();
      closeEditModal();
    }}
  />
)}
    </div>
  );
}





// ==================== DoctorProfile.tsx ====================
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
//           <p className="text-subHeadingBlack">Loading profile...</p>
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
//           <span className="text-subHeadingBlack text-sm font-semibold">
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
//                     <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.email')}</p>
//                     <p className="text-sm sm:text-base font-semibold text-[#171c35] truncate">
//                       {profile?.email}
//                     </p>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.phone')}</p>
//                     <p className="text-sm sm:text-base font-semibold text-[#171c35]">
//                       {profile?.phone || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.experience')}</p>
//                     <p className="text-xl sm:text-2xl font-semibold text-[#171c35]">
//                       {calculateExperience(profile?.createdAt || '')} <span className="text-sm sm:text-base font-semibold">{t('dashboard.doctorProfile.profile.years')}</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-4 min-w-0">
//                   <p className="text-sm text-subHeadingBlack mb-1">{t('dashboard.doctorProfile.profile.address')}</p>
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


