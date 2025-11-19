import { ChevronDown } from "lucide-react";

export default function EmployeeDetailsForm() {
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
        <div className="relative flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Department</label>
          <select 
            className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>Select department</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Technology</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
          <ChevronDown className="absolute right-3  bottom-1/2 top-7 translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
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

        <div className="relative flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Reporting To</label>
          <select 
            className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>Select manager</option>
            <option>Manager A</option>
            <option>Manager B</option>
            <option>Manager C</option>
          </select>
          <ChevronDown className="absolute right-3  bottom-1/2 top-7 translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
          
        </div>

        {/* Row 3 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Join Date</label>
          <input 
            type="date" 
            className="w-full p-3 border border-gray-300 text-sm text-[#171c35] placeholder-[#667085] rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="relative flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Employment Type</label>
          <select 
            className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>Select type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
          <ChevronDown className="absolute right-3  bottom-1/2 top-7 translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
        </div>

        {/* Row 4 */}
        <div className="relative flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Work Schedule</label>
          <select 
            className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>Select schedule</option>
            <option>9:00 AM - 5:00 PM</option>
            <option>Flexible</option>
            <option>Shift-based</option>
          </select>
          <ChevronDown className="absolute right-3  bottom-1/2 top-7 translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
        </div>

        <div className="relative flex flex-col space-y-1">
          <label className="text-base font-medium text-[#171c35]">Work Hours (Weekly)</label>
          <select 
            className="w-full px-4 py-2.5 text-sm text-[#667085] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>Select hours</option>
            <option>40 hours</option>
            <option>30 hours</option>
            <option>20 hours</option>
          </select>
          <ChevronDown className="absolute right-3 bottom-1/2 top-7 translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
