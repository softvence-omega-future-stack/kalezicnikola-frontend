import React, { useState, useRef, useEffect } from 'react';
import { List, ChevronDown, Check, Grid } from 'lucide-react';
import { createPortal } from 'react-dom';
import ListView from './ListView';
import GridView from './GridView';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg';
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg';
import listIcon from '../../../assets/svgIcon/listIcon.svg';
import axios from 'axios';

type ViewMode = 'list' | 'grid';

export default function PatientsView() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const views: { type: ViewMode; label: string; icon: React.ReactNode }[] = [
    { type: 'list', label: 'List', icon: <List className="w-5 h-5" /> },
    { type: 'grid', label: 'Grid', icon: <Grid className="w-5 h-5" /> },
  ];
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctor/patient/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPatients(response.data.data.patients);
      } catch (error) {
        console.log(error);
        setError("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);


  // Update dropdown position when opened
  useEffect(() => {
    if (dropdownOpen && dropdownButtonRef.current) {
      const rect = dropdownButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [dropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target as Node)) {
        const dropdown = document.getElementById('view-dropdown-portal');
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setDropdownOpen(false);
        }
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screen p-4 md:mt-[10px]">
      {/* Breadcrumb */}
      <div className="">
        <div className='flex items-center gap-2 px-2 md:px-0 text-sm text-gray-600 mb-6'>
          <img src={homeIcon} alt="" className="w-4 h-4" />
          <img src={chevronIcon} alt="" />
          <span onClick={() => navigate('/dashboard')} className='cursor-pointer'>Dashboard</span>
          <img src={chevronIcon} alt="" />
          <span className="font-semibold text-sm text-[#171C35]">Patients</span>
        </div>
      </div>

      <div className='bg-white rounded-2xl'>
        {/* Header */}
        <div className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
            {/* Title */}
            <h1 className="text-xl font-semibold text-[#171C35]">Total 60 Patients</h1>

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* Add Patient Button */}
              <button
                onClick={() => navigate('/dashboard/add-patient')}
                className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 bg-[#DCE2FF] text-[#171C35] rounded-[8px] font-medium transition-colors cursor-pointer justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M6.66634 0.833008V12.4997M0.833008 6.66634H12.4997" stroke="#171C35" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Add Patient</span>
              </button>

              {/* List/Grid Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  ref={dropdownButtonRef}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D0D5DD] rounded-[8px] text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer justify-center"
                >
                  {viewMode === 'list' ? <img src={listIcon} alt="" className="cursor-pointer" /> : <Grid />}
                  <span>{viewMode === 'list' ? 'List' : 'Grid'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {viewMode === 'list'
            ? <ListView patients={patients} loading={loading} error={error} />
            : <GridView patients={patients} loading={loading} error={error} />
          }
        </div>
      </div>

      {/* Dropdown Portal */}
      {dropdownOpen && createPortal(
        <div
          id="view-dropdown-portal"
          style={{
            position: 'absolute',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            minWidth: '112px',
            zIndex: 99999,
          }}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
        >
          {views.map((v) => (
            <button
              key={v.type}
              onClick={() => {
                setViewMode(v.type);
                setDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-between cursor-pointer ${viewMode === v.type ? 'font-semibold' : ''
                }`}
            >
              <div className="flex items-center gap-2">
                {v.icon}
                {v.label}
              </div>
              {viewMode === v.type && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}