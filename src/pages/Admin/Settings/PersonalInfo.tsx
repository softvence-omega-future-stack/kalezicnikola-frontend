import React, { useState } from 'react';
import keren from '../../../assets/svgIcon/karen.svg';
import { Edit, PencilLine } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
}

const PersonalInfoFormAdmin: React.FC = () => {
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
  });

  const [profilePic, setProfilePic] = useState<string>(keren);
  const [isEditingForm, setIsEditingForm] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditingForm(false);
    alert(`✅ ${t("adminDashboard.routes.settings.tabs.personalInfo.saveChanges")}`);
    console.log('Admin saved changes:', formData);
  };

  const handleCancel = () => {
    setIsEditingForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
      gender: '',
    });
    setProfilePic(keren);
  };

  const handleEditForm = () => setIsEditingForm(true);

  return (
    <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-4 md:p-6 md:mx-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-lg md:text-xl font-semibold text-headingBlack">
          {t("adminDashboard.routes.settings.tabs.personalInfo.title")}
        </h1>
        <button
          onClick={handleEditForm}
          className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold px-3 py-2 md:px-4 md:py-2 rounded-lg cursor-pointer border border-subHeadingBlack hover:bg-gray-50 transition-colors"
        >
          <PencilLine className='w-4 h-4 md:w-5 md:h-5 text-black' />
          <span className="text-black">
            {t("adminDashboard.routes.settings.tabs.personalInfo.edit")}
          </span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-16 h-16 md:w-20 md:h-20 lg:h-[100px] lg:w-[100px] rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            id="profileInput"
            className="hidden"
            onChange={handleProfileChange}
          />
          <button
            onClick={() => document.getElementById('profileInput')?.click()}
            className="absolute -bottom-1 -right-1 p-1.5 md:p-2 cursor-pointer bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <Edit className='text-[#667085]' size={12} />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm md:text-base font-semibold text-[#042435] truncate">
            {formData.firstName || t("adminDashboard.routes.settings.tabs.personalInfo.defaultName")} {formData.lastName}
          </h2>
          <p className="text-xs md:text-sm text-subHeadingBlack truncate">
            {t("adminDashboard.routes.settings.tabs.personalInfo.department")}
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 md:space-y-5">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div>
            <label className="block text-sm md:text-base font-medium text-[#171c35] mb-1 md:mb-2">
              {t("adminDashboard.routes.settings.tabs.personalInfo.firstName")}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t("adminDashboard.routes.settings.tabs.personalInfo.firstNamePlaceholder")}
              readOnly={!isEditingForm}
              className={`w-full px-3 py-3 md:px-4 md:py-4 border rounded-lg text-xs md:text-sm text-[#171c35] placeholder-[#667085] ${
                isEditingForm ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-100 cursor-not-allowed border-transparent'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-[#171c35] mb-1 md:mb-2">
              {t("adminDashboard.routes.settings.tabs.personalInfo.lastName")}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t("adminDashboard.routes.settings.tabs.personalInfo.lastNamePlaceholder")}
              readOnly={!isEditingForm}
              className={`w-full px-3 py-3 md:px-4 md:py-4 border rounded-lg text-xs md:text-sm text-[#171c35] placeholder-[#667085] ${
                isEditingForm ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-100 cursor-not-allowed border-transparent'
              }`}
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div>
            <label className="block text-sm md:text-base font-medium text-[#171c35] mb-1 md:mb-2">
              {t("adminDashboard.routes.settings.tabs.personalInfo.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("adminDashboard.routes.settings.tabs.personalInfo.emailPlaceholder")}
              readOnly={!isEditingForm}
              className={`w-full px-3 py-3 md:px-4 md:py-4 border rounded-lg text-xs md:text-sm text-[#171c35] placeholder-[#667085] ${
                isEditingForm ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-100 cursor-not-allowed border-transparent'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium text-[#171c35] mb-1 md:mb-2">
              {t("adminDashboard.routes.settings.tabs.personalInfo.phoneNumber")}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder={t("adminDashboard.routes.settings.tabs.personalInfo.phoneNumberPlaceholder")}
              readOnly={!isEditingForm}
              className={`w-full px-3 py-3 md:px-4 md:py-4 border rounded-lg text-xs md:text-sm text-[#171c35] placeholder-[#667085] ${
                isEditingForm ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-100 cursor-not-allowed border-transparent'
              }`}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm md:text-base font-medium text-[#171c35] mb-1 md:mb-2">
            {t("adminDashboard.routes.settings.tabs.personalInfo.address")}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={t("adminDashboard.routes.settings.tabs.personalInfo.addressPlaceholder")}
            readOnly={!isEditingForm}
            className={`w-full px-3 py-3 md:px-4 md:py-4 border rounded-lg text-xs md:text-sm text-[#171c35] placeholder-[#667085] ${
              isEditingForm ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-100 cursor-not-allowed border-transparent'
            }`}
          />
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div>
            <label className="block text-sm md:text-base font-medium text-[#171c35] mb-1 md:mb-2">
              {t("adminDashboard.routes.settings.tabs.personalInfo.dateOfBirth")}
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              readOnly={!isEditingForm}
              className={`w-full px-3 py-3 md:px-4 md:py-4 border rounded-lg text-xs md:text-sm text-[#171c35] ${
                isEditingForm ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-100 cursor-not-allowed border-transparent'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-[#171c35] mb-1 md:mb-2">
              {t("adminDashboard.routes.settings.tabs.personalInfo.gender")}
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder={t("adminDashboard.routes.settings.tabs.personalInfo.genderPlaceholder")}
              readOnly={!isEditingForm}
              className={`w-full px-3 py-3 md:px-4 md:py-4 border rounded-lg text-xs md:text-sm text-[#171c35] placeholder-[#667085] ${
                isEditingForm ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-100 cursor-not-allowed border-transparent'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      {isEditingForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
          <button
            onClick={handleCancel}
            className="w-full px-4 py-3 md:px-6 md:py-3 border border-gray-200 rounded-lg text-sm font-semibold text-[#171c35] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {t("adminDashboard.routes.settings.tabs.personalInfo.cancel")}
          </button>
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 md:px-6 md:py-3 bg-[#526FFF] rounded-xl text-sm md:text-base font-semibold text-white hover:bg-[#425CE0] transition-colors cursor-pointer"
          >
            {t("adminDashboard.routes.settings.tabs.personalInfo.saveChanges")}
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoFormAdmin;
