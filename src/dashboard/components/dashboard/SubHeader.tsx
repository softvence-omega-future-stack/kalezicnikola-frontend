// import { useRef, } from "react";
// import CommonSpace from "@/common/space/CommonSpace";

// import arrowRight from "../../../assets/svgIcon/arrowRight.svg";
// import unredview1 from "../../../assets/svgIcon/unredviewcard1.svg";
// import unredview2 from "../../../assets/svgIcon/unredviewcard2.svg";
// import unredview3 from "../../../assets/svgIcon/unredviewcard3.svg";

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
//   const width = 380;
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
            
//             {/* Bottom right corner - same width, increased height */}
//             <path
//               d={`M${width} ${defaultHeight} C${width} ${
//                 defaultHeight - (index === 0 ? 10 : 10)
//               } ${width - (index === 0 ? 4 : 6)} ${defaultHeight - (index === 0 ? 10 : 10)} ${
//                 width - (index === 0 ? 4 : 6)
//               } ${defaultHeight} Z`}
//               fill="black"
//             />

//             {/* Main cutout - same width, significantly increased height */}
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

//             {/* Left side small cutout - same width, increased height */}
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
//             <div className="flex items-center 2xl:-mt-7  gap-4 w-[75%] flex-wrap  ">
//               <div className="flex lg:-mt-3 xl:-mt-4  -space-x-3 items-center shrink-0">
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

//               <p className="text-[#171C35] text-sm font-medium leading-snug flex-1 md:min-w-[40px] lg:min-w-40 xl:min-w-[80px] 2xl:min-w[100px] ">
//                 {category.description}
//               </p>
//             </div>
//           ) : (
//             <div className="lg:mt-5 xl:-mt-5">
//               {category.mainNumber && (
//                 <span className="text-5xl font-medium text-[#171C35]">
//                   {category.mainNumber}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         <div
//           className={`absolute  ${
//             index === 0 ? "bottom-2.5 right-1.5 2xl:right-0 2xl:bottom-2" : "bottom-3 right-3 xl:-right-2 2xl:-right-0 "
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
//                 height={index === 150 ? undefined : 150}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </CommonSpace>
//   );
// };

// export default SubHeaderCard;




import { useRef } from "react";
import CommonSpace from "@/common/space/CommonSpace";

import arrowRight from "../../../assets/svgIcon/arrowRight.svg";
import unredview1 from "../../../assets/svgIcon/unredviewcard1.svg";
import unredview2 from "../../../assets/svgIcon/unredviewcard2.svg";
import unredview3 from "../../../assets/svgIcon/unredviewcard3.svg";
// import topcorner from '../../../assets/topCorner.svg'
// import { ArrowBigLeft } from "lucide-react";
const categories = [
  {
    title: "Unreviewed calls",
    description: "Lorem Ipsum is simply dummy text of the printing",
    bgColor: "#E5DFF5",
    avatars: [unredview1, unredview2, unredview3],
    extraCount: "6+",
  },
  {
    title: "Task",
    bgColor: "#D0E1F5",
    mainNumber: 12,
  },
  {
    title: "Requires a call back",
    bgColor: "#FADACA",
    mainNumber: 7,
  },
];

