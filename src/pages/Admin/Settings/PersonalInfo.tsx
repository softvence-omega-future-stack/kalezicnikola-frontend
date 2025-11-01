import React, { useState } from 'react';
import keren from '../../../assets/svgIcon/karen.svg';
import edit from '../../../assets/svgIcon/editIcon.svg';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
}

const PersonalInfoForm: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    console.log('Saving changes:', formData);
    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
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

  return (
    <div className="bg-[#FAFAFA] -mt-2 rounded-2xl p-4 sm:p-6 lg:p-8">
      <div className="p-6 sm:p-8">

        {/* Header */}
        <h1 className="text-xl font-semibold text-[#171C35] mb-6">Personal Info</h1>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="profileInput"
              className="hidden"
              onChange={handleProfileChange}
            />
            {/* Edit button */}
            <button
              onClick={() => document.getElementById('profileInput')?.click()}
              className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <img src={edit} alt="Edit" />
            </button>
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#042435]">Karen Nix</h2>
            <p className="text-sm text-[#111A2D]">Anaesthesia</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className="w-full px-4 py-4 border border-[#D0D5DD] rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
                className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Email & Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
                className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
              className="w-full px-4 py-5 border border-gray-200 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-base font-medium text-[#171c35] mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
                className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="w-full px-6 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-[#171c35] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-[#526FFF] rounded-xl text-base font-semibold text-white transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default PersonalInfoForm;
