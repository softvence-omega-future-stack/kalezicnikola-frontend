import React, { useState } from 'react';
import { Home,  ChevronDown, ChevronRight } from 'lucide-react';

const AddPatientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home className="w-4 h-4" />
         <ChevronRight size={12}/>
          <span>Dashboard</span>
             <ChevronRight size={12}/>
          <span>Patients</span>
           <ChevronRight size={12}/>
          <span className="text-[#171c35]">Add Patient</span>
        </div>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-[#171c35] mb-8">Add Patient</h1>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          {/* Personal Info Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Personal info</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Date of Birth
                </label>
                <div className="relative">
  <input
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleChange}
    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#111a2d] focus:outline-none focus:ring-2 focus:border-transparent"
  />
  <img
    src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" 
    alt="calendar"
    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
  />
</div>

              </div>

              {/* Gender */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Enter your gender..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2  focus:border-transparent"
                  >
                    <option value="">Select your blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your gender..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>

              {/* Insurance ID */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Insurance ID
                </label>
                <input
                  type="text"
                  name="insuranceId"
                  value={formData.insuranceId}
                  onChange={handleChange}
                  placeholder="Insurance ID..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[#171c35] mb-6">Contact Info</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>

              {/* Alternative Phone */}
              <div className="md:col-span-2">
                <label className="block text-base font-medium text-[#171c35] mb-2">
                  Alternative Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleChange}
                  placeholder="Enter alternative phone number..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#667085] placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 bg-white border border-[#D0D5DD] rounded-[8px] text-sm font-medium text-[#111A2D] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 bg-[#526FFF] rounded-[8px] text-sm font-medium text-white transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientForm;