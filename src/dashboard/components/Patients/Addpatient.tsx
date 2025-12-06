import React, { useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../Settings/Sidebar/CustomDropdown';
import { useTranslation } from 'react-i18next';

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  maritalStatus: string;
  city: string;
  insuranceId: string;
  address: string;
  email: string;
  phoneNumber: string;
  alternativePhone: string;
}

const AddPatientForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    city: '',
    insuranceId: '',
    address: '',
    email: '',
    phoneNumber: '',
    alternativePhone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDropdownChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("dashboard.routes.patients.addPatient.messages.submitSuccess"));
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: '',
      city: '',
      insuranceId: '',
      address: '',
      email: '',
      phoneNumber: '',
      alternativePhone: ''
    });
    alert(t("dashboard.routes.patients.addPatient.messages.formCleared"));
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#111A2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526FFF]";
  const labelClass = "block text-base font-medium text-[#171c35] mb-2";

  return (
    <div className="min-h-screen mt-6 p-6">
      <div className="py-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home className="w-4 h-4 text-gray-500" />
          <ChevronRight size={12} />
          <span onClick={() => navigate('/dashboard')} className="cursor-pointer">
            {t("dashboard.routes.patients.addPatient.breadcrumbs.dashboard")}
          </span>

          <ChevronRight size={12} />
          <span onClick={() => navigate('/dashboard/patients')} className="cursor-pointer">
            {t("dashboard.routes.patients.addPatient.breadcrumbs.patients")}
          </span>

          <ChevronRight size={12} />
          <span className="text-[#171c35] font-semibold">
            {t("dashboard.routes.patients.addPatient.breadcrumbs.addPatient")}
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#171c35] mb-8">
          {t("dashboard.routes.patients.addPatient.title")}
        </h1>

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">

          {/* Personal Info Section */}
          <div className="mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-6">
              {t("dashboard.routes.patients.addPatient.sections.personalInfo")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* First Name */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.firstName.label")}
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.firstName.placeholder")}
                  className={inputClass}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.lastName.label")}
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.lastName.placeholder")}
                  className={inputClass}
                />
              </div>

              {/* Date of birth */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.dateOfBirth.label")}
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.gender.label")}
                </label>
                <CustomDropdown
                  value={formData.gender}
                  onChange={(v) => handleDropdownChange("gender", v)}
                  options={[
                    { value: "Male", label: t("dashboard.routes.patients.addPatient.fields.gender.options.male") },
                    { value: "Female", label: t("dashboard.routes.patients.addPatient.fields.gender.options.female") },
                    { value: "Other", label: t("dashboard.routes.patients.addPatient.fields.gender.options.other") },
                  ]}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.gender.placeholder")}
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.bloodGroup.label")}
                </label>
                <CustomDropdown
                  value={formData.bloodGroup}
                  onChange={(v) => handleDropdownChange("bloodGroup", v)}
                  options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                  ]}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.bloodGroup.placeholder")}
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.maritalStatus.label")}
                </label>
                <CustomDropdown
                  value={formData.maritalStatus}
                  onChange={(v) => handleDropdownChange("maritalStatus", v)}
                  options={[
                    { value: "Single", label: t("dashboard.routes.patients.addPatient.fields.maritalStatus.options.single") },
                    { value: "Married", label: t("dashboard.routes.patients.addPatient.fields.maritalStatus.options.married") },
                    { value: "Divorced", label: t("dashboard.routes.patients.addPatient.fields.maritalStatus.options.divorced") },
                    { value: "Widowed", label: t("dashboard.routes.patients.addPatient.fields.maritalStatus.options.widowed") },
                  ]}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.maritalStatus.placeholder")}
                />
              </div>

              {/* Insurance ID */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.insuranceId.label")}
                </label>
                <input
                  name="insuranceId"
                  value={formData.insuranceId}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.insuranceId.placeholder")}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-6">
              {t("dashboard.routes.patients.addPatient.sections.contactAddress")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Email */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.email.label")}
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.email.placeholder")}
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.phoneNumber.label")}
                </label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.phoneNumber.placeholder")}
                  className={inputClass}
                />
              </div>

              {/* Alt Phone */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.alternativePhone.label")}
                </label>
                <input
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.alternativePhone.placeholder")}
                  className={inputClass}
                />
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.city.label")}
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.city.placeholder")}
                  className={inputClass}
                />
              </div>

              {/* Address */}
              <div className="lg:col-span-2">
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.address.label")}
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.address.placeholder")}
                  className={inputClass}
                />
              </div>

            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg bg-white"
            >
              {t("dashboard.routes.patients.addPatient.buttons.cancel")}
            </button>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-[#526FFF] text-white"
            >
              {t("dashboard.routes.patients.addPatient.buttons.submit")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
