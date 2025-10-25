

export default function EmployeeDetailsForm() {
  return (
    <div className="p-4 sm:p-8 bg-white rounded-xl shadow-lg space-y-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

        {/* Row 1 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Employee ID</label>
          <input 
            type="text" 
            placeholder="Enter employee id" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Department</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Select department</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Technology</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Position/Role</label>
          <input 
            type="text" 
            placeholder="Enter role" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Reporting To</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Select manager</option>
            <option>Manager A</option>
            <option>Manager B</option>
            <option>Manager C</option>
          </select>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Join Date</label>
          <input 
            type="date" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Employment Type</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Select type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Row 4 */}
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Work Schedule</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Select schedule</option>
            <option>9:00 AM - 5:00 PM</option>
            <option>Flexible</option>
            <option>Shift-based</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-base font-medium text-gray-800">Work Hours (Weekly)</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Select hours</option>
            <option>40 hours</option>
            <option>30 hours</option>
            <option>20 hours</option>
          </select>
        </div>

      </div>

     
    </div>
  );
}
