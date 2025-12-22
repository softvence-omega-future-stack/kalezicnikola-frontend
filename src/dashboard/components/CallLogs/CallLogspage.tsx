// import React, { useState, useRef, useEffect } from 'react';
// import { Play } from 'lucide-react';
// import { FiX } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import DateRange from './DateRange';
// import PatientTranscriptPage from './TransscriptModal';

// import homeIcon from '../../../assets/svgIcon/homeIcon.svg';
// import axios from 'axios';
// import { useAppSelector } from '@/store/hook';

// interface Patient {
//   firstName: string;
//   lastName: string;
//   phone: string;
// }

// interface Appointment {
//   id: string;
//   appointmentDate: string;
//   status: string;
// }

// interface CallHistoryItem {
//   id: string;
//   doctorId: string;
//   patientId: string;
//   phoneNumber: string;
//   status?: 'Successful' | 'Unsuccessful' | 'Transferred' | 'Missed'; 
//   duration: string;
//   transcription: string;
//   intent: string;
//   sentiment: string;
//   summary: string;
//   appointmentId: string | null;
//   patient: Patient;
//   insuranceId: string;
//   reasonForCalling: string;
//   transcript?: string; 
//   appointment: Appointment | null;
//   createdAt: string;
//   updatedAt: string;
// }

// const CallLogsPage: React.FC = () => {
//   const { t } = useTranslation();
//   const [currentCall, setCurrentCall] = useState<CallHistoryItem | null>(null);
//   const navigate = useNavigate();
//   const [callData, setCallData] = useState<CallHistoryItem[]>([]);
//   const { accessToken } = useAppSelector((state) => state.auth);
//   const [loading, setLoading] = useState(true);
//   const [, setError] = useState(null);
//   const modalRef = useRef<HTMLDivElement>(null);
//   const statuses = ['Successful', 'Unsuccessful', 'Transferred', 'Missed'] as const;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCalls, setTotalCalls] = useState(0);

//   // ✅ Duration formatter function
//   const formatDuration = (seconds: string | number): string => {
//     const totalSeconds = typeof seconds === 'string' ? parseInt(seconds) : seconds;
    
//     if (isNaN(totalSeconds)) return '0m 0s';
    
//     const minutes = Math.floor(totalSeconds / 60);
//     const remainingSeconds = totalSeconds % 60;
    
//     return `${minutes}m ${remainingSeconds}s`;
//   };

//   const getRandomStatus = () => {
//     const randomIndex = Math.floor(Math.random() * statuses.length);
//     return statuses[randomIndex];
//   };

//   useEffect(() => {
//     const fetchCallHistory = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/doctor/calls/history`,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );

//         if (response.data.success) {
//           // Add random status to each item
//           const callsWithStatus = response.data.data.data.map((call: CallHistoryItem) => ({
//             ...call,
//             status: getRandomStatus(),
//           }));

//           setCallData(callsWithStatus);
//           setTotalCalls(response.data.data.pagination.total);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (err: any) {
//         setError(err.data.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCallHistory();
//   }, []);

//   // Close modal on click outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         setCurrentCall(null);
//       }
//     };

//     if (currentCall) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [currentCall]);

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case 'Successful':
//         return 'bg-teal-50 text-teal-600';
//       case 'Unsuccessful':
//         return 'bg-yellow-50 text-yellow-600';
//       case 'Transferred':
//         return 'bg-purple-50 text-purple-600';
//       case 'Missed':
//         return 'bg-red-50 text-red-600';
//       default:
//         return 'bg-gray-50 text-gray-600';
//     }
//   };

