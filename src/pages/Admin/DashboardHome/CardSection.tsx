


// import { ArrowUpRight } from "lucide-react";

// const statsCards = [
//   { title: "Total MRR", value: "$284", change: "+12.5%", color: "#D0E1F5" },
//   { title: "New MRR", value: "$184", change: "+12.5%", color: "#FADACA" },
//   { title: "Churn MRR", value: "$54", change: "+12.5%", color: "#F5DFF1" },
//   { title: "Net Expansion MRR", value: "$284", change: "+12.5%", color: "#CACDFA" },
//   { title: "Customer Churn Rate", value: "$28", change: "+12.5%", color: "#D0E1F5" },
// ];

// const StatCard = ({ stat, maskId }: { stat: typeof statsCards[0]; maskId: string }) => {
//   const width = 300;
//   const height = 184;

//   return (
//     <div className="relative w-full h-40 sm:h-[170px] md:h-[180px]">
//       {/* SVG background shape */}
//       <svg
//         width="40%"
//         height="100%"
//         viewBox={`0 0 ${width} ${height}`}
//         preserveAspectRatio="none"
//         className="absolute top-0 left-0 w-full h-full"
//       >
//         <defs>
//           <mask id={maskId}>
//             <rect width={width} height={height} rx="24" fill="white" />
//             <path
//               d={`M${width} ${height} C${width} ${height - 20} ${width - 20} ${height - 20} ${width - 20} ${height} Z`}
//               fill="black"
//             />
//             <path
//               d={`M${width} ${height - 64}H${width - 34}C${width - 50.5685} ${height - 64} ${width - 64} ${height - 50.569} ${width - 64} ${height - 34}V${height}H${width}V${height - 90}C${width} ${height - 75.641} ${width - 11.6405} ${height - 64} ${width - 26} ${height - 64}H${width}Z`}
//               fill="black"
//             />
//             <path
//               d={`M${width - 63} ${height}V${height - 26}C${width - 63} ${height - 11.641} ${width - 74.6405} ${height} ${width - 89} ${height}H${width - 63}Z`}
//               fill="black"
//             />
//           </mask>
//         </defs>
//         <rect width={width} height={height} rx="24" fill={stat.color} mask={`url(#${maskId})`} />
//       </svg>

//       {/* Card content */}
//       <div className="absolute top-0 left-0 w-full h-full p-4 md:p-5 flex flex-col justify-between">
//         <div>
//           <p className="text-sm sm:text-base font-semibold text-[#171C35] mb-1 sm:mb-2">
//             {stat.title}
//           </p>
//           <p className="text-2xl sm:text-[28px] md:text-[32px] font-medium text-[#171C35] mb-1">
//             {stat.value}
//           </p>
//           <p className="text-xs sm:text-sm text-[#111A2D]">Last month {stat.change}</p>
//         </div>

//         {/* Bottom-right arrow */}
//         <div className="absolute bottom-3 md:bottom-2 right-3 sm:-right-2 md:right-1 lg:-right-4 xl:right-2 transition-all duration-200">
//           <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-black text-white rounded-full flex items-center justify-center shadow-md">
//             <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CardHeader = () => {
//   return (
//     <div className="py-4">
//       {/* Responsive grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 sm:pr-8">
//         {statsCards.map((stat, index) => (
//           <StatCard key={index} stat={stat} maskId={`statCardMask${index}`} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardHeader;


import { ArrowUpRight } from "lucide-react";

const statsCards = [
  { title: "Total MRR", value: "$284", change: "+12.5%", color: "#D0E1F5" },
  { title: "New MRR", value: "$184", change: "+12.5%", color: "#FADACA" },
  { title: "Churn MRR", value: "$54", change: "+12.5%", color: "#F5DFF1" },
  { title: "Net Expansion MRR", value: "$284", change: "+12.5%", color: "#CACDFA" },
  { title: "Customer Churn Rate", value: "$28", change: "+12.5%", color: "#D0E1F5" },
];

// FIXED cutout dimensions
const cutoutWidth = 48;
const cutoutHeight = 52;
const curveRadius = 20;
const smallCurveRadius = 20;

const StatCard = ({ stat }: { stat: typeof statsCards[0] }) => {
  return (
    <div className="relative w-full h-[180px]">
      {/* Background with fixed cutout using CSS */}
      <div 
        className="absolute inset-0 rounded-[24px]"
        style={{ backgroundColor: stat.color }}
      >
        {/* Fixed size cutout container - positioned from BOTTOM-RIGHT */}
        <div 
          className="absolute bottom-0 right-0"
          style={{
            width: cutoutWidth + curveRadius,
            height: cutoutHeight + curveRadius,
          }}
        >
          {/* Main cutout */}
          <div 
            className="absolute bottom-0 right-0 bg-[#F3F6F6]"
            style={{
              width: cutoutWidth,
              height: cutoutHeight,
              borderTopLeftRadius: curveRadius,
            }}
          />
          
          {/* Top curve connector */}
          <div 
            className="absolute right-0 bg-[#F3F6F6]"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              bottom: cutoutHeight,
            }}
          />
          <div 
            className="absolute right-0"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              bottom: cutoutHeight,
              backgroundColor: stat.color,
              borderBottomRightRadius: smallCurveRadius,
            }}
          />
          
          {/* Left curve connector */}
          <div 
            className="absolute bottom-0 bg-[#F3F6F6]"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              right: cutoutWidth,
            }}
          />
          <div 
            className="absolute bottom-0"
            style={{
              width: smallCurveRadius,
              height: smallCurveRadius,
              right: cutoutWidth,
              backgroundColor: stat.color,
              borderBottomRightRadius: smallCurveRadius,
            }}
          />
        </div>
      </div>

      {/* Card content */}
      <div className="relative w-full h-full p-5 flex flex-col justify-between">
        {/* Title at top */}
        <p className="text-base font-semibold text-[#171C35]">
          {stat.title}
        </p>

        {/* Amount and Last month at bottom */}
        <div className="pb-2">
          <p className="text-[32px] font-medium text-[#171C35] leading-none mb-1">
            {stat.value}
          </p>
          <p className="text-sm text-[#111A2D]">Last month {stat.change}</p>
        </div>

        {/* FIXED position arrow button */}
        <div
          className="absolute"
          style={{
            bottom: 6,
            right: 6,
          }}
        >
          <div className="h-9 w-9 bg-black text-white rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardSection = () => {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
        {statsCards.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
};

export default CardSection;