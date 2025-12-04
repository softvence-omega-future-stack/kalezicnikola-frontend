import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const patients = [
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' }
  ];

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
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm">{patient.id}</td>

                  <td className="px-6 py-4 text-sm text-[#171C35]">
                    {patient.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#171C35]">
                    {patient.phone}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#171C35]">
                    {patient.date}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                      className="flex items-center gap-1 text-lg font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      {t('dashboard.routes.patients.listView.table.view')}
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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
