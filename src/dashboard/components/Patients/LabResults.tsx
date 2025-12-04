import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LabReport } from "./LabReportPopup";

interface LabResult {
  id: number;
  testName: string;
  date: string;
}

export default function LabResultsPage() {
  const { t } = useTranslation();

  // Get lab results list and buttons text from i18n JSON
  const labResults: LabResult[] = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.labResults.list",
    { returnObjects: true }
  ) as LabResult[];

  const title = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.labResults.title"
  );

  const addButton = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.labResults.addButton"
  );

  const viewButton = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.labResults.viewButton"
  );

  const dateLabel = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.labResults.dateLabel"
  );

  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTest = () => {
    setSelectedReport(null);
    setIsOpen(true);
  };

  const handleView = (id: number) => {
    setSelectedReport(id);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="bg-white p-3 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-8">
        <h1 className="text-base lg:text-2xl font-semibold text-[#171C35]">{title}</h1>
        <button
          onClick={handleAddTest}
          className="flex items-center cursor-pointer gap-1 lg:gap-2 px-2 lg:px-5 py-2 text-xs lg:text-sm text-[#111A2D] font-semibold border border-[#D0D5DD] rounded-xl hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 text-[#171C35]" />
          {addButton}
        </button>
      </div>

      {/* Results List */}
      <div className="rounded-lg space-y-2">
        {labResults.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 sm:flex-row sm:justify-between items-center rounded-2xl p-4 bg-[#FAFAFA] transition"
          >
            <div>
              <p className="font-medium text-base md:text-xl text-[#171C35]">
                {item.testName}
              </p>
              <p className="text-base font-medium text-[#111A2D]">
                {dateLabel}: {item.date}
              </p>
            </div>
            <button
              onClick={() => handleView(item.id)}
              className="text-sm px-4 py-2 font-medium border border-[#D0D5DD] text-[#111A2D] rounded-[24px] bg-[#FAFAFA] hover:bg-gray-100 cursor-pointer"
            >
              {viewButton}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && selectedReport !== null && (
        <LabReport reportId={selectedReport} onClose={closeModal} />
      )}
    </div>
  );
}