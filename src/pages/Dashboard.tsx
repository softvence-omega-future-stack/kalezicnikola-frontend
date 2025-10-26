import React from "react";

import DashboardTopSection from "@/dashboard/components/dashboard/DashboardTopSection";
import AppointmentsList from "@/dashboard/components/dashboard/AppointmentSidebar";
import SummaryCards from "@/dashboard/components/dashboard/SubHeader";
import DashboardCalender from "@/dashboard/components/dashboard/DashboardCalender";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 lg:px-10">
    
      <div className="mb-8">
        <DashboardTopSection />
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-1">
          <AppointmentsList />
        </div>

    
        <div className="lg:col-span-2 space-y-8">
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
