import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

export type Gender = "MALE" | "FEMALE" | "OTHERS";
export interface StaffFormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender | "";
  email: string;
  phone: string;
  presentAddress: string;
  state: string;
  postalCode: string;
  country: string;
  nationality: string;
  photo?: File;
}


// CustomDropdown Component with Portal
function CustomDropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  React.useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        const dropdown = document.getElementById(`dropdown-portal-${value}`);
        if (dropdown && !dropdown.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
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

      {open &&
        createPortal(
          <div
            id={`dropdown-portal-${value}`}
            style={{
              position: "absolute",
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

function PersonalInfo({
  data,
  setData,
  errors = {}
}: {
  data: StaffFormData;
  setData: React.Dispatch<React.SetStateAction<StaffFormData>>;
  errors?: Partial<Record<keyof StaffFormData, string>>; 
}) {

  const { t } = useTranslation();
  
  const handleDropdownChange = (
    field: keyof StaffFormData,
    value: string
  ) => {
    setData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };


    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setData(prev => ({
          ...prev,
          photo: file, 
        }));
      }
    };




  const inputClass = {
    input:
      "w-full px-4 py-2.5 text-sm text-[#171c35] placeholder-[#667085] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    label: "block text-base font-medium text-[#171c35] mb-2",
  };

  return (
    <div className="space-y-6">
      {/* Upload Photo + Name */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div
          className="flex flex-col items-center justify-center py-8 border-2 border-gray-100 rounded-3xl transition-colors cursor-pointer hover:border-gray-200"
          onClick={() => document.getElementById("photoUpload")?.click()}
        >
          <div className="flex items-center justify-center mb-3 overflow-hidden">
            {data?.photo ? (
              <img
                src={URL.createObjectURL(data.photo)}
                // src={data.photo}
                alt="Staff Photo"
                className="w-20 h-20 object-cover rounded-xl"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <p className="text-xs text-[#667085] font-medium">
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.uploadPhoto")}
          </p>
        </div>

        <input
          type="file"
          id="photoUpload"
          className="hidden"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        
        <div className="flex flex-col space-y-1">
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.firstName")}
          </label>
          <input
            type="text"
            name="firstName"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.firstNamePlaceholder"
            )}
            value={data.firstName}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}

        </div>

        <div className="flex flex-col space-y-1">
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.lastName")}
          </label>
          <input
            type="text"
            name="lastName"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.lastNamePlaceholder"
            )}
            value={data.lastName}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}

        </div>
      </div>

      {/* DOB & Gender */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.dateOfBirth")}
          </label>
          <input
            type="date"
            name="dob"
            value={data.dob}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.dob && <span className="text-red-500 text-xs">{errors.dob}</span>}
        </div>

        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.gender")}
          </label>
         <CustomDropdown
            value={data.gender}
            onChange={(val) => handleDropdownChange("gender", val)}
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
              { value: "OTHERS", label: "Others" },
            ]}
          />

          {errors.gender && <span className="text-red-500 text-xs">{errors.gender}</span>}

        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.email")}
          </label>
          <input
            type="email"
            name="email"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.emailPlaceholder"
            )}
            value={data.email}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}

        </div>

        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.phone")}
          </label>
          <input
            type="tel"
            name="phone"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.phonePlaceholder"
            )}
            value={data.phone}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}

        </div>
      </div>

      {/* Address & State */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.address")}
          </label>
          <input
            type="text"
            name="presentAddress"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.addressPlaceholder"
            )}
            value={data.presentAddress}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.presentAddress && <span className="text-red-500 text-xs">{errors.presentAddress}</span>}

        </div>

        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.state")}
          </label>
          <input
            type="text"
            name="state"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.statePlaceholder"
            )}
            value={data.state}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.state && <span className="text-red-500 text-xs">{errors.state}</span>}

        </div>
      </div>

      {/* Postal Code & Country */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.postalCode")}
          </label>
          <input
            type="text"
            name="postalCode"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.postalCodePlaceholder"
            )}
            value={data.postalCode}
            onChange={handleInputChange}
            className={inputClass.input}
          />
          {errors.postalCode && <span className="text-red-500 text-xs">{errors.postalCode}</span>}

        </div>

        <div>
          <label className={inputClass.label}>
            {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.country")}
          </label>
          <CustomDropdown
            value={data.country}
            onChange={(val) => handleDropdownChange("country", val)}
            options={[
              {
                value: "us",
                label: t(
                  "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.us"
                ),
              },
              {
                value: "uk",
                label: t(
                  "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.uk"
                ),
              },
              {
                value: "bd",
                label: t(
                  "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.bd"
                ),
              },
              {
                value: "in",
                label: t(
                  "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.in"
                ),
              },
            ]}
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.selectCountry"
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
            <label className={inputClass.label}>
              {/* {t("dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.country")} */}
              Nationality
            </label>
            <CustomDropdown
              value={data.nationality}
              onChange={(val) => handleDropdownChange("nationality", val)}
              options={[
                {
                  value: "us",
                  label: t(
                    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.us"
                  ),
                },
                {
                  value: "uk",
                  label: t(
                    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.uk"
                  ),
                },
                {
                  value: "bd",
                  label: t(
                    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.bd"
                  ),
                },
                {
                  value: "in",
                  label: t(
                    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.countryOptions.in"
                  ),
                },
              ]}
              placeholder={t(
                "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personalInfo.selectCountry"
              )}
            />
            {errors.nationality && <span className="text-red-500 text-xs">{errors.nationality}</span>}

          </div>

      </div>
    </div>
  );
};

export default PersonalInfo;
