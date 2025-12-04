import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CommonSpace from "@/common/space/CommonSpace";

import arrowRight from "../../../assets/svgIcon/arrowRight.svg";
import unredview1 from "../../../assets/svgIcon/unredviewcard1.svg";
import unredview2 from "../../../assets/svgIcon/unredviewcard2.svg";
import unredview3 from "../../../assets/svgIcon/unredviewcard3.svg";

interface Category {
  titleKey: string;
  descriptionKey?: string;
  bgColor: string;
  avatars?: string[];
  extraCount?: string;
  mainNumber?: number;
  path: string;
}

const Card = ({
  category,
  className,
  index,
  height,
}: {
  category: Category;
  maskId: string;
  className: string;
  index: number;
  height?: number;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const defaultHeight = height || 150;
  
  const cutoutWidth = index === 0 ? 40 : 40;
  const cutoutHeight = index === 0 ? 40 : 40;
  const curveRadius = index === 0 ? 20 : 20;
  const smallCurveRadius = index === 0 ? 20 : 20;

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ height: defaultHeight }}
    >
      {/* Background with fixed cutout using CSS */}
      <div 
        className="absolute inset-0 rounded-[20px]"
        style={{ 
          backgroundColor: category.bgColor,
        }}
      >
        {/* Fixed size cutout container - positioned from bottom-right */}
        <div 
          className="absolute bottom-0 right-0"
          style={{
            width: cutoutWidth + curveRadius,
            height: cutoutHeight + curveRadius,
          }}
        >
          {/* Main cutout - background color to "cut" the card */}
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
              backgroundColor: category.bgColor,
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
              backgroundColor: category.bgColor,
              borderBottomRightRadius: smallCurveRadius,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-full p-5 flex flex-col justify-between">
        {/* Title - Top e thakbe */}
        <div>
          <h3 className="text-base font-medium text-[#171C35]">
            {t(category.titleKey)}
          </h3>
        </div>

        {/* Content - Bottom e thakbe with proper spacing */}
        <div className="pb-2">
          {category.avatars ? (
            <div className="flex items-center gap-3 pr-12">
              {/* Avatar section */}
              <div className="flex -space-x-3 items-center shrink-0">
                {category.avatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    src={avatar}
                    alt=""
                  />
                ))}
                {category.extraCount && (
                  <div className="h-10 w-10 bg-gray-900 text-white rounded-full border-2 border-white flex items-center justify-center text-sm font-medium">
                    {category.extraCount}
                  </div>
                )}
              </div>

              {/* Description */}
              {category.descriptionKey && (
                <p className="text-[#171C35] text-sm font-medium leading-snug min-w-[80px]">
                  {t(category.descriptionKey)}
                </p>
              )}
            </div>
          ) : (
            <div className="pr-12">
              {category.mainNumber && (
                <span className="text-5xl font-medium text-[#171C35]">
                  {category.mainNumber}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Arrow button - Bottom-right corner e */}
        <div className="absolute bottom-0 right-0">
          <div 
            onClick={() => navigate(category.path)}
            className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer"
          >
            <img src={arrowRight} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = () => {
  const firstCardRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      titleKey: "dashboard.routes.dashboard.cards.unreviewedCalls.title",
      descriptionKey: "dashboard.routes.dashboard.cards.unreviewedCalls.description",
      bgColor: "#E5DFF5",
      avatars: [unredview1, unredview2, unredview3],
      extraCount: "6+",
      path: "/dashboard/call_logs",
    },
    {
      titleKey: "dashboard.routes.dashboard.cards.tasks.title",
      bgColor: "#D0E1F5",
      mainNumber: 12,
      path: "/dashboard/tasks",  
    },
    {
      titleKey: "dashboard.routes.dashboard.cards.callBack.title",
      bgColor: "#FADACA",
      mainNumber: 7,
      path: "/dashboard/tasks",    
    },
  ];

  return (
    <CommonSpace>
      <div className="-mt-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2.5">
          {categories.map((category, index) => (
            <div
              key={index}
              ref={index === 0 ? firstCardRef : null}
              className={index === 0 ? "col-span-1 lg:col-span-2" : ""}
            >
              <Card
                category={category}
                maskId={`cutoutMask${index}`}
                className=""
                index={index}
                height={150}
              />
            </div>
          ))}
        </div>
      </div>
    </CommonSpace>
  );
};

export default DashboardCard;


// import { useRef } from "react";
// import CommonSpace from "@/common/space/CommonSpace";

