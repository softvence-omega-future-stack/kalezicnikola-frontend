import { useState } from "react";
import home from "../../../../../assets/svgIcon/homeIcon.svg";
import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";
import profile from "../../../../../assets/svgIcon/staftProfile.svg";
import edit from "../../../../../assets/svgIcon/edit2.svg";
import { useNavigate } from "react-router-dom";

interface StaffData {
  name: string;
  role: string;
  id: string;
  gender: string;
  presentAddress: string;
  permanentAddress: string;
  maritalStatus: string;
  dob: string;
  passportCountry: string;
  nationality: string;
  nationalId: string;
  email: string;
  phone: string;
}

export default function StaffProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()
  const [staffData, setStaffData] = useState<StaffData>({
    name: "Jonathon Sanders",
    role: "Receptionist",
    id: "555-0101",
    gender: "Male",
    presentAddress: "USA",
    permanentAddress: "Germany",
    maritalStatus: "Married",
    dob: "07-10-1997",
    passportCountry: "USA",
    nationality: "USA",
    nationalId: "N/A",
    email: "username@gmail.com",
    phone: "+880123456789",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen mt-6 ">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-base text-gray-600  pt-6">
        <img src={home} alt="" />
        <span onClick={()=> navigate('/dashboard')} className="cursor-pointer" >Dashboard</span>
        <img src={chevron} alt="" />
        <span>Patients</span>
        <img src={chevron} alt="" />
        <span className="text-[#171c35] font-medium">Patient Profile</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold leading-6 pt-4 text-[#171C35] mb-6">
        Staff Profile
      </h1>

      {/* Profile Card */}
          <div className="bg-[#E5E9FF] rounded-[32px] px-4 py-6   mb-6 mt-20">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Profile Image */}
          <div className="shrink-0 -mt-17 mx-auto md:mx-0">
            <img
              src={profile}
              alt={staffData.name}
              className="h-[250px] md:h-[300px] rounded-2xl object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
              {/* Left Side */}
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={staffData.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-[#171c35] font-semibold text-lg md:text-xl"
                    />
                  ) : (
                    <h2 className="text-base md:text-2xl font-semibold text-[#171c35]">
                      {staffData.name}
                    </h2>
                  )}
                  <span className="px-3 py-1 bg-[#1DBF73] text-white text-xs md:text-base font-medium rounded-full">
                    Active
                  </span>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    name="role"
                    value={staffData.role}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-[#171c35]"
                  />
                ) : (
                  <p className="text-sm md:text-base font-medium text-[#171C35] mb-1">
                    Role: {staffData.role}
                  </p>
                )}
                <p className="text-sm md:text-base font-bold text-[#171C35]">
                  Id: {staffData.id}
                </p>
              </div>

              {/* Right Side */}
              <div className="self-start">
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-[#111A2D] border border-gray-300 rounded-xl"
                >
                  <img src={edit} alt="Edit" className="w-4 h-4" />
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm md:text-base text-[#171C35] leading-relaxed mt-3 max-w-full md:max-w-[800px]">
              <span className="font-semibold">{staffData.name}</span> is a
              board-certified cardiologist with over 12 years of experience in
              diagnosing and treating cardiovascular conditions.
            </p>

            {isEditing && (
              <button
                onClick={handleSave}
                className="mt-4 bg-[#526FFF] text-white px-5 py-2 rounded-xl font-semibold"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>


      {/* History Section */}
      <div className="bg-white  rounded-3xl">
        <div className="rounded-2xl shadow-base p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-[#171c35] mb-6">
            {staffData.name}. History
          </h3>


   <div className="grid grid-cols-1 gap-x-8 gap-y-4 bg-[#F3F6F6] p-4 rounded-2xl">
  {Object.entries({
    Name: staffData.name,
    Gender: staffData.gender,
    "Present Address": staffData.presentAddress,
    "Permanent Address": staffData.permanentAddress,
    "Marital Status": staffData.maritalStatus,
    "Date of Birth": staffData.dob,
    "Passport Country": staffData.passportCountry,
    Nationality: staffData.nationality,
    "National ID": staffData.nationalId,
  }).map(([key, value]) => (
    <div
      key={key}
      className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 gap-1 sm:gap-4"
    >
      <span className="w-full sm:w-44 text-base text-[#111a2d]">{key}:</span>
      {isEditing ? (
        <input
          type="text"
          name={key.replace(/\s+/g, "").replace(":", "").toLowerCase()}
          value={value}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-2 py-1 text-[#171c35] w-full sm:w-auto"
        />
      ) : (
        <span className="text-base font-medium text-[#171c35]">{value}</span>
      )}
    </div>
  ))}
</div>


        {/* Settings Section */}
<div className="bg-[#F3F6F6] rounded-2xl p-4 mt-2.5">
  <h3 className="text-xl font-semibold text-[#171c35] mb-2">
    Settings
  </h3>
  <p className="text-sm text-[#111A2D] mb-6">
    Manage your email address, mobile number and password
  </p>

  <div className="space-y-4">
    {/* Mobile number */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <span className="w-full sm:w-36 text-sm text-[#111A2D]">Mobile number:</span>
        {isEditing ? (
          <input
            type="text"
            name="phone"
            value={staffData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-2 py-1 text-[#171c35] w-full sm:w-auto"
          />
        ) : (
          <span className="text-sm font-medium text-[#171c35]">{staffData.phone}</span>
        )}
      </div>
      <span className="flex items-center gap-1.5 text-xs text-[#526FFF] font-medium mt-1 sm:mt-0">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path
            d="M8 12L11 15L16 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Verified
      </span>
    </div>

    {/* Email */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <span className="w-full sm:w-36 text-sm text-[#111A2D]">Email ID:</span>
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={staffData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-2 py-1 text-[#171c35] w-full sm:w-auto"
          />
        ) : (
          <span className="text-base font-medium text-[#171c35]">{staffData.email}</span>
        )}
      </div>
      <button className="text-xs text-[#111A2D] font-medium mt-1 sm:mt-0">
        Verify your email
      </button>
    </div>

    {/* Password */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <span className="w-full sm:w-36 text-sm text-[#111A2D]">Password:</span>
        <span className="text-base font-medium text-[#171c35]">••••••••</span>
      </div>
      <button className="text-xs text-[#111A2D] font-medium mt-1 sm:mt-0">
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
