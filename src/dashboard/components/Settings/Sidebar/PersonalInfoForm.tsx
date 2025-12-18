import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, PencilLine } from "lucide-react";
import karen from '../../../../assets/svgIcon/karenNix.svg';
import axios from "axios";
import { useAppSelector } from "@/store/hook";
import { toast } from "react-toastify";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  isEditing,
  onChange,
}) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={name} className="text-sm md:text-base font-medium text-headingBlack">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      readOnly={!isEditing}
      onChange={onChange}
      className={`px-3 py-3 md:px-4 md:py-4 text-xs md:text-sm text-headingBlack rounded-lg transition-all outline-none placeholder-[#667085] ${
        isEditing
          ? "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          : "bg-gray-100 cursor-default"
      }`}
    />
  </div>
);

const PersonalInfoForm: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id || "";
  console.log("User ID:", userId);

  const [isEditing, setIsEditing] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    gender: "",
    profilePic: karen,
  });

  useEffect(() => {
  const fetchUserData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/my-profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = response.data.data.profile;

    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phoneNumber: profile.phone || "",
      address: profile.address || "",
      dob: profile.dob ? profile.dob.split("T")[0] : "", // Convert ISO -> YYYY-MM-DD
      gender: profile.gender || "",
      profilePic: profile.photo || karen,
    });
  };

  fetchUserData();
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  // const handleSave = () => {
  //   setIsEditing(false);
  //   alert(t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.saveSuccess") || "Information saved successfully!");
  // };
  const handleSave = async () => {
  try {
    setIsLoading(true);
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phoneNumber,
      address: formData.address,
      dob: formData.dob, // Already "YYYY-MM-DD"
      gender: formData.gender,
      // profilePic: formData.profilePic,
    };

    await axios.patch(`${import.meta.env.VITE_API_URL}/doctor/update-my-profile`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    toast.success("Profile saved successfully!");
    setIsEditing(false);
  } catch (error) {
    console.error(error);
    toast.error("Failed to save profile");
  }
  // finally{
  //   setIsLoading(false);
  // }
};

  const handleCancel = () => setIsEditing(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  return (
    <section className="min-h-screen bg-white rounded-2xl">
      <div className="rounded-xl md:rounded-3xl p-4 md:p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-headingBlack">
            {t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.title")}
          </h2>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold px-3 py-2 md:px-4 md:py-2 rounded-lg cursor-pointer border border-[#111A2D] hover:bg-gray-50 transition-colors"
            >
              <PencilLine className="w-4 h-4 md:w-5 md:h-5 text-black" />
              <span className="text-black">
                {t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.editButton")}
              </span>
            </button>
          )}
        </header>

        {/* Profile Info */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="relative">
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-16 h-16 md:w-20 md:h-20 lg:h-[100px] lg:w-[100px] rounded-full object-cover"
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="profileInput"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <button
                  onClick={() => document.getElementById("profileInput")?.click()}
                  className="absolute -bottom-1 -right-1 p-1.5 md:p-2 cursor-pointer bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <Edit className="text-[#667085]" size={12} />
                </button>
              </>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm md:text-base font-semibold text-[#042435] truncate">
              {/* {formData.firstName || t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.namePlaceholder")}{" "}
              {formData.lastName} */}
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-xs md:text-sm text-[#111A2D] truncate">
              {t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.role")}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <InputField
              label={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.firstNameLabel")}
              name="firstName"
              value={formData.firstName}
              placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.namePlaceholder")}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <InputField
              label={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.lastNameLabel")}
              name="lastName"
              value={formData.lastName}
              placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.lastNameLabel")}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <InputField
              label={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.emailLabel")}
              name="email"
              type="email"
              value={formData.email}
              placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.emailLabel")}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <InputField
              label={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.phoneLabel")}
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.phoneLabel")}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <div>
            <InputField
              label={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.addressLabel")}
              name="address"
              value={formData.address}
              placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.addressLabel")}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col space-y-2">
              <label htmlFor="dob" className="text-sm md:text-base font-medium text-headingBlack">
                {t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.dobLabel")}
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                readOnly={!isEditing}
                onChange={handleChange}
                min="1900-01-01"
                max={new Date().toISOString().split("T")[0]}
                className={`px-3 py-3 md:px-4 md:py-4 text-xs md:text-sm text-headingBlack rounded-lg transition-all outline-none ${
                  isEditing
                    ? "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    : "bg-gray-100 cursor-default"
                }`}
              />
            </div>
            <InputField
              label={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.genderLabel")}
              name="gender"
              value={formData.gender}
              placeholder={t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.genderLabel")}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
            <button
              onClick={handleCancel}
              className="w-full px-4 py-3 md:px-6 md:py-3 border border-gray-200 rounded-lg text-sm font-semibold text-headingBlack hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.cancelButton")}
            </button>
            <button
              onClick={handleSave}
              className="w-full px-4 py-3 md:px-6 md:py-3 bg-[#526FFF] rounded-xl text-sm md:text-base font-semibold text-white hover:bg-[#425CE0] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {/* {t("dashboard.routes.settings.settingsSidebar.tabs.personalInfo.profile.saveButton")} */}
              {isLoading ? "Saving..." : "Save"}
              {/* {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"} */}

            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalInfoForm;
