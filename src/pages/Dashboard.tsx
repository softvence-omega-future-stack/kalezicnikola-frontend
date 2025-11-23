import React from "react";

import DashboardTopSection from "@/dashboard/components/dashboard/DashboardTopSection";
import AppointmentsList from "@/dashboard/components/dashboard/AppointmentSidebar";

import DashboardCalender from "@/dashboard/components/dashboard/DashboardCalender";
import DashboardCard from "@/dashboard/components/dashboard/DashboardCard";

const Dashboard: React.FC = () => {
  return (
    <div  className="min-h-screen -ml-4 px-2 md:px-0 ">
    

      <div  className="mb-8 ">


      <div className="mb-6 ">

        <DashboardTopSection />
      </div>

   
   <div className="flex flex-col lg:flex-row w-full gap-2.5">


  {/* LEFT SIDE: Appointments */}
  <div className="w-full lg:w-1/3 pl-2  ">
    <AppointmentsList />
  </div>

  {/* RIGHT SIDE: SummaryCards + Calendar */}
  <div className="w-full lg:w-2/3 pr-4 space-y-1 pl-2.5 md:pl-0">
   <DashboardCard/>
    <DashboardCalender />
  </div>

</div>

    </div>
    </div>
  );
};

export default Dashboard;
