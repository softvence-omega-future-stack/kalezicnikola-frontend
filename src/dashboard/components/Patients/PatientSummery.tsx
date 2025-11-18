import { ArrowUpRight } from "lucide-react";

export default function PatientSummary() {
  const summaryCards = [
    {
      title: "Next Appointment",
      date: "April 20, 2024",
      detail: "1:30 PM - Check-up",
      bgColor: "#EDF0FF",
    },
    {
      title: "Active Medications",
      count: "3 Active Prescriptions",
      detail: "Last updated: Feb 3, 2024",
      bgColor: "#EDF0FF",
    },
    {
      title: "Recent Lab Results",
      type: "Comprehensive Metabolic Panel",
      detail: "January 20, 2024",
      bgColor: "#EDF0FF",
    },
    {
      title: "Recent Call",
      type: "Call Type: Follow-up",
      detail: "Call Duration: 01h 45min",
      bgColor: "#EDF0FF",
    },
  ];

  const appointments = [
    { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Upcoming" },
    { type: "Follow-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
    { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
    { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
    { type: "Check-up", date: "27-09-2025", time: "01:00 AM", status: "Complete" },
  ];

  const Card = ({ card, maskId }: { card: (typeof summaryCards)[0]; maskId: string }) => {
    const width = 380;
    const height = 180;

    return (
   <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="relative w-full min-h-[180px] aspect-[380/180] max-w-lg mx-auto">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            {/* White rectangle covers the entire card area */}
            <rect width={width} height={height} rx="24" fill="white" />
            
    
            <path
              d={`M${width} 0 C${width} 20 ${width - 20} 20 ${width - 20} 0 Z`}
              fill="black"
            />
            
  
            <path
              d={`M${width} 64H${width - 34}C${width - 50.5685} 64 ${width - 64} 50.569 ${width - 64} 34V0H${width}V90C${width} 75.641 ${width - 11.6405} 64 ${width - 26} 64H${width}Z`}
              fill="black"
            />
            
      
            <path
              d={`M${width - 63} 0V26C${width - 63} 11.641 ${width - 74.6405} 0 ${width - 89} 0H${width - 63}Z`}
              fill="black"
            />
          </mask>
        </defs>
        
        {/* The card fill uses the mask */}
        <rect
          width={width}
          height={height}
          rx="24"
          fill={card.bgColor}
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* Content Area */}
      <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#171C35] mb-5 lg:mb-1 xl:mb-13">{card.title}</h3>
          <p className="text-sm font-medium text-[#111A2D99]">
            {card.date || card.count || card.type}
          </p>
          <p className="text-sm font-semibold text-[#171C35] mt-2">{card.detail}</p>
        </div>

     
        <div className="absolute top-2 right-0">

          <div className="h-8 w-8 md:h-12 md:w-12 bg-[#171C35] rounded-full flex items-center justify-center transition-all duration-300">
         
            <ArrowUpRight className="text-white w-4 h-4 md:w-5 md:h-5" />
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <Card key={index} card={card} maskId={`summaryMask${index}`} />
        ))}
      </div>

      {/* Appointments Section */}
      <div className="rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-[#171C35] mb-4">Appointments</h2>
        <div className="space-y-3">
          {appointments.map((apt, index) => (
            <div
              key={index}
              className="py-3 bg-[#FAFAFA] border-b px-2 border-gray-100 last:border-0 rounded-2xl flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold text-[#171C35]">{apt.type}</span>
                <div className="flex items-center gap-3 mt-1 text-sm text-[#111A2D]">
                  <div className="flex items-center gap-1.5 text-sm text-[#111A2D]">
                    <img
                      src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png"
                      className="h-3 w-3"
                      alt=""
                    />
                    <span className="text-sm font-normal">{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#111A2D]">
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
                className={`text-sm font-semibold px-3 py-1 rounded-[8px] ${
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
