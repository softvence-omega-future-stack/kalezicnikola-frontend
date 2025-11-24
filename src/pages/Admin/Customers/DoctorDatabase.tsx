import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import docprofile from '../../../assets/svgIcon/recentDoctor.svg';
import search from '../../../assets/svgIcon/search.svg';
import { useNavigate } from 'react-router-dom';

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
  { id: '2', name: 'Floyd Miles', doctorId: 'CUST-002', plan: 'Basic', status: 'Trial', payment: 'Pending', mrr: 149 },
  { id: '3', name: 'Floyd Miles', doctorId: 'CUST-003', plan: 'Enterprise', status: 'Active', payment: 'Paid', mrr: 499 },
  { id: '4', name: 'Floyd Miles', doctorId: 'CUST-004', plan: 'Professional', status: 'Active', payment: 'Paid', mrr: 299 },
  { id: '5', name: 'Floyd Miles', doctorId: 'CUST-005', plan: 'Professional', status: 'Active', payment: 'Paid', mrr: 299 },
  { id: '6', name: 'Floyd Miles', doctorId: 'CUST-006', plan: 'Professional', status: 'Suspended', payment: 'Overdue', mrr: 299 },
  { id: '7', name: 'Floyd Miles', doctorId: 'CUST-007', plan: 'Basic', status: 'Active', payment: 'Paid', mrr: 149 },
  { id: '8', name: 'Floyd Miles', doctorId: 'CUST-008', plan: 'Professional', status: 'Active', payment: 'Paid', mrr: 299 },
  { id: '9', name: 'Floyd Miles', doctorId: 'CUST-009', plan: 'Basic', status: 'Active', payment: 'Paid', mrr: 149 },
];

const DoctorDatabaseTable: React.FC = () => {
 // const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const options = ['Active', 'Trial', 'Suspended'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  // const toggleSelectAll = () => {
  //   if (selectedRows.size === filteredDoctors.length) {
  //     setSelectedRows(new Set());
  //   } else {
  //     setSelectedRows(new Set(filteredDoctors.map(d => d.id)));
  //   }
  // };

  // const toggleSelectRow = (id: string) => {
  //   const newSelected = new Set(selectedRows);
  //   if (newSelected.has(id)) {
  //     newSelected.delete(id);
  //   } else {
  //     newSelected.add(id);
  //   }
  //   setSelectedRows(newSelected);
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-[#0089331A] text-[#008933]';
      case 'Trial': return 'bg-[#DD8F001A] text-[#DD8F00]';
      case 'Suspended': return 'bg-[#FF2F2F1A] text-[#FF2F2F]';
      default: return 'bg-gray-50 text-headingBlack';
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'Paid': return 'bg-[#A052FF1A] text-[#A052FF]';
      case 'Pending': return 'bg-[#DD8F001A] text-[#DD8F00]';
      case 'Overdue': return 'bg-[#FF2F2F1A] text-[#FF2F2F]';
      default: return 'bg-gray-50 text-headingBlack';
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

  // Filter doctors based on search and selected status
  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesStatus = selectedStatus === 'All Status' || doctor.status === selectedStatus;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.doctorId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className=" bg-white rounded-xl md:rounded-3xl py-4 px-4 sm:px-6">
      <div>
        {/* Header */}
        <div className="bg-white rounded-lg mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-semibold text-headingBlack pt-2">
              Doctor Database ({filteredDoctors.length})
            </h1>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <img 
                  src={search} 
                  alt="Search" 
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' 
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 placeholder-subHeadingBlack border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-between gap-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold text-subHeadingBlack bg-white transition-colors hover:bg-gray-50 w-full sm:w-48 cursor-pointer"
                >
                  <span className="truncate">{selectedStatus}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="absolute mt-1 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleSelect('All Status')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedStatus === 'All Status'
                          ? 'bg-blue-100 text-blue-600 font-medium rounded-t-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Status
                    </button>
                    {options.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleSelect(status)}
                        className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                          selectedStatus === status
                            ? 'bg-blue-100 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        } ${status === options[options.length - 1] ? 'rounded-b-lg' : ''}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">


                  {/* <th className="px-2 sm:px-4 py-3 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === filteredDoctors.length && filteredDoctors.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th> */}

                  <th className="px-2 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-headingBlack tracking-wider">
                    Doctor Name
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-headingBlack tracking-wider">
                    Doctor ID
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-headingBlack tracking-wider">
                    Plan
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-headingBlack tracking-wider">
                    Status
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-headingBlack tracking-wider">
                    Payment
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-headingBlack tracking-wider">
                    MRR
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left text-sm sm:text-base font-semibold text-headingBlack tracking-wider">
                    Actions
D
                    </th>

                  <th className="px-4 py-3 text-left w-12">
                    


                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">


                    <td className="px-2 sm:px-4 py-4">
                    

                    <td className="px-4 py-4">
                      {/* <input

                        type="checkbox"
                        checked={selectedRows.has(doctor.id)}
                        onChange={() => toggleSelectRow(doctor.id)}
                        className="w-4 h-4 rounded border border-gray-400 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                      /> */}
                      
                     
                    </td>
                    </td>

                    <td className="px-2 sm:px-4 py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0">
                          <img src={docprofile} alt={doctor.name} className="w-full h-full" />
                        </div>
                        <span className="text-sm text-[#45464E] whitespace-nowrap truncate max-w-[100px] sm:max-w-none">
                          {doctor.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-4 text-sm font-medium text-subHeadingBlack whitespace-nowrap">
                      {doctor.doctorId}
                    </td>
                    <td className="px-2 sm:px-4 py-4 text-sm font-medium text-[#667085] whitespace-nowrap">
                      {doctor.plan}
                    </td>
                    <td className="px-2 sm:px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 h-7 sm:h-8 w-20 sm:w-28 justify-center rounded-full text-xs sm:text-sm font-medium ${getStatusColor(doctor.status)}`}>
                        <span className="text-current text-xs">{getStatusIcon(doctor.status)}</span>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 h-7 sm:h-8 w-20 sm:w-28 justify-center rounded-full text-xs sm:text-sm font-medium ${getPaymentColor(doctor.payment)}`}>
                        {doctor.payment}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                      ${doctor.mrr}
                    </td>
                    <td className="px-2 sm:px-4 py-4">
                      <button 
                        onClick={() => navigate('/dashboard/doctor-profile')} 
                        className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-headingBlack bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#526FFF] focus:border-[#526FFF] focus:text-[#526FFF] transition-colors cursor-pointer hover:bg-gray-50"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-8 text-gray-500">No doctors found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDatabaseTable;