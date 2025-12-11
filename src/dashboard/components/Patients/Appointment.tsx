import { useAppSelector } from "@/store/hook";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Appointment } from "./PatientSummery";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface AppointmentType {
  type: string;
  date: string;
  time: string;
  status: "Upcoming" | "Complete" | string;
}

const Appointment = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
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

          const patientAppointments = allPatient.filter((apt: any) => apt.patientId === id);
          console.log(patientAppointments);

          const transformedAppointments: AppointmentType[] = patientAppointments.map((apt: any) => ({
            type: apt.type,
            date: new Date(apt.appointmentDate).toLocaleDateString(),
            time: new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: new Date(apt.appointmentDate) > new Date() ? "Upcoming" : "Complete",
          }));

          setAppointments(transformedAppointments);
-
          console.log(res.data.data.appointments);
        } catch (error:any) {
          toast.error(error.response?.data?.message );
        }
        finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }, [accessToken]);

  const title = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.title"
  );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] mb-4">{title}</h2>
      {
        loading ? (
          <p className="text-base text-[#111A2D] text-center">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-base text-[#111A2D]">{t("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.noAppointments")}</p>
        ) : null
      }
      <div className="space-y-3">
        {appointments.map((apt, index) => (
          <div
            key={index}
            className="py-3 bg-[#FAFAFA] border-b px-3 border-gray-100 
            last:border-0 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Left */}
            <div className="flex flex-col">
              <span className="text-base font-semibold text-[#171C35]">{apt.type}</span>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1.5 text-[#171C35]">
                  <img
                    src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png"
                    className="h-3 w-3"
                    alt="date"
                  />
                  <span className="text-sm">{apt.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[#171C35]">
                  <img
                    src="https://i.ibb.co.com/TxG7Rk1Q/clock.png"
                    className="h-3 w-3"
                    alt="time"
                  />
                  <span className="text-sm">{apt.time}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <span
              className={`mt-3 sm:mt-0 self-start sm:self-auto text-sm font-semibold px-3 py-1 rounded-[8px] ${
                apt.status === "Upcoming"
                  ? "bg-[#0040FF1A] text-[#0040FF]"
                  : "bg-[#0080801A] text-[#008080]"
              }`}
            >
              {apt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
