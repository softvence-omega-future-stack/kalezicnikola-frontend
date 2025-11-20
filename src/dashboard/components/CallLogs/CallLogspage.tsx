import React, { useState } from 'react';
import { Play } from 'lucide-react';
import PatientTranscriptPage from './TransscriptModal';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import homeIcon from '../../../assets/svgIcon/homeIcon.svg';

import filter from '../../../assets/svgIcon/filter.svg';


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
  const navigate = useNavigate();

  const callLogs: CallLog[] = [
    { id: 1, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05:40 Sec' },
    { id: 2, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Unsuccessful', duration: '05:40 Sec' },
    { id: 3, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05:40 Sec' },
    { id: 4, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Transferred', duration: '05:40 Sec' },
    { id: 5, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05:40 Sec' },
    { id: 6, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Missed', duration: '05:40 Sec' },
    { id: 7, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Unsuccessful', duration: '05:40 Sec' },
    { id: 8, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05:40 Sec' },
    { id: 9, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05:40 Sec' },
    { id: 10, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Missed', duration: '05:40 Sec' },
    { id: 11, patientName: 'Floyd Miles', timestamp: '01-09-2025 at 10:32:15', phoneNumber: '+88123456', status: 'Successful', duration: '05:40 Sec' },
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
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screen ">
      {/* Header Navigation */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2 pt-6 text-sm">
          <img src={homeIcon} alt="home" className="w-4 h-4" />
          <span onClick={()=> navigate('/dashboard')} className="text-gray-500 text-xs sm:text-sm cursor-pointer ">Dashboard</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
  <path d="M0.666992 8.66699L4.66699 4.66699L0.666992 0.666992" stroke="#D0D5DD" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          <span className="text-[#042435] text-sm font-semibold">Call Logs</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-black mb-6">Call Logs</h1>

        {/* Table Container */}
        <div className="rounded-2xl bg-white ">
          {/* Table Header */}
          <div className="flex flex-wrap justify-between items-center p-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-[#171C35]">Call Logs</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-[#111A2D] hover:bg-gray-50 rounded border border-gray-300">
              <img src={filter} alt="filter" className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-[#171C35]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === callLogs.length}
                        onChange={toggleAllRows}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      Patient Name
                    </div>
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-[#171C35] hidden sm:table-cell">Timestamp</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-[#171C35]">Phone Number</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-[#171C35]">Status</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-[#171C35] hidden md:table-cell">Duration</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-[#171C35]">Transcript</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm font-semibold text-[#171C35]">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {callLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2 flex items-center gap-2 text-sm font-semibold text-[#111A2D]">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(log.id)}
                        onChange={() => toggleRowSelection(log.id)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      {log.patientName}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] hidden sm:table-cell">{log.timestamp}</td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D]">{log.phoneNumber}</td>
                    <td className="px-2 sm:px-4 py-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${getStatusStyle(log.status)}`}>
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(log.status)}`}></span>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] hidden md:table-cell">{log.duration}</td>
                    <td className="px-2 sm:px-4 py-2">
                      <button onClick={() => setCurrentCall(log)} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-sm sm:text-base font-semibold text-[#171C35] rounded-2xl border border-gray-300 cursor-pointer ">
                        Play <Play size={14} fill="currentColor" />
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <button onClick={() => navigate('/dashboard/patients')} className="flex items-center gap-1 sm:gap-2 text-sm font-medium text-[#526FFF] cursor-pointer">
                        View Profile 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_452_7031)">
    <path d="M3.74264 12.2426L12.2279 3.75736M12.2279 3.75736V12.2426M12.2279 3.75736H3.74264" stroke="#526FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_452_7031">
      <rect width="16" height="16" rx="8" fill="white"/>
    </clipPath>
  </defs>
</svg>
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start p-4 sm:p-6 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-[980px] h-[90vh] overflow-y-auto relative mt-20 mx-2 sm:mx-6">
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