//   const getStatusDot = (status: string) => {
//     switch (status) {
//       case 'Successful':
//         return 'bg-teal-500';
//       case 'Unsuccessful':
//         return 'bg-yellow-500';
//       case 'Transferred':
//         return 'bg-purple-500';
//       case 'Missed':
//         return 'bg-red-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const getStatusTranslation = (status: string) => {
//     switch (status) {
//       case 'Successful':
//         return t('dashboard.routes.callLogs.status.successful');
//       case 'Unsuccessful':
//         return t('dashboard.routes.callLogs.status.unsuccessful');
//       case 'Transferred':
//         return t('dashboard.routes.callLogs.status.transferred');
//       case 'Missed':
//         return t('dashboard.routes.callLogs.status.missed');
//       default:
//         return status;
//     }
//   };

//   return (
//     <div className="min-h-screen md:mt-[30px]">
//       {loading && (
//         <div className="fixed inset-0 bg-black opacity-60 flex items-center justify-center z-[9999]">
//           <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
//         </div>
//       )}
//       {/* Header Navigation */}
//       <div className="">
//         <div className="flex flex-wrap items-center gap-2 text-sm">
//           <img src={homeIcon} alt="home" className="w-4 h-4" />
//           <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
//             <path d="M0.666992 8.66699L4.66699 4.66699L0.666992 0.666992" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           <span onClick={() => navigate('/dashboard')} className="text-gray-500 text-xs sm:text-sm cursor-pointer">
//             {t('dashboard.routes.callLogs.breadcrumb.dashboard')}
//           </span>
//           <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
//             <path d="M0.666992 8.66699L4.66699 4.66699L0.666992 0.666992" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           <span className="text-[#042435] text-sm font-semibold">
//             {t('dashboard.routes.callLogs.breadcrumb.callLogs')}
//           </span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="mt-4">
//         <h1 className="text-xl md:text-2xl font-semibold text-[#171C35] mb-6">
//           {t('dashboard.routes.callLogs.title')}
//         </h1>

//         {/* Table Container */}
//         <div className="rounded-2xl bg-white p-6 relative z-10">

//           {/* Header */}
//           <div className="flex flex-wrap justify-between gap-4 items-center p-4 relative z-20">
//             <h2 className="text-base font-semibold text-[#171C35]">
//               {t('dashboard.routes.callLogs.header')}
//             </h2>
//             <DateRange />
//           </div>

