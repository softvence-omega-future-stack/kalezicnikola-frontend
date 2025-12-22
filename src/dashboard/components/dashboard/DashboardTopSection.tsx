import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import CalendarHeader from '../Calendar/CalendarHeader';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';

// MetricCard
interface MetricCardProps {
  label: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => (
  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
    <p className="text-sm font-semibold text-subHeadingBlack mb-1">
      {label}
    </p>

    {typeof value === "string" && value.includes("min") ? (
      <div className="flex items-center justify-center sm:justify-start gap-1">
        {/* MIN */}
        <span className="text-2xl sm:text-3xl md:text-[32px] font-medium text-[#171C35] leading-none">
          {value.split("min")[0].trim().padStart(2, "0")}
        </span>
        <span className="text-xs sm:text-sm text-gray-700">min</span>

        {/* SEC */}
        <span className="text-2xl sm:text-3xl md:text-[32px] font-medium text-[#171C35] leading-none">
          {value
            .split("min")[1]
            .replace("sec", "")
            .trim()
            .padStart(2, "0")}
        </span>
        <span className="text-xs sm:text-sm text-gray-700">sec</span>
      </div>
    ) : (
      <p className="text-2xl sm:text-3xl md:text-[32px] font-medium text-subHeadingBlack leading-none">
        {value}
      </p>
    )}
  </div>
);


const formatDuration = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}min ${seconds}sec`;
};




interface DashboardTopSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DashboardTopSection: React.FC<DashboardTopSectionProps> = ({ selectedDate, onDateChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  const [stats, setStats] = useState({
    todayIncomingCalls: 0,
    successfulCalls: 0,
    averageCallDuration: '0min 0sec',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/doctor/dashboard-stats`, {
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        });
         console.log('Fetching dashboard stats with token:', accessToken);
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        
        const result = await response.json();
        console.log('Dashboard Stats API Response:', result);
        
        if (result.success && result.data) {
          setStats({
            todayIncomingCalls: result.data.todayIncomingCalls || 0,
            successfulCalls: result.data.successfulCalls || 0,
            averageCallDuration: formatDuration(result.data.averageCallDuration || 0),
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    
    if (accessToken) {
      fetchStats();
    }
  }, [accessToken]);

  return (
    <div className="md:mt-2 z-auto bg-[#F3F6F6]">
      {/* Date Navigation */}
      <div className="flex items-center justify-center -pl-1 md:justify-start text-subHeadingBlack text-sm sm:text-base font-medium pt-6 gap-2">
        <CalendarHeader selectedDate={selectedDate} onDateChange={onDateChange} />
      </div>

      {/* Welcome + Metrics */}
      <div className="flex flex-col md:flex-row sm:justify-between sm:items-center gap-6 sm:gap-8">
        <div className="text-center sm:text-left">
          <h1 className="text-xl md:pl-2 sm:text-2xl md:text-[32px] font-semibold text-subHeadingBlack leading-tight">
            <span className="block">{t('dashboard.routes.dashboard.topSection.welcome')} </span>
            <span className="block ">{user?.firstName}</span>
          </h1>
        </div>

        <div className="flex flex-col mb-2 sm:flex-row items-center sm:items-end sm:space-x-6 space-y-4 sm:space-y-0">
          {[
            { label: t('dashboard.routes.dashboard.topSection.todayIncomingCalls'), value: stats.todayIncomingCalls },
            { label: t('dashboard.routes.dashboard.topSection.successfulCalls'), value: stats.successfulCalls },
            { label: t('dashboard.routes.dashboard.topSection.averageCallDuration'), value: stats.averageCallDuration },
          ].map((item, index, array) => (
            <div
              key={index}
              className={`pr-4 sm:pr-6 ${index !== array.length - 1 ? 'border-r border-gray-300' : ''}`}
            >
              <MetricCard label={item.label} value={item.value} />
            </div>
          ))}

          <button
            onClick={() => navigate('/dashboard/settings?tab=subscription&subtab=current-plan')}
            className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 bg-[#526FFF] text-white rounded-xl shadow-lg transition-colors shrink-0 cursor-pointer"
          >
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopSection;