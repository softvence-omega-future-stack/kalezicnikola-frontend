import React from 'react';
import { Download, Printer, X } from 'lucide-react';

interface InvoiceModalProps {
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-gray-100 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 p-4 ">
          <h1 className="text-xl font-semibold text-gray-900">Account statement</h1>
          <button onClick={onClose} className="p-2 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6">
          {/* Company Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
                  <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
                  <path d="M12 10C9 10 7 12 7 14M12 10C15 10 17 12 17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h2 className="text-base font-semibold text-orange-500 mb-1">Panda, Inc</h2>
                <p className="text-xs text-gray-600">www.website.com</p>
                <p className="text-xs text-gray-600">hello@email.com</p>
                <p className="text-xs text-gray-600">+91 00000 00000</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-600 mb-1">Business address</p>
              <p className="text-xs text-gray-600">City, State, IN - 000 000</p>
              <p className="text-xs text-gray-600">TAX ID: 000XXX0123XXXX</p>
            </div>
          </div>

          {/* Invoice Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500 mb-1">Billed to</p>
                <p className="text-sm font-semibold text-gray-900 mb-1">Company Name</p>
                <p className="text-xs text-gray-600">Company address</p>
                <p className="text-xs text-gray-600">City, Country - 000000</p>
                <p className="text-xs text-gray-600">+0 (000) 123-4567</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Subject</p>
                <p className="text-sm font-semibold text-gray-900">Design System</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500 mb-1">Invoice number</p>
                <p className="text-sm font-semibold text-gray-900">#AB2324-01</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Reference</p>
                <p className="text-sm font-semibold text-gray-900">INV-057</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invoice date</p>
                  <p className="text-sm font-semibold text-gray-900">01 Aug, 2023</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Due date</p>
                  <p className="text-sm font-semibold text-gray-900">15 Aug, 2023</p>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-gray-500 mb-1">Invoice id (USD)</p>
                <p className="text-3xl font-bold text-orange-500">$4,950.00</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 bg-gray-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
              <div className="col-span-5">
                <p className="text-xs font-semibold text-gray-700 uppercase">Item Detail</p>
              </div>
              <div className="col-span-2 text-center">
                <p className="text-xs font-semibold text-gray-700 uppercase">Qty</p>
              </div>
              <div className="col-span-2 text-right">
                <p className="text-xs font-semibold text-gray-700 uppercase">Rate</p>
              </div>
              <div className="col-span-3 text-right">
                <p className="text-xs font-semibold text-gray-700 uppercase">Amount</p>
              </div>
            </div>

            {/* Table Items - Desktop */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-100">
                <div className="col-span-5">
                  <p className="text-sm font-medium text-gray-900">Item Name</p>
                  <p className="text-xs text-gray-500">Item description</p>
                </div>
                <div className="col-span-2 text-center">
                  <p className="text-sm text-gray-900">1</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-sm text-gray-900">$3,000.00</p>
                </div>
                <div className="col-span-3 text-right">
                  <p className="text-sm font-medium text-gray-900">$3,000.00</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-100">
                <div className="col-span-5">
                  <p className="text-sm font-medium text-gray-900">Item Name</p>
                  <p className="text-xs text-gray-500">Item description</p>
                </div>
                <div className="col-span-2 text-center">
                  <p className="text-sm text-gray-900">1</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-sm text-gray-900">$1,500.00</p>
                </div>
                <div className="col-span-3 text-right">
                  <p className="text-sm font-medium text-gray-900">$1,500.00</p>
                </div>
              </div>
            </div>

            {/* Table Items - Mobile */}
            <div className="sm:hidden space-y-4 mt-4">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Item Name</p>
                    <p className="text-xs text-gray-500">Item description</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">$3,000.00</p>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Qty: 1</span>
                  <span>Rate: $3,000.00</span>
                </div>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Item Name</p>
                    <p className="text-xs text-gray-500">Item description</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">$1,500.00</p>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Qty: 1</span>
                  <span>Rate: $1,500.00</span>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-3 px-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">$4,500.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Tax (10%)</span>
                <span className="text-sm font-medium text-gray-900">$450.00</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">$4,950.00</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 space-y-4">
            <p className="text-sm text-gray-900">Thanks for the business.</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-900 mb-1">Terms & Conditions</p>
              <p className="text-xs text-gray-600">Please pay within 15 days of receiving this invoice.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}