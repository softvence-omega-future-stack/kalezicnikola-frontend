import { ArrowDownRight } from "lucide-react";



// CommonSpace Component
const CommonSpace = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`w-full pb-6 pt-6 md:pt-10 ${className}`}>
      {children}
    </div>
  );
};

const statsCards = [
  {
    title: "Total Customers",
    subtitle: "Manage Doctor subscription",
    value: "15",
    bgColor: "#E5DFF5",
  },
  {
    title: "Active",
    subtitle: "Manage Doctor subscription",
    value: "10",
    bgColor: "#D0E1F5",
  },
  {
    title: "Trial",
    subtitle: "Manage Doctor subscription",
    value: "5",
    bgColor: "#FADACA",
  },
  {
    title: "Active MRR",
    subtitle: "Manage Doctor subscription",
    value: "$150",
    bgColor: "#E5DFF5",
  },
];

const StatsCard = ({ card, maskId }: { card: (typeof statsCards)[0]; maskId: string }) => {
  const width = 270;
  const height = 150;

  return (
    <div 
      className="relative flex-1  m-1" 
      style={{ height: `${height}px` }}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            <rect width={width} height={height} rx="16" fill="white" />
            {/* Right side bottom cutouts */}
            <path d={`M${width} ${height} C${width} ${height - 15} ${width - 15} ${height - 15} ${width - 15} ${height} Z`} fill="black" />
            <path d={`M${width} ${height - 48}H${width - 26}C${width - 38.3} ${height - 48} ${width - 48} ${height - 38.3} ${width - 48} ${height - 26}V${height}H${width}V${height - 68}C${width} ${height - 57.2} ${width - 8.8} ${height - 48} ${width - 19.5} ${height - 48}H${width}Z`} fill="black"/>
            <path d={`M${width - 47} ${height}V${height - 20}C${width - 47} ${height - 8.8} ${width - 56.3} ${height} ${width - 67} ${height}H${width - 47}Z`} fill="black"/>
          </mask>
        </defs>
        <rect width={width} height={height} rx="16" fill={card.bgColor} mask={`url(#${maskId})`} />
      </svg>

      {/* Content overlay */}
      <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-lg font-semibold text-subHeadingBlack mb-1">{card.title}</h3>
          {/* Subtitle */}
          <p className="text-sm text-subHeadingBlack opacity-70 ">{card.subtitle}</p>
        </div>

        {/* Value */}
        <div className="mb-2">
          <span className="text-3xl font-medium text-subHeadingBlack">{card.value}</span>
        </div>

        {/* Bottom-right arrow button */}
        <div className="absolute  bottom-1 right-4">
          <button className="h-9 w-9 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer">
            <ArrowDownRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomerCard = () => {
  return (
    <CommonSpace className="">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {statsCards.map((card, index) => (
            <StatsCard key={index} card={card} maskId={`statsMask${index}`} />
          ))}
        </div>
      </div>
    </CommonSpace>
  );
};

export default CustomerCard;