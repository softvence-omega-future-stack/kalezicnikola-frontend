import icon from "../assets/svgIcon/herologo.svg";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import img1 from "../assets/svgIcon/workflowSlider1.svg";
import img2 from "../assets/svgIcon/workflowSlider2.svg";
import img3 from "../assets/svgIcon/wrokflowSlider3.svg";
import img4 from "../assets/svgIcon/workflowSlider4.svg";

const DashboardSlide: React.FC<{
  bgColor: string;
  label: string;
  title: string;
  subtitle: string;
  list: string[];
  img: string;
  isActive?: boolean;
}> = ({ bgColor, label, title, subtitle, list, img, isActive }) => {
  return (
    <div
      className={`p-4 sm:p-6 md:p-8 ${bgColor} rounded-3xl shadow-xl relative overflow-hidden 
      flex flex-col transition-all duration-700 transform
      ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-90"}
      mx-auto w-full min-h-[420px] sm:min-h-[520px] md:min-h-[600px]`}
    >
      {/* Text Section */}
      <div className="relative z-10 shrink-0 mb-4">
        <div className="inline-flex items-center text-xs sm:text-sm font-medium text-[#3B82F6]
        mb-3 rounded-full py-1.5 px-3 border border-[#3B82F6]">
          <img src={icon} alt="" className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          {label}
        </div>

        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">{subtitle}</p>

        <ul className="list-disc ml-4 text-xs sm:text-sm text-gray-700 space-y-1 mt-3">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Image Section */}
      <div
        className="relative z-10 rounded-xl overflow-hidden shadow-md mt-auto 
        h-[180px] sm:h-[260px] md:h-[330px] lg:h-[400px] w-full"
      >
        <img src={img} alt={title} className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  );
};

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const slides = [
    {
      id: 1,
      label: "Task",
      title: "Clear Overview. More Efficiency",
      subtitle: "The dashboard that makes management easier and faster.",
      list: [
        "See all key metrics, patients, and appointments in one view.",
        "Unanswered calls and pending tasks clearly highlighted.",
        "Easy to navigate and quick to master.",
      ],
      img: img1,
      bgColor: "bg-[#FADACA]",
    },
    {
      id: 2,
      label: "Dashboard",
      title: "Optimized Workflow",
      subtitle: "Integrated task management ensures efficiency.",
      list: [
        "Pending requests are instantly assigned as tasks.",
        "Categorize tasks: Open - In Progress - Completed.",
        "Manual task creation for internal administration.",
      ],
      img: img2,
      bgColor: "bg-[#DBECFF]",
    },
    {
      id: 3,
      label: "Call Logs, Transcription & Audio",
      title: "Patient & Data Insights",
      subtitle: "Get a complete view of performance data.",
      list: [
        "Track daily, weekly, and monthly reports easily.",
        "Compare analytics to measure productivity.",
        "Generate insights for better decisions.",
      ],
      img: img3,
      bgColor: "bg-[#F5DFF1]",
    },
    {
      id: 4,
      label: "Calendar & Patient Records",
      title: "Collaborative Dashboard",
      subtitle: "Work together in real time.",
      list: [
        "Instant team updates and task sharing.",
        "Smart notifications for quick communication.",
        "All team data unified in one workspace.",
      ],
      img: img4,
      bgColor: "bg-[#CACDFA]",
    },
  ];

  return (
    <section className="mt-16 md:mt-[150px] xl:mt-[180px] max-[767px]:px-4">
      <div>
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row items-center px-4 lg:px-[75px] 
        lg:justify-between gap-8">

          <div>
            <div className="inline-flex items-center py-2 px-4 mb-3 bg-white/10 
            border border-white rounded-full">
              <img src={icon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-gray-800 text-xs sm:text-sm font-medium">
                Intuitive & Modern
              </span>
            </div>

            <h2 className="text-[22px] sm:text-[32px] md:text-[46px] lg:text-[54px] xl:text-[64px]
              font-semibold text-gray-900 leading-tight mb-4">
              The Modern Workflow  
              <span className="block">Your Team Will Love</span>
            </h2>
          </div>

          <p className="text-sm md:text-xl text-[#111A2D] max-w-sm md:max-w-md text-center md:text-left">
            The key to a practice that doesn't just respond but also works smarter together.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          spaceBetween={50}
          slidesPerView={"auto"}
          autoplay={
            isMobile
              ? false // ❌ Mobile autoplay disabled
              : { delay: 5000, disableOnInteraction: false } // ✔ Desktop autoplay
          }
          coverflowEffect={{
            rotate: 0,
            stretch: -50,
            depth: 200,
            modifier: 2,
            slideShadows: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="!w-full sm:!w-[60%] md:!w-[70%] pt-5 pb-8 md:pt-5 md:pb-10 transition-transform duration-700"
            >
              {({ isActive }) => (
                <div
                  className={`transition-all duration-700 ${
                    isActive ? "scale-100" : "scale-90 "
                  }`}
                >
                  <DashboardSlide {...slide} isActive={isActive} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-8 bg-black"
                  : "w-2.5 bg-[#D0D5DD]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;












// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// import icon from "../assets/svgIcon/herologo.svg";
// import img1 from "../assets/svgIcon/workflowSlider1.svg";
// import img2 from "../assets/svgIcon/workflowSlider2.svg";
// import img3 from "../assets/svgIcon/wrokflowSlider3.svg";
// import img4 from "../assets/svgIcon/workflowSlider4.svg";

// // --- DashboardSlide Component ---
// const DashboardSlide: React.FC<{
//   bgColor: string;
//   title: string;
//   subtitle: string;
//   list: string[];
//   img: string;
// }> = ({ bgColor, title, subtitle, list, img }) => {
//   return (
//     <div
//       className={`p-6 md:p-8 ${bgColor} rounded-3xl shadow-xl relative overflow-hidden h-[600px] flex flex-col transition-all duration-700 transform mx-auto w-full max-w-[1100px]`}
//     >
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50 z-0"></div>
//       <div className="relative z-10 flex-shrink-0 mb-4">
//         <div className="inline-flex items-center text-sm font-medium text-[#3B82F6] mb-2 rounded-full py-2 px-3 border border-[#3B82F6]">
//           <img src={icon} alt="" className="mr-2" />
//           Dashboard
//         </div>

//         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//           {title}
//         </h2>
//         <p className="text-gray-600 text-xs md:text-sm">{subtitle}</p>

//         <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1 mt-3">
//           {list.map((item, i) => (
//             <li key={i}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="relative z-10 rounded-xl overflow-hidden shadow-md mt-auto h-[500px] w-[1100px]">
//         <img src={img} alt={title} className="w-full h-full object-cover rounded-xl" />
//       </div>
//     </div>
//   );
// };

// // --- CarouselSection Component ---
// const CarouselSection = () => {
//   const slides = [
//     {
//       id: 1,
//       title: "Clear Overview. More Efficiency",
//       subtitle: "The dashboard that makes management easier and faster.",
//       list: [
//         "See all key metrics, patients, and appointments in one view.",
//         "Unanswered calls and pending tasks clearly highlighted.",
//         "Easy to navigate and quick to master.",
//       ],
//       img: img1,
//       bgColor: "bg-[#FADACA]",
//     },
//     {
//       id: 2,
//       title: "Optimized Workflow",
//       subtitle: "Integrated task management ensures efficiency.",
//       list: [
//         "Pending requests are instantly assigned as tasks.",
//         "Categorize tasks: Open - In Progress - Completed.",
//         "Manual task creation for internal administration.",
//       ],
//       img: img2,
//       bgColor: "bg-[#DBECFF]",
//     },
//     {
//       id: 3,
//       title: "Patient & Data Insights",
//       subtitle: "Get a complete view of performance data.",
//       list: [
//         "Track daily, weekly, and monthly reports easily.",
//         "Compare analytics to measure productivity.",
//         "Generate insights for better decisions.",
//       ],
//       img: img3,
//       bgColor: "bg-[#F5DFF1]",
//     },
//     {
//       id: 4,
//       title: "Collaborative Dashboard",
//       subtitle: "Work together in real time.",
//       list: [
//         "Instant team updates and task sharing.",
//         "Smart notifications for quick communication.",
//         "All team data unified in one workspace.",
//       ],
//       img: img4,
//       bgColor: "bg-[#CACDFA]",
//     },
//   ];

//   return (
//     <section className="py-16 font-[Urbanist]">
//       <div className="px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-white/10 mb-6 rounded-full border-t-2 border-l-2 border border-white">
//             <img src={icon} alt="" />
//             <span className="text-gray-800 text-sm font-medium">
//               Intuitive & Modern
//             </span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
//             The Modern Workflow <span className="block">Your Team Will Love</span>
//           </h2>

//           <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
//             The key to a practice that doesn't just respond but also works smarter together.
//           </p>
//         </div>

//         {/* Swiper */}
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           grabCursor={true}
//           loop={true}
//           slidesPerView={3}
//           spaceBetween={25}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           className="w-full pb-10"
//         >
//           {slides.map((slide) => (
//             <SwiperSlide key={slide.id}>
//               <DashboardSlide {...slide} />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Pagination will appear automatically because of pagination module */}
//       </div>
//     </section>
//   );
// };

// export default CarouselSection;

