import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Upload } from "lucide-react";

// CustomDropdown Component with Portal
function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  
  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        const dropdown = document.getElementById(`dropdown-portal-${value}`);
        if (dropdown && !dropdown.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, value]);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-[#171c35] cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className={selectedLabel ? "text-[#171c35]" : "text-[#667085]"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && createPortal(
        <div
          id={`dropdown-portal-${value}`}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
            zIndex: 99999,
          }}
          className="bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                opt.value === value
                  ? "bg-blue-50 text-[#526FFF] font-medium"
                  : "text-[#111a2d] hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

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

  const inputClass = {
    input: "w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    label: "block text-base font-medium text-[#171c35] mb-2",
    error: ""
  }

  return (
    <div className="space-y-6">

      {/* Upload Photo + First & Last Name */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

        {/* Upload Photo */}
        <div
          className="flex flex-col items-center justify-center py-8 border-2 border-gray-100 rounded-3xl transition-colors cursor-pointer hover:border-gray-200"
          onClick={() => document.getElementById('photoUpload')?.click()}
        >
          <div className="flex items-center justify-center mb-3 overflow-hidden">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-xl border border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
            )}
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
          <label className={inputClass.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name..."
            value={formData.firstName}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col space-y-1">
          <label className={inputClass.label}>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name..."
            value={formData.lastName}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>
      </div>

      {/* Date of Birth & Gender */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>

        <div>
          <label className={inputClass.label}>Gender</label>
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
          <label className={inputClass.label}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={formData.email}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>
        <div>
          <label className={inputClass.label}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>
      </div>

      {/* Address & State */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address..."
            value={formData.address}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>
        <div>
          <label className={inputClass.label}>State/Province</label>
          <input
            type="text"
            name="state"
            placeholder="Enter your state..."
            value={formData.state}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>
      </div>

      {/* Postal Code & Country */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            placeholder="Enter postal code..."
            value={formData.postalCode}
            onChange={handleInputChange}
            className={inputClass.input}
          />
        </div>
        <div>
          <label className={inputClass.label}>Country</label>
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