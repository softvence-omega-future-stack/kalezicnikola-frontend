import React from "react";

import DashboardTopSection from "@/dashboard/components/dashboard/DashboardTopSection";
import AppointmentsList from "@/dashboard/components/dashboard/AppointmentSidebar";
import SummaryCards from "@/dashboard/components/dashboard/SubHeader";
import DashboardCalender from "@/dashboard/components/dashboard/DashboardCalender";

const Dashboard: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="min-h-screen   ">
    

      <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="mb-8 ">


      <div className="mb-6 ">

        <DashboardTopSection />
      </div>

   
    <div className="flex flex-col lg:flex-row gap-[10px]">

  {/* LEFT SIDE: Appointments */}
  <div className="w-full lg:w-1/3 pl-3">
    <AppointmentsList />
  </div>

  {/* RIGHT SIDE: SummaryCards + Calendar */}
  <div className="w-full lg:w-2/3 pr-4 space-y-1">
    <SummaryCards />
    <DashboardCalender />
  </div>

</div>

    </div>
    </div>
  );
};

export default Dashboard;
