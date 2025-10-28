import React, { useState } from "react";
import { Plus } from "lucide-react";
import { LabReport } from "./LabReportPopup";


interface LabResult {
  id: number;
  testName: string;
  date: string;
}

const LabResultsPage: React.FC = () => {
      const [selectedReport, setSelectedReport] = useState<number | null>(null);
      const [isOpen, setIsOpen] = useState(false);
  const labResults: LabResult[] = [
    { id: 1, testName: "Blood Panel", date: "2023-07-14" },
    { id: 2, testName: "Lipid Panel", date: "2023-07-14" },
    { id: 3, testName: "Comprehensive Metabolic Panel", date: "2023-07-14" },
  ];

  const handleAddTest = () => {
    alert("Add New Lab Test clicked!");
  };

  const handleView = (id: number) => {
    setSelectedReport(id);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className=" bg-white p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-[#171C35]">Lab Results</h1>
        <button
          onClick={handleAddTest}
          className="flex items-center gap-2 px-5 py-2 text-sm text-[#111A2D] font-semibold border rounded-lg hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 text-[#171C35]" />
          Add New Lab Test
        </button>
      </div>

      {/* Results List */}
      <div className=" rounded-lg  space-y-2">
        {labResults.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center rounded-2xl p-4 bg-[#FAFAFA] transition"
          >
            <div>
              <p className="font-medium text-xl text-[#171C35]">{item.testName}</p>
              <p className="text-base font-medium text-[#111A2D]">Date: {item.date}</p>
            </div>
            <button
              onClick={() => handleView(item.id)}
              className="text-sm px-4 py-2 font-medium  border border-[#D0D5DD] text-[#111A2D] p-4 rounded-[24px] bg-[#FAFAFA] hover:bg-gray-100 cursor-pointer"
            >
              View Lab Report
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
};

export default LabResultsPage;
