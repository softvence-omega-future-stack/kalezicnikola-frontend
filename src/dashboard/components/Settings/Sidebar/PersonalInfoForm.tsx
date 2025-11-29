import React, { useState } from "react";
import { Edit, PencilLine } from "lucide-react";
import karen from '../../../../assets/svgIcon/karenNix.svg';

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
    <label htmlFor={name} className="text-sm md:text-base font-medium text-[#171C35]">
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
      className={`px-3 py-3 md:px-4 md:py-4 text-xs md:text-sm text-[#171C35] rounded-lg transition-all outline-none placeholder-[#667085] ${
        isEditing
          ? "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          : "bg-gray-100 cursor-default"
      }`}
    />
  </div>
);

const PersonalInfoForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  
  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Information saved successfully!");
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  return (
    <section className="min-h-screen bg-white rounded-2xl">
      <div className=" rounded-xl md:rounded-3xl p-4 md:p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-[#171C35]">Personal Info</h2>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold px-3 py-2 md:px-4 md:py-2 rounded-lg cursor-pointer border border-[#111A2D] hover:bg-gray-50 transition-colors"
            >
              <PencilLine className="w-4 h-4 md:w-5 md:h-5 text-black" />
              <span className="text-black">Edit</span>
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
              {formData.firstName || "Enter your name"} {formData.lastName}
            </h2>
            <p className="text-xs md:text-sm text-[#111A2D] truncate">Anaesthesia</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <InputField
              label="First name"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter your first name"
              isEditing={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="Last name"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your last name"
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              isEditing={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              placeholder="Enter your phone number"
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <div>
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              placeholder="Enter your address"
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col space-y-2">
              <label htmlFor="dob" className="text-sm md:text-base font-medium text-[#171C35]">
                Date of Birth
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
                className={`px-3 py-3 md:px-4 md:py-4 text-xs md:text-sm text-[#171C35] rounded-lg transition-all outline-none ${
                  isEditing
                    ? "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    : "bg-gray-100 cursor-default"
                }`}
              />
            </div>
            <InputField
              label="Gender"
              name="gender"
              value={formData.gender}
              placeholder="Enter your gender"
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons - Only show in edit mode */}
        {isEditing && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
            <button
              onClick={handleCancel}
              className="w-full px-4 py-3 md:px-6 md:py-3 border border-gray-200 rounded-lg text-sm font-semibold text-[#171C35] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full px-4 py-3 md:px-6 md:py-3 bg-[#526FFF] rounded-xl text-sm md:text-base font-semibold text-white hover:bg-[#425CE0] transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalInfoForm;