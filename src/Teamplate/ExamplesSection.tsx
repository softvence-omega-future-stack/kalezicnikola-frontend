// import React, { useState, useEffect, useRef } from "react";
// import { Play, Pause } from "lucide-react";
// import icon from "../assets/svgIcon/herologo.svg";
// import skipleft from "../assets/svgIcon/voiceskipLeft.svg";
// import skipRight from "../assets/svgIcon/voiceskipRight.svg";
// import speaker from "../assets/svgIcon/speaker.svg";
// import borderIcon from "../assets/svgIcon/BorderPlay.svg";
// import roundactiveImg from "../assets/svgIcon/activerecord.svg";
// import roundImg from "../assets/svgIcon/recordbtnborder.svg";
// import './buttom.css'
// import SectionHeader from "./SectionHeader";

// const SvgPlayIcon = ({ fill = "#526FFF", size = 20, className = "" }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 32 32"
//     fill="none"
//     className={className}
//   >
//     <mask
//       id="mask0_2987_5353"
//       style={{ maskType: "luminance" }}
//       maskUnits="userSpaceOnUse"
//       x="1"
//       y="1"
//       width="30"
//       height="30"
//     >
//       <path
//         d="M15.9974 29.3327C23.3614 29.3327 29.3307 23.3633 29.3307 15.9993C29.3307 8.63535 23.3614 2.66602 15.9974 2.66602C8.6334 2.66602 2.66406 8.63535 2.66406 15.9993C2.66406 23.3633 8.6334 29.3327 15.9974 29.3327Z"
//         fill="white"
//         stroke="white"
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M13.3281 15.9995V11.3809L17.3281 13.6902L21.3281 15.9995L17.3281 18.3089L13.3281 20.6182V15.9995Z"
//         fill="black"
//         stroke="black"
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />
//     </mask>
//     <g mask="url(#mask0_2987_5353)">
//       <path d="M0 0H32V32H0V0Z" fill={fill} />
//     </g>
//   </svg>
// );

// const ExampleSection: React.FC = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(33);
//   const totalDuration = 100;
//   const [activeAudioIndex, setActiveAudioIndex] = useState<number>(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const menuItems = [
//     { title: "Lectures & Training", subtitle: "Orthopedics Dr. Gruber" },
//     {
//       title: "Appointment Rescheduling/Cancellation",
//       subtitle: "Dental Practice Dr. Meier",
//     },
//     { title: "Insurance Questions", subtitle: "Physiotherapy Dr. Fuchs" },
//     {
//       title: "Booking a Preventive Appointment",
//       subtitle: "General Practice Dr. Koch",
//     },
//     { title: "Request for Referrals", subtitle: "Dermatology Dr. Wagner" },
//   ];

//   const waveSegments = [
//     { height: 45, time: "0:00" },
//     { height: 45, time: "0:30" },
//     { height: 45, time: "1:00" },
//     { height: 45, time: "1:30" },
//     { height: 45, time: "2:00" },
//     { height: 45, time: "2:30" },
//   ];

//   const handlePlayListItem = (index: number) => {
//     if (activeAudioIndex === index) {
//       setIsPlaying((prev) => !prev);
//     } else {
//       setActiveAudioIndex(index);
//       setIsPlaying(true);
//       setCurrentTime(0);

//       // scroll active item to top
//       setTimeout(() => {
//         const container = containerRef.current;
//         if (container) {
//           const item = container.querySelectorAll(".menu-item")[index] as HTMLElement;
//           if (item) {
//             item.scrollIntoView({ behavior: "smooth", block: "start" });
//           }
//         }
//       }, 100);
//     }
//   };

//   useEffect(() => {
//     if (isPlaying) {
//       const interval = setInterval(() => {
//         setCurrentTime((prev) => {
//           if (prev >= 100) {
//             setIsPlaying(false);
//             return 0;
//           }
//           return prev + 0.5;
//         });
//       }, 100);
//       return () => clearInterval(interval);
//     }
//   }, [isPlaying]);

