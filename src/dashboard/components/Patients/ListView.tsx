import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListView = () => {
    const navigate = useNavigate()
     const patients = [
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' }
  ];
    // ✅ Selected rows state
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // ✅ Toggle single row selection
  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // ✅ Toggle all rows selection
  const toggleAllRows = () => {
    if (selectedRows.length === patients.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(patients.map(patient => patient.id));
    }
  };
  return (
    <div>
          <div className="bg-white rounded-2xl  overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
               <thead className="border-b border-gray-200">
  <tr>
    <th className="px-6 py-3 text-left text-sm font-semibold text-[#171C35]">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedRows.length === patients.length}
          onChange={toggleAllRows} // toggleAllRows function define করতে হবে
          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        Insurance Id
      </div>
    </th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171C35]">Name</th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171C35]">Phone Number</th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171C35]">Date</th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171C35]">Profile</th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-200">
  {patients.map((patient, index) => (
    <tr key={index} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedRows.includes(patient.id)}
            onChange={() => toggleRowSelection(patient.id)}
            className="w-4 h-4 rounded-full border-gray-100 text-indigo-600 focus:ring-indigo-500"
          />
          {patient.id}
        </div>
      </td>
      <td className="px-6 py-4 text-lg font-normal text-[#171C35]">{patient.name}</td>
      <td className="px-6 py-4 text-lg font-normal text-[#171C35]">{patient.phone}</td>
      <td className="px-6 py-4 text-lg font-normal text-[#171C35]">{patient.date}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
          className="flex items-center gap-1 text-lg font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
        >
          View
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
    </div>
  )
}

export default ListView