import React, { useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../Settings/Sidebar/CustomDropdown';

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-' | '';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | '';
  city: string;
  insuranceId: string;
  address: string;
  email: string;
  phoneNumber: string;
  alternativePhone: string;
}

const AddPatientForm: React.FC = () => {
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
    console.log('Patient Data Submitted:', formData);
    alert('Patient data submitted! Check console for details.');
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
    console.log('Form cleared/cancelled');
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#111A2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526FFF] focus:border-transparent";
  const labelClass = "block text-base font-medium text-[#171c35] mb-2";

  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-6 p-6">
      <div className="py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home className="w-4 h-4 text-gray-500" />
          <ChevronRight size={12} className="text-gray-500"/>
          <span onClick={()=> navigate('/dashboard')} className="text-gray-600 cursor-pointer">Dashboard</span>
          <ChevronRight size={12} className="text-gray-500"/>
          <span onClick={()=> navigate('/dashboard/patients')} className="text-gray-600 cursor-pointer">Patients</span>
          <ChevronRight size={12} className="text-gray-500"/>
          <span className="text-[#171c35] font-semibold">Add Patient</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#171c35] mb-8">Add New Patient</h1>

        {/* Form - IMPORTANT: relative positioning for z-index context */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative">

          {/* Personal Info Section */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="relative z-0">
                <label htmlFor="firstName" className={labelClass}>First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name..."
                  required
                  className={inputClass}
                />
              </div>

              {/* Last Name */}
              <div className="relative z-0">
                <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name..."
                  required
                  className={inputClass}
                />
              </div>

              {/* Date of Birth */}
              <div className="relative z-0">
                <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth *</label>
                <input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className={inputClass + " appearance-none"}
                />
              </div>

              {/* Gender Dropdown - Higher z-index */}
              <div className="relative z-30">
                <label htmlFor="gender" className={labelClass}>Gender *</label>
                <CustomDropdown
                  value={formData.gender}
                  onChange={(val) => handleDropdownChange("gender", val)}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                  ]}
                  placeholder="Select gender"
               
                />
              </div>

              {/* Blood Group Dropdown */}
              <div className="relative z-20">
                <label htmlFor="bloodGroup" className={labelClass}>Blood Group *</label>
                <CustomDropdown
                  value={formData.bloodGroup}
                  onChange={(val) => handleDropdownChange("bloodGroup", val)}
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
                  placeholder="Select blood group"
               
                />
              </div>

              {/* Marital Status Dropdown */}
              <div className="relative z-10">
                <label htmlFor="maritalStatus" className={labelClass}>Marital Status *</label>
                <CustomDropdown
                  value={formData.maritalStatus}
                  onChange={(val) => handleDropdownChange("maritalStatus", val)}
                  options={[
                    { value: "Single", label: "Single" },
                    { value: "Married", label: "Married" },
                    { value: "Divorced", label: "Divorced" },
                    { value: "Widowed", label: "Widowed" }
                  ]}
                  placeholder="Select marital status"
                 
                />
              </div>

              {/* Insurance ID */}
              <div className="relative z-0">
                <label htmlFor="insuranceId" className={labelClass}>Insurance ID</label>
                <input
                  id="insuranceId"
                  type="text"
                  name="insuranceId"
                  value={formData.insuranceId}
                  onChange={handleChange}
                  placeholder="Insurance ID..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Contact & Address Section */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Contact & Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative z-0">
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  required
                  className={inputClass}
                />
              </div>

              <div className="relative z-0">
                <label htmlFor="phoneNumber" className={labelClass}>Phone Number *</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter primary phone number..."
                  required
                  className={inputClass}
                />
              </div>

              <div className="relative z-0">
                <label htmlFor="alternativePhone" className={labelClass}>Alternative Phone</label>
                <input
                  id="alternativePhone"
                  type="tel"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleChange}
                  placeholder="Enter alternative phone number..."
                  className={inputClass}
                />
              </div>

              <div className="relative z-0">
                <label htmlFor="city" className={labelClass}>City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city..."
                  required
                  className={inputClass}
                />
              </div>

              <div className="lg:col-span-2 relative z-0">
                <label htmlFor="address" className={labelClass}>Address *</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address..."
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 relative z-0">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full px-6 py-3 bg-white border border-[#D0D5DD] rounded-[8px] text-sm font-medium text-[#111A2D] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#526FFF] hover:bg-[#4159cc] rounded-[8px] text-sm font-medium text-white transition-colors cursor-pointer"
            >
              Add Patient
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
