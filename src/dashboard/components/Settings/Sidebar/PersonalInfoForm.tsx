import React, { useState } from "react";
import edit from '../../../../assets/svgIcon/edit2.svg'
// import calendar from '../../../../assets/svgIcon/calender.svg'
import karen from '../../../../assets/svgIcon/karenNix.svg'
import { Edit } from "lucide-react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  readOnly = false,
  onChange,
}) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={name} className="text-sm font-medium text-[#171C35]">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={onChange}
      className={`p-3 text-[#171C35] border border-gray-300 rounded-lg transition outline-none bg-white focus:border-[#526FFF]`}
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
    profilePic: karen
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
  const handleCancel = () => setIsEditing(false);

  // Profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  return (
    <section className="space-y-8 bg-white p-2.5 rounded-2xl">
      {/* Header */}
      <header className="flex justify-between items-center px-3 pt-3  pb-4">
        <h2 className="text-xl font-semibold text-[#171C35]">Personal Info</h2>
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 text-sm text-[#111a2D] border border-gray-300 py-1 px-3 rounded-xl"
        >
          Edit
            <img src={edit} alt="" />
        </button>
      </header>

     {/* Profile Info */}
<div className="flex items-center gap-4 relative">
  <div className="relative w-20 h-20 rounded-full overflow-hidden ">
    <img
      src={formData.profilePic}
      alt="Profile"
      className="object-cover w-full h-full"
    />
  </div>

  {/* Edit icon outside picture */}
  {isEditing && (
    <div className="absolute top-2/3 left-20 -translate-x-1/2">
      <label
        htmlFor="profileUpload"
        className="p-2 bg-white rounded-full border border-gray-50  flex items-center justify-center"
        title="Edit profile picture"
      >
        <Edit size={12} className="text-gray-600" />
      </label>
      <input
        id="profileUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  )}

  <div>
    <p className="text-base font-semibold text-[#111a2D]">
      {formData.firstName || "Enter your name"}
    </p>
    <p className="text-sm text-[#111a2d]">
     Anaesthesia
    </p>
  </div>
</div>


      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 ">
        <InputField
          label="First name"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <InputField
          label="Last name"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          placeholder="Enter your phone number"
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            placeholder="Enter your address"
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <label htmlFor="dob" className="relative text-base font-semibold text-[#171C35]">
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
  className={`p-3 w-full border border-gray-300 rounded-lg transition outline-none ${
    isEditing ? "bg-white focus:border-gray-400" : "bg-gray-100 cursor-not-allowed"
  }`}
/>
{/* <img src={calendar} alt="" className="absolute top-9 right-3" /> */}
  
        </div>

        <InputField
          label="Gender"
          name="gender"
          value={formData.gender}
          placeholder="Enter your gender"
          readOnly={!isEditing}
          onChange={handleChange}
        />
      </div>

      {/* Buttons */}
     <div className="flex flex-col md:flex-row gap-3 pt-2">
            <button
              type="button"
             onClick={handleCancel}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-[#111a2d] rounded-xl text-sm font-medium  transition-color cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
            onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-[#526FFF] text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
            >
              Save Change
            </button>
          </div>
    </section>
  );
};

export default PersonalInfoForm;
