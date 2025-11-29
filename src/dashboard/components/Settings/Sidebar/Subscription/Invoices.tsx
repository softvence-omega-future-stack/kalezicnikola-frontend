import { useState } from 'react';
import InvoiceModal from './InvoiceViewModal';

import DateRange from '@/dashboard/components/CallLogs/DateRange';





export default function Invoices() {
    const [isOpen, setIsOpen] = useState(false);

  const [transactions] = useState([
    { id: 1, date: '16 Jan 2025', name: 'Jacob Jones', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 2, date: '16 Jan 2025', name: 'Ralph Edwards', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 3, date: '16 Jan 2025', name: 'Ronald Richards', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 4, date: '16 Jan 2025', name: 'Wade Warren', transactionId: 'Bk1892464U', status: 'Pending', amount: '739€' },
    { id: 5, date: '16 Jan 2025', name: 'Darlene Robertson', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 6, date: '16 Jan 2025', name: 'Kristin Watson', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 7, date: '16 Jan 2025', name: 'Savannah Nguyen', transactionId: 'Bk1892464U', status: 'Pending', amount: '739€' },
  ]);

  return (
    <div className="  bg-white">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-[#171c35]">Transaction Overview</h1>
         <DateRange/> 
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-base font-medium text-[#171C35]">Date</th>
                <th className="text-left py-4 px-4 text-base font-medium text-[#171c35]">Name</th>
                <th className="text-left py-4 px-4 text-base font-medium text-[#171c35]">Transaction ID</th>
                <th className="text-left py-4 px-4 text-base font-medium text-[#171c35]">Status</th>
                <th className="text-left py-4 px-4 text-base font-medium text-[#171c35]">Pay Amount</th>
                <th className="text-left py-4 px-4 text-base font-medium text-[#171c35]">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-5 px-4 text-sm font-medium text-[#111A2D]">{transaction.date}</td>
                  <td className="py-5 px-4 text-sm font-medium text-[#111A2D]">{transaction.name}</td>
                  <td className="py-5 px-4 text-sm font-medium text-[#111A2D]">{transaction.transactionId}</td>
                  <td className="py-5 px-4">
                    <span className={`inline-flex items-center w-[109px] justify-center px-6 py-1.5 rounded-full text-sm font-normal ${
                      transaction.status === 'Paid' 
                        ? 'bg-[#0089331A] text-[#008933]' 
                        : 'bg-[#DD8F001A] text-[#DD8F00]'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-sm font-medium text-[#111A2D]">{transaction.amount}</td>
                  <td className="py-5 px-4">
                    <button    onClick={() => setIsOpen(true)}
         className="px-6 py-2 text-sm font-medium text-[#171c35] bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-[#171c35] mb-1">{transaction.name}</p>
                  <p className="text-xs text-gray-600">{transaction.date}</p>
                </div>
                <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-normal ${
                  transaction.status === 'Paid' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {transaction.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-xs text-[#171C35]">Transaction ID</span>
                  <span className="text-xs  text-[#171c35]">{transaction.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-medium text-[#111A2D]">Pay Amount</span>
                  <span className="text-xs text-[#171c35] font-medium">{transaction.amount}</span>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 text-sm text-[#111A2D] font-medium cursor-pointer bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
          {isOpen && <InvoiceModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}