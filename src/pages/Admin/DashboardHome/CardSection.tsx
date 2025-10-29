
import { ArrowUpRight } from "lucide-react";

const CardHeader = () => {
  const statsCards = [
    { title: "Total MRR", value: "$284", change: "+12.5%", color: "bg-[#D0E1F5]" },
    { title: "New MRR", value: "$184", change: "+12.5%", color: "bg-[#FADACA]" },
    { title: "Churn MRR", value: "$54", change: "+12.5%", color: "bg-[#F5DFF1]" },
    { title: "Net Expansion MRR", value: "$284", change: "+12.5%", color: "bg-[#CACDFA]" },
    { title: "Customer Churn Rate", value: "$28", change: "+12.5%", color: "bg-[#D0E1F5]" },
  ];

  return (
    <div className="p-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} relative rounded-[20px] p-5 overflow-hidden`}
          >
            <p className="text-base font-semibold text-[#171C35] mb-2">{stat.title}</p>
            <p className="text-[32px] font-medium text-[#171C35] mb-1">{stat.value}</p>
            <p className="text-sm text-[#111A2D">Last month {stat.change}</p>

            {/* 🔹 Floating Arrow Circle (Bottom Right) */}
            <div className="absolute bottom-0 right-0">
              <div className="relative w-[70px] h-[70px] bg-transparent">
                <div className="absolute inset-0 bg-[#F3F6F6] rounded-full translate-x-[25%] translate-y-[25%]"></div>
                <div className="absolute bottom-1 right-2 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center shadow-md">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHeader;