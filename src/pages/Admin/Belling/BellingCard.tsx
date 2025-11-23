



// // CommonSpace Component
// const CommonSpace = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
//   return (
//     <div className={`w-full py-6 ${className}`}>
//       {children}
//     </div>
//   );
// };

// const statsCards = [
//   {
//     title: "Total Revenue",
//     value: "$1,847,320",
//     lastMonth: "Last month +18.4%",
//     bgColor: "#E1DCF4",
//   },
//   {
//     title: "Monthly Recurring Revenue",
//     value: "$1,457,320",
//     lastMonth: "Last month +18.4%",
//     bgColor: "#D0E1F5",
//   },
//   {
//     title: "Active Subscriptions",
//     value: "$1,455,320",
//     lastMonth: "Last month +18.4%",
//     bgColor: "#FADACA",
//   },
//   {
//     title: "Pending Invoices",
//     value: "51",
//     lastMonth: "Last month -12.5%",
//     bgColor: "#CACDFA",
//   },
 
// ];

// const StatsCard = ({ card, maskId }: { card: (typeof statsCards)[0]; maskId: string }) => {
//   const width = 270;
//   const height = 150;

//   return (
//     <div 
//       className="relative flex-1  m-1" 
//       style={{ height: `${height}px` }}
//     >
//       <svg
//         width="100%"
//         height={height}
//         viewBox={`0 0 ${width} ${height}`}
//         preserveAspectRatio="none"
//         className="absolute top-0 left-0 w-full h-full"
//       >
//         <defs>
//           <mask id={maskId}>
//             <rect width={width} height={height} rx="16" fill="white" />
//             {/* Right side bottom cutouts */}
//             <path d={`M${width} ${height} C${width} ${height - 15} ${width - 15} ${height - 15} ${width - 15} ${height} Z`} fill="black" />
//             <path d={`M${width} ${height - 48}H${width - 26}C${width - 38.3} ${height - 48} ${width - 48} ${height - 38.3} ${width - 48} ${height - 26}V${height}H${width}V${height - 68}C${width} ${height - 57.2} ${width - 8.8} ${height - 48} ${width - 19.5} ${height - 48}H${width}Z`} fill="black"/>
//             <path d={`M${width - 47} ${height}V${height - 20}C${width - 47} ${height - 8.8} ${width - 56.3} ${height} ${width - 67} ${height}H${width - 47}Z`} fill="black"/>
//           </mask>
//         </defs>
//         <rect width={width} height={height} rx="16" fill={card.bgColor} mask={`url(#${maskId})`} />
//       </svg>

//       {/* Content overlay */}
//       <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-between">
//         <div>
//           {/* Title */}
//           <h3 className="text-lg font-semibold text-[#171C35] mb-1">{card.title}</h3>
//           {/* Subtitle */}
         
//         </div>

//         {/* Value */}
//         <div className="mb-2">
//           <span className="text-3xl font-medium text-[#171C35]">{card.value}</span>
//         </div>
//         <div>
//              <p className="text-sm text-[#111A2D] opacity-70 ">{card.lastMonth}</p>
//         </div>

//         {/* Bottom-right arrow button */}
//         <div className="absolute  bottom-1 right-4">
//           <div className="h-9 w-9 bg-gray-900 rounded-full flex items-center justify-center">
//             {/* <img src={arrowRight} alt="" className="w-4 h-4" /> */}
//             <img src={arrow} alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BellingCard = () => {
//   return (
//     <CommonSpace className="">
//       <div className="">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {statsCards.map((card, index) => (
//             <StatsCard key={index} card={card} maskId={`statsMask${index}`} />
//           ))}
//         </div>
//       </div>
//     </CommonSpace>
//   );
// };

// export default BellingCard;

import arrow from '../../../assets/svgIcon/arrowRight.svg';

// CommonSpace Component
const CommonSpace = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`w-full pt-6 md:pt-10 pb-4 md:pb-6 ${className}`}>
      {children}
    </div>
  );
};

const statsCards = [
  {
    title: "Total Revenue",
    value: "$1,847,320",
    lastMonth: "Last month +18.4%",
    bgColor: "#E1DCF4",
  },
  {
    title: "Monthly Recurring Revenue",
    value: "$1,457,320",
    lastMonth: "Last month +18.4%",
    bgColor: "#D0E1F5",
  },
  {
    title: "Active Subscriptions",
    value: "$1,455,320",
    lastMonth: "Last month +18.4%",
    bgColor: "#FADACA",
  },
  {
    title: "Pending Invoices",
    value: "51",
    lastMonth: "Last month -12.5%",
    bgColor: "#CACDFA",
  },
];

// FIXED cutout dimensions
const cutoutWidth = 42;
const cutoutHeight = 46;
const curveRadius = 20;
const smallCurveRadius = 20;

const StatsCard = ({ card }: { card: (typeof statsCards)[0] }) => {
  return (
    <div className="relative w-full" style={{ height: '150px' }}>
      {/* Background with fixed cutout */}
      <div 
        className="absolute inset-0 rounded-[16px]"
        style={{ backgroundColor: card.bgColor }}
      >
        {/* Fixed size cutout container */}
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
              backgroundColor: card.bgColor,
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
              backgroundColor: card.bgColor,
              borderBottomRightRadius: smallCurveRadius,
            }}
          />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative w-full h-full p-4 flex flex-col justify-between">
        <div>

          <h3 className="text-lg font-semibold text-[#171C35] mb-1">{card.title}</h3>



        </div>

        <div className="mb-2">
          <span className="text-3xl font-medium text-headingBlack">{card.value}</span>
        </div>
        
        <div>

          <p className="text-sm text-[#111A2D] opacity-70">{card.lastMonth}</p>
        </div>

        {/* FIXED position arrow button */}
        <div
          className="absolute"
          style={{
            bottom: 5,
            right: 5,
          }}
        >
          <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center">
            <img src={arrow} alt="" />
          </div>

        </div>
      </div>
    </div>
  );
};

const BillingCard = () => {
  return (
    <CommonSpace className="">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {statsCards.map((card, index) => (
            <StatsCard key={index} card={card} />
          ))}
        </div>
      </div>
    </CommonSpace>
  );
};

export default BillingCard;