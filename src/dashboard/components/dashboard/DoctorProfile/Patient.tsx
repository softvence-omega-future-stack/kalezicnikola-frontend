import { ExternalLink, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAppSelector } from '@/store/hook';
import { toast } from 'react-toastify';

interface PatientType {
  id: string;
  insuranceId: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
}
const Patient = () => {
  const { t } = useTranslation();
  const { accessToken} = useAppSelector((state) => state.auth);
  const [focusedIndex, ] = useState<number | null>(null);
  const [clickedIndex, ] = useState<number | null>(null);
  const navigate = useNavigate();
const [patients, setPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctor/patient/all`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setPatients(response.data.data.patients);
        console.log(response.data.data.patients);
      } catch (error:any) {
        toast.error(error?.response?.data?.message || "No Patients found. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className='bg-white'>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <h3 className="text-lg sm:text-xl tracking-tighter font-semibold text-[#171C35]">
          {t('dashboard.doctorProfile.tabs.patientHistory.title')}
        </h3>
        <button 
          onClick={() => navigate('/dashboard/add-patient')}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-sm text-[#111A2D] font-semibold cursor-pointer bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('dashboard.doctorProfile.tabs.patientHistory.addButton')}</span>
        </button>
      </div>
      {
        loading ? (
          <div className="flex justify-center items-center h-48">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : patients.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500">No patients found</p>
        </div>
      ) : ( 
        <div className="overflow-x-auto rounded-xl bg-white">
          <table className="min-w-[700px] sm:min-w-full w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {Object.entries(t('dashboard.doctorProfile.tabs.patientHistory.tableHeaders', { returnObjects: true })).map(([key, value]) => (
                  <th
                    key={key}
                    className="text-left text-sm font-semibold text-[#171C35] tracking-wider px-6 py-3"
                  >
                    {value}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {patients.map((patient, idx) => (
                <tr key={patient.id} className="transition-colors border-b border-gray-200">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">{patient.insuranceId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">{patient.firstName} {patient.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">{patient.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111A2D]">{patient.createdAt.split("T")[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                      className="flex items-center gap-1 text-sm font-medium text-[#526FFF] cursor-pointer"
                    >
                      {t('dashboard.doctorProfile.tabs.patientHistory.buttons.viewHistory')}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                      className={`px-4 sm:px-6 py-2 text-sm sm:text-sm font-medium rounded-full border transition-colors cursor-pointer ${
                        focusedIndex === idx || clickedIndex === idx
                          ? 'border-[#526FFF] text-[#526FFF]'
                          : 'border-[#111A2D] font-normal'
                      }`}
                    >
                      {t('dashboard.doctorProfile.tabs.patientHistory.buttons.view')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )
      }

    </div>
  );
}

export default Patient;
