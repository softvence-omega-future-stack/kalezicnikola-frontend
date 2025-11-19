import React, { useState } from 'react';
import {  List,  ChevronDown, Check,  } from 'lucide-react';
import ListView from './ListView';
import GridView from './GridView';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg'
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg'
import listIcon from '../../../assets/svgIcon/listIcon.svg'

type ViewMode = 'list' | 'grid';

export default function PatientsView() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  const views: { type: ViewMode; label: string; icon: React.ReactNode }[] = [
    { type: 'list', label: 'List', icon: <List className="w-5 h-5" /> },
    { type: 'grid', label: 'Grid', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M2.5 10H17.5M10 2.5V17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z" stroke="#171C35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> },
  ];

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screenp-4 ">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className='flex items-center gap-2 py-6 px-2 md:px-0 text-sm text-gray-600 mb-6'>
      <img src={homeIcon} alt="" />
        <span>Dashboard</span>
       <img src={chevronIcon} alt="" />
        <span className="font-semibold text-[#171C35]">Patients</span>
      </div>
      </div>

<div className='bg-white rounded-2xl'>
      {/* Header */}
      <div className=" p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#171C35]">Total 60 Patients</h1>

          <div className="flex flex-wrap items-center gap-3">
           <button
  onClick={() => navigate('/dashboard/add-patient')}
  className="flex items-center gap-2 px-4 py-2.5 bg-[#DCE2FF] text-[#171C35] rounded-[8px] font-medium transition-colors"
>
  <img src="https://i.ibb.co.com/WNWLMm0k/plusIcon.png" alt="" />
  <span>Add Patient</span>
</button>


            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D0D5DD] text-[#171C35] rounded-[8px] font-medium transition-colors">
            <img src="https://i.ibb.co.com/m5VnxjwT/importpatient-Icon.png" alt="" />
              <span>Import Patient</span>
            </button>

            {/* List/Grid Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D0D5DD] rounded-[8px] text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer "
              >
                {viewMode === 'list' ? <img src={listIcon} alt="" className='cursor-pointer' /> : <img src="https://i.ibb.co.com/Vc6fTzxd/gridIcon.png" alt="" /> }
                <span>{viewMode === 'list' ? 'List' : 'Grid'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-2xl shadow-lg z-10">
                  {views.map((v) => (
                    <button
                      key={v.type}
                      onClick={() => {
                        setViewMode(v.type);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-between ${
                        viewMode === v.type ? 'font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {v.icon}
                        {v.label}
                      </div>
                      {viewMode === v.type && <Check className="w-4 h-4 " />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {viewMode === 'list' ? <ListView /> : <GridView />}
      </div>
    </div>
    </div>
  );
}
