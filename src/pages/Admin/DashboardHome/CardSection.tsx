import { ArrowDownRight } from "lucide-react";

const statsCards = [
  { title: "Total MRR", value: "$284", change: "+12.5%", color: "#D0E1F5" },
  { title: "New MRR", value: "$184", change: "+12.5%", color: "#FADACA" },
  { title: "Churn MRR", value: "$54", change: "+12.5%", color: "#F5DFF1" },
  { title: "Net Expansion MRR", value: "$284", change: "+12.5%", color: "#CACDFA" },
  { title: "Customer Churn Rate", value: "$28", change: "+12.5%", color: "#D0E1F5" },
];

interface StatCardProps {
  stat: {
    title: string;
    value: string;
    change: string;
    color: string;
  };
  maskId: string;
}

const StatCard = ({ stat, maskId }: StatCardProps) => {
  const width = 300;
  const height = 184;

  return (
    <div className="relative w-full h-[150px] sm:h-[170px]">

      {/* SVG Background */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            <rect width={width} height={height} rx="24" fill="white" />

            {/* mask shapes */}
            <path
              d={`M${width} ${height} C${width} ${height - 20} ${width - 20} ${height - 20} ${width - 20} ${height} Z`}
              fill="black"
            />
            <path
              d={`M${width} ${height - 64}H${width - 34}C${width - 50.5685} ${height - 64} ${width - 64} ${height - 50.569} ${width - 64} ${height - 34}V${height}H${width}V${height - 90}C${width} ${height - 75.641} ${width - 11.6405} ${height - 64} ${width - 26} ${height - 64}H${width}Z`}
              fill="black"
            />
            <path
              d={`M${width - 63} ${height}V${height - 26}C${width - 63} ${height - 11.641} ${width - 74.6405} ${height} ${width - 89} ${height}H${width - 63}Z`}
              fill="black"
            />
          </mask>
        </defs>

        <rect
          width={width}
          height={height}
          rx="24"
          fill={stat.color}
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* Card Content */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between pb-14 z-10">
        <div>
          <p className="text-sm sm:text-base font-semibold text-headingBlack mb-10">
            {stat.title}
          </p>
          <p className="text-3xl sm:text-[36px] font-semibold text-headingBlack leading-none mb-2">
            {stat.value}
          </p>
          <p className="text-xs sm:text-sm text-subHeadingBlack">
            Last month {stat.change}
          </p>
        </div>
      </div>

      {/* Arrow – now clean, spaced and responsive */}
      <button
        aria-label="View details"
        className="
          absolute
          right-5
          bottom-1
          sm:right-3
          sm:bottom-1
          md:right-3
          md:bottom-2
          lg:right-2
          lg:bottom-1
          h-10 w-10 sm:h-12 sm:w-12
          rounded-full
          bg-black text-white
          shadow-md
          flex items-center justify-center
          z-20
          cursor-pointer
        "
      >
        <ArrowDownRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const CardHeader = () => {
  return (
    <div className="pt-6 md:pt-10 pb-4">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
          gap-5
        "
      >
        {statsCards.map((stat, i) => (
          <StatCard key={i} stat={stat} maskId={`statCardMask${i}`} />
        ))}
      </div>
    </div>
  );
};

export default CardHeader;
