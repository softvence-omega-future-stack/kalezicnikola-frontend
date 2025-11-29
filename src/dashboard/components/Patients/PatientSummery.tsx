import { ArrowUpRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PatientSummary() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const summaryCards = [
      {
        title: "Next Appointment",
        date: "April 20, 2024",
        detail: "1:30 PM - Check-up",
        bgColor: "#EDF0FF",
        tab: "Appointment",
        navigationType: "tab", // tab navigation
      },
      {
        title: "Active Medications",
        count: "3 Active Prescriptions",
        detail: "Last updated: Feb 3, 2024",
        bgColor: "#EDF0FF",
        tab: "Prescriptions",
        navigationType: "tab", // tab navigation
      },
      {
        title: "Recent Lab Results",
        type: "Comprehensive Metabolic Panel",
        detail: "January 20, 2024",
        bgColor: "#EDF0FF",
        tab: "Lab Results",
        navigationType: "tab", // tab navigation
      },
      {
        title: "Recent Call",
        count: "Call Type: Follow-up",
        detail: "Call Duration: 01h 45min",
        bgColor: "#EDF0FF",
        route: "/dashboard/call_logs", // external route
        navigationType: "route", // route navigation
      },
    ];

    const appointments = [
      { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Upcoming" },
      { type: "Follow-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
      { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
      { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
      { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
    ];

    // Navigation handler - tab এবং route উভয় support করে
    const handleCardClick = (card: typeof summaryCards[0]) => {
      if (card.navigationType === "route" && card.route) {
        // External route এ navigate করো
        navigate(card.route);
      } else if (card.navigationType === "tab" && card.tab) {
        // Same page এর tab এ navigate করো
        navigate(`/dashboard/patients/${id}?tab=${encodeURIComponent(card.tab)}`);
      }
    };

    const cutoutWidth = 50;
    const cutoutHeight = 50;
    const curveRadius = 20;
    const smallCurveRadius = 20;

    const Card = ({ card }: { card: (typeof summaryCards)[0] }) => {
      return (
        <div 
          style={{ fontFamily: 'Urbanist, sans-serif' }} 
          className="relative w-full min-h-[180px]"
        >
          <div 
            className="absolute inset-0 rounded-[24px]"
            style={{ backgroundColor: card.bgColor }}
          >
            <div 
              className="absolute top-0 right-0"
              style={{
                width: cutoutWidth + curveRadius,
                height: cutoutHeight + curveRadius,
              }}
            >
              <div 
                className="absolute top-0 right-0 bg-white"
                style={{
                  width: cutoutWidth,
                  height: cutoutHeight,
                  borderBottomLeftRadius: curveRadius,
                }}
              />
              
              <div 
                className="absolute right-0 bg-white"
                style={{
                  width: smallCurveRadius,
                  height: smallCurveRadius,
                  top: cutoutHeight,
                }}
              />
              <div 
                className="absolute right-0"
                style={{
                  width: smallCurveRadius,
                  height: smallCurveRadius,
                  top: cutoutHeight,
                  backgroundColor: card.bgColor,
                  borderTopRightRadius: smallCurveRadius,
                }}
              />
              
              <div 
                className="absolute top-0 bg-white"
                style={{
                  width: smallCurveRadius,
                  height: smallCurveRadius,
                  right: cutoutWidth,
                }}
              />
              <div 
                className="absolute top-0"
                style={{
                  width: smallCurveRadius,
                  height: smallCurveRadius,
                  right: cutoutWidth,
                  backgroundColor: card.bgColor,
                  borderTopRightRadius: smallCurveRadius,
                }}
              />
            </div>
          </div>

          <div className="relative w-full h-full p-6 flex flex-col justify-between min-h-[180px]">
            <div>
              <h3 className="text-sm lg:text-lg font-semibold text-[#171C35] mb-5 lg:mb-1 xl:mt-5 2xl:mb-13">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm font-medium text-[#111A2D99]">
                {card.date || card.count || card.type}
              </p>
              <p className="text-sm font-semibold text-[#171C35] mt-2">{card.detail}</p>
            </div>

            <div
              className="absolute cursor-pointer hover:scale-110 transition-transform"
              style={{
                top: 6,
                right: 6,
              }}
              onClick={() => handleCardClick(card)}
            >
              <div className="h-9 w-9 bg-[#171C35] rounded-full flex items-center justify-center">
                <ArrowUpRight className="text-white w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-base font-semibold text-[#171C35] mb-1">Patient Summary</h1>
          <p className="text-base font-medium text-[#111A2D]">
            Overview of patient's health status and recent activities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>

        <div className="rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-[#171C35] mb-4">Appointments</h2>
          <div className="space-y-3">
            {appointments.map((apt, index) => (
              <div
                key={index}
                className="py-3 bg-[#FAFAFA] border-b px-3 border-gray-100 
                last:border-0 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#171C35]">{apt.type}</span>
                  <div className="flex items-center gap-3 mt-1 text-sm text-[#111A2D]">
                    <div className="flex items-center gap-1.5">
                      <img
                        src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png"
                        className="h-3 w-3"
                        alt=""
                      />
                      <span className="text-sm font-normal">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <img
                        src="https://i.ibb.co.com/TxG7Rk1Q/clock.png"
                        className="h-3 w-3"
                        alt=""
                      />
                      <span className="text-sm font-normal">{apt.time}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-[8px] w-fit ${
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
      </div>
    );
}