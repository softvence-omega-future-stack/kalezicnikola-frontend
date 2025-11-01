import React from "react";

import DashboardTopSection from "@/dashboard/components/dashboard/DashboardTopSection";
import AppointmentsList from "@/dashboard/components/dashboard/AppointmentSidebar";
import SummaryCards from "@/dashboard/components/dashboard/SubHeader";
import DashboardCalender from "@/dashboard/components/dashboard/DashboardCalender";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen   ">
    
      <div className="mb-8 ">
        <DashboardTopSection />
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-[10px]">
      
        <div className="lg:col-span-1">
          <AppointmentsList />
        </div>

    
        <div className="lg:col-span-2 space-y-1">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Calendar */}
          <DashboardCalender />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
