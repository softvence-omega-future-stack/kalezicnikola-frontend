
import icon from "../assets/svgIcon/herologo.svg";



import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Your images (Ensure these paths are correct and all files exist)
import img1 from "../assets/svgIcon/workflowSlider1.svg";
import img2 from "../assets/svgIcon/workflowSlider2.svg";
import img3 from "../assets/svgIcon/wrokflowSlider3.svg"; 
import img4 from "../assets/svgIcon/workflowSlider4.svg";

// --- DashboardSlide Component (No Change Here) ---
const DashboardSlide: React.FC<{
  bgColor: string;
  title: string;
  subtitle: string;
  list: string[];
  img: string;
  isActive?: boolean;
}> = ({ bgColor, title, subtitle, list, img, isActive }) => {
  return (
    <div
      className={`p-6 md:p-8 ${bgColor} rounded-3xl shadow-xl relative overflow-hidden h-[600px] flex flex-col transition-all duration-700 transform ${
        isActive ? "scale-100 opacity-100" : "scale-95 o"
      } mx-auto w-full max-w-[1100px]`}
    >
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50 z-0"></div>

      {/* Text Section */}
      <div className="relative z-10 flex-shrink-0 mb-4">
       <div className="inline-flex items-center text-sm font-medium text-[#3B82F6] mb-2 rounded-full py-2 px-3 border border-[#3B82F6]">
  <img src={icon} alt="" className="mr-2" />
  Dashboard
</div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-xs md:text-sm">{subtitle}</p>

        <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1 mt-3">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Image Section */}
      <div className="relative z-10 rounded-xl overflow-hidden shadow-md mt-auto h-[500px] w-[1100px] ">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

// --- CarouselSection Component (With Pagination Fix) ---
const CarouselSection = () => {
  const slides = [
    // ... (slides data remains the same)
    {
      id: 1,
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
    <section className="py-16  font-[Urbanist]">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-white/10  mb-6 rounded-full  border-t-2 border-l-2 border border-white">
           <img src={icon} alt="" />
            <span className="text-gray-800 text-sm font-medium">Intuitive & Modern</span>
            <span className="absolute top-0 right-0  h-3 w-5 bg-[#F3F6F6] z-10"></span>
  <span className="absolute bottom-0 left-0  h-5 w-5 bg-[#F3F6F6] z-10"> </span>
           </div>
          
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            The Modern Workflow{' '}
            <span className="block">Your Team Will Love</span>
           </h2>
          
           <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            The key to a practice that doesn't just respond but also works smarter together.
           </p>
         </div>

        {/* Swiper */}
        <Swiper
  modules={[Pagination, Autoplay, EffectCoverflow]}
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  loop={true}
  slidesPerView={1} // Default for mobile
  spaceBetween={20} // Gap between slides
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  }}
  breakpoints={{
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 40 },
  }}
  className="w-full pb-10"
>
  {slides.map((slide) => (
    <SwiperSlide
      key={slide.id}
      className="!w-auto"
    >
      {({ isActive }) => <DashboardSlide {...slide} isActive={isActive} />}
    </SwiperSlide>
  ))}
</Swiper>


      </div>
    </section>
  );
};

export default CarouselSection;