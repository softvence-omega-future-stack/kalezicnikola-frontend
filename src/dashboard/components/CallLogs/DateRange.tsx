import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/hook';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<string>('2025-12-20');
  const [endDate, setEndDate] = useState<string>('2025-12-25');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
const { accessToken } = useAppSelector(state => state.auth);
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
    if (showCalendar) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  const handleApply = async () => {
    setLoading(true);
    setError('');

  const baseUrl = import.meta.env.VITE_API_URL;
    // // ✅ Ensure token is properly retrieved
    // const token = localStorage.getItem('token') || localStorage.getItem('accessToken');

    // if (!token) {
    //   setError('No token found. Please login.');
    //   setLoading(false);
    //   return;
    // }

    // console.log('🔍 Filtering with:', { startDate, endDate, baseUrl, hasToken: !!token });
    const token = accessToken; 




    try {
   const response = await axios.get(`${baseUrl}/doctor/calls/history`, {
  params: { startDate, endDate },
  headers: {
    Authorization: `Bearer ${token}`, 
    'Content-Type': 'application/json'
  }
});
       console.log('✅ Filter Response:', response);
      const dataArray = response?.data?.data?.data || [];

      // Dispatch custom event to update CallLogsPage
      window.dispatchEvent(new CustomEvent('callsFiltered', {
        detail: {
          data: dataArray,
          startDate,
          endDate,
          total: response?.data?.data?.pagination?.total || 0
        }
      }));

      if (dataArray.length === 0) {
        setError(`No calls found between ${formatDate(startDate)} and ${formatDate(endDate)}`);
      } else {
        setError('');
        console.log(`✅ Found ${dataArray.length} calls`);
      }

    } catch (err: any) {
      console.error('❌ Filter Error:', err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 403) {
        setError("Access denied. You don’t have permission to view these calls.");
      } else {
        setError(err.response?.data?.message || 'Failed to fetch data');
      }

      // Dispatch event with empty data on error
      window.dispatchEvent(new CustomEvent('callsFiltered', {
        detail: {
          data: [],
          startDate,
          endDate,
          total: 0
        }
      }));
    } finally {
      setLoading(false);
      setShowCalendar(false);
    }
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setError('');

    window.dispatchEvent(new CustomEvent('callsFilterCleared'));
    setShowCalendar(false);
  };

  return (
    <div className="relative w-full max-w-[260px]">
      <div
        ref={buttonRef}
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-[#344054] hover:bg-gray-50 cursor-pointer rounded-lg border border-gray-300 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none">
            <path d="M15.833 7.49967H0.833008M11.6663 0.833008V4.16634M4.99967 0.833008V4.16634M4.83301 17.4997H11.833C13.2331 17.4997 13.9332 17.4997 14.468 17.2272C14.9384 16.9875 15.3208 16.6051 15.5605 16.1347C15.833 15.5999 15.833 14.8998 15.833 13.4997V6.49967C15.833 5.09954 15.833 4.39948 15.5605 3.8647C15.3208 3.39429 14.9384 3.01184 14.468 2.77216C13.9332 2.49967 13.2331 2.49967 11.833 2.49967H4.83301C3.43288 2.49967 2.73281 2.49967 2.19803 2.77216C1.72763 3.01184 1.34517 3.39429 1.10549 3.8647C0.833008 4.39948 0.833008 5.09954 0.833008 6.49967V13.4997C0.833008 14.8998 0.833008 15.5999 1.10549 16.1347C1.34517 16.6051 1.72763 16.9875 2.19803 17.2272C2.73281 17.4997 3.43288 17.4997 4.83301 17.4997Z" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="truncate">
            {startDate && endDate
              ? `${formatDate(startDate)} – ${formatDate(endDate)}`
              : "Select Date Range"}
          </span>
        </div>
        {(startDate || endDate) && (
          <button
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
            className="hover:bg-gray-200 rounded p-1"
            title="Clear filter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {error && <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">{error}</div>}

      {showCalendar && (
        <div ref={dropdownRef} className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-6 z-50 min-w-[300px]">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Select Date Range</h3>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowCalendar(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={loading || !startDate || !endDate}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#526FFF] hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Apply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
