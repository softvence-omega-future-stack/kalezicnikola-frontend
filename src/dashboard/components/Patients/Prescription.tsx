import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import PrescriptionPopup from "./PrescriptionPopup";

interface Prescription {
  id: number;
  date: string;
}

export default function PrescriptionsPage() {
  const { t } = useTranslation();

  // Get prescriptions list and buttons text from i18n JSON
  const prescriptions: Prescription[] = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.prescriptions.list",
    { returnObjects: true }
  ) as Prescription[];

  const title = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.prescriptions.title"
  );

  const addButton = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.prescriptions.addButton"
  );

  const viewButton = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.prescriptions.viewButton"
  );

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
        <h1 className="text-base lg:text-2xl font-semibold text-[#171C35]">{title}</h1>
        <button
          onClick={handleAddPrescription}
          className="flex items-center gap-1 lg:gap-2 px-2 lg:px-5 py-2 text-xs lg:text-sm text-[#111A2D] font-semibold border border-[#D0D5DD] rounded-xl cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {addButton}
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
              {viewButton}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && <PrescriptionPopup prescriptionId={selectedId} onClose={closeModal} />}
    </div>
  );
}
