import { useState } from "react";
import { Plus } from "lucide-react";
import PrescriptionPopup from "./PrescriptionPopup";


interface Prescription {
  id: number;
  date: string;
}



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
    alert("Add Prescription button clicked!");
  };

  const handleView = (id: number) => {
    setSelectedId(id);
    setIsOpen(true); 
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="bg-white p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-[#171C35]">Prescriptions</h1>
        <button
          onClick={handleAddPrescription}
          className="flex items-center gap-2 px-5 py-2 text-sm text-[#111A2D] font-semibold border border-[#D0D5DD] rounded-[8px] "
        >
          <Plus className="w-4 h-4" />
          Add Prescription
        </button>
      </div>

      {/* Prescription List */}
      <div className="bg-white rounded-lg  space-y-4">
        {prescriptions.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl transition"
          >
            <p className="font-medium text-base text[#171C35]">{item.date}</p>
            <button
              onClick={() => handleView(item.id)}
              className="text-sm text-[#111A2D] font-medium px-4 py-1.5 border border-[#D0D5DD] cursor-pointer rounded-[20px] " 
            >
              View Prescription
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {isOpen && (
        <PrescriptionPopup
          prescriptionId={selectedId}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
