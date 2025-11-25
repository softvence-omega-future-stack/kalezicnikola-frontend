import React, { useState } from 'react';
import {  List,  ChevronDown, Check, Grid,  } from 'lucide-react';
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
    { type: 'grid', label: 'Grid', icon: <Grid  />},
  
  ];

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screenp-4 mt-[30px]">
      {/* Breadcrumb */}
      <div className="">
        <div className='flex items-center gap-2  px-2 md:px-0 text-sm text-gray-600 mb-6'>
      <img src={homeIcon} alt="" className="w-4 h-4" />
       <img src={chevronIcon} alt="" />
        <span onClick={()=> navigate('/dashboard')}>Dashboard</span>
       <img src={chevronIcon} alt="" />
        <span className="font-semibold text-sm text-[#171C35]">Patients</span>
      </div>
      </div>

<div className='bg-white rounded-2xl'>
      {/* Header */}
      <div className=" p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl font-semibold text-[#171C35]">Total 60 Patients</h1>

          <div className="flex flex-wrap items-center gap-3">
           <button
  onClick={() => navigate('/dashboard/add-patient')}
  className="flex items-center gap-2 px-4 py-2.5 bg-[#DCE2FF] text-[#171C35] rounded-[8px] font-medium transition-colors cursor-pointer"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M6.66634 0.833008V12.4997M0.833008 6.66634H12.4997" stroke="#171C35" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  <span>Add Patient</span>
</button>


            {/* <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D0D5DD] text-[#171C35] rounded-[8px] font-medium transition-colors">
            <img src="https://i.ibb.co.com/m5VnxjwT/importpatient-Icon.png" alt="" />
              <span>Import Patient</span>
            </button> */}

            {/* List/Grid Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D0D5DD] rounded-[8px] text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer "
              >
                {viewMode === 'list' ? <img src={listIcon} alt="" className='cursor-pointer' /> : <Grid/>  }
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
                      className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-between cursor-pointer ${
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
