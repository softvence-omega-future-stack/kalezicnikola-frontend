import { useState } from "react";
import CustomDropdown from "../CustomDropdown";


export default function EmployeeDetailsForm() {
  const [formData, setFormData] = useState({
    department: "",
    reportingTo: "",
    employmentType: "",
    workSchedule: "",
    workHours: "",
  });

  const handleDropdownChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 sm:p-8 bg-white rounded-xl  space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">

        {/* Row 1 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Employee ID</label>
          <input 
            type="text" 
            placeholder="Enter employee id" 
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        {/* Department */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Department</label>
          <CustomDropdown
            value={formData.department}
            onChange={(val) => handleDropdownChange("department", val)}
            options={[
              { value: "sales", label: "Sales" },
              { value: "marketing", label: "Marketing" },
              { value: "technology", label: "Technology" },
              { value: "hr", label: "HR" },
              { value: "finance", label: "Finance" },
            ]}
            placeholder="Select department"
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Position/Role</label>
          <input 
            type="text" 
            placeholder="Enter role" 
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        {/* Reporting To */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Reporting To</label>
          <CustomDropdown
            value={formData.reportingTo}
            onChange={(val) => handleDropdownChange("reportingTo", val)}
            options={[
              { value: "managerA", label: "Manager A" },
              { value: "managerB", label: "Manager B" },
              { value: "managerC", label: "Manager C" },
            ]}
            placeholder="Select manager"
          />
        </div>

        {/* Row 3 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Join Date</label>
          <input 
            type="date" 
            className="w-full p-3 border border-gray-300 text-sm text-[#171c35] placeholder-[#667085] rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        {/* Employment Type */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Employment Type</label>
          <CustomDropdown
            value={formData.employmentType}
            onChange={(val) => handleDropdownChange("employmentType", val)}
            options={[
              { value: "full-time", label: "Full-time" },
              { value: "part-time", label: "Part-time" },
              { value: "contract", label: "Contract" },
            ]}
            placeholder="Select type"
          />
        </div>

        {/* Row 4 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Work Schedule</label>
          <CustomDropdown
            value={formData.workSchedule}
            onChange={(val) => handleDropdownChange("workSchedule", val)}
            options={[
              { value: "9-5", label: "9:00 AM - 5:00 PM" },
              { value: "flexible", label: "Flexible" },
              { value: "shift", label: "Shift-based" },
            ]}
            placeholder="Select schedule"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Work Hours (Weekly)</label>
          <CustomDropdown
            value={formData.workHours}
            onChange={(val) => handleDropdownChange("workHours", val)}
            options={[
              { value: "40", label: "40 hours" },
              { value: "30", label: "30 hours" },
              { value: "20", label: "20 hours" },
            ]}
            placeholder="Select hours"
          />
        </div>

      </div>
    </div>
  );
}
