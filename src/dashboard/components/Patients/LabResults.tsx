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
        <h1 className="text-2xl font-semibold text-gray-900">Lab Results</h1>
        <button
          onClick={handleAddTest}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium border rounded-lg hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 text-indigo-600" />
          Add New Lab Test
        </button>
      </div>

      {/* Results List */}
      <div className=" rounded-lg shadow-sm divide-y space-y-2">
        {labResults.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center rounded-2xl p-4 bg-gray-50 transition"
          >
            <div>
              <p className="font-semibold text-gray-800">{item.testName}</p>
              <p className="text-sm text-gray-500">Date: {item.date}</p>
            </div>
            <button
              onClick={() => handleView(item.id)}
              className="text-sm px-4 py-2 border rounded-md bg-white hover:bg-gray-100 cursor-pointer"
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