// import arrowRight from "../../../assets/svgIcon/arrowRight.svg";
// import unredview1 from "../../../assets/svgIcon/unredviewcard1.svg";
// import unredview2 from "../../../assets/svgIcon/unredviewcard2.svg";
// import unredview3 from "../../../assets/svgIcon/unredviewcard3.svg";
// import topcorner from '../../../assets/topCorner.svg'
// import { ArrowBigLeft } from "lucide-react";
// const categories = [
//   {
//     title: "Unreviewed calls",
//     description: "Lorem Ipsum is simply dummy text of the printing",
//     bgColor: "#E5DFF5",
//     avatars: [unredview1, unredview2, unredview3],
//     extraCount: "6+",
//   },
//   {
//     title: "Task",
//     bgColor: "#D0E1F5",
//     mainNumber: 12,
//   },
//   {
//     title: "Requires a call back",
//     bgColor: "#FADACA",
//     mainNumber: 7,
//   },
// ];

// const Card = ({
//   category,
//   maskId,
//   className,
//   index,
//   height,
// }: {
//   category: (typeof categories)[0];
//   maskId: string;
//   className: string;
//   index: number;
//   height?: number;
// }) => {
//   // Adjust width and height for last 2 cards
//   const width = index === 0 ? 380 : 379; // last 2 cards width reduced by 1px
//   const defaultHeight = 180;
//   const cardHeight = index === 0 ? height || defaultHeight : (height || defaultHeight) - 1; // last 2 cards height -1px

//   return (
//     <div
//       className={`relative w-full max-w-lg mx-auto ${className}`}
//       style={{ height: cardHeight }}
//     >
//       <svg
//         width="100%"
//         height="100%"
//         viewBox={`0 0 ${width} ${defaultHeight}`}
//         preserveAspectRatio="none"
//         className="absolute top-0 left-0 w-full h-full"
//       >
//         <defs>
//           <mask id={maskId}>
//             <rect width={width} height={defaultHeight} rx="20" fill="white" />

//             {/* Bottom right corner */}
//             <path
//               d={`M${width} ${defaultHeight} C${width} ${defaultHeight - 10} ${
//                 width - (index === 0 ? 4 : 6)
//               } ${defaultHeight - 10} ${width - (index === 0 ? 4 : 6)} ${defaultHeight} Z`}
//               fill="black"
//             />

//             {/* Main cutout */}
//             <path
//               d={`M${width} ${defaultHeight - (index === 0 ? 55 : 64)}H${
//                 width - (index === 0 ? 15 : 34)
//               }C${width - (index === 0 ? 23 : 50.5685)} ${
//                 defaultHeight - (index === 0 ? 55 : 64)
//               } ${width - (index === 0 ? 30 : 64)} ${
//                 defaultHeight - (index === 0 ? 45 : 50.569)
//               } ${width - (index === 0 ? 30 : 64)} ${defaultHeight - (index === 0 ? 32 : 34)}V${
//                 defaultHeight
//               }H${width}V${defaultHeight - (index === 0 ? 75 : 90)}C${width} ${
//                 defaultHeight - (index === 0 ? 64 : 75.641)
//               } ${width - (index === 0 ? 4 : 11.6405)} ${
//                 defaultHeight - (index === 0 ? 55 : 64)
//               } ${width - (index === 0 ? 10 : 26)} ${defaultHeight - (index === 0 ? 55 : 64)}H${width}Z`}
//               fill="black"
//             />

//             {/* Left side small cutout */}
//             <path
//               d={`M${width - (index === 0 ? 30 : 63)} ${defaultHeight}V${
//                 defaultHeight - (index === 0 ? 24 : 26)
//               }C${width - (index === 0 ? 30 : 63)} ${
//                 defaultHeight - (index === 0 ? 11 : 11.641)
//               } ${width - (index === 0 ? 38 : 74.6405)} ${defaultHeight} ${
//                 width - (index === 0 ? 48 : 89)
//               } ${defaultHeight}H${width - (index === 0 ? 30 : 63)}Z`}
//               fill="black"
//             />
//           </mask>
//         </defs>
//         <rect
//           width={width}
//           height={defaultHeight}
//           rx="24"
//           fill={category.bgColor}
//           mask={`url(#${maskId})`}
//         />
//       </svg>

//       <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
//         <div>
//           <h3 className="text-base font-medium mb:4 lg:mb-2 xl:mb-2 2xl:mb-14 text-[#171C35]">
//             {category.title}
//           </h3>

