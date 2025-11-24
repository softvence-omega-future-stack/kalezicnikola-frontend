// import React, { useRef, useState, useEffect } from "react";
// import DashboardTopSection from "@/dashboard/components/dashboard/DashboardTopSection";
// import AppointmentsList from "@/dashboard/components/dashboard/AppointmentSidebar";
// import DashboardCalender from "@/dashboard/components/dashboard/DashboardCalender";
// import DashboardCard from "@/dashboard/components/dashboard/DashboardCard";

// const Dashboard: React.FC = () => {
//   const calendarRef = useRef<HTMLDivElement>(null);
//   const [sidebarHeight, setSidebarHeight] = useState<number>(0);

//   const syncHeight = () => {
//     const calendarHeight = calendarRef.current?.offsetHeight || 0;
//     setSidebarHeight(calendarHeight);
//   };

//   useEffect(() => {
//     syncHeight();
//     window.addEventListener("resize", syncHeight);
//     return () => window.removeEventListener("resize", syncHeight);
//   }, []);

//   return (
//     <div className="min-h-screen -ml-4 px-2 md:px-0">
//       <div className="mb-8">
//         <div className="mb-6">
//           <DashboardTopSection />
//         </div>

//         <div className="flex flex-col lg:flex-row w-full gap-2.5">
//           {/* LEFT SIDE: Appointments */}
//           <div
//             className="w-full lg:w-1/3 pl-2"
//             style={{ height: sidebarHeight }}
//           >
//             <AppointmentsList />
//           </div>

//           {/* RIGHT SIDE: SummaryCards + Calendar */}
//           <div className="w-full lg:w-2/3 pr-4 space-y-1 pl-2.5 md:pl-0" ref={calendarRef}>
//             <DashboardCard />
//             <DashboardCalender onHeightChange={syncHeight} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useRef, useState, useEffect } from "react";
import DashboardTopSection from "@/dashboard/components/dashboard/DashboardTopSection";
import AppointmentsList from "@/dashboard/components/dashboard/AppointmentSidebar";
import DashboardCalender from "@/dashboard/components/dashboard/DashboardCalender";
import DashboardCard from "@/dashboard/components/dashboard/DashboardCard";

const Dashboard: React.FC = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (leftRef.current) {
        // Left sidebar এর actual height নিলাম
        const leftHeight = leftRef.current.scrollHeight;
        setMinHeight(leftHeight);
      }
    };

    // Initial height set
    updateHeight();

    // Window resize এ update
    window.addEventListener('resize', updateHeight);

    // Content change detect করার জন্য MutationObserver
    const observer = new MutationObserver(updateHeight);
    
    if (leftRef.current) {
      observer.observe(leftRef.current, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }

    // Interval দিয়ে continuously check করি (যদি calendar view change হয়)
    const interval = setInterval(updateHeight, 500);

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen -ml-4 px-2 md:px-0">
      <div className="mb-8">
        <div className="mb-6">
          <DashboardTopSection />
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-2.5">
          {/* LEFT SIDE: Appointments */}
          <div
            ref={leftRef}
            className="w-full lg:w-1/3 pl-2"
          >
            <AppointmentsList />
          </div>

          {/* RIGHT SIDE: SummaryCards + Calendar */}
          <div 
            ref={rightRef}
            className="w-full lg:w-2/3 pr-4 space-y-1 pl-2.5 md:pl-0"
            style={{ minHeight: `${minHeight}px` }}
          >
            <DashboardCard />
            <DashboardCalender />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;