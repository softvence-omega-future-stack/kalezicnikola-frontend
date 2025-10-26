import React, { useState } from 'react';
import { Plus, Upload, List, Grid3x3, ChevronDown, Check } from 'lucide-react';
import ListView from './ListView';
import GridView from './GridView';

type ViewMode = 'list' | 'grid';

export default function PatientsView() {
  const [viewMode, setViewMode] = useState<ViewMode>('list'); // 'list' বা 'grid'
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const views: { type: ViewMode; label: string; icon: React.ReactNode }[] = [
    { type: 'list', label: 'List', icon: <List className="w-5 h-5" /> },
    { type: 'grid', label: 'Grid', icon: <Grid3x3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>🏠</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="font-semibold text-gray-900">Patients</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Total 60 Patients</h1>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add Patient</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5" />
              <span>Import Patient</span>
            </button>

            {/* List/Grid Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {viewMode === 'list' ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
                <span>{viewMode === 'list' ? 'List' : 'Grid'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
                      {viewMode === v.type && <Check className="w-4 h-4 text-indigo-600" />}
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
  );
}
