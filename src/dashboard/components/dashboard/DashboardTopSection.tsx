import React from 'react';
import {  ArrowUpRight } from 'lucide-react';
import CalendarHeader from '../Calendar/CalendarHeader';
import { useNavigate } from 'react-router-dom';

const mockDashboardData = {
  firstName: 'Keren',
  lastName: 'nix',
  date: 'Monday 20-Aug-2025',
  todayIncomingCalls: 15,
  successfulCalls: 0,
  averageCallDuration: '02hr 30min',
};

interface MetricCardProps {
  label: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => (
  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
    <p className="text-sm  font-semibold text-[#111A2D] mb-1">{label}</p>

    {/* Value */}
    {typeof value === 'string' && value.includes('hr') ? (
      <div className="flex items-center justify-center sm:justify-start gap-1">
        <span className="text-2xl sm:text-3xl md:text-[32px] font-medium text-[#171C35] leading-none">
          {value.substring(0, 2)}
        </span>
        <span className="text-xs sm:text-sm text-gray-700 leading-none">
          {value.substring(2, 4)}
        </span>
        <span className="text-2xl sm:text-3xl md:text-[32px] font-medium text-[#171C35] leading-none">
          {value.substring(4, 6)}
        </span>
        <span className="text-xs sm:text-sm text-gray-700 leading-none">
          {value.substring(6)}
        </span>
      </div>
    ) : (
      <p className="text-2xl sm:text-3xl md:text-[32px] font-medium text-[#111A2D] leading-none">
        {value}
      </p>
    )}
  </div>
);

const DashboardTopSection: React.FC = () => {
  const { firstName, lastName,  todayIncomingCalls, successfulCalls, averageCallDuration } = mockDashboardData;
  const navigate = useNavigate()

  return (
    <div className=" mt-2  bg-[#F3F6F6]">
      {/* Date Navigation */}
      <div className="flex items-center justify-center   md:justify-start text-[#111A2D] text-sm sm:text-base font-medium pt-6  gap-2">
        {/* <button className="p-2 sm:p-1 rounded-full transition-colors hover:bg-gray-200">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <span className="mx-2 text-sm sm:text-base font-medium">{date}</span>
        <button className="p-2 sm:p-1 rounded-full transition-colors hover:bg-gray-200">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button> */}
        <CalendarHeader/>
      </div>

      {/* Welcome + Metrics */}
      <div className="flex flex-col md:flex-row sm:justify-between sm:items-center  gap-6 sm:gap-8">
        {/* Welcome */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl md:pl-2 sm:text-2xl md:text-[32px]  font-semibold text-[#111A2D] leading-8">
            Welcome,{' '}
            <span className="font-semibold inline">
              {firstName} {lastName}
            </span>
          </h1>
        </div>

        {/* Metrics */}
        <div className="flex flex-col mb-2 sm:flex-row items-center sm:items-end sm:space-x-6 space-y-4 sm:space-y-0">
          {[ 
            { label: 'Today Incoming Calls', value: todayIncomingCalls },
            { label: 'Successful Calls', value: successfulCalls },
            { label: 'Average Call Duration', value: averageCallDuration },
          ].map((item, index, array) => (
            <div
              key={index}
              className={`pr-4 sm:pr-6 ${index !== array.length - 1 ? 'border-r border-gray-300' : ''}`}
            >
              <MetricCard label={item.label} value={item.value} />
            </div>
          ))}

          <button
onClick={() => navigate('/dashboard/settings?tab=Subscription')}


            className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 bg-[#526FFF] text-white rounded-xl shadow-lg transition-colors hover:bg-indigo-600 shrink-0 cursor-pointer"
            aria-label="View Details"
          >
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopSection;
