import { ExternalLink, Plus } from 'lucide-react'
import { useState } from 'react';

const Patient = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const patients = [
    { id: 'SRN-1001', name: 'Floyd Miles', phone: '+881234565', date: '24-06-2024' },
    { id: 'SRN-1002', name: 'Jenny Wilson', phone: '+880198765', date: '24-06-2024' },
    { id: 'SRN-1003', name: 'Courtney Henry', phone: '+880178965', date: '25-06-2024' },
    { id: 'SRN-1004', name: 'Floyd Miles', phone: '+881234565', date: '24-06-2024' },
    { id: 'SRN-1005', name: 'Jenny Wilson', phone: '+880198765', date: '24-06-2024' },
    { id: 'SRN-1006', name: 'Courtney Henry', phone: '+880178965', date: '25-06-2024' },
  ];

  return (
    <div className='bg-white'>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl tracking-tighter font-bold text-gray-900">Patients History</h3>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 font-bold cursor-pointer bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
         <thead>
  <tr className="bg-gray-50 border-b border-gray-200">
    <th className="px-2 py-3">
      <input type="checkbox" className="w-4 h-4" />
    </th>
    <th className="text-left text-md font-semibold text-gray-900 tracking-wider px-3 py-3">
      Insurance ID
    </th>
    <th className="text-left text-md font-semibold text-gray-900 tracking-wider px-6 py-3">
      Name
    </th>
    <th className="text-left text-md font-semibold text-gray-900 tracking-wider px-6 py-3">
      Phone Number
    </th>
    <th className="text-left text-md font-semibold text-gray-900 tracking-wider px-6 py-3">
      Date
    </th>
    <th className="text-left text-md font-semibold text-gray-900 tracking-wider px-6 py-3">
      History
    </th>
    <th className="text-left text-md font-semibold text-gray-900 tracking-wider px-6 py-3">
      AI Summary
    </th>
  </tr>
</thead>

<tbody className="divide-y divide-gray-200">
  {patients.map((patient, idx) => (
    <tr key={idx} className="bg-gray-50 transition-colors">
      <td className="px-2 py-4 whitespace-nowrap">
        <input type="checkbox" className="w-4 h-4" />
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-md font-normal text-gray-900">
        {patient.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-md font-normal text-gray-900">
        {patient.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-md font-normal text-gray-900">
        {patient.phone}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-md font-normal text-gray-900">
        {patient.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="flex items-center gap-1 text-md font-normal text-blue-600 hover:text-blue-700">
          View History
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onFocus={() => setFocusedIndex(idx)}
          onBlur={() => setFocusedIndex(null)}
          onClick={() => setClickedIndex(idx)}
          className={`px-6 py-2 text-sm rounded-full border transition-colors cursor-pointer ${
            focusedIndex === idx || clickedIndex === idx
              ? 'border-blue-500 text-blue-500'
              : 'border-gray-300 font-normal'
          }`}
        >
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  )
}

export default Patient;
