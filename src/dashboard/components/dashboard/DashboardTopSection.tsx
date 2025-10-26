import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const mockDashboardData = {
  firstName: 'Keren',
  lastName: "nix",
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
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-none">
      {typeof value === 'string' && value.includes('hr') 
        ? (
          <>
            <span className="text-3xl sm:text-4xl">{value.substring(0, 2)}</span>
            <span className="text-sm sm:text-xl font-normal text-gray-700">{value.substring(2, 4)}</span>
            <span className="text-3xl sm:text-4xl">{value.substring(4, 6)}</span>
            <span className="text-sm sm:text-xl font-normal text-gray-700">{value.substring(6)}</span>
          </>
        ) 
        : value
      }
    </p>
  </div>
);

const DashboardTopSection: React.FC = () => {
  const { firstName, lastName, date, todayIncomingCalls, successfulCalls, averageCallDuration } = mockDashboardData;

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm mx-auto">
      {/* Date Navigation */}
      <div className="flex items-center text-gray-600 text-sm font-medium mb-4">
        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="mx-2 text-xs sm:text-sm">{date}</span>
        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Welcome + Metrics */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        {/* Welcome */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-800 leading-snug">
            Welcome,{" "}
            <span className="font-bold inline">
              {firstName} <span className="block">{lastName}</span>
            </span>
          </h1>
        </div>

        {/* Metrics */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-6 space-y-4 sm:space-y-0">
          <MetricCard label="Today Incoming Calls" value={todayIncomingCalls} />
          <MetricCard label="Successful Calls" value={successfulCalls} />
          <MetricCard label="Average Call Duration" value={averageCallDuration} />
          <button
            className="flex items-center justify-center h-12 w-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition-colors"
            aria-label="View Details"
          >
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopSection;
