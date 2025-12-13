import { useEffect, useState } from "react";
import home from "../../../../../assets/svgIcon/homeIcon.svg";
import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";
import profile from "../../../../../assets/svgIcon/staftProfile.svg";
import edit from "../../../../../assets/svgIcon/edit2.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useAppSelector } from "@/store/hook";

interface StaffData {
  id: string;
  name: string;
  role: string;
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const id = useParams();
  const staffId = id.id;
  const {accessToken} = useAppSelector((state) => state.auth);

  // const [staffData, setStaffData] = useState<StaffData>({
  //   name: "Jonathon Sanders",
  //   role: "Receptionist",
  //   id: "555-0101",
  //   gender: "Male",
  //   presentAddress: "USA",
  //   permanentAddress: "Germany",
  //   maritalStatus: "Married",
  //   dob: "07-10-1997",
  //   passportCountry: "USA",
  //   nationality: "USA",
  //   nationalId: "N/A",
  //   email: "username@gmail.com",
  //   phone: "+880123456789",
  // });
  const [staffData, setStaffData] = useState<StaffData | null>(null);

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
        dob: staff.dob ? new Date(staff.dob).toLocaleDateString() : "",
        passportCountry: staff.passportCountry || "",
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

// if (!staffData) return <div>Loading...</div>;

  const handleEditClick = () => setIsEditing(!isEditing);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!staffData) return;
  const { name, value } = e.target;
  setStaffData({ ...staffData, [name]: value });
};


  const handleSave = () => {
    setIsEditing(false);
    alert(t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.buttons.saveChanges") + "!");
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

  // History fields
  const historyFields: { key: keyof StaffData; labelKey: string }[] = [
    { key: "name", labelKey: "name" },
    { key: "gender", labelKey: "gender" },
    { key: "presentAddress", labelKey: "presentAddress" },
    { key: "permanentAddress", labelKey: "permanentAddress" },
    { key: "maritalStatus", labelKey: "maritalStatus" },
    { key: "dob", labelKey: "dob" },
    { key: "passportCountry", labelKey: "passportCountry" },
    { key: "nationality", labelKey: "nationality" },
    { key: "nationalId", labelKey: "nationalId" },
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
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.history.title", { name: staffData?.name })}
          </h3>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 bg-[#F3F6F6] p-4 rounded-2xl">
            {historyFields.map(({ key, labelKey }) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 gap-1 sm:gap-4"
              >
                <span className="w-full sm:w-44 text-base text-[#111a2d]">
                  {t(`dashboard.routes.settings.settingsSidebar.tabs.myStaff.staffProfile.history.fields.${labelKey}`)}:
                </span>
               {isEditing ? (
                <input
                  type="text"
                  name={key}
                  // value={staffData[key] ?? ""} // fallback to empty string
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 text-[#171c35] w-full sm:w-auto"
                />
              ) : (
                <span className="text-base font-medium text-[#171c35]">
                  {/* {translateValue(key, staffData[key] ?? "")} fallback to empty string */}
                </span>
              )}

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