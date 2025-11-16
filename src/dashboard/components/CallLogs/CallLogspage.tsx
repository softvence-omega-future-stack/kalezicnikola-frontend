import React, { useState } from 'react';
import {  Play,} from 'lucide-react';
import PatientTranscriptPage from './TransscriptModal';
import { FiX } from 'react-icons/fi';

import homeIcon from '../../../assets/svgIcon/homeIcon.svg'
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg'
import filter from '../../../assets/svgIcon/filter.svg'
import viewIcon from '../../../assets/svgIcon/viewArrow.svg'
import { useNavigate } from 'react-router-dom';

interface CallLog {
  id: number;
  patientName: string;
  timestamp: string;
  phoneNumber: string;
  status: 'Successful' | 'Unsuccessful' | 'Transferred' | 'Missed';
  duration: string;
}

const CallLogsPage: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

     const [currentCall, setCurrentCall] = useState<CallLog | null>(null);
     const navigate = useNavigate()
  

 

  const callLogs: CallLog[] = [
    { id: 1, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05: 40 Sec' },
    { id: 2, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Unsuccessful', duration: '05: 40 Sec' },
    { id: 3, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05: 40 Sec' },
    { id: 4, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Transferred', duration: '05: 40 Sec' },
    { id: 5, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05: 40 Sec' },
    { id: 6, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Missed', duration: '05: 40 Sec' },
    { id: 7, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Unsuccessful', duration: '05: 40 Sec' },
    { id: 8, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05: 40 Sec' },
    { id: 9, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05: 40 Sec' },
    { id: 10, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Missed', duration: '05: 40 Sec' },
    { id: 11, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05: 40 Sec' },
  ];

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === callLogs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(callLogs.map(log => log.id));
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Successful':
        return 'bg-teal-50 text-teal-600';
      case 'Unsuccessful':
        return 'bg-yellow-50 text-yellow-600';
      case 'Transferred':
        return 'bg-purple-50 text-purple-600';
      case 'Missed':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Successful':
        return 'bg-teal-500';
      case 'Unsuccessful':
        return 'bg-yellow-500';
      case 'Transferred':
        return 'bg-purple-500';
      case 'Missed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen -ml- ">
      {/* Header Navigation */}
      <div className="  px-2 py-3">
        <div className="flex items-center gap-[10px] text-sm">
        
            <img src={homeIcon} alt="" />
        
          <span className="text-gray-400"><img src="" alt="" /> </span>
          <span className="text-gray-500 text-xs">Dashboard</span>
          <span className="text-gray-400"><img src={chevronIcon} alt="" /></span>
          <span className="text-[#042435] text-sm font-semibold">Call Logs</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6  ">
        <h1 className="text-2xl font-bold text-black mb-6">Call Logs</h1>

        {/* Table Container */}
        <div className=" rounded-2xl  bg-white  ">
          {/* Table Header with Filters */}
          <div className="flex items-center justify-between p-4  rounded-2xl ">
            <h2 className="text-base font-semibold text-[#171C35]">Call Logs</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#111A2D] hover:bg-gray-50 rounded border border-gray-300">
             <img src={filter} alt="" />
              Filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full px-2">
            <thead>
  <tr className="">
    <th className="  px-6 py-3 text-left text-sm font-semibold text-[#171C35]">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={selectedRows.length === callLogs.length}
          onChange={toggleAllRows}
          className="w-4 h-4 rounded-2xl border-gray-100 text-indigo-600 focus:ring-indigo-500"
        />
        Patient Name
      </div>
    </th>
    <th className="px-6 py-3 text-left text-sm font-semibold text-[#171C35]">Timestamp</th>
    <th className="px-6 py-3 text-left text-sm font-semibold text-[#171C35]">Phone Number</th>
    <th className="px-6 py-3 text-left text-sm font-semibold text-[#171C35]">Status</th>
    <th className="px-6 py-3 text-left text-sm font-semibold text-[#171C35]">Duration</th>
    <th className="px-6 py-3 text-left text-sm font-semibold text-[#171C35]">Transcript</th>
    <th className="px-6 py-3 text-left text-sm font-semibold text-[#171C35]">Profile</th>
  </tr>
</thead>

<tbody>
  {callLogs.map((log) => (
    <tr key={log.id} className="border-b border-gray-100 ">
      <td className="px-6 py-4 flex items-center gap-2 text-sm font-semibold text-[#111A2D]">
        <input
          type="checkbox"
          checked={selectedRows.includes(log.id)}
          onChange={() => toggleRowSelection(log.id)}
          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        {log.patientName}
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-[#111A2D]">{log.timestamp}</td>
      <td className="px-6 py-4 text-sm font-semibold text-[#111A2D]">{log.phoneNumber}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(log.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(log.status)}`}></span>
          {log.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-[#111A2D]">{log.duration}</td>
      <td className="px-6 py-4">
        <button onClick={() => setCurrentCall(log)} className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-[#171C35] rounded-2xl border border-gray-300">
          Play <Play size={14} fill="currentColor" />
        </button>
      </td>
      <td className="px-6 py-4">
        <button onClick={()=> navigate('/dashboard/patients')} className="flex items-center gap-2 text-sm font-medium text-[#526FFF]">
          View Profile <img src={viewIcon} alt="" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
      </div>
   {/* Transcript Section */}
      {currentCall && (
  <div className="fixed inset-0 bg-black/50 bg-opacity-30 flex justify-center items-start p-6 z-50">
    <div className="bg-white rounded-xl shadow-lg w-[980px] h-[1138px] overflow-y-auto max-h-[90vh] relative mt-20">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => setCurrentCall(null)}
      >
        <FiX size={20} />
      </button>
      <PatientTranscriptPage />
    </div>
  </div>
)}


    </div>
  );
};

export default CallLogsPage;