import { X,  PhoneCall, Mail } from "lucide-react";

interface PrescriptionPopupProps {
  prescriptionId: number | null; 
  onClose: () => void;
}

export default function PrescriptionPopup({
  onClose,
  prescriptionId,
}: PrescriptionPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-80 p-4 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-gray-100 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-300">
          <h1 className="text-lg font-bold text-[#171C35]">Patients Transcript</h1>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-white m-4 rounded-lg p-6 sm:p-8">
          {/* Clinic and Doctor Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gray-800 rounded"></div>
              <div>
                <h2 className="text-xl font-extrabold text-[#171C35]">Dental Lounge ™</h2>
                <p className="text-xs font-semibold text-black mt-0.5">C-306</p>
                <p className="text-xs font-semibold text-black">New Delhi, Delhi - 110020</p>
                <p className="text-xs font-semibold text-black">Phone: +91 9810098100</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-extrabold text-[#171C35]">Dr. Rakesh Mehta</h3>
              <p className="text-xs text-black mt-1">Registration number: 1234/M</p>
              <p className="text-xs text-black">www.lybrate.com/dentallounge</p>
            </div>
          </div>

          {/* Patient Details */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#171C35] mb-2">Patient Details</h3>
            <p className="text-xl text-[#171C35] font-semibold">
              Aditya Sudhakar{" "}
              <span className="font-normal text-sm">
                30 years 9 months Male (ID: {prescriptionId || 16})
              </span>
            </p>
            <p className="text-sm text-[#171C35] mt-1">
              <span className="font-semibold">Address:</span> Lajpat Nagar, Delhi, Delhi - 110016
            </p>
            <div className="flex items-center gap-3 mt-1 text-sm font-semibold text-[#171C35]">
              <span className="flex items-center gap-1">
                <span><PhoneCall size={14}/></span> +91 9823403493
              </span>
              <span className="flex items-center gap-1">
                <span><Mail size={14}/></span> aditya@gmail.com
              </span>
            </div>
            <p className="text-xs text-gray-700 mt-1">
              <span className="font-semibold">Medical History:</span> Diabetes, Tuberculosis
            </p>
          </div>

          {/* Prescription */}
          <div>
            <h3 className="text-3xl font-extrabold text-[#171C35] mb-4">R<span className="text-xl">x</span></h3>

            {/* Medicines Table */}
            <div className="border-t-2 border-b-2 border-gray-900">
              <div className="py-2 border-b border-gray-900">
                <h4 className="text-sm font-extrabold text-[#171C35]">Medicines</h4>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-900 text-xs font-extrabold text-[#171C35]">
                <div className="col-span-3">Name</div>
                <div className="col-span-6">Instructions</div>
                <div className="col-span-3">Frequency</div>
              </div>

              {/* Medicine 1 */}
              <div className="grid grid-cols-12 gap-4 py-4 border-b border-gray-300 text-xs">
                <div className="col-span-3">
                  <p className="text-[#171C35] font-medium">HydenLK Paste -</p>
                </div>
                <div className="col-span-6">
                  <p className="text-[#171C35] leading-relaxed">
                    3 months Apply on all the teeth surfaces, wait for 3 minutes and brush twice daily for 3 months.
                  </p>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center justify-between text-[#171C35]">
                    <span>0</span>
                    <span>-</span>
                    <span>0</span>
                    <span>-</span>
                    <span>0</span>
                  </div>
                  <div className="flex items-center justify-between text-[#171C35] text-xs mt-1">
                    <span>Morning</span>
                    <span>-</span>
                    <span>Afternoon</span>
                    <span>-</span>
                    <span>Night</span>
                  </div>
                </div>
              </div>

              {/* Medicine 2 */}
              <div className="grid grid-cols-12 gap-4 py-4 text-xs">
                <div className="col-span-3">
                  <p className="text-[#171C35] font-medium">Tab. Zerodol SP -</p>
                </div>
                <div className="col-span-6">
                  <p className="text-[#171C35]">4 days - after meal</p>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center justify-between text-[#171C35]">
                    <span>1</span>
                    <span>-</span>
                    <span>1</span>
                    <span>-</span>
                    <span>1</span>
                  </div>
                  <div className="flex items-center justify-between text-[#171C35] text-xs mt-1">
                    <span>Morning</span>
                    <span>-</span>
                    <span>Afternoon</span>
                    <span>-</span>
                    <span>Night</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-4 pb-4 flex gap-3">
          <button className="flex-1 py-3 px-4 bg-white border-2 border-[#526FFF] text-[#526FFF] rounded-[8px] font-medium text-sm flex items-center justify-center gap-2 transition-colors">
            <img src="https://i.ibb.co.com/CKBMjd3X/printicon.png" alt="" />
            Print
          </button>
          <button className="flex-1 py-3 px-4 bg-[#526FFF] text-white rounded-[8px] font-medium text-sm flex items-center justify-center gap-2  transition-colors">
          <img src="https://i.ibb.co.com/C5b0GkRy/download-Icon.png" alt="" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