const Card = ({
  category,
  maskId,
  className,
  index,
  height,
}: {
  category: (typeof categories)[0];
  maskId: string;
  className: string;
  index: number;
  height?: number;
}) => {
  // Adjust width and height for last 2 cards
  const width = index === 0 ? 380 : 379; // last 2 cards width reduced by 1px
  const defaultHeight = 180;
  const cardHeight = index === 0 ? height || defaultHeight : (height || defaultHeight) - 1; // last 2 cards height -1px

  return (
    <div
      className={`relative w-full max-w-lg mx-auto ${className}`}
      style={{ height: cardHeight }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${defaultHeight}`}
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            <rect width={width} height={defaultHeight} rx="20" fill="white" />

            {/* Bottom right corner */}
            <path
              d={`M${width} ${defaultHeight} C${width} ${defaultHeight - 10} ${
                width - (index === 0 ? 4 : 6)
              } ${defaultHeight - 10} ${width - (index === 0 ? 4 : 6)} ${defaultHeight} Z`}
              fill="black"
            />

            {/* Main cutout */}
            <path
              d={`M${width} ${defaultHeight - (index === 0 ? 55 : 64)}H${
                width - (index === 0 ? 15 : 34)
              }C${width - (index === 0 ? 23 : 50.5685)} ${
                defaultHeight - (index === 0 ? 55 : 64)
              } ${width - (index === 0 ? 30 : 64)} ${
                defaultHeight - (index === 0 ? 45 : 50.569)
              } ${width - (index === 0 ? 30 : 64)} ${defaultHeight - (index === 0 ? 32 : 34)}V${
                defaultHeight
              }H${width}V${defaultHeight - (index === 0 ? 75 : 90)}C${width} ${
                defaultHeight - (index === 0 ? 64 : 75.641)
              } ${width - (index === 0 ? 4 : 11.6405)} ${
                defaultHeight - (index === 0 ? 55 : 64)
              } ${width - (index === 0 ? 10 : 26)} ${defaultHeight - (index === 0 ? 55 : 64)}H${width}Z`}
              fill="black"
            />

            {/* Left side small cutout */}
            <path
              d={`M${width - (index === 0 ? 30 : 63)} ${defaultHeight}V${
                defaultHeight - (index === 0 ? 24 : 26)
              }C${width - (index === 0 ? 30 : 63)} ${
                defaultHeight - (index === 0 ? 11 : 11.641)
              } ${width - (index === 0 ? 38 : 74.6405)} ${defaultHeight} ${
                width - (index === 0 ? 48 : 89)
              } ${defaultHeight}H${width - (index === 0 ? 30 : 63)}Z`}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width={width}
          height={defaultHeight}
          rx="24"
          fill={category.bgColor}
          mask={`url(#${maskId})`}
        />
      </svg>

      <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-medium mb:4 lg:mb-2 xl:mb-2 2xl:mb-14 text-[#171C35]">
            {category.title}
          </h3>

          {category.avatars ? (
            <div className="flex items-center 2xl:-mt-7 gap-4 w-[75%] flex-wrap">
              <div className="flex lg:-mt-3 xl:-mt-1 -space-x-3 items-center shrink-0">
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

              <p className="text-[#171C35] text-sm font-medium leading-snug flex-1 md:min-w-[40px] lg:min-w-40 xl:min-w-[100px] 2xl:min-w-[100px]">
                {category.description}
              </p>
            </div>
          ) : (
            <div className="lg:mt-5  xl:align-text-bottom 2xl:-mt-8">
              {category.mainNumber && (
                <span className="text-5xl font-medium text-[#171C35]">
                  {category.mainNumber}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={`absolute ${
            index === 0
              ? "bottom-2.5 right-1.5 lg:right-0 xl:-right-2 2xl:right-0  2xl:bottom-2"
              : "bottom-3 right-3 md:bottom-1 md:right-9 lg:right-0 xl:-right-2 2xl:right-0"
          }`}
        >
          <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center">
            <img src={arrowRight} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SubHeaderCard = () => {
  const firstCardRef = useRef<HTMLDivElement>(null);

  return (
    <CommonSpace>
      <div className="-mt-18 px-2.5">

{/* <div className="mb-4">
  <div className="relative w-[200px] h-[118px]">
    <div className="bg-blue-100 w-full h-full rounded-lg"></div>

    <div className="absolute bottom-0 right-0 h-12 w-12 bg-[#F3F6F6] rounded-t-full flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="16" fill="black"/>
        <path d="M12.2426 20.2426L20.7279 11.7574M20.7279 11.7574V20.2426M20.7279 11.7574H12.2426" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
</div> */}


{/* <div className="mb-4">
  <div className="relative w-[200px] h-[118px] overflow-hidden rounded-2xl">
    
   
    <div className="bg-blue-100 w-full h-full"></div>

    
    <div 
      className="
        absolute top-0 left-0 
        h-12 w-12 
        bg-[#F3F6F6] 
        flex items-center justify-center
        rl rounded-2xl
        [clip-path:polygon(0%_100%,_100%_100%,_100%_0%,_0%_0%,_0%_100%)] 
        
        [clip-path:circle(64px_at_100%_100%)]
      "
      style={{ 
    
        clipPath: 'circle(64px at 100% 100%)', 
      
      }}
    >
   
   <div className="relative h-14 w-14 flex items-center justify-center">


  <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center z-10">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" fill="none">
      <path d="M12.2426 20.2426L20.7279 11.7574M20.7279 11.7574V20.2426M20.7279 11.7574H12.2426" 
        stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  </div>


  <img 
    src={topcorner} 
    alt="" 
    className="h-6 w-6 absolute left-0 bottom-0 translate-x-[-40%] translate-y-[40%] rotate-45 z-20"
  />

 
  <img 
    src={topcorner} 
    alt="" 
    className="h-6 w-6 absolute right-0 top-0 translate-x-[40%] translate-y-[-40%] -rotate-45 z-20"
  />

</div>


    </div>
  </div>
</div> */}



        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              ref={index === 0 ? firstCardRef : null}
              className={index === 0 ? "col-span-2" : ""}
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

export default SubHeaderCard;




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