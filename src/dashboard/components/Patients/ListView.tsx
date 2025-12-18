import { useTranslation } from 'react-i18next';
import PatientActions from './PatinetsActions';
import { useState } from 'react';


interface Patient {
  id: string;
  insuranceId: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
}

interface ListViewProps {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  totalPatients: number;
}

const ListView = ({ patients, loading, error, totalPatients }: ListViewProps) => {
  const { t } = useTranslation();
   const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div>
    {
      patients.length === 0 ? (
        <p className="p-4 text-center text-gray-600">
          No patients found. Please add a patient.
        </p>
      ) : 
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left font-semibold text-[#171C35]">
                  {t('dashboard.routes.patients.listView.table.insuranceId')}
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-semibold text-[#171C35]">
                  {t('dashboard.routes.patients.listView.table.name')}
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-semibold text-[#171C35]">
                  {t('dashboard.routes.patients.listView.table.phone')}
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-semibold text-[#171C35]">
                  {t('dashboard.routes.patients.listView.table.date')}
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-semibold text-[#171C35]">
                  {t('dashboard.routes.patients.listView.table.profile')}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="transition-colors">
                  <td className="px-6 py-4 text-sm">{patient.insuranceId}</td>
                  <td className="px-6 py-4 text-sm text-[#171C35]">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#171C35]">{patient.phone}</td>
                  <td className="px-6 py-4 text-sm text-[#171C35]">
                    {patient.createdAt.split("T")[0]}
                  </td>

                  {/* 3-dot dropdown */}
                  <td className="px-6 py-4 cursor-pointer">
                    <PatientActions patientId={patient.id}  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
          <p className="text-sm font-medium text-[#000000]">
            {`Showing ${1} to ${patients.length} of ${totalPatients} patients`}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-base font-semibold text-[#111A2D] bg-[#F3F6F6] border border-gray-300 rounded-xl disabled:opacity-50 cursor-pointer"
            >
              {t('Previous')}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 text-base font-semibold text-[#1a1c21] bg-[#F3F6F6] border border-gray-300 rounded-xl cursor-pointer"
            >
              {t('Next')}
            </button>
          </div>
        </div>
      </div>
      

    }
    </div>
  );
};

export default ListView;