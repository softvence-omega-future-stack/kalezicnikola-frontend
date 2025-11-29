
import { useState } from "react";
import upload from '../../../../../assets/svgIcon/upload.svg';
import CustomDropdown from "../CustomDropdown";


const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPhotoPreview(previewURL);
    }
  };

  return (
    <div className="space-y-6">

      {/* Upload Photo + First & Last Name */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

        {/* Upload Photo */}
        <div
          className="flex flex-col items-center justify-center py-8 border-2 border-gray-100 rounded-3xl transition-colors cursor-pointer"
          onClick={() => document.getElementById('photoUpload')?.click()}
        >
          <div className="flex items-center justify-center mb-3 overflow-hidden">
            <img
              src={photoPreview || upload}
              alt=""
              className={
                photoPreview
                  ? "w-12 h-12 object-cover rounded-xl border border-gray-200"
                  : "w-8 h-8 object-contain opacity-70"
              }
            />
          </div>
          <p className="text-xs text-[#667085] font-medium">Upload Photo</p>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          id="photoUpload"
          className="hidden"
          accept="image/*"
          onChange={handlePhotoChange}
        />

        {/* First Name */}
        <div className="flex flex-col space-y-1">
          <label className="block text-base font-medium text-[#171c35]">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name..."
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col space-y-1">
          <label className="block text-base font-medium text-[#171c35]">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name..."
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Date of Birth & Gender */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#667085] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">Gender</label>
          <CustomDropdown
            value={formData.gender}
            onChange={(val) => handleDropdownChange("gender", val)}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" }
            ]}
            placeholder="Select gender"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Address & State */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address..."
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">State/Province</label>
          <input
            type="text"
            name="state"
            placeholder="Enter your state..."
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Postal Code & Country */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            placeholder="Enter postal code..."
            value={formData.postalCode}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-[#171c35] mb-2">Country</label>
          <CustomDropdown
            value={formData.country}
            onChange={(val) => handleDropdownChange("country", val)}
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "bd", label: "Bangladesh" },
              { value: "in", label: "India" },
            ]}
            placeholder="Select country"
          />
        </div>
      </div>

    </div>
  );
};

export default PersonalInfo;