//           {/* Table — Only this scrolls */}
//           <div className="relative z-0 overflow-x-auto">
//             <table className="min-w-full divide-gray-200 table-fixed">
//               <thead>
//                 <tr>
//                   <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
//                     <div className="flex items-center gap-2 min-w-0">
//                       <span className="truncate">{t('dashboard.routes.callLogs.table.patientName')}</span>
//                     </div>
//                   </th>
//                   <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
//                     {t('dashboard.routes.callLogs.table.timestamp')}
//                   </th>
//                   <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
//                     <div className="flex items-center min-w-0">
//                       <span className="truncate">{t('dashboard.routes.callLogs.table.phoneNumber')}</span>
//                     </div>
//                   </th>
//                   <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
//                     {t('dashboard.routes.callLogs.table.status')}
//                   </th>
//                   <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
//                     {t('dashboard.routes.callLogs.table.duration')}
//                   </th>
//                   <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
//                     {t('dashboard.routes.callLogs.table.transcript')}
//                   </th>
//                   <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
//                     {t('dashboard.routes.callLogs.table.profile')}
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {callData.map((log) => (
//                   <tr key={log.id} className="hover:bg-gray-50">
//                     <td className="px-2 sm:px-4 py-2 text-sm font-semibold text-[#111A2D] whitespace-nowrap">
//                       {log.patient?.firstName} {log.patient?.lastName}
//                     </td>
//                     <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">{log.createdAt}</td>
//                     <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">{log.phoneNumber}</td>

//                     <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
//                       <span className={`inline-flex w-[109px] justify-center items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${getStatusStyle(log.status ?? "Missed")}`}>
//                         <span className={`w-2 h-2 rounded-full ${getStatusDot(log.status ?? "Missed")}`}></span>
//                         {getStatusTranslation(log.status ?? "Missed")}
//                       </span>
//                     </td>

//                     {/* ✅ Duration formatted as minutes and seconds */}
//                     <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">
//                       {formatDuration(log.duration)}
//                     </td>

//                     <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
//                       <button
//                         onClick={() => setCurrentCall(log)}
//                         className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-[#171C35] rounded-2xl border border-gray-300 hover:bg-gray-50"
//                       >
//                         {t('dashboard.routes.callLogs.actions.play')} <Play size={14} fill="currentColor" />
//                       </button>
//                     </td>

//                     <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
//                       <button
//                         onClick={() => navigate(`/dashboard/patients/${log.id}`)}
//                         className="flex items-center gap-2 text-sm font-medium text-[#526FFF] hover:underline cursor-pointer"
//                       >
//                         {t('dashboard.routes.callLogs.actions.viewProfile')}
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                           <g clipPath="url(#clip0_452_7031)">
//                             <path d="M3.74264 12.2426L12.2279 3.75736M12.2279 3.75736V12.2426M12.2279 3.75736H3.74264" stroke="#526FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_452_7031">
//                               <rect width="16" height="16" rx="8" fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       </button>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {/* Pagination */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
//             <p className="text-sm font-medium text-[#000000]">
//               {`Showing ${1} to ${callData.length} of ${totalCalls} calls`}
//             </p>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 text-base font-semibold text-[#111A2D] bg-[#F3F6F6] border border-gray-300 rounded-xl disabled:opacity-50 cursor-pointer"
//               >
//                 {t('Previous')}
//               </button>
//               <button
//                 onClick={() => setCurrentPage(currentPage + 1)}
//                 className="px-4 py-2 text-base font-semibold text-[#1a1c21] bg-[#F3F6F6] border border-gray-300 rounded-xl cursor-pointer"
//               >
//                 {t('Next')}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Transcript Modal */}
//       {currentCall && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-start p-4 sm:p-6 z-[100] overflow-y-auto">
//           <div
//             ref={modalRef}
//             className="w-full max-w-[980px] h-[90vh] overflow-y-auto relative mt-20 mx-2 sm:mx-6"
//           >
//             <button
//               className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
//               onClick={() => setCurrentCall(null)}
//             >
//               <FiX size={20} />
//             </button>
//             <PatientTranscriptPage callData={currentCall} />

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CallLogsPage;

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DateRange from './DateRange';
import PatientTranscriptPage from './TransscriptModal';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg';
import axios from 'axios';
import { useAppSelector } from '@/store/hook';

interface Patient {
  firstName: string;
  lastName: string;
  phone: string;
}

interface Appointment {
  id: string;
  appointmentDate: string;
  status: string;
}

interface CallHistoryItem {
  id: string;
  doctorId: string;
  patientId: string | null;
  phoneNumber: string ;
  audioUrl: string | null;
  callStatus: 'SUCCESSFUL' | 'MISSED' | 'TRANSFERRED' | 'FAILED';
  duration: number;
  transcription: string;
  intent: string;
  sentiment: string;
  summary: string | null;
  appointmentId: string | null;
  patient: Patient | null;
  insuranceId: string | null;
  reasonForCalling: string | null;
  appointment: Appointment | null;
  createdAt: string;
  updatedAt: string;
}

const CallLogsPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentCall, setCurrentCall] = useState<CallHistoryItem | null>(null);
  const navigate = useNavigate();
  const [callData, setCallData] = useState<CallHistoryItem[]>([]);
  const { accessToken } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCalls, setTotalCalls] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterDateRange, setFilterDateRange] = useState<{start: string, end: string} | null>(null);

  const formatDuration = (seconds: string | number): string => {
    const totalSeconds = typeof seconds === 'string' ? parseInt(seconds) : seconds;
    if (isNaN(totalSeconds) || totalSeconds === 0) return '0m 0s';
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Fetch call history
  const fetchCallHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctor/calls/history`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.success) {
        const calls = response.data.data.data;
        setCallData(calls);
        setTotalCalls(response.data.data.pagination.total);
        
        setTimeout(() => {
          const unreviewedCount = calls.filter((call: CallHistoryItem) => call.callStatus === 'MISSED').length;
          window.dispatchEvent(new CustomEvent('updateUnreviewedCount', { detail: unreviewedCount }));
        }, 0);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.response?.data?.message || err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching call history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallHistory();

    const handleFilterEvent = (event: CustomEvent) => {
      const { data, startDate, endDate, total } = event.detail;
      setCallData(data);
      setTotalCalls(total);
      setIsFiltered(true);
      setFilterDateRange({ start: startDate, end: endDate });
      
      setTimeout(() => {
        const unreviewedCount = data.filter((call: CallHistoryItem) => call.callStatus === 'MISSED').length;
        window.dispatchEvent(new CustomEvent('updateUnreviewedCount', { detail: unreviewedCount }));
      }, 0);
    };

    const handleClearFilterEvent = () => {
      setIsFiltered(false);
      setFilterDateRange(null);
      fetchCallHistory();
    };

    window.addEventListener('callsFiltered', handleFilterEvent as EventListener);
    window.addEventListener('callsFilterCleared', handleClearFilterEvent);

    return () => {
      window.removeEventListener('callsFiltered', handleFilterEvent as EventListener);
      window.removeEventListener('callsFilterCleared', handleClearFilterEvent);
    };
  }, [accessToken]);

  const markAsReviewed = (callId: string) => {
    setCallData(prevData => {
      const updatedData = prevData.map(call =>
        call.id === callId && call.callStatus === 'MISSED' 
          ? { ...call, callStatus: 'SUCCESSFUL' as const } 
          : call
      );
      setTimeout(() => {
        const unreviewedCount = updatedData.filter(call => call.callStatus === 'MISSED').length;
        window.dispatchEvent(new CustomEvent('updateUnreviewedCount', { detail: unreviewedCount }));
      }, 0);
      return updatedData;
    });
  };

  const handlePlayClick = (call: CallHistoryItem) => {
    setCurrentCall(call);
    if (call.callStatus === 'MISSED') {
      setTimeout(() => markAsReviewed(call.id), 0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setCurrentCall(null);
      }
    };

    if (currentCall) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentCall]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'SUCCESSFUL': return 'bg-teal-50 text-teal-600';
      case 'FAILED': return 'bg-yellow-50 text-yellow-600';
      case 'TRANSFERRED': return 'bg-purple-50 text-purple-600';
      case 'MISSED': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'SUCCESSFUL': return 'bg-teal-500';
      case 'FAILED': return 'bg-yellow-500';
      case 'TRANSFERRED': return 'bg-purple-500';
      case 'MISSED': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'SUCCESSFUL': return t('dashboard.routes.callLogs.status.successful');
      case 'FAILED': return t('dashboard.routes.callLogs.status.unsuccessful');
      case 'TRANSFERRED': return t('dashboard.routes.callLogs.status.transferred');
      case 'MISSED': return t('dashboard.routes.callLogs.status.missed');
      default: return status;
    }
  };

  return (
    <div className="min-h-screen md:mt-[30px]">
      {loading && (
        <div className="fixed inset-0 bg-black opacity-60 flex items-center justify-center z-[9999]">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <div className="">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <img src={homeIcon} alt="home" className="w-4 h-4" />
          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M0.666992 8.66699L4.66699 4.66699L0.666992 0.666992" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span onClick={() => navigate('/dashboard')} className="text-gray-500 text-xs sm:text-sm cursor-pointer">
            {t('dashboard.routes.callLogs.breadcrumb.dashboard')}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M0.666992 8.66699L4.66699 4.66699L0.666992 0.666992" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[#042435] text-sm font-semibold">
            {t('dashboard.routes.callLogs.breadcrumb.callLogs')}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-xl md:text-2xl font-semibold text-[#171C35] mb-6">
          {t('dashboard.routes.callLogs.title')}
        </h1>

        <div className="rounded-2xl bg-white p-6 relative z-10">
          <div className="flex flex-wrap justify-between gap-4 items-center p-4 relative z-20">
            <div>
              <h2 className="text-base font-semibold text-[#171C35]">
                {t('dashboard.routes.callLogs.header')}
              </h2>
              {isFiltered && filterDateRange && (
                <p className="text-xs text-gray-500 mt-1">
                  Filtered: {new Date(filterDateRange.start).toLocaleDateString()} - {new Date(filterDateRange.end).toLocaleDateString()}
                </p>
              )}
            </div>
            <DateRange />
          </div>

          <div className="relative z-0 overflow-x-auto">
            <table className="min-w-full divide-gray-200 table-fixed">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate">{t('dashboard.routes.callLogs.table.patientName')}</span>
                    </div>
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                    {t('dashboard.routes.callLogs.table.timestamp')}
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                    <div className="flex items-center min-w-0">
                      <span className="truncate">{t('dashboard.routes.callLogs.table.phoneNumber')}</span>
                    </div>
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                    {t('dashboard.routes.callLogs.table.status')}
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                    {t('dashboard.routes.callLogs.table.duration')}
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                    {t('dashboard.routes.callLogs.table.transcript')}
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                    {t('dashboard.routes.callLogs.table.profile')}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {callData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      {isFiltered ? 'No calls found in selected date range' : 'No call history available'}
                    </td>
                  </tr>
                ) : (
                  callData.map((log) => (
                  <tr 
                    key={log.id} 
                    className={`hover:bg-gray-50 ${log.callStatus === 'MISSED' ? 'bg-blue-50/30' : ''}`}
                  >
                    <td className="px-2 sm:px-4 py-2 text-sm font-semibold text-[#111A2D] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {log.callStatus === 'MISSED' && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        )}
                        {log.patient?.firstName} {log.patient?.lastName}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">
                      {log.createdAt}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">
                      {/* ✅ Updated condition: show patient.phone or phoneNumber */}
                      {log.patient?.phone ?? log.phoneNumber ?? 'N/A'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                      <span className={`inline-flex w-[109px] justify-center items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${getStatusStyle(log.callStatus)}`}>
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(log.callStatus)}`}></span>
                        {getStatusTranslation(log.callStatus)}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">
                      {formatDuration(log.duration)}
                    </td>
                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => handlePlayClick(log)}
                        className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-[#171C35] rounded-2xl border border-gray-300 hover:bg-gray-50"
                      >
                        {t('dashboard.routes.callLogs.actions.play')} <Play size={14} fill="currentColor" />
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/dashboard/patients/${log.id}`)}
                        className="flex items-center gap-2 text-sm font-medium text-[#526FFF] hover:underline cursor-pointer"
                      >
                        {t('dashboard.routes.callLogs.actions.viewProfile')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <g clipPath="url(#clip0_452_7031)">
                            <path d="M3.74264 12.2426L12.2279 3.75736M12.2279 3.75736V12.2426M12.2279 3.75736H3.74264" stroke="#526FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <defs>
                            <clipPath id="clip0_452_7031">
                              <rect width="16" height="16" rx="8" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
            <p className="text-sm font-medium text-[#000000]">
              {`Showing ${1} to ${callData.length} of ${totalCalls} calls`}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-base font-semibold text-[#111A2D] bg-[#F3F6F6] border border-gray-300 rounded-xl disabled:opacity-50 cursor-pointer"
              >
                {t('Previous')}
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 text-base font-semibold text-[#1a1c21] bg-[#F3F6F6] border border-gray-300 rounded-xl cursor-pointer"
              >
                {t('Next')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentCall && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start p-4 sm:p-6 z-[100] overflow-y-auto">
          <div
            ref={modalRef}
            className="w-full max-w-[980px] h-[90vh] overflow-y-auto relative mt-20 mx-2 sm:mx-6"
          >
            <button
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setCurrentCall(null)}
            >
              <FiX size={20} />
            </button>
            <PatientTranscriptPage callData={currentCall} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CallLogsPage;
