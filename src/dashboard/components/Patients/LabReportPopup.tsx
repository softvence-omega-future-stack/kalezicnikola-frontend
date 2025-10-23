import { X, Printer, Download } from 'lucide-react';

interface LabReportProps {
  reportId: number | null;
  onClose: () => void;
}

export const LabReport: React.FC<LabReportProps> = ({ reportId, onClose }) => {
  if (reportId === null) return null;

  const bloodCountResults = [
    { name: 'Hemoglobin', result: '12', normalRange: '11.0 - 16.0', units: 'g/dL', isAbnormal: false },
    { name: 'RBC', result: '3.3', normalRange: '3.5-5.50', units: '10^6/uL', isAbnormal: true },
    { name: 'HCT', result: '36', normalRange: '37.0-50.0', units: '%', isAbnormal: true },
    { name: 'MCV', result: '83', normalRange: '82-95', units: 'fl', isAbnormal: false },
    { name: 'MCH', result: '28', normalRange: '27-31', units: 'pg', isAbnormal: false },
    { name: 'MCHC', result: '33', normalRange: '32.0-36.0', units: 'g/dL', isAbnormal: false },
    { name: 'RDW-CV', result: '12', normalRange: '11.5-14.5', units: '%', isAbnormal: false },
    { name: 'RDW-SD', result: '44', normalRange: '35-56', units: 'fl', isAbnormal: false },
    { name: 'WBC', result: '6.7', normalRange: '4.5-11', units: '10^3/uL', isAbnormal: false },
    { name: 'NEU%', result: '60', normalRange: '40-70', units: '%', isAbnormal: false },
    { name: 'LYM%', result: '30', normalRange: '20-45', units: '%', isAbnormal: false },
    { name: 'MON%', result: '8', normalRange: '2-10', units: '%', isAbnormal: false },
    { name: 'EOS%', result: '2', normalRange: '1-6', units: '%', isAbnormal: false },
    { name: 'BAS%', result: '0', normalRange: '0-2', units: '%', isAbnormal: false },
    { name: 'LYM#', result: '2', normalRange: '1.5-4.0', units: '10^3/uL', isAbnormal: false },
    { name: 'GRA#', result: '4.7', normalRange: '2.0-7.5', units: '10^3/uL', isAbnormal: false },
    { name: 'PLT', result: '256', normalRange: '150-450', units: '10^3/uL', isAbnormal: false },
    { name: 'ESR', result: '2', normalRange: 'Up to 15', units: 'mm/hr', isAbnormal: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-gray-100 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-900">Lab Results</h1>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Laboratory Report Header */}
          <div className="bg-teal-600 text-white text-center py-2">
            <h2 className="text-sm font-bold tracking-wide">LABORATORY REPORT</h2>
          </div>

          {/* Patient Information */}
          <div className="p-6 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm border-b border-gray-200">
            <div className="flex gap-8">
              <span className="font-semibold text-gray-700">Name</span>
              <span className="text-gray-900 font-extrabold">Ana Betz</span>
            </div>
            <div className="flex gap-8 sm:justify-end">
              <span className="font-semibold text-gray-900">Patient ID</span>
              <span className="text-gray-900 font-semibold">PAC001</span>
            </div>
            <div className="flex gap-8">
              <span className="font-semibold text-gray-900">Date</span>
              <span className="text-gray-900 font-semibold">2011-08-25 08:32</span>
            </div>
            <div className="flex gap-4 sm:justify-end">
              <span className="font-semibold text-gray-900">Age</span>
              <span className="text-gray-900 font-semibold">25y 10m 26d</span>
              <span className="font-semibold text-gray-900 ml-4">Sex</span>
              <span className="text-gray-900 font-semibold">Female</span>
            </div>
            <div className="flex gap-8">
              <span className="font-semibold text-gray-900">Doctor</span>
              <span className="text-gray-900 font-semibold">Cameron Cordara</span>
            </div>
            <div className="flex gap-8 sm:justify-end">
              <span className="font-semibold text-gray-900">Test id</span>
              <span className="text-gray-900 font-semibold">B165AAF4</span>
            </div>
          </div>

          {/* Complete Blood Count Section */}
          <div className="px-6">
            <h3 className="text-center text-teal-600 font-bold text-lg mb-4">COMPLETE BLOOD COUNT</h3>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Test Name</th>
                    <th className="text-center py-2 px-2 font-semibold text-gray-700">Result</th>
                    <th className="text-center py-2 px-2 font-semibold text-gray-700">Normal Range</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Units</th>
                  </tr>
                </thead>
                <tbody>
  {bloodCountResults.map((test, index) => (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className={`py-2 px-2 ${test.isAbnormal ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
        {test.name}
      </td>
      <td className={`py-2 px-2 text-center font-semibold ${test.isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>
        {test.result}
      </td>
      <td className={`py-2 px-2 text-center ${test.isAbnormal ? 'text-red-600' : 'text-gray-700'}`}>
        {test.normalRange}
      </td>
      <td className={`py-2 px-2 text-right ${test.isAbnormal ? 'text-red-600' : 'text-gray-700'}`}>
        {test.units}
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>

            {/* Signature Section */}
            <div className="mt-8 pt-4 border-t border-gray-300 text-right">
              <p className="text-sm text-gray-600">Digitally signed by</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-4 pb-4 flex gap-3 flex-shrink-0">
          <button className="flex-1 py-3 px-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
