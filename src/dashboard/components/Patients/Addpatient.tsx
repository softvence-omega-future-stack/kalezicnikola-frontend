import React, { useEffect, useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../Settings/Sidebar/CustomDropdown';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';
import { toast } from 'react-toastify';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | '';
  bloodGroup: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'O_POS' | 'O_NEG' | 'AB_POS' | 'AB_NEG' | '';
  maritalStatus: 'MARRIED' | 'UNMARRIED' | 'DIVORCED' | 'WIDOWED' | '';
  city: string;
  insuranceId: string;
  address: string;
  email: string;
  phone: string;
  alternativePhone: string;
  status?: 'ACTIVE' | 'INACTIVE';
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
}

interface FormErrors {
  [key: string]: string;
}

// interface ApiErrorResponse {
//   message?: string;
// }

interface ApiSuccessResponse {
  message?: string;
  data?: {
    patients?: FormData[];
  };
}

const AddPatientForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [allPatients, setAllPatients] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    city: '',
    insuranceId: '',
    address: '',
    email: '',
    phone: '',
    alternativePhone: '',
    status: 'ACTIVE',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#111A2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526FFF] focus:border-transparent";
  const labelClass = "block text-base font-medium text-[#171c35] mb-2";
  const errorClass = "text-red-500 text-sm mt-1";

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const res = await axios.get<ApiSuccessResponse>(
          `${import.meta.env.VITE_API_URL}/doctor/patient/all`,
          {
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
          }
        );
        setAllPatients(res.data.data?.patients || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Failed to fetch patients:", err.message);
        } else {
          console.error("Failed to fetch patients:", err);
        }
      }
    };

    getAllPatients();
  }, [accessToken]);

  // Validation function
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const phoneRegex = /^\+?\d{7,15}$/;

    // Required validations
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    // Email validation + uniqueness
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    else if (allPatients.some(p => p.email === formData.email))
      newErrors.email = "This email is already used";

    // Phone validation + uniqueness
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";
    else if (allPatients.some(p => p.phone === formData.phone))
      newErrors.phone = "This phone number is already used";

    // Alternative phone uniqueness
    if (formData.alternativePhone && !phoneRegex.test(formData.alternativePhone))
      newErrors.alternativePhone = "Invalid alternative phone number";
    else if (formData.alternativePhone && allPatients.some(p => p.alternativePhone === formData.alternativePhone))
      newErrors.alternativePhone = "This alternative phone is already used";

    // Emergency contact uniqueness
    if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone))
      newErrors.emergencyContactPhone = "Invalid emergency contact phone";
    else if (formData.emergencyContactPhone && allPatients.some(p => p.emergencyContactPhone === formData.emergencyContactPhone))
      newErrors.emergencyContactPhone = "This emergency contact phone is already used";

    // Insurance ID uniqueness
    if (formData.insuranceId && !/^[A-Z0-9-]+$/.test(formData.insuranceId))
      newErrors.insuranceId = "Invalid insurance ID";
    else if (formData.insuranceId && allPatients.some(p => p.insuranceId === formData.insuranceId))
      newErrors.insuranceId = "This insurance ID is already used";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/doctor/patient/add`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toast.success(response.data.message || "Patient added successfully");
      navigate("/dashboard/patients");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Server error");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: '',
      city: '',
      insuranceId: '',
      address: '',
      email: '',
      phone: '',
      alternativePhone: '',
      status: 'ACTIVE',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
    });
    setErrors({});
  };

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
                {errors.firstName && <div className={errorClass}>{errors.firstName}</div>}
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
                {errors.lastName && <div className={errorClass}>{errors.lastName}</div>}
              </div>

              {/* Date of birth */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.dateOfBirth.label")}
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.dob && <div className={errorClass}>{errors.dob}</div>}
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.gender.label")}
                </label>
                <CustomDropdown
                  value={formData.gender}
                  onChange={(val) => handleDropdownChange("gender", val)} 
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "OTHER", label: "Other" }
                  ]}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.gender.placeholder")}
                />
                {errors.gender && <div className={errorClass}>{errors.gender}</div>}
              </div>

              {/* Blood Group */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.bloodGroup.label")}
                </label>
                <CustomDropdown
                  value={formData.bloodGroup}
                  onChange={(val) => handleDropdownChange("bloodGroup", val)} 
                  options={[
                    { value: 'A_POS', label: 'A+' },
                    { value: 'A_NEG', label: 'A-' },
                    { value: 'B_POS', label: 'B+' },
                    { value: 'B_NEG', label: 'B-' },
                    { value: 'O_POS', label: 'O+' },
                    { value: 'O_NEG', label: 'O-' },
                    { value: 'AB_POS', label: 'AB+' },
                    { value: 'AB_NEG', label: 'AB-' },
                  ]}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.bloodGroup.placeholder")}
                />
                {errors.bloodGroup && <div className={errorClass}>{errors.bloodGroup}</div>}
              </div>

              {/* Marital Status */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.maritalStatus.label")}
                </label>
                <CustomDropdown
                  value={formData.maritalStatus}
                  onChange={(val) => handleDropdownChange("maritalStatus", val)} 
                  options={[
                    { value: "UNMARRIED", label: "Single" },
                    { value: "MARRIED", label: "Married" },
                    { value: "DIVORCED", label: "Divorced" },
                    { value: "WIDOWED", label: "Widowed" }
                  ]}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.maritalStatus.placeholder")}
                />
                {errors.maritalStatus && <div className={errorClass}>{errors.maritalStatus}</div>}
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
                {errors.insuranceId && <div className={errorClass}>{errors.insuranceId}</div>}
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
                {errors.email && <div className={errorClass}>{errors.email}</div>}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.phoneNumber.label")}
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("dashboard.routes.patients.addPatient.fields.phoneNumber.placeholder")}
                  className={inputClass}
                />
                {errors.phone && <div className={errorClass}>{errors.phone}</div>}
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
                {errors.alternativePhone && <div className={errorClass}>{errors.alternativePhone}</div>}
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
                {errors.city && <div className={errorClass}>{errors.city}</div>}
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
                {errors.address && <div className={errorClass}>{errors.address}</div>}
              </div>

            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">
              {t("dashboard.routes.patients.addPatient.sections.emergencyContact")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative">
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.emergencyName.label")}
                </label>
                <input 
                  name="emergencyContactName" 
                  value={formData.emergencyContactName} 
                  onChange={handleChange} 
                  className={inputClass} 
                  placeholder={t("dashboard.routes.patients.addPatient.fields.emergencyName.placeholder")} 
                />
              </div>
              <div className="relative">
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.emergencyPhone.label")}
                </label>
                <input 
                  name="emergencyContactPhone" 
                  value={formData.emergencyContactPhone} 
                  onChange={handleChange} 
                  className={inputClass} 
                  placeholder={t("dashboard.routes.patients.addPatient.fields.emergencyPhone.placeholder")} 
                />
                {errors.emergencyContactPhone && <div className={errorClass}>{errors.emergencyContactPhone}</div>}
              </div>
              <div className="relative">
                <label className={labelClass}>
                  {t("dashboard.routes.patients.addPatient.fields.emergencyRelationShip.label")}
                </label>
                <input 
                  name="emergencyContactRelationship" 
                  value={formData.emergencyContactRelationship} 
                  onChange={handleChange} 
                  className={inputClass} 
                  placeholder={t("dashboard.routes.patients.addPatient.fields.emergencyRelationShip.placeholder")} 
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
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg text-white transition-colors
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#526FFF] hover:bg-[#4159cc] cursor-pointer'}
              `}
            >
              {loading ? 'Adding Patient...' : t("dashboard.routes.patients.addPatient.buttons.submit")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;