//   return (
//     <div
//       style={{ fontFamily: "Urbanist, sans-serif" }}
//       className=" px-9 mt-16 md:mt-[180px] lg:mt-[180px] xl:mt-[180px] md:px-8 "
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-20">
//         <SectionHeader
//           badgeIcon={icon}
//           badgeText=" Real Examples"
//           heading={
//             <>
//               This is what Docline sounds  like
//               in everyday practice
//             </>
//           }
//           subText="Your patients will hardly notice the difference. Easily adapt the AI assistant's voice to your practice's style. Choose a confident male or female voice. This ensures a smooth and professional reception for every call."
//           align="left"
//           subAlign="left"
//         />

//         {/* Right Section */}
//         <div className="w-full" ref={containerRef}>
//           <div className="-space-y-1 -mt-5">
//             {menuItems.map((item, index) => {
//               const isThisItemActive = activeAudioIndex === index;
//               const isThisItemPlaying = isThisItemActive && isPlaying;

//               return (
//                 <div key={index} className="relative overflow-visible menu-item">
//                   <div
//                     className="absolute inset-0 rounded-[24px] pointer-events-none"
//                     style={{
//                       boxShadow: "0 -20px 50px rgba(147, 170, 189, 0.3)",
//                     }}
//                   ></div>

//                   <div
//                     className="w-full flex flex-col items-start gap-6 p-6 h-[97px] rounded-[24px] border border-white bg-white shadow-md hover:shadow-lg transition-shadow relative cursor-pointer"
//                     onClick={() => handlePlayListItem(index)}
//                   >
//                     <div className="text-left flex-1">
//                       <h4 className="text-[#171C35] font-semibold text-lg mb-1">
//                         {item.title}
//                       </h4>
//                       <p className="text-[#111A2D] text-sm md:text-base">
//                         {item.subtitle}
//                       </p>
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handlePlayListItem(index);
//                       }}
//                       className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg absolute right-6 top-1/2 -translate-y-1/2"
//                     >
//                       {isThisItemPlaying ? (
//                         <Pause size={20} className="text-white" />
//                       ) : (
//                         <SvgPlayIcon size={24} fill="#FFFFFF" className="ml-0.5" />
//                       )}
//                     </button>
//                   </div>

//                   {/* Audio Player below the active menu item */}
//                   {isThisItemActive && (
//                     <div className="mt-2">
//                       <div className="bg-[#526FFF] rounded-2xl p-5">
//                         <div className="mb-4">
//                           <h3 className="text-white h-10 text-xl font-semibold mb-2">
//                             {item.title}
//                           </h3>
//                           <p className="text-blue-100 text-base">{item.subtitle}</p>
//                         </div>

//                         {/* Waveform */}
//                         <div className="relative mb-6 overflow-hidden">
//                           <div className="flex items-center justify-between gap-2 h-28 w-full relative">
//                            {waveSegments.map((segment, i) => {
//   const currentBar = Math.floor((currentTime / totalDuration) * waveSegments.length);
//   const isActive = i === currentBar && isPlaying;

//   return (
//     <div key={i} className="flex-1 flex items-center justify-center relative">
//       <div
//         className="w-full rounded-full bg-white overflow-hidden transition-all duration-300 flex items-center justify-center relative"
//         style={{ height: `${segment.height}px` }} // now using 'segment'
//       >
//         <img src={roundImg} alt="border" className="absolute inset-0 w-full h-full object-cover" />
//         {isActive && <img src={roundactiveImg} alt="active" className="absolute inset-0 w-full h-full object-cover z-10" />}
//       </div>
//     </div>
//   );
// })}


//                             <div
//                               className="absolute top-3 flex flex-col gap-1 items-center"
//                               style={{
//                                 left: `${(currentTime / totalDuration) * 100}%`,
//                                 height: "100px",
//                               }}
//                             >
//                               <div className="w-0.5 h-full bg-white "></div>
//                               <img src={borderIcon} alt="cursor-icon" className="self-stretch" />
//                             </div>
//                           </div>
//                         </div>