//           {category.avatars ? (
//             <div className="flex items-center 2xl:-mt-7 gap-4 w-[75%] flex-wrap">
//               <div className="flex lg:-mt-3 xl:-mt-1 -space-x-3 items-center shrink-0">
//                 {category.avatars.map((avatar, idx) => (
//                   <img
//                     key={idx}
//                     className="h-10 w-10 rounded-full border-2 border-white object-cover"
//                     src={avatar}
//                     alt=""
//                   />
//                 ))}
//                 {category.extraCount && (
//                   <div className="h-10 w-10 bg-gray-900 text-white rounded-full border-2 border-white flex items-center justify-center text-sm font-medium">
//                     {category.extraCount}
//                   </div>
//                 )}
//               </div>

//               <p className="text-[#171C35] text-sm font-medium leading-snug flex-1 md:min-w-[40px] lg:min-w-40 xl:min-w-[100px] 2xl:min-w-[100px]">
//                 {category.description}
//               </p>
//             </div>
//           ) : (
//             <div className="lg:mt-5  xl:align-text-bottom 2xl:-mt-8">
//               {category.mainNumber && (
//                 <span className="text-5xl font-medium text-[#171C35]">
//                   {category.mainNumber}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         <div
//           className={`absolute ${
//             index === 0
//               ? "bottom-2.5 right-1.5 lg:right-0 xl:-right-2 2xl:right-0  2xl:bottom-2"
//               : "bottom-3 right-3 md:bottom-1 md:right-9 lg:right-0 xl:-right-2 2xl:right-0"
//           }`}
//         >
//           <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center">
//             <img src={arrowRight} alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





// const SubHeaderCard = () => {
//   const firstCardRef = useRef<HTMLDivElement>(null);

//   return (
//     <CommonSpace>
//       <div className="-mt-18 px-2.5">

//         <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-3">
//           {categories.map((category, index) => (
//             <div
//               key={index}
//               ref={index === 0 ? firstCardRef : null}
//               className={index === 0 ? "col-span-2" : ""}
//             >
//               <Card
//                 category={category}
//                 maskId={`cutoutMask${index}`}
//                 className=""
//                 index={index}
//                 height={150}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </CommonSpace>
//   );
// };

// export default SubHeaderCard;











// import { useEffect, useRef, useState } from "react";

// Mock images - replace with your actual imports
// const unredview1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234A5568'/%3E%3C/svg%3E";
// const unredview2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%236B7280'/%3E%3C/svg%3E";
// const unredview3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%239CA3AF'/%3E%3C/svg%3E";

// const categories = [
//   {
//     title: "Unreviewed calls",
//     description: "Lorem Ipsum is simply dummy text of the printing",
//     bgColor: "#E5DFF5",
//     avatars: [unredview1, unredview2, unredview3],
//     extraCount: "6+",
//   },
//   {
//     title: "Task",
//     bgColor: "#D0E1F5",
//     mainNumber: 12,
//   },
//   {
//     title: "Requires a call back",
//     bgColor: "#FADACA",
//     mainNumber: 7,
//   },
// ];

// const Card = ({
//   category,
//   maskId,
//   className,
//   index,
//   height,
// }: {
//   category: (typeof categories)[0];
//   maskId: string;
//   className: string;
//   index: number;
//   height?: number;
// }) => {
//   const width = index === 0 ? 760 : 380; // First card is double width
//   const defaultHeight = 180;
//   const cardHeight = height || defaultHeight;

