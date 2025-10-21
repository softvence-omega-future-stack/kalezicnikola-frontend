import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

// Mock data
const mockDashboardData = {
   
  firstName: 'Keren',
   lastName:"nix",
  date: 'Monday 20-Aug-2025',
  todayIncomingCalls: 15,
  successfulCalls: 0,
  averageCallDuration: '02hr 30min',
};

// ----------------------------------------------------------------------

interface MetricCardProps {
  label: string;
  value: string | number;
}

// Reusable component for the metric cards
const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => (
  <div className="flex flex-col text-center">
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-3xl font-semibold text-gray-900 leading-none">
      {/* Specifically style the parts of the duration string if it exists */}
      {typeof value === 'string' && value.includes('hr') 
        ? (
          <>
            <span className="text-4xl">{value.substring(0, 2)}</span>
            <span className="text-xl font-normal text-gray-700">{value.substring(2, 4)}</span>
            <span className="text-4xl">{value.substring(4, 6)}</span>
            <span className="text-xl font-normal text-gray-700">{value.substring(6)}</span>
          </>
        ) 
        : value
      }
    </p>
  </div>
);

// ----------------------------------------------------------------------

const DashboardTopSection: React.FC = () => {
  const { firstName, lastName, date, todayIncomingCalls, successfulCalls, averageCallDuration } = mockDashboardData;
  
  return (
    // Outer Container: Subtle light gray background that matches the image
<div className="bg-gray-50  h-[140px] p-6 sm:p-8 rounded-lg shadow-sm mx-auto">
  {/* Date Navigation */}
  <div className="flex  items-center text-gray-600 text-sm font-medium mb-4">
    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
      <ChevronLeft className="w-5 h-5" />
    </button>
    <span className="mx-2">{date}</span>
    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>

  {/* Welcome Section */}
  <div className="flex justify-between items-center h-[calc(100%-32px)]">
    {/* Left: Welcome */}
    <div>
      <h1 className="text-2xl sm:text-3xl font-light text-gray-800 leading-snug">
        Welcome,{" "}
        <span className="font-bold inline">
          {firstName} <span className="block">{lastName}</span>
        </span>
      </h1>
    </div>

    {/* Right: Metrics */}
    <div className="flex items-center space-x-8">
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