import { ArrowUpRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/hook";

interface SummaryCard {
  title: string;
  date?: string;
  count?: string;
  type?: string;
  detail: string;
  bgColor: string;
  tabKey?: string; // Changed from 'tab' to 'tabKey' for clarity
  route?: string;
  navigationType: "tab" | "route";
}

export interface Appointment {
  type: string;
  date: string;
  time: string;
  status: "Upcoming" | "Complete" | string;
}

export default function PatientSummary() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Safe translation helper
  const safeT = (key: string) => t(key) || "";

  const summaryCards: SummaryCard[] = [
    {
      title: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.nextAppointment.title"),
      date: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.nextAppointment.date"),
      detail: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.nextAppointment.detailTime"),
      bgColor: "#EDF0FF",
      tabKey: "appointment", // Using the correct key from parent component
      navigationType: "tab",
    },
    {
      title: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.activeMedications.title"),
      count: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.activeMedications.count"),
      detail: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.activeMedications.lastUpdated"),
      bgColor: "#EDF0FF",
      tabKey: "prescriptions", // Using the correct key from parent component
      navigationType: "tab",
    },
    {
      title: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.recentLabResults.title"),
      type: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.recentLabResults.type"),
      detail: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.recentLabResults.date"),
      bgColor: "#EDF0FF",
      tabKey: "labResults", // Using the correct key from parent component
      navigationType: "tab",
    },
    {
      title: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.recentCall.title"),
      count: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.recentCall.callType"),
      detail: safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.summaryCards.recentCall.callDuration"),
      bgColor: "#EDF0FF",
      route: "/dashboard/call_logs",
      navigationType: "route",
    },
  ];

  // Safe appointments
  // const appointments: Appointment[] = (() => {
  //   const data = t("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.list", { returnObjects: true });
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

          const transformedAppointments: Appointment[] = patientAppointments.map((apt: any) => ({
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

  const handleCardClick = (card: SummaryCard) => {
    if (card.navigationType === "route" && card.route) {
      navigate(card.route);
    } else if (card.navigationType === "tab" && card.tabKey) {
      // Navigate to the patient profile page with the correct tab key
      navigate(`/dashboard/patients/${id}?tab=${card.tabKey}`);
    }
  };

  const cutoutWidth = 50;
  const cutoutHeight = 50;
  const curveRadius = 20;
  const smallCurveRadius = 20;

  const Card = ({ card }: { card: SummaryCard }) => (
    <div 
      style={{ fontFamily: 'Urbanist, sans-serif' }} 
      className="relative w-full min-h-[180px] cursor-pointer"
      onClick={() => handleCardClick(card)}
    >
      <div className="absolute inset-0 rounded-[24px]" style={{ backgroundColor: card.bgColor }}>
        <div className="absolute top-0 right-0" style={{ width: cutoutWidth + curveRadius, height: cutoutHeight + curveRadius }}>
          <div className="absolute top-0 right-0 bg-white" style={{ width: cutoutWidth, height: cutoutHeight, borderBottomLeftRadius: curveRadius }} />
          <div className="absolute right-0 bg-white" style={{ width: smallCurveRadius, height: smallCurveRadius, top: cutoutHeight }} />
          <div className="absolute right-0" style={{ width: smallCurveRadius, height: smallCurveRadius, top: cutoutHeight, backgroundColor: card.bgColor, borderTopRightRadius: smallCurveRadius }} />
          <div className="absolute top-0 bg-white" style={{ width: smallCurveRadius, height: smallCurveRadius, right: cutoutWidth }} />
          <div className="absolute top-0" style={{ width: smallCurveRadius, height: smallCurveRadius, right: cutoutWidth, backgroundColor: card.bgColor, borderTopRightRadius: smallCurveRadius }} />
        </div>
      </div>

      <div className="relative w-full h-full p-6 flex flex-col justify-between min-h-[180px]">
        <div>
          <h3 className="text-sm lg:text-lg font-semibold text-[#171C35] mb-5 lg:mb-1 xl:mt-5 2xl:mb-13">{card.title}</h3>
          <p className="text-xs md:text-sm font-medium text-[#111A2D99]">{card.date || card.count || card.type}</p>
          <p className="text-sm font-semibold text-[#171C35] mt-2">{card.detail}</p>
        </div>

        <div 
          className="absolute hover:scale-110 transition-transform" 
          style={{ top: 6, right: 6 }}
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick(card);
          }}
        >
          <div className="h-9 w-9 bg-[#171C35] rounded-full flex items-center justify-center">
            <ArrowUpRight className="text-white w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-base font-semibold text-[#171C35] mb-1">{safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.title")}</h1>
        <p className="text-base font-medium text-[#111A2D]">{safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.description")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => <Card key={index} card={card} />)}
      </div>

      <div className="rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-[#171C35] mb-4">{safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.title")}</h2>
        {
          loading ? (
            <p className="text-base text-[#111A2D] text-center">Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="text-base text-[#111A2D]">{safeT("dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.noAppointments")}</p>
          ) : null
        }
        <div className="space-y-3">
          {appointments.map((apt, index) => (
            <div key={index} className="py-3 bg-[#FAFAFA] border-b px-3 border-gray-100 last:border-0 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-base font-semibold text-[#171C35]">{apt.type}</span>
                <div className="flex items-center gap-3 mt-1 text-sm text-[#111A2D]">
                  <div className="flex items-center gap-1.5">
                    <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" className="h-3 w-3" alt="" />
                    <span className="text-sm font-normal">{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img src="https://i.ibb.co.com/TxG7Rk1Q/clock.png" className="h-3 w-3" alt="" />
                    <span className="text-sm font-normal">{apt.time}</span>
                  </div>
                </div>
              </div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-[8px] w-fit ${apt.status === "Upcoming" ? "bg-[#0040FF1A] text-[#0040FF]" : "bg-[#0080801A] text-[#008080]"}`}>
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}