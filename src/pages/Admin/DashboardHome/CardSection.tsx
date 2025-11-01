import { ArrowUpRight } from "lucide-react";

const statsCards = [
  { title: "Total MRR", value: "$284", change: "+12.5%", color: "#D0E1F5" },
  { title: "New MRR", value: "$184", change: "+12.5%", color: "#FADACA" },
  { title: "Churn MRR", value: "$54", change: "+12.5%", color: "#F5DFF1" },
  { title: "Net Expansion MRR", value: "$284", change: "+12.5%", color: "#CACDFA" },
  { title: "Customer Churn Rate", value: "$28", change: "+12.5%", color: "#D0E1F5" },
];

const StatCard = ({ stat, maskId }: { stat: typeof statsCards[0]; maskId: string }) => {
  const width = 300;
  const height = 180;

  return (
    <div className="relative w-full h-[180px]">
      {/* SVG cutout background */}
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            <rect width={width} height={height} rx="24" fill="white" />
            {/* Right bottom corner cutouts */}
            <path d={`M${width} ${height} C${width} ${height - 20} ${width - 20} ${height - 20} ${width - 20} ${height} Z`} fill="black" />
            <path d={`M${width} ${height - 64}H${width - 34}C${width - 50.5685} ${height - 64} ${width - 64} ${height - 50.569} ${width - 64} ${height - 34}V${height}H${width}V${height - 90}C${width} ${height - 75.641} ${width - 11.6405} ${height - 64} ${width - 26} ${height - 64}H${width}Z`} fill="black"/>
            <path d={`M${width - 63} ${height}V${height - 26}C${width - 63} ${height - 11.641} ${width - 74.6405} ${height} ${width - 89} ${height}H${width - 63}Z`} fill="black"/>
          </mask>
        </defs>
        <rect width={width} height={height} rx="24" fill={stat.color} mask={`url(#${maskId})`} />
      </svg>

      {/* Card content */}
      <div className="absolute top-0 left-0 w-full h-full p-5 flex flex-col justify-between">
        <div>
          <p className="text-base font-semibold text-[#171C35] mb-2">{stat.title}</p>
          <p className="text-[32px] font-medium text-[#171C35] mb-1">{stat.value}</p>
          <p className="text-sm text-[#111A2D]">Last month {stat.change}</p>
        </div>

        {/* Bottom-right arrow */}
        <div className="absolute bottom-2 right-0">
          <div className="h-12 w-12 bg-black text-white rounded-full flex items-center justify-center shadow-md">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardHeader = () => {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsCards.map((stat, index) => (
          <StatCard key={index} stat={stat} maskId={`statCardMask${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CardHeader;
