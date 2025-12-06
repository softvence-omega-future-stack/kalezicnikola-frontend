import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

// CustomDropdown Component
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
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

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
        className="w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-sm text-[#111a2d] cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <span className={selectedLabel ? "text-[#111a2d]" : "text-gray-400"}>
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

export default function EmployeeDetailsForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    department: "",
    reportingTo: "",
    employmentType: "",
    workSchedule: "",
    workHours: "",
  });

  const handleDropdownChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // i18n options
  const departmentOptions = t(
    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.department.options",
    { returnObjects: true }
  ) as { value: string; label: string }[];

  const reportingToOptions = t(
    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.reportingTo.options",
    { returnObjects: true }
  ) as { value: string; label: string }[];

  const employmentTypeOptions = t(
    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.employmentType.options",
    { returnObjects: true }
  ) as { value: string; label: string }[];

  const workScheduleOptions = t(
    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.workSchedule.options",
    { returnObjects: true }
  ) as { value: string; label: string }[];

  const workHoursOptions = t(
    "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.workHours.options",
    { returnObjects: true }
  ) as { value: string; label: string }[];

  return (
    <div className="p-4 sm:p-8 bg-white rounded-xl space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
        {/* Employee ID */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.employeeId.label"
            )}
          </label>
          <input
            type="text"
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.employeeId.placeholder"
            )}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Department */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.department.label"
            )}
          </label>
          <CustomDropdown
            value={formData.department}
            onChange={(val) => handleDropdownChange("department", val)}
            options={departmentOptions}
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.department.placeholder"
            )}
          />
        </div>

        {/* Reporting To */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.reportingTo.label"
            )}
          </label>
          <CustomDropdown
            value={formData.reportingTo}
            onChange={(val) => handleDropdownChange("reportingTo", val)}
            options={reportingToOptions}
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.reportingTo.placeholder"
            )}
          />
        </div>

        {/* employmentInfo.Type */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.employmentType.label"
            )}
          </label>
          <CustomDropdown
            value={formData.employmentType}
            onChange={(val) => handleDropdownChange("employmentType", val)}
            options={employmentTypeOptions}
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.employmentType.placeholder"
            )}
          />
        </div>

        {/* Work Schedule */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.workSchedule.label"
            )}
          </label>
          <CustomDropdown
            value={formData.workSchedule}
            onChange={(val) => handleDropdownChange("workSchedule", val)}
            options={workScheduleOptions}
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.workSchedule.placeholder"
            )}
          />
        </div>

        {/* Work Hours */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">
            {t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.workHours.label"
            )}
          </label>
          <CustomDropdown
            value={formData.workHours}
            onChange={(val) => handleDropdownChange("workHours", val)}
            options={workHoursOptions}
            placeholder={t(
              "dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employmentInfo.workHours.placeholder"
            )}
          />
        </div>
      </div>
    </div>
  );
}