//   return (
//     <div
//       className={`relative w-full max-w-lg mx-auto ${className}`}
//       style={{ height: cardHeight }}
//     >
//       <svg
//         width="100%"
//         height="100%"
//         viewBox={`0 0 ${width} ${defaultHeight}`}
//         preserveAspectRatio="none"
//         className="absolute top-0 left-0 w-full h-full"
//       >
//         <defs>
//           <mask id={maskId}>
//             <rect width={width} height={defaultHeight} rx="24" fill="white" />
//             {/* Bottom right corner - smaller for first card */}
//             <path
//               d={`M${width} ${defaultHeight} C${width} ${
//                 defaultHeight - (index === 0 ? 12 : 18)
//               } ${width - (index === 0 ? 12 : 20)} ${defaultHeight - (index === 0 ? 12 : 18)} ${width - (index === 0 ? 12 : 18)} ${defaultHeight} Z`}
//               fill="black"
//             />
//             {/* Main cutout - smaller for first card */}
//             <path
//               d={`M${width} ${defaultHeight - (index === 0 ? 50 : 64)}H${width - (index === 0 ? 25 : 34)}C${
//                 width - (index === 0 ? 38.807 : 50.5685)
//               } ${defaultHeight - (index === 0 ? 50 : 64)} ${width - (index === 0 ? 50 : 64)} ${
//                 defaultHeight - (index === 0 ? 38.807 : 50.569)
//               } ${width - (index === 0 ? 50 : 64)} ${defaultHeight - (index === 0 ? 25 : 34)}V${defaultHeight}H${width}V${
//                 defaultHeight - (index === 0 ? 70 : 90)
//               }C${width} ${defaultHeight - (index === 0 ? 58.954 : 75.641)} ${width - (index === 0 ? 8.954 : 11.6405)} ${
//                 defaultHeight - (index === 0 ? 50 : 64)
//               } ${width - (index === 0 ? 20 : 26)} ${defaultHeight - (index === 0 ? 50 : 64)}H${width}Z`}
//               fill="black"
//             />
//             {/* Left side small cutout - smaller for first card */}
//             <path
//               d={`M${width - (index === 0 ? 49 : 63)} ${defaultHeight}V${
//                 defaultHeight - (index === 0 ? 20 : 26)
//               }C${width - (index === 0 ? 49 : 63)} ${defaultHeight - (index === 0 ? 8.954 : 11.641)} ${width - (index === 0 ? 57.954 : 74.6405)} ${defaultHeight} ${
//                 width - (index === 0 ? 69 : 89)
//               } ${defaultHeight}H${width - (index === 0 ? 49 : 63)}Z`}
//               fill="black"
//             />
//           </mask>
//         </defs>
//         <rect
//           width={width}
//           height={defaultHeight}
//           rx="24"
//           fill={category.bgColor}
//           mask={`url(#${maskId})`}
//         />
//       </svg>

//       <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
//         <div>
//           <h3 className="text-base font-medium mb-4 lg:mb-2 2xl:mb-14 text-[#171C35]">
//             {category.title}
//           </h3>

//           {category.avatars ? (
//             <div className="flex items-center gap-4 w-[75%] flex-wrap">
//               <div className="flex -space-x-3 items-center flex-shrink-0">
//                 {category.avatars.map((avatar, idx) => (
//                   <img
//                     key={idx}
//                     className="h-10 w-10 rounded-full border-2 border-white object-cover"
//                     src={avatar}
//                     alt=""
//                   />
//                 ))}
//                 {category.extraCount && (
//                   <div className="h-10 w-10 bg-gray-900 text-white rounded-full border-2 border-white flex items-center justify-center text-sm font-medium">
//                     {category.extraCount}
//                   </div>
//                 )}
//               </div>

//               <p className="text-[#171C35] text-sm font-medium leading-snug flex-1 md:min-w-[40px] lg:min-w-40 xl:min-w-[80px]">
//                 {category.description}
//               </p>
//             </div>
//           ) : (
//             <div className="mt-2">
//               {category.mainNumber && (
//                 <span className="text-5xl font-medium text-[#171C35]">
//                   {category.mainNumber}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         <div
//           className={`absolute ${
//             index === 0
//               ? "bottom-2 right-2 2xl:right-8"
//               : "bottom-3 right-3 xl:-right-3 2xl:-right-1"
//           }`}
//         >
//           <div className="h-9 w-9 bg-gray-900 rounded-full flex items-center justify-center">
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M3 13L13 3M13 3H5M13 3V11"
//                 stroke="white"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SubHeaderCard = () => {
//   const firstCardRef = useRef<HTMLDivElement>(null);
//   const [firstCardHeight, setFirstCardHeight] = useState<number>(0);

//   useEffect(() => {
//     if (firstCardRef.current) {
//       setFirstCardHeight(firstCardRef.current.offsetHeight);
//     }
//   }, []);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="-mt-18 px-2.5">
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
//           {categories.map((category, index) => (
//             <div
//               key={index}
//               ref={index === 0 ? firstCardRef : null}
//               className={index === 0 ? "col-span-2" : ""}
//             >
//               <Card
//                 category={category}
//                 maskId={`cutoutMask${index}`}
//                 className=""
//                 index={index}
//                 height={index === 0 ? undefined : firstCardHeight}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubHeaderCard;