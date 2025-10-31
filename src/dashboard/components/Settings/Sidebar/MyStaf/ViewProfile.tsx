

import home from '../../../../../assets/svgIcon/homeIcon.svg'
import chevron from '../../../../../assets/svgIcon/chevronnRight.svg'
import profile from '../../../../../assets/svgIcon/staftProfile.svg'
import edit from '../../../../../assets/svgIcon/edit2.svg'

export default function StaffProfile() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-base text-gray-600 mb-4">
          <img src={home} alt="" />
          <span>Dashboard</span>
          <img src={chevron} alt="" />
          <span>Patients</span>
          <img src={chevron} alt="" />
          <span className="text-[#171c35] font-medium">Patient Profile</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-[#171C35] mb-6">Staff Profile</h1>

        {/* Profile Card */}
        <div className=" bg-[#E5E9FF] rounded-[32px] p-6 md:p-8 mb-6 mt-20">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0 -mt-20">
              <img
                src={profile}
                alt="Jonathon Sanders"
                className="w- h-[300px]   rounded-2xl object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 ">
             <div className="flex items-start justify-between mb-3">
  {/* Left side */}
  <div>
    <div className="flex items-center gap-3 mb-1">
      <h2 className="text-2xl md:text-2xl font-semibold text-[#171c35]">Jonathon Sanders</h2>
      <span className="px-3 py-1 bg-[#1DBF73] text-white text-base font-medium rounded-full">
        Active
      </span>
    </div>
    <p className="text-base font-medium text-[#171C35] mb-1">Role: Receptionist</p>
    <p className="text-base font-bold text-[#171C35]">Id: 555-0101</p>
  </div>

  {/* Right side */}
  <div className="self-start">
    <button className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-[#111A2D] border border-gray-300 rounded-2xl transition-colors">
      <img src={edit} alt="Edit" />
      Edit
    </button>
  </div>
</div>

              <p className="text-base text-[#171C35] leading-relaxed mt-3 w-[600px]">
                <span className="font-semibold">Jonathon Sanders</span> is a board-certified cardiologist with over 12 years of experience <br /> in diagnosing and treating cardiovascular conditions. She specializes in interventional cardiology and echocardiography, with a focus on preventive care. Dr. Johnson is dedicated to providing compassionate.
              </p>
            </div>
          </div>
        </div>

   <div className='bg-white p-4 rounded-3xl'>
         {/* History Section */}
    <div className=" rounded-2xl shadow-base p-6 md:p-8">
  <h3 className="text-2xl font-semibold text-[#171c35] mb-6">Jonathon Sanders. History</h3>
  
  <div className="grid grid-cols-1  gap-x-8 gap-y-4 bg-[#F3F6F6] p-4 rounded-2xl">
    {/** Name */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Name:</span>
      <span className="text-base font-bold text-[#171c35]">Jonathon Sanders</span>
    </div>
    {/** Gender */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Gender:</span>
      <span className="text-base font-medium text-[#171c35]">Male</span>
    </div>
    {/** Present Address */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Present Address:</span>
      <span className="text-base font-medium text-[#171c35]">USA</span>
    </div>
    {/** Permanent Address */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Permanent Address:</span>
      <span className="text-base font-medium text-[#171c35]">Germany</span>
    </div>
    {/** Marital Status */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Marital Status:</span>
      <span className="text-base font-medium text-[#171c35]">Married</span>
    </div>
    {/** Date of Birth */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Date of Birth:</span>
      <span className="text-base font-medium text-[#171c35]">07-10-1997</span>
    </div>
    {/** Passport Country */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Passport Country:</span>
      <span className="text-base font-medium text-[#171c35]">USA</span>
    </div>
    {/** Nationality */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">Nationality:</span>
      <span className="text-base font-medium text-[#171c35]">USA</span>
    </div>
    {/** National ID */}
    <div className="flex py-2 border-b border-gray-100">
      <span className="w-44 text-base text-[#111a2d]">National ID:</span>
      <span className="text-base font-medium text-[#171c35]">N/A</span>
    </div>
  </div>
</div>


        {/* Settings Section */}
        <div className="bg-[#F3F6F6] rounded-2xl p-4 mx-4 -mt-4">
          <h3 className="text-xl font-semibold text-[#171c35] mb-2">Settings</h3>
          <p className="text-sm text-[#111A2D] mb-6">Manage your email address, mobile number and password</p>
          
 <div className="space-y-4">
  {/* Mobile number */}
  <div className="flex items-center py-3   justify-between">
    <div className="flex items-center gap-3">
      <span className="w-36 text-sm text-[#111A2D]">Mobile number:</span>
      <span className="text-sm font-medium text-[#171c35]">+880123456789</span>
    </div>
    <span className="flex items-center gap-1.5 text-xs text-[#526FFF] font-medium">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="currentColor"/>
        <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Verified
    </span>
  </div>

  {/* Email */}
  <div className="flex items-center py-3  justify-between">
    <div className="flex items-center gap-3">
      <span className="w-36 text-sm text-[#111A2D]">Email ID:</span>
      <span className="text-base font-medium text-[#171c35]">username@gmail.com</span>
    </div>
    <button className="text-xs text-[#111A2D] font-medium">
      Verify your email
    </button>
  </div>

  {/* Password */}
  <div className="flex items-center py-3 justify-between">
    <div className="flex items-center gap-3">
      <span className="w-36 text-sm text-[#111A2D]">Password:</span>
      <span className="text-base font-medium text-[#171c35]">••••••••</span>
    </div>
    <button className="text-xs text-[#111A2D] font-medium">
      Change Password
    </button>
  </div>
</div>


        </div>
   </div>
      </div>
    </div>
  );
}