//                         {/* Controls */}
//                         <div className="flex items-center justify-between gap-4 flex-wrap">
//                           <span className="text-white text-sm">0:30</span>
//                           <div className="flex items-center gap-3">
//                             <button
//                               onClick={() => {
//                                 setActiveAudioIndex((prev) =>
//                                   prev > 0 ? prev - 1 : menuItems.length - 1
//                                 );
//                                 setIsPlaying(true);
//                                 setCurrentTime(0);
//                               }}
//                               className="hover:scale-110 transition-transform"
//                             >
//                               <img src={skipleft} alt="skip left" />
//                             </button>

//                             <button
//                               onClick={() => setIsPlaying(!isPlaying)}
//                               className="w-12 h-12 border border-white backdrop-blur-xl rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
//                             >
//                               {isPlaying ? (
//                                 <Pause size={20} className="text-white" />
//                               ) : (
//                                 <Play size={20} className="text-white ml-1" />
//                               )}
//                             </button>

//                             <button
//                               onClick={() => {
//                                 setActiveAudioIndex((prev) =>
//                                   prev < menuItems.length - 1 ? prev + 1 : 0
//                                 );
//                                 setIsPlaying(true);
//                                 setCurrentTime(0);
//                               }}
//                               className="hover:scale-110 transition-transform"
//                             >
//                               <img src={skipRight} alt="skip right" />
//                             </button>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <span className="text-white text-sm">-1:23</span>
//                             <img src={speaker} alt="speaker" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExampleSection;




import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import icon from "../assets/svgIcon/herologo.svg";
import skipleft from "../assets/svgIcon/voiceskipLeft.svg";
import skipRight from "../assets/svgIcon/voiceskipRight.svg";
import speaker from "../assets/svgIcon/speaker.svg";
import borderIcon from "../assets/svgIcon/BorderPlay.svg";
import roundactiveImg from "../assets/svgIcon/activerecord.svg";
import roundImg from "../assets/svgIcon/recordbtnborder.svg";
import './buttom.css';
import SectionHeader from "./SectionHeader";

