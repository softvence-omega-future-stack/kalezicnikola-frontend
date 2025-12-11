// ListView.tsx
import { useTranslation } from 'react-i18next';
import PatientActions from './PatinetsActions';


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
}

const ListView = ({ patients, loading, error }: ListViewProps) => {
  const { t } = useTranslation();

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div>
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
                    <PatientActions patientId={patient.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListView;
