import React, { useState } from 'react';
import { Home, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | ''; // Updated for select
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-' | '';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | ''; // Added new field
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
    maritalStatus: '', // Initialized new field
    city: '',
    insuranceId: '',
    address: '',
    email: '',
    phoneNumber: '',
    alternativePhone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault(); // Prevent default form submission
    console.log('Patient Data Submitted:', formData);
    // In a real application, you would send formData to an API here.
    alert('Patient data submitted! Check console for details.');
  };

  const handleCancel = () => {
    // Optionally clear the form or navigate away
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
const navigate = useNavigate()
  return (
    <div className="min-h-screen mt-6">
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
        <h1 className="text-2xl font-bold text-[#171c35] mb-8">Add New Patient </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          
          {/* 1. Personal Info Section */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
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
              <div>
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
              <div>
                <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth *</label>
                <div className="relative">
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className={inputClass + " appearance-none"} // Use appearance-none to hide default calendar icon if needed
                  />
                  {/* The default date input styling is often sufficient, but you can keep the image if preferred */}
                  {/* <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" alt="calendar" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" /> */}
                </div>
              </div>

              {/* Gender (Updated to Select) */}
              <div>
                <label htmlFor="gender" className={labelClass}>Gender *</label>
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={inputClass + " appearance-none cursor-pointer"}
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label htmlFor="bloodGroup" className={labelClass}>Blood Group *</label>
                <div className="relative">
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className={inputClass + " appearance-none cursor-pointer"}
                  >
                    <option value="" disabled>Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              {/* Marital Status (NEW FIELD) */}
              <div>
                <label htmlFor="maritalStatus" className={labelClass}>Marital Status *</label>
                <div className="relative">
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    required
                    className={inputClass + " appearance-none cursor-pointer"}
                  >
                    <option value="" disabled>Select marital status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Insurance ID */}
              <div>
                <label htmlFor="insuranceId" className={labelClass}>Insurance ID</label>
                <input
                  id="insuranceId"
                  type="text"
                  name="insuranceId"
                  value={formData.insuranceId}
                  onChange={handleChange}
                  placeholder="Insurance ID (e.g., policy number)..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* 2. Contact & Address Section */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Contact & Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Email */}
              <div>
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

              {/* Phone Number */}
              <div>
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

              {/* Alternative Phone */}
              <div>
                <label htmlFor="alternativePhone" className={labelClass}>Alternative Phone</label>
                <input
                  id="alternativePhone"
                  type="tel"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleChange}
                  placeholder="Enter alternative phone number (optional)..."
                  className={inputClass}
                />
              </div>
              
              {/* City (Updated to Input/Select depending on your needs, keeping as input for flexibility) */}
              <div>
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

              {/* Address (Full width) */}
              <div className="lg:col-span-2">
                <label htmlFor="address" className={labelClass}>Address *</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address (Street, locality, zip)..."
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* 3. Action Buttons */}
          <div className="flex  justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-white border border-[#D0D5DD] rounded-[8px] text-sm font-medium text-[#111A2D] hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#526FFF] rounded-[8px] text-sm font-medium text-white hover:bg-[#435FFF] transition-colors shadow-md"
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