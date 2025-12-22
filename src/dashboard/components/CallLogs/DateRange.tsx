import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import for redirect

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<string>('2025-12-20');
  const [endDate, setEndDate] = useState<string>('2025-12-25');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate(); // ✅ hook to navigate

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
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');

    console.log('Token from localStorage:', token); // ✅ debug

    if (!token) {
      // ✅ redirect to login if no token
      navigate('/login'); 
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/doctor/calls/history`, {
        params: { startDate, endDate },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const dataArray = response?.data?.data?.data || [];

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
      }

    } catch (err: any) {
      console.error('❌ Filter Error:', err);

      if (err.response?.status === 401) {
        setError("Session expired. Redirecting to login...");
        setTimeout(() => navigate('/login'), 1500); // redirect after 1.5s
      } else if (err.response?.status === 403) {
        setError("Access denied. You don’t have permission to view these calls.");
      } else {
        setError(err.response?.data?.message || 'Failed to fetch data');
      }

      window.dispatchEvent(new CustomEvent('callsFiltered', {
        detail: { data: [], startDate, endDate, total: 0 }
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
      {/* Date Button */}
      <div
        ref={buttonRef}
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-[#344054] hover:bg-gray-50 cursor-pointer rounded-lg border border-gray-300 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="truncate">
            {startDate && endDate ? `${formatDate(startDate)} – ${formatDate(endDate)}` : "Select Date Range"}
          </span>
        </div>
        {(startDate || endDate) && (
          <button onClick={(e) => { e.stopPropagation(); handleClear(); }} className="hover:bg-gray-200 rounded p-1">
            Clear
          </button>
        )}
      </div>

      {error && <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">{error}</div>}

      {showCalendar && (
        <div ref={dropdownRef} className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-6 z-50 min-w-[300px]">
          <div className="mb-4">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="mb-4">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={() => setShowCalendar(false)}>Cancel</button>
            <button onClick={handleApply} disabled={loading || !startDate || !endDate}>
              {loading ? "Loading..." : "Apply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
