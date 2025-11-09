import React, { useState } from 'react';
import {  ChevronDown } from 'lucide-react';
import docprofile from '../../../assets/svgIcon/recentDoctor.svg'
import search from '../../../assets/svgIcon/search.svg'


interface Doctor {
  id: string;
  name: string;
  doctorId: string;
  plan: string;
  status: 'Active' | 'Trial' | 'Suspended';
  payment: 'Paid' | 'Pending' | 'Overdue';
  mrr: number;
}

const doctorsData: Doctor[] = [
  { id: '1', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Professional', status: 'Active', payment: 'Paid', mrr: 299 },
  { id: '2', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Basic', status: 'Trial', payment: 'Pending', mrr: 149 },
  { id: '3', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Enterprise', status: 'Active', payment: 'Paid', mrr: 499 },
  { id: '4', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Professional', status: 'Active', payment: 'Paid', mrr: 299 },
  { id: '5', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Professional', status: 'Active', payment: 'Paid', mrr: 299 },
  { id: '6', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Professional', status: 'Suspended', payment: 'Overdue', mrr: 299 },
  { id: '7', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Basic', status: 'Active', payment: 'Paid', mrr: 149 },
  { id: '8', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Professional', status: 'Active', payment: 'Paid', mrr: 299 },
  { id: '9', name: 'Floyd Miles', doctorId: 'CUST-001', plan: 'Basic', status: 'Active', payment: 'Paid', mrr: 149 },
];

const DoctorDatabaseTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSelectAll = () => {
    if (selectedRows.size === doctorsData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(doctorsData.map(d => d.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-[#0089331A] text-[#008933]';
      case 'Trial': return 'bg-[#DD8F001A] text-[#DD8F00]';
      case 'Suspended': return 'bg-[#FF2F2F1A] text-[#FF2F2F]';
      default: return 'bg-gray-50 text-[#171C35]';
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'Paid': return 'bg-[#A052FF1A] text-[#A052FF]';
      case 'Pending': return 'bg-[#DD8F001A] text-[#DD8F00]';
      case 'Overdue': return 'bg-[#FF2F2F1A] text-[#FF2F2F]';
      default: return 'bg-gray-50 text-[#171C35]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return '●';
      case 'Trial': return '●';
      case 'Suspended': return '●';
      default: return '●';
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-3xl p-4 md:p-8 -mt-2">
      <div className="">
        
        {/* Header */}
        <div className="bg-white rounded-lg p-4 md:p-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl  font-semibold text-[#171C35]">
              Doctor Database (111)
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <img src={search} alt="" className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 placeholder:[#111A2D] border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Status Filter */}
              <button className="flex items-center justify-between gap-2 px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-sm font-semibold text-[#111A2D] bg-white  transition-colors">
                All Status
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 ">
                  <th className="px-4 py-3 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === doctorsData.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold text-[#171C35] tracking-wider">
                    Doctor Name
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold text-[#171C35]  tracking-wider">
                    Doctor ID
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold text-[#171C35]  tracking-wider">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold text-[#171C35]  tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold text-[#171C35]  tracking-wider">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold text-[#171C35]  tracking-wider">
                    MRR
                  </th>
                  <th className="px-4 py-3 text-left text-base font-semibold text-[#171C35]  tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {doctorsData.map((doctor) => (
                  <tr 
                    key={doctor.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(doctor.id)}
                        onChange={() => toggleSelectRow(doctor.id)}
                        className="w-4 h-4 rounded border border-gray-400 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full  flex-shrink-0"> <img src={docprofile} alt="" /> </div>
                        <span className="text-sm  text-[#45464E] whitespace-nowrap">
                          {doctor.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-[#111A2D] whitespace-nowrap">
                      {doctor.doctorId}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-[#667085] whitespace-nowrap">
                      {doctor.plan}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-[10px] h-8 w-28 justify-center rounded-full py-1  text-sm font-medium ${getStatusColor(doctor.status)}`}>
                        <span className="text-current">{getStatusIcon(doctor.status)}</span>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-[10px] py-1 h-8 w-28 justify-center rounded-full text-sm font-medium ${getPaymentColor(doctor.payment)}`}>
                        {doctor.payment}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                      ${doctor.mrr}
                    </td>
                    <td className="px-4 py-4">
                      <button className="px-4 py-1.5 text-sm font-medium text-[#171C35] bg-white border border-gray-300 rounded-full h  focus:outline-none focus:ring-1 focus:ring-[#526FFF] focus:border-[#526FFF] focus:text-[#526FFF]transition-colors cursor-pointer">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default DoctorDatabaseTable;