const SvgPlayIcon = ({ fill = "#526FFF", size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <mask
      id="mask0_2987_5353"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="30"
      height="30"
    >
      <path
        d="M15.9974 29.3327C23.3614 29.3327 29.3307 23.3633 29.3307 15.9993C29.3307 8.63535 23.3614 2.66602 15.9974 2.66602C8.6334 2.66602 2.66406 8.63535 2.66406 15.9993C2.66406 23.3633 8.6334 29.3327 15.9974 29.3327Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13.3281 15.9995V11.3809L17.3281 13.6902L21.3281 15.9995L17.3281 18.3089L13.3281 20.6182V15.9995Z"
        fill="black"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#mask0_2987_5353)">
      <path d="M0 0H32V32H0V0Z" fill={fill} />
    </g>
  </svg>
);

const ExampleSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(33);
  const totalDuration = 100;
  const [activeAudioIndex, setActiveAudioIndex] = useState<number>(0);

  const menuItems = [
    { title: "Lectures & Training", subtitle: "Orthopedics Dr. Gruber" },
    {
      title: "Appointment Rescheduling/Cancellation",
      subtitle: "Dental Practice Dr. Meier",
    },
    { title: "Insurance Questions", subtitle: "Physiotherapy Dr. Fuchs" },
    {
      title: "Booking a Preventive Appointment",
      subtitle: "General Practice Dr. Koch",
    },
    { title: "Request for Referrals", subtitle: "Dermatology Dr. Wagner" },
  ];

  const waveSegments = [
    { height: 45, time: "0:00" },
    { height: 45, time: "0:30" },
    { height: 45, time: "1:00" },
    { height: 45, time: "1:30" },
    { height: 45, time: "2:00" },
    { height: 45, time: "2:30" },
  ];

  const handlePlayListItem = (index: number) => {
    if (activeAudioIndex === index) {
      setIsPlaying((prev) => !prev);
    } else {
      setActiveAudioIndex(index);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const activeItem = menuItems[activeAudioIndex];

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="px-9 mt-16 md:mt-[180px] lg:mt-[180px] xl:mt-[180px] md:px-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-20">
        <SectionHeader
          badgeIcon={icon}
          badgeText=" Real Examples"
          heading={
            <>
              This is what Docline sounds like
              in everyday practice
            </>
          }
          subText="Your patients will hardly notice the difference. Easily adapt the AI assistant's voice to your practice's style. Choose a confident male or female voice. This ensures a smooth and professional reception for every call."
          align="left"
          subAlign="left"
        />

        {/* Right Section */}
        <div className="w-full">
          {/* Audio Player - ALWAYS AT TOP */}
          <div className="mb-2">
            <div className="bg-[#526FFF] rounded-2xl p-5">
              <div className="mb-4">
                <h3 className="text-white h-10 text-xl font-semibold mb-2">
                  {activeItem.title}
                </h3>
                <p className="text-blue-100 text-base">{activeItem.subtitle}</p>
              </div>

              {/* Waveform */}
              <div className="relative mb-6 overflow-hidden">
                <div className="flex items-center justify-between gap-2 h-28 w-full relative">
                  {waveSegments.map((segment, i) => {
                    const currentBar = Math.floor((currentTime / totalDuration) * waveSegments.length);
                    const isActive = i === currentBar && isPlaying;

                    return (
                      <div key={i} className="flex-1 flex items-center justify-center relative">
                        <div
                          className="w-full rounded-full bg-white overflow-hidden transition-all duration-300 flex items-center justify-center relative"
                          style={{ height: `${segment.height}px` }}
                        >
                          <img src={roundImg} alt="border" className="absolute inset-0 w-full h-full object-cover" />
                          {isActive && <img src={roundactiveImg} alt="active" className="absolute inset-0 w-full h-full object-cover z-10" />}
                        </div>
                      </div>
                    );
                  })}

                  <div
                    className="absolute top-3 flex flex-col gap-1 items-center"
                    style={{
                      left: `${(currentTime / totalDuration) * 100}%`,
                      height: "100px",
                    }}
                  >
                    <div className="w-0.5 h-full bg-white"></div>
                    <img src={borderIcon} alt="cursor-icon" className="self-stretch" />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-white text-sm">0:30</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveAudioIndex((prev) =>
                        prev > 0 ? prev - 1 : menuItems.length - 1
                      );
                      setIsPlaying(true);
                      setCurrentTime(0);
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    <img src={skipleft} alt="skip left" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 border border-white backdrop-blur-xl rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause size={20} className="text-white" />
                    ) : (
                      <Play size={20} className="text-white ml-1" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setActiveAudioIndex((prev) =>
                        prev < menuItems.length - 1 ? prev + 1 : 0
                      );
                      setIsPlaying(true);
                      setCurrentTime(0);
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    <img src={skipRight} alt="skip right" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">-1:23</span>
                  <img src={speaker} alt="speaker" />
                </div>
              </div>
            </div>
          </div>

          {/* All Menu Items Below Audio */}
          <div className="-space-y-1 -mt-5">
            {menuItems.map((item, index) => {
              const isThisItemActive = activeAudioIndex === index;
              const isThisItemPlaying = isThisItemActive && isPlaying;

              return (
                <div key={index} className="relative overflow-visible">
                  <div
                    className="absolute inset-0 rounded-[24px] pointer-events-none"
                    style={{
                      boxShadow: "0 -20px 50px rgba(147, 170, 189, 0.3)",
                    }}
                  ></div>

                  <div
                    className="w-full flex flex-col items-start gap-6 p-6 h-[97px] rounded-[24px] border border-white bg-white shadow-md hover:shadow-lg transition-shadow relative cursor-pointer"
                    onClick={() => handlePlayListItem(index)}
                  >
                    <div className="text-left flex-1">
                      <h4 className="text-[#171C35] font-semibold text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#111A2D] text-sm md:text-base">
                        {item.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayListItem(index);
                      }}
                      className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg absolute right-6 top-1/2 -translate-y-1/2"
                    >
                      {isThisItemPlaying ? (
                        <Pause size={20} className="text-white" />
                      ) : (
                        <SvgPlayIcon size={24} fill="#FFFFFF" className="ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleSection;