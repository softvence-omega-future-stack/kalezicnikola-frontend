import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DateRangePicker = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>('2022-01-06');
  const [endDate, setEndDate] = useState<string>('2022-01-13');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="relative w-full max-w-[230px]">
      {/* Date Display Button */}
      <div
        ref={buttonRef}
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#344054] hover:bg-gray-50 cursor-pointer rounded-[8px] border border-gray-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none">
          <path d="M15.833 7.49967H0.833008M11.6663 0.833008V4.16634M4.99967 0.833008V4.16634M4.83301 17.4997H11.833C13.2331 17.4997 13.9332 17.4997 14.468 17.2272C14.9384 16.9875 15.3208 16.6051 15.5605 16.1347C15.833 15.5999 15.833 14.8998 15.833 13.4997V6.49967C15.833 5.09954 15.833 4.39948 15.5605 3.8647C15.3208 3.39429 14.9384 3.01184 14.468 2.77216C13.9332 2.49967 13.2331 2.49967 11.833 2.49967H4.83301C3.43288 2.49967 2.73281 2.49967 2.19803 2.77216C1.72763 3.01184 1.34517 3.39429 1.10549 3.8647C0.833008 4.39948 0.833008 5.09954 0.833008 6.49967V13.4997C0.833008 14.8998 0.833008 15.5999 1.10549 16.1347C1.34517 16.6051 1.72763 16.9875 2.19803 17.2272C2.73281 17.4997 3.43288 17.4997 4.83301 17.4997Z" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>
          {startDate && endDate
            ? `${formatDate(startDate)} – ${formatDate(endDate)}`
            : t('dashboard.routes.callLogs.dateRangePicker.selectDateRange')}
        </span>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-6 z-50 min-w-[230px]"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-4">{t('dashboard.routes.callLogs.dateRangePicker.title')}</h3>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">{t('dashboard.routes.callLogs.dateRangePicker.startDate')}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">{t('dashboard.routes.callLogs.dateRangePicker.endDate')}</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => setShowCalendar(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              {t('dashboard.routes.callLogs.dateRangePicker.cancel')}
            </button>
            <button
              onClick={() => setShowCalendar(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#526FFF] rounded-lg transition-colors cursor-pointer"
            >
              {t('dashboard.routes.callLogs.dateRangePicker.apply')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
