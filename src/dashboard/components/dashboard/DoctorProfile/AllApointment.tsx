import { useAppSelector } from '@/store/hook';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface AppointmentType {
  id: string;
  type: string;
  appointmentDate: string;
  time: string;
  status: "SCHEDULED" | "RESCHEDULED" | "COMPLETED" | "CANCELLED";
}

const AllApointment = () => {
  const { t } = useTranslation();
  // const { id } = useParams<{ id: string }>();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

  // Get appointments dynamically from i18n JSON
  // const appointments: AppointmentType[] = (() => {
  //   const data = t(
  //     "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.list",
  //     { returnObjects: true }
  //   );
  //   return Array.isArray(data) ? data : [];
  // })();
  useEffect(() => {
      const fetchAppointments = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointment/all`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              });

          const allPatient = res.data.data.appointments;
          setAppointments(allPatient);
          // console.log(res.data.data.appointments);
          
        } catch (error:any) {
          toast.error(error.response?.data?.message );
        }
        finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }, [accessToken]);

  return (
  
    <div className="">
      <h3 className="text-2xl font-semibold text-[#171C35] mb-4">
        {t('dashboard.doctorProfile.tabs.allAppointment.title')}
      </h3>
    {
      loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500">No appointments found</p>
        </div>
      ) : (   
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-[#FAFAFA] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-base font-semibold text-[#171c35]">
                  {/* {t(`dashboard.doctorProfile.tabs.allAppointment.types.${apt.type}`)} */}
                  {apt.type}

                </p>
                <div className="flex items-center gap-2 mt-2">
                  <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" className='h-3 w-3' alt="" />
                  <span className="text-[#111A2D] text-sm">{apt.appointmentDate.split("T")[0]}</span>
                  <span className="text-[#111A2D] text-sm flex items-center gap-2">
                    <img src="https://i.ibb.co.com/TxG7Rk1Q/clock.png" alt="" />
                    {apt.time}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                apt.status === 'SCHEDULED'
                  ? 'bg-[#0040FF1A] text-[#0040FF]'
                  : apt.status === 'RESCHEDULED'
                  ? 'bg-[#FFA5001A] text-[#FFA500]'
                  : apt.status === 'COMPLETED'
                  ? 'bg-[#0080801A] text-[#008080]'
                  : 'bg-[#FF4D4D1A] text-[#FF4D4D]'
              }`}
            >
              
              {apt.status}
            </span>
          </div>
        ))}
      </div>

      )
    }

    </div>
  );
};

export default AllApointment;
