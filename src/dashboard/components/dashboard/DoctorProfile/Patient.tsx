import { ExternalLink, Plus } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Patient = () => {
  const [focusedIndex, ] = useState<number | null>(null);
  const [clickedIndex, ] = useState<number | null>(null);
  const navigate = useNavigate()

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
        <h3 className="text-xl tracking-tighter font-semibold text-[#171C35]">Patients History</h3>
        <button onClick={()=> navigate('/dashboard/add-patient')} className="flex items-center gap-2 px-4 py-2 text-sm text-[#111A2D] font-semibold cursor-pointer bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-xl s overflow-hidden">
        <table className="w-full">
         <thead>
  <tr className=" ">
    <th className="px-2 py-3">
      <input type="checkbox" className="w-4 h-4" />
    </th>
    <th className="text-left text-sm font-semibold text-[#171C35] tracking-wider px-3 py-3">
      Insurance ID
    </th>
    <th className="text-left text-sm font-semibold text-[#171C35] tracking-wider px-6 py-3">
      Name
    </th>
    <th className="text-left text-sm font-semibold text-[#171C35] tracking-wider px-6 py-3">
      Phone Number
    </th>
    <th className="text-left text-sm font-semibold text-[#171C35] tracking-wider px-6 py-3">
      Date
    </th>
    <th className="text-left text-sm font-semibold text-[#171C35] tracking-wider px-6 py-3">
      History
    </th>
    <th className="text-left text-sm font-semibold text-[#171C35] tracking-wider px-6 py-3">
      AI Summary
    </th>
  </tr>
</thead>

<tbody className= " ">
  {patients.map((patient, idx) => (
    <tr key={idx} className=" transition-colors border-b border-gray-200">
      <td className="px-2 py-4 whitespace-nowrap">
        <input type="checkbox" className="w-4 h-4" />
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">
        {patient.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">
        {patient.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">
        {patient.phone}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">
        {patient.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button onClick={()=> navigate(`/dashboard/patients/${patient.id}`)} className="flex items-center gap-1 text-sm font-medium text-[#526FFF] cursor-pointer ">
          View History
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
        onClick={()=> navigate(`/dashboard/patients/${patient.id}`)}
          // onFocus={() => setFocusedIndex(idx)}
          // onBlur={() => setFocusedIndex(null)}
          // onClick={() => setClickedIndex(idx)}
          className={`px-6 py-2 text-sm font-medium rounded-full border transition-colors cursor-pointer ${
            focusedIndex === idx || clickedIndex === idx
              ? 'border-[#526FFF] text-[#526FFF]'
              : 'border-[#111A2D] font-normal'
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
