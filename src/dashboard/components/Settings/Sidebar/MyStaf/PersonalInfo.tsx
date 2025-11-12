import { ChevronDown,  } from "lucide-react";
import { useState } from "react";
import upload from '../../../../../assets/svgIcon/upload.svg'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Upload Photo */}
  
 <div
        className="flex flex-col items-center justify-center py-8 border-2 border-gray-100 rounded-3xl transition-colors cursor-pointer"
        onClick={() => document.getElementById('photoUpload')?.click()}
      >
        <div className=" flex items-center justify-center mb-3 overflow-hidden">
          <img
            src={photoPreview || upload}
            alt=""
            className="w-full h-full object-cover"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="relative">
          <label className="block text-base font-medium text-[#171c35] mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="relative">
          <label className="block text-base font-medium text-[#171c35] mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="bd">Bangladesh</option>
            <option value="in">India</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
        </div>
      </div>

    </div>
  );
};

export default PersonalInfo;
