import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DateRange from './DateRange';
import PatientTranscriptPage from './TransscriptModal';

import homeIcon from '../../../assets/svgIcon/homeIcon.svg';

interface CallLog {
  id: number;
  patientName: string;
  timestamp: string;
  phoneNumber: string;
  status: 'Successful' | 'Unsuccessful' | 'Transferred' | 'Missed';
  duration: string;
}

const CallLogsPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentCall, setCurrentCall] = useState<CallLog | null>(null);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Close modal on click outside
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

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'Successful':
        return t('dashboard.routes.callLogs.status.successful');
      case 'Unsuccessful':
        return t('dashboard.routes.callLogs.status.unsuccessful');
      case 'Transferred':
        return t('dashboard.routes.callLogs.status.transferred');
      case 'Missed':
        return t('dashboard.routes.callLogs.status.missed');
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen md:mt-[30px]">

      {/* Header Navigation */}
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

      {/* Main Content */}
      <div className="mt-4">
        <h1 className="text-xl md:text-2xl font-semibold text-[#171C35] mb-6">
          {t('dashboard.routes.callLogs.title')}
        </h1>

        {/* Table Container */}
        <div className="rounded-2xl bg-white p-6 relative z-10">

          {/* Header */}
          <div className="flex flex-wrap justify-between gap-4 items-center p-4 relative z-20">
            <h2 className="text-base font-semibold text-[#171C35]">
              {t('dashboard.routes.callLogs.header')}
            </h2>
            <DateRange />
          </div>

          {/* Table — Only this scrolls */}
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
                {callLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2 text-sm font-semibold text-[#111A2D] whitespace-nowrap">
                      {log.patientName}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">{log.phoneNumber}</td>

                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                      <span className={`inline-flex w-[109px] justify-center items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${getStatusStyle(log.status)}`}>
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(log.status)}`}></span>
                        {getStatusTranslation(log.status)}
                      </span>
                    </td>

                    <td className="px-2 sm:px-4 py-2 text-sm text-[#111A2D] whitespace-nowrap">{log.duration}</td>

                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => setCurrentCall(log)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transcript Modal */}
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
            <PatientTranscriptPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default CallLogsPage;