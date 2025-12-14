import { useEffect, useState } from "react";
import home from "../../../../../assets/svgIcon/homeIcon.svg";
import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";
import profile from "../../../../../assets/svgIcon/staftProfile.svg";
import edit from "../../../../../assets/svgIcon/edit2.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useAppSelector } from "@/store/hook";
import { toast } from "react-toastify";
import CustomDropdown from "../CustomDropdown";

interface StaffData {
  id: string;
  name: string;
  role: string;
  gender: string;
  presentAddress: string;
  permanentAddress: string;
  maritalStatus: string;
  dob: Date | null;
  passportCountry: string;
  nationality: string;
  nationalId: string;
  email: string;
  phone: string;
}
type StaffFieldKey = keyof StaffData;



export default function StaffProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const id = useParams();
  const staffId = id.id;
  const {accessToken} = useAppSelector((state) => state.auth);
  const [staffData, setStaffData] = useState<StaffData | null>(null);

//     const parseDate = (dateStr: string | null) => {
//   if (!dateStr) return null;
//   const [day, month, year] = dateStr.split("/").map(Number);
//   const d = new Date(year, month - 1, day);
//   return isNaN(d.getTime()) ? null : d;
// };

// Fetch staff data inside useEffect
useEffect(() => {
  const fetchStaffData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/staff/${staffId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const staff = res.data.data.staff;
      console.log(staff)
      setStaffData({
        name: `${staff.firstName} ${staff.lastName}`,
        role: staff.position || staff.department || "N/A",
        id: staff.employmentId,
        gender: staff.gender,
        presentAddress: staff.presentAddress || "",
        permanentAddress: staff.permanentAddress || "",
        maritalStatus: staff.maritalStatus || "",
        dob: staff.dob ? new Date(staff.dob) : null,
        passportCountry: staff.country || "",
        nationality: staff.nationality || "",
        nationalId: staff.nationalIdNumber || "",
        email: staff.email,
        phone: staff.phone,
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  if (staffId) fetchStaffData();
}, [staffId]);
console.log(staffData)
if (!staffData) return <div className="text-center">Loading...</div>;

// if (!staffData) return <div>Loading...</div>;

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleDropdownChange = (key: StaffFieldKey, value: string) => {
    if (!staffData) return;
    setStaffData({ ...staffData, [key]: value });
  }

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!staffData) return;
  const { name, value } = e.target;
  setStaffData({ ...staffData, [name]: value });
};


  // const handleSave = () => {
  //   setIsEditing(false);
  //   toast.success(t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.saveChanges") + "!");
  // };



//   const handleSave = async () => {
//   if (!staffData || !staffId) return;

//   try {
//     const [firstName, ...lastNameArr] = staffData.name.split(" ");
//     const lastName = lastNameArr.join(" ");

//     const payload = {
//       firstName,
//       lastName,
//       gender: staffData.gender,
//       presentAddress: staffData.presentAddress,
//       permanentAddress: staffData.permanentAddress,
//       maritalStatus: staffData.maritalStatus,
//       dob: staffData.dob ? staffData.dob.toISOString().split("T")[0] : null,
//       country: staffData.passportCountry,
//       nationality: staffData.nationality,
//       nationalIdNumber: staffData.nationalId,
//       phone: staffData.phone,
//       email: staffData.email,
//     };

//     await axios.put(
//       `${import.meta.env.VITE_API_URL}/doctor/staff/update/${staffId}`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     toast.success(
//       t(
//         "dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.saveChanges"
//       )
//     );

//     setIsEditing(false);
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to update staff profile");
//   }
// };
const handleSave = async () => {
  if (!staffData || !staffId) return;

  try {
    const [firstName, ...lastNameArr] = staffData.name.split(" ");
    const lastName = lastNameArr.join(" ");


      // Then use dobString in payload
      const payload = {
  firstName,
  lastName,
  gender: staffData.gender,
  presentAddress: staffData.presentAddress,
  permanentAddress: staffData.permanentAddress,
  maritalStatus: staffData.maritalStatus,
  dob: staffData.dob instanceof Date 
       ? staffData.dob.toISOString().split("T")[0] 
       : staffData.dob || null,
  country: staffData.passportCountry,
  nationality: staffData.nationality,
  nationalIdNumber: staffData.nationalId,
  phone: staffData.phone,
  email: staffData.email,
};



    console.log(payload);

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/doctor/staff/update/${staffId}`,
      payload,
      { 
        headers: { 
                    Authorization: `Bearer ${accessToken}` 
                  } 
      }
    );

    toast.success(
      t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.saveChanges")
    );

    setIsEditing(false);
  } catch (error) {
    console.error(error);
    toast.error("Failed to update staff profile");
  }
};



  // Helper function to translate dynamic values
  // const translateValue = (key: keyof StaffData, value: string): string => {
  //   // Translate gender
  //   if (key === "gender") {
  //     const genderKey = value.toLowerCase();
  //     return t(`dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.values.gender.${genderKey}`, { defaultValue: value });
  //   }
    
  //   // Translate marital status
  //   if (key === "maritalStatus") {
  //     const statusKey = value.toLowerCase();
  //     return t(`dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.values.maritalStatus.${statusKey}`, { defaultValue: value });
  //   }
    
  //   // Translate role
  //   if (key === "role") {
  //     const roleKey = value.toLowerCase();
  //     return t(`dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.values.roles.${roleKey}`, { defaultValue: value });
  //   }
    
  //   return value;
  // };

  const historyFields: {
  label: string;
  key: StaffFieldKey;
}[] = [
  { label: "Full Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Marital Status", key: "maritalStatus" },
  { label: "Present Address", key: "presentAddress" },
  { label: "Permanent Address", key: "permanentAddress" },
  { label: "Date of Birth", key: "dob" },
  { label: "Passport Country", key: "passportCountry" },
  { label: "Nationality", key: "nationality" },
  { label: "National ID", key: "nationalId" },
];

  return (
    <div className="min-h-screen mt-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-base text-gray-600 pt-6">
        <img src={home} alt="" />
        <span onClick={() => navigate("/dashboard")} className="cursor-pointer">
          {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.breadcrumb.dashboard")}
        </span>
        <img src={chevron} alt="" />
        <span onClick={() => navigate("/dashboard/settings")} className="cursor-pointer">
          {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.breadcrumb.settings")}
        </span>
        <img src={chevron} alt="" />
        <span className="text-[#171c35] font-medium">
          {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.breadcrumb.staffProfile")}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold leading-6 pt-4 text-[#171C35] mb-6">
        {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.title")}
      </h1>

      {/* Profile Card */}
      <div className="mb-6 mt-20">
        <div className="bg-[#E5E9FF] rounded-[32px] px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* Profile Image */}
            <div className="shrink-0 mx-auto md:mx-0 md:-mt-15">
              <img
                src={profile}
                alt={staffData?.name}
                className="w-[222px] md:h-[270px] md:w-auto rounded-2xl object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                {/* Left Side */}
                <div className="w-full">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={staffData?.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-[#171c35] font-semibold text-base sm:text-lg md:text-xl w-full sm:w-auto"
                      />
                    ) : (
                      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#171c35]">
                        {staffData?.name}
                      </h2>
                    )}
                    <span className="px-2 sm:px-3 py-1 bg-[#1DBF73] text-white text-xs sm:text-sm md:text-base font-medium rounded-full">
                      {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.status.active")}
                    </span>
                  </div>

                  {isEditing ? (
                    <input
                      type="text"
                      name="role"
                      value={staffData?.role}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-[#171c35] w-full sm:w-auto"
                    />
                  ) : (
                    <p className="text-sm md:text-base font-medium text-[#171C35] mb-1">
                      {/* {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.history.fields.role")}: {translateValue("role", staffData?.role)} */}
                    </p>
                  )}
                  <p className="text-sm md:text-base font-bold text-[#171C35]">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.history.fields.id")}: {staffData?.id}
                  </p>
                </div>

                {/* Right Side */}
                <div className="self-start shrink-0">
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-[#111A2D] border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <img src={edit} alt="Edit" className="w-4 h-4" />
                    {isEditing
                      ? t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.cancel")
                      : t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.edit")}
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm md:text-base text-[#171C35] leading-relaxed mt-4 max-w-full lg:max-w-[593px]">
                {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.bio", { name: staffData?.name })}
              </p>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="mt-4 bg-[#526FFF] text-white px-5 py-2 rounded-xl font-semibold hover:bg-[#4159E6] transition-colors"
                >
                  {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.saveChanges")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white rounded-3xl">
        <div className="rounded-2xl shadow-base p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-[#171c35] mb-6">
            {/* {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.history.title", { name: staffData?.name })} */}
            {staffData?.name}
          </h3>
        

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 bg-[#F3F6F6] p-4 rounded-2xl">
            {historyFields.map(({ label, key }) => (
  <div
    key={key}
    className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 gap-2 sm:gap-4"
  >
    {/* Label */}
    <span className="text-sm text-gray-500 w-full sm:w-36">{label}</span>

    {/* Input / Dropdown / Display */}
    <div className="sm:w-51">
      {isEditing ? (
        key === "gender" ? (
          <CustomDropdown
            value={staffData?.gender ?? ""}
            onChange={(val) => handleDropdownChange("gender", val)}
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
              { value: "OTHERS", label: "Others" },
            ]}
          />
        ) : key === "maritalStatus" ? (
          <CustomDropdown
            value={staffData?.maritalStatus ?? ""}
            onChange={(val) => handleDropdownChange("maritalStatus", val)}
            options={[
            { value: "SINGLE", label: "Single" },
            { value: "MARRIED", label: "Married" },
            { value: "DIVORCED", label: "Divorced" },
          ]}

          />
        ) : (
          <input
            type="text"
            value={
              key === "dob"
                ? staffData?.dob
                  ? staffData.dob.toISOString().split("T")[0]
                  : ""
                : staffData?.[key] ?? ""
            }
            onChange={(e) =>
              setStaffData((prev) =>
                prev
                  ? {
                      ...prev,
                      [key]:
                        key === "dob"
                          ? new Date(e.target.value)
                          : e.target.value,
                    }
                  : prev
              )
            }
            className="border border-gray-300 rounded-lg px-2 py-1 text-[#171c35] w-full sm:w-auto"
          />
        )
      ) : (
        <span className="text-base font-medium text-[#171c35] uppercase">
          {key === "dob"
            ? staffData?.dob
              ? staffData.dob.toLocaleDateString()
              : "N/A"
            : staffData?.[key] || "N/A"}
        </span>
      )}
    </div>
  </div>
))}

          </div>


          {/* Settings Section */}
          <div className="bg-[#F3F6F6] rounded-2xl p-4 mt-2.5">
            <h3 className="text-xl font-semibold text-[#171c35] mb-2">
              {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.settingsSection.title")}
            </h3>
            <p className="text-sm text-[#111A2D] mb-6">
              {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.settingsSection.description")}
            </p>

            <div className="space-y-4">
              {/* Mobile number */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <span className="w-full sm:w-36 text-sm text-[#111A2D]">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.settingsSection.fields.phone")}:
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={staffData?.phone}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-[#171c35] w-full sm:w-auto"
                    />
                  ) : (
                    <span className="text-sm font-medium text-[#171c35]">{staffData?.phone}</span>
                  )}
                </div>
                <span className="flex items-center gap-1.5 text-xs text-[#526FFF] font-medium mt-1 sm:mt-0">
                  {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.settingsSection.verified")}
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <span className="w-full sm:w-36 text-sm text-[#111A2D]">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.settingsSection.fields.email")}:
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="email"
                      value={staffData?.email}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-[#171c35] w-full sm:w-auto"
                    />
                  ) : (
                    <span className="text-base font-medium text-[#171c35]">{staffData?.email}</span>
                  )}
                </div>
                <button className="text-xs text-[#111A2D] font-medium mt-1 sm:mt-0">
                  {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.verifyEmail")}
                </button>
              </div>

              {/* Password */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <span className="w-full sm:w-36 text-sm text-[#111A2D]">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.settingsSection.fields.password")}:
                  </span>
                  <span className="text-base font-medium text-[#171c35]">••••••••</span>
                </div>
                <button className="text-xs text-[#111A2D] font-medium mt-1 sm:mt-0">
                  {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.changePassword")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}