import { useTranslation } from "react-i18next";

interface AppointmentType {
  type: string;
  date: string;
  time: string;
  status: "Upcoming" | "Complete" | string;
}

const Appointment = () => {
  const { t } = useTranslation();

  // Get appointments dynamically from i18n JSON
  const appointments: AppointmentType[] = (() => {
    const data = t(
      "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.list",
      { returnObjects: true }
    );
    return Array.isArray(data) ? data : [];
  })();

  const title = t(
    "dashboard.routes.patients.patientProfile.tabsvalue.patientSummary.appointments.title"
  );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] mb-4">{title}</h2>

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
