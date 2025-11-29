import { useState } from "react";
import { Plus,  } from "lucide-react";
import PrescriptionPopup from "./PrescriptionPopup";

interface Prescription {
  id: number;
  date: string;
}

// interface PrescriptionPopupProps {
//   prescriptionId: number | null;
//   onClose: () => void;
// }

// function PrescriptionPopup({ prescriptionId, onClose }: PrescriptionPopupProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (!selectedFile) return alert("Please select a file to upload.");
//     alert(`File "${selectedFile.name}" uploaded for prescription ID ${prescriptionId}`);
//     setSelectedFile(null);
//     onClose();
//   };

//   return (
//  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
//   <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
//     {/* Close Button */}
//     <button
//       className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//       onClick={onClose}
//     >
//       <X size={20} />
//     </button>

//     {/* Title */}
//     <h2 className="text-xl font-semibold mb-4">Upload Prescription</h2>
//     <p className="text-sm text-gray-600 mb-6">
//       Prescription ID: {prescriptionId ?? "New"}
//     </p>

//     {/* File Input */}
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleFileChange}
//       className="mb-4 w-full text-sm text-gray-500
//                  file:mr-4 file:py-2 file:px-4 file:rounded-lg
//                  file:border file:border-gray-300 file:text-sm
//                  file:font-semibold file:bg-gray-100 file:text-gray-700
//                  hover:file:bg-gray-200"
//     />

//     {/* Selected File Info */}
//     {selectedFile && (
//       <p className="text-sm text-gray-600 mb-6">Selected: {selectedFile.name}</p>
//     )}

//     {/* Upload Button */}
//     <button
//       onClick={handleUpload}
//       className="w-full bg-[#526FFF] text-white py-2 rounded-lg font-medium
//                  hover:bg-[#4158d8] transition"
//     >
//       Upload
//     </button>
//   </div>
// </div>

//   );
// }

export default function PrescriptionsPage() {
  const prescriptions: Prescription[] = [
    { id: 1, date: "07-Oct-2025" },
    { id: 2, date: "06-Sep-2025" },
    { id: 3, date: "06-Sep-2025" },
    { id: 4, date: "06-Sep-2025" },
  ];

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddPrescription = () => {
    setSelectedId(null);
    setIsOpen(true);
  };

  const handleView = (id: number) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="bg-white p-3 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-base lg:text-2xl font-semibold text-[#171C35]">Prescriptions</h1>
        <button
          onClick={handleAddPrescription}
          className="flex items-center gap-1 lg:gap-2 px-2 lg:px-5 py-2 text-xs lg:text-sm text-[#111A2D] font-semibold border border-[#D0D5DD] rounded-xl cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Prescription
        </button>
      </div>

      {/* Prescription List */}
      <div className="space-y-4">
        {prescriptions.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-2 justify-between items-center p-4 bg-gray-50 rounded-2xl transition"
          >
            <p className="font-medium text-base text-[#171C35]">{item.date}</p>
            <button
              onClick={() => handleView(item.id)}
              className="text-sm text-[#111A2D] cursor-pointer font-medium px-4 py-1.5 border border-[#D0D5DD] rounded-[20px]"
            >
              View Prescription
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && <PrescriptionPopup prescriptionId={selectedId} onClose={closeModal} />}
    </div>
  );
}
