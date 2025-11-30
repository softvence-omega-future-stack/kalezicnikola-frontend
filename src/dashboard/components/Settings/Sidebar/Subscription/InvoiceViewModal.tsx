
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import panda from '../../../../../assets/svgIcon/pandaInc.svg';
import download from '../../../../../assets/svgIcon/download.svg';
import print from '../../../../../assets/svgIcon/print.svg';

interface InvoiceItem {
  name: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceModalProps {
  onClose: () => void;
}

interface InvoiceData {
  companyName: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyCity: string;
  companyTaxId: string;
  billedTo: string;
  billedToAddress: string;
  billedToCity: string;
  billedToPhone: string;
  invoiceNumber: string;
  reference: string;
  subject: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const invoiceData: InvoiceData = {
    companyName: "Panda, Inc",
    companyWebsite: "www.website.com",
    companyEmail: "hello@email.com",
    companyPhone: "+91 00000 00000",
    companyAddress: "Business address",
    companyCity: "City, State, IN - 000 000",
    companyTaxId: "TAX ID 00XXXXX1234XXXX",
    billedTo: "Company Name",
    billedToAddress: "Company address",
    billedToCity: "City, Country - 00000",
    billedToPhone: "+0 (000) 123-4567",
    invoiceNumber: "#AB2324-01",
    reference: "INV-057",
    subject: "Design System",
    invoiceDate: "01 Aug, 2023",
    dueDate: "15 Aug, 2023",
    items: [
      {
        name: "Item Name",
        description: "Item description",
        quantity: 1,
        rate: 3000.00,
        amount: 3000.00
      },
      {
        name: "Item Name",
        description: "Item description",
        quantity: 1,
        rate: 1500.00,
        amount: 1500.00
      }
    ],
    taxRate: 10
  };

  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * (invoiceData.taxRate / 100);
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div 
        ref={modalRef}
        className="bg-[#F3F6F6D9] rounded-2xl sm:rounded-[32px] w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col my-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6">
          <h2 className="text-lg sm:text-2xl font-semibold text-[#171C35]">Account statement</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#5e6470] transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-white mx-3 sm:mx-7 rounded-2xl">
          <div className="bg-[#F3F5F9] border border-[#D7DAE0] rounded-xl p-4 sm:p-6 md:p-8">
            {/* Company Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <img src={panda} alt="" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#E87117]">{invoiceData.companyName}</h3>
                  <p className="text-[10px] text-[#5e6470]">{invoiceData.companyWebsite}</p>
                  <p className="text-[10px] text-[#5e6470]">{invoiceData.companyEmail}</p>
                  <p className="text-[10px] text-[#5e6470]">{invoiceData.companyPhone}</p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] text-[#5e6470]">{invoiceData.companyAddress}</p>
                <p className="text-[10px] text-[#5e6470]">{invoiceData.companyCity}</p>
                <p className="text-[10px] text-[#5e6470]">{invoiceData.companyTaxId}</p>
              </div>
            </div>

            <div className='bg-white rounded-2xl p-3 sm:p-4'>
              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <p className="text-[10px] text-[#5e6470] mb-1">Billed to</p>
                  <p className="font-semibold text-sm sm:text-base text-[#1a1c21]">{invoiceData.billedTo}</p>
                  <p className="text-[10px] text-[#5e6470]">{invoiceData.billedToAddress}</p>
                  <p className="text-[10px] text-[#5e6470]">{invoiceData.billedToCity}</p>
                  <p className="text-[10px] text-[#5e6470]">{invoiceData.billedToPhone}</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] text-[#5e6470] mb-1">Invoice number</p>
                      <p className="font-semibold text-sm sm:text-base text-[#1a1c21]">{invoiceData.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#5e6470] mb-1">Invoice of (USD)</p>
                      <p className="text-xl sm:text-2xl font-bold text-orange-500">${total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#5e6470] mb-1">Reference</p>
                    <p className="font-semibold text-sm sm:text-base text-[#1a1c21]">{invoiceData.reference}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div>
                  <p className="text-[10px] text-[#5e6470] mb-1">Subject</p>
                  <p className="font-semibold text-sm sm:text-base text-[#1a1c21]">{invoiceData.subject}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#5e6470] mb-1">Invoice date</p>
                  <p className="font-semibold text-sm sm:text-base text-[#1a1c21]">{invoiceData.invoiceDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#5e6470] mb-1">Due date</p>
                  <p className="font-semibold text-sm sm:text-base text-[#1a1c21]">{invoiceData.dueDate}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto mb-4 sm:mb-6 -mx-3 sm:mx-0 px-3 sm:px-0">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left text-[10px] sm:text-[12px] text-[#5e6470] pb-3">ITEM DETAIL</th>
                      <th className="text-center text-[10px] sm:text-[12px] text-[#5e6470] pb-3 w-16 sm:w-20">QTY</th>
                      <th className="text-right text-[10px] sm:text-[12px] text-[#5e6470] pb-3 w-20 sm:w-28">RATE</th>
                      <th className="text-right text-[10px] sm:text-[12px] text-[#5e6470] pb-3 w-20 sm:w-28">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 sm:py-4">
                          <p className="text-[11px] sm:text-[12px] font-medium text-[#1a1c21]">{item.name}</p>
                          <p className="text-[10px] text-[#5e6470]">{item.description}</p>
                        </td>
                        <td className="text-center text-[11px] sm:text-[12px] text-[#1A1C21] py-3 sm:py-4">{item.quantity}</td>
                        <td className="text-right text-[11px] sm:text-[12px] py-3 sm:py-4">${item.rate.toFixed(2)}</td>
                        <td className="text-right text-[11px] sm:text-[12px] py-3 sm:py-4">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-6 sm:mb-8">
                <div className="w-full sm:w-80 space-y-2">
                  <div className="flex justify-between text-[10px] sm:text-xs">
                    <span className="text-[#1A1C21]">Subtotal</span>
                    <span className="font-semibold text-[#1a1c21]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs">
                    <span className="text-[#1A1C21]">Tax ({invoiceData.taxRate}%)</span>
                    <span className="font-semibold text-[#1a1c21]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-bold border-t border-gray-300 pt-2">
                    <span className="text-[#1a1c21]">Total</span>
                    <span className="text-[#1a1c21]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-[#1a1c21]">Thanks for the business.</p>
            </div>

            {/* Footer */}
            <div className="mt-3 sm:mt-4">
              <p className="text-[10px] font-semibold text-[#5E6470] mb-1">Terms & Conditions</p>
              <p className="text-[10px] text-[#1A1C21]">Please pay within 15 days of receiving this invoice.</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#526FFF] text-[#526FFF] rounded-lg font-medium hover:bg-[#526FFF] hover:text-white transition-colors">
            <img src={print} alt="" className="w-4 h-4" />
            Print
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#526FFF] text-white rounded-lg font-medium hover:bg-[#4159cc] transition-colors">
            <img src={download} alt="" className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
// import React from 'react';
// import {X } from 'lucide-react';
// import panda from '../../../../../assets/svgIcon/pandaInc.svg'
// import download from '../../../../../assets/svgIcon/download.svg'
// import print from '../../../../../assets/svgIcon/print.svg'

// interface InvoiceItem {
//   name: string;
//   description: string;
//   quantity: number;
//   rate: number;
//   amount: number;
// }

// interface InvoiceModalProps {
//   onClose: () => void;
// }

// interface InvoiceData {
//   companyName: string;
//   companyWebsite: string;
//   companyEmail: string;
//   companyPhone: string;
//   companyAddress: string;
//   companyCity: string;
//   companyTaxId: string;
//   billedTo: string;
//   billedToAddress: string;
//   billedToCity: string;
//   billedToPhone: string;
//   invoiceNumber: string;
//   reference: string;
//   subject: string;
//   invoiceDate: string;
//   dueDate: string;
//   items: InvoiceItem[];
//   taxRate: number;
// }

// const InvoiceModal: React.FC<InvoiceModalProps> = ({onClose}) => {
//   // const [isOpen, setIsOpen] = useState(true);

//   const invoiceData: InvoiceData = {
//     companyName: "Panda, Inc",
//     companyWebsite: "www.website.com",
//     companyEmail: "hello@email.com",
//     companyPhone: "+91 00000 00000",
//     companyAddress: "Business address",
//     companyCity: "City, State, IN - 000 000",
//     companyTaxId: "TAX ID 00XXXXX1234XXXX",
//     billedTo: "Company Name",
//     billedToAddress: "Company address",
//     billedToCity: "City, Country - 00000",
//     billedToPhone: "+0 (000) 123-4567",
//     invoiceNumber: "#AB2324-01",
//     reference: "INV-057",
//     subject: "Design System",
//     invoiceDate: "01 Aug, 2023",
//     dueDate: "15 Aug, 2023",
//     items: [
//       {
//         name: "Item Name",
//         description: "Item description",
//         quantity: 1,
//         rate: 3000.00,
//         amount: 3000.00
//       },
//       {
//         name: "Item Name",
//         description: "Item description",
//         quantity: 1,
//         rate: 1500.00,
//         amount: 1500.00
//       }
//     ],
//     taxRate: 10
//   };

//   const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
//   const tax = subtotal * (invoiceData.taxRate / 100);
//   const total = subtotal + tax;

//   // if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-[#F3F6F6D9]  rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 ">
//           <h2 className="text-2xl font-semibold text-[#171C35]">Account statement</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-[#5e6470] transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6 bg-white mx-7 rounded-2xl">
//           <div className="bg-[#F3F5F9] border border-[#D7DAE0] rounded-xl p-6 md:p-8">
//             {/* Company Header */}
//             <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 ">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12  flex-shrink-0">
//                   <img src={panda} alt="" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-[#E87117]">{invoiceData.companyName}</h3>
//                   <p className="text-[10px] text-[#5e6470]">{invoiceData.companyWebsite}</p>
//                   <p className="text-[10px] text-[#5e6470]">{invoiceData.companyEmail}</p>
//                   <p className="text-[10px] text-[#5e6470]">{invoiceData.companyPhone}</p>
//                 </div>
//               </div>
//               <div className="text-left md:text-right">
//                 <p className="text-[10px] text-[#5e6470]">{invoiceData.companyAddress}</p>
//                 <p className="text-[10px] text-[#5e6470]">{invoiceData.companyCity}</p>
//                 <p className="text-[10px] text-[#5e6470]">{invoiceData.companyTaxId}</p>
//               </div>
//             </div>

//            <div className='bg-white rounded-2xl p-4'>
//              {/* Invoice Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div>
//                 <p className="text-[10px] text-[#5e6470] mb-1">Billed to</p>
//                 <p className="font-semibold text-[#1a1c21]">{invoiceData.billedTo}</p>
//                 <p className="text-[10px] text-[#5e6470]">{invoiceData.billedToAddress}</p>
//                 <p className="text-[10px] text-[#5e6470]">{invoiceData.billedToCity}</p>
//                 <p className="text-[10px] text-[#5e6470]">{invoiceData.billedToPhone}</p>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-[10px] text-[#5e6470] mb-1">Invoice number</p>
//                     <p className="font-semibold text-[#1a1c21]">{invoiceData.invoiceNumber}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-[10px] text-[#5e6470] mb-1">Invoice of (USD)</p>
//                     <p className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-[#5e6470] mb-1">Reference</p>
//                   <p className="font-semibold text-[#1a1c21]">{invoiceData.reference}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               <div>
//                 <p className="text-[10px] text-[#5e6470] mb-1">Subject</p>
//                 <p className="font-semibold text-[#1a1c21]">{invoiceData.subject}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#5e6470] mb-1">Invoice date</p>
//                 <p className="font-semibold text-[#1a1c21]">{invoiceData.invoiceDate}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#5e6470] mb-1">Due date</p>
//                 <p className="font-semibold text-[#1a1c21]">{invoiceData.dueDate}</p>
//               </div>
//             </div>

//             {/* Items Table */}
//             <div className="overflow-x-auto mb-6">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-300">
//                     <th className="text-left text-[12px] text-[#5e6470]  pb-3">ITEM DETAIL</th>
//                     <th className="text-center text-[12px] text-[#5e6470]  pb-3 w-20">QTY</th>
//                     <th className="text-right text-[12px] text-[#5e6470]  pb-3 w-28">RATE</th>
//                     <th className="text-right text-[12px] text-[#5e6470]  pb-3 w-28">AMOUNT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoiceData.items.map((item, index) => (
//                     <tr key={index} className="border-b border-gray-200">
//                       <td className="py-4">
//                         <p className="text-[12px] font-medium text-[#1a1c21]">{item.name}</p>
//                         <p className="text-[10px] text-[#5e6470]">{item.description}</p>
//                       </td>
//                       <td className="text-center text-[#1A1C21] py-4">{item.quantity}</td>
//                       <td className="text-right py-4">${item.rate.toFixed(2)}</td>
//                       <td className="text-right py-4">${item.amount.toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Totals */}
//             <div className="flex justify-end mb-8">
//               <div className="w-full md:w-80 space-y-2">
//                 <div className="flex justify-between text-[10px]">
//                   <span className="text-[#1A1C21] textxs">Subtotal</span>
//                   <span className="font-semibold text-[#1a1c21]">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-[10px]">
//                   <span className="text-[#1A1C21]">Tax ({invoiceData.taxRate}%)</span>
//                   <span className="font-semibold text-[#1a1c21]">${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-base font-bold border-t border-gray-300 pt-2">
//                   <span className="text-[#1a1c21]">Total</span>
//                   <span className="text-[#1a1c21]">${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           <p className="text-[10px] text-[#1a1c21]">Thanks for the business.</p>
//            </div>

//             {/* Footer */}
//             <div className="">
              
//               <div>
//                 <p className="text-[10px] font-semibold text-[#5E6470] mb-1 mt-3">Terms & Conditions</p>
//                 <p className="text-[10px] text-[#1A1C21]">Please pay within 15 days of receiving this invoice.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Buttons */}
//         <div className="flex  [10px]:flex-row gap-3 p-6 ">
//           <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#526FFF] text-[#526FFF] rounded-[8px] font-medium  transition-colors">
//             <img src={print} alt="" />
//             Print
//           </button>
//           <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#526FFF] text-white rounded-[8px] font-medium  transition-colors">
//             <img src={download} alt="" />
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceModal;