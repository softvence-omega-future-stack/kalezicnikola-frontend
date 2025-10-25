import React, { useState } from "react";
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
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
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
      className={`p-3 border border-gray-300 rounded-lg transition outline-none bg-white focus:border-blue-500`}
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
    profilePic: "https://i.ibb.co.com/qwJ83Rb/Screenshot-2025-10-23-153749.png",
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
    <section className="space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Personal Info</h2>
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 text-sm text-gray-900 border border-gray-300 py-1 px-3 rounded-lg"
        >
          Edit
          <Edit size={14} />
        </button>
      </header>

     {/* Profile Info */}
<div className="flex items-center gap-4 relative">
  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
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
        className="p-2 bg-white rounded-full border shadow-md cursor-pointer hover:bg-gray-100 flex items-center justify-center"
        title="Edit profile picture"
      >
        <Edit size={16} className="text-gray-600" />
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
    <p className="text-lg font-bold text-gray-900">
      {formData.firstName || "Enter your name"}
    </p>
    <p className="text-sm text-gray-900">
     Anaesthesia
    </p>
  </div>
</div>


      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div>
          <label htmlFor="dob" className="text-sm font-medium text-gray-700">
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
      <footer className="flex justify-end gap-4 border-t pt-4">
        <button
          onClick={handleCancel}
          className="py-3 px-6 text-sm font-semibold text-gray-700 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="py-3 px-6 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 cursor-pointer transition"
        >
          Save Changes
        </button>
      </footer>
    </section>
  );
};

export default PersonalInfoForm;
