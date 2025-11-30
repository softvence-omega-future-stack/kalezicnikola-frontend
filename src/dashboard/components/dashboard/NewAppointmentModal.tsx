import React, { useState } from "react";
import { X } from "lucide-react";

interface NewAppointmentModalProps {
  onClose: () => void;
}

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    insuranceId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    schedule: "",
    appointmentDetails: "",
    address: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div className="bg-gray-100 rounded-2xl w-full max-w-lg mx-auto shadow-xl animate-fadeIn max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-300 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] truncate">
                Add New Appointment
              </h2>
              <p className="text-sm text-[#667085] mt-1 sm:mt-0.5">
                Complete all information
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 ml-2 flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-4 sm:mt-6 flex-1 overflow-y-auto">
          {/* Insurance ID */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              Insurance ID
            </label>
            <input
              type="text"
              name="insuranceId"
              value={formData.insuranceId}
              onChange={handleChange}
              placeholder="Insurance ID..."
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm text-[#526FFF] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm text-[#526FFF] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm text-[#526FFF] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm text-[#526FFF] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526FFF] appearance-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Enter gender..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm text-[#526FFF] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Blood & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-3 bg-white rounded-[8px] text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select blood group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                Schedule
              </label>
              <div className="relative text-[#111A2D]">
                <input
                  type="datetime-local"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 appearance-none bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="mb-3 sm:mb-4 relative">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              Appointment details
            </label>
            <textarea
              name="appointmentDetails"
              value={formData.appointmentDetails}
              onChange={handleChange}
              placeholder="Details..."
              rows={3}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Address */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#526FFF] text-white font-medium py-3 sm:py-4 rounded-[8px] transition-colors hover:bg-[#425CE0]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentModal;