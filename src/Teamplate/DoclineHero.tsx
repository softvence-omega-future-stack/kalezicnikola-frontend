// import heroImg from "../assets/svgIcon/heroImg.svg";
// import herologo from "../assets/svgIcon/herologo.svg";
// import { useNavigate } from "react-router-dom";

// const descStyle = {
//   fontFamily: "Urbanist, sans-serif",
//   color: "#171C35",
// };

// const DoclineHero = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full bg-[#F3F6F6] pt-19 lg:pt-[190px]">
//       <div className="flex flex-col lg:flex-row sm:pl-8 lg:pl-20 mt-14 gap-10 h-[700px]">
//         {/* Left Content */}
//         <div className="w-full md:w-[35%] flex flex-col justify-between">
//           <div>
//             <div className="relative inline-flex items-center gap-2 backdrop-blur-lg px-2 py-2 border border-white bg-white/10 rounded-full mb-6 mx-auto md:mx-0">
//               <img src={herologo} alt="" className="w-5 h-5" />
//               <span style={descStyle}>Your smarter telemedicine</span>
//             </div>

//             <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-[64px] font-semibold text-headingBlack font-Urbanist leading-[120%]">
//               24/7 Availability for your patients. Zero phone stress for your team.
//             </h1>

//             <p className="text-subHeadingBlack font-urbanist text-[20px] font-normal max-w-[584px] mt-5 mb-10">
//               Our intelligent AI assistant handles all calls around the clock. It schedules appointments, answers questions, creates automated tasks, and relieves your team.
//             </p>

//             <div className="flex flex-col md:flex-row w-full items-center gap-3">
//             <button
//               onClick={() => navigate("/login")}
//               className="w-full md:w-auto py-3 md:py-4 px-12 rounded-[12px] text-sm md:text-base font-semibold bg-[#526FFF] text-white cursor-pointer"
//             >
//               Get Started
//             </button>
//             <button className="w-full md:w-auto py-3 md:py-4 px-12 rounded-[12px] text-sm md:text-base font-semibold border border-[#526FFF] text-[#526FFF] bg-[rgba(82,111,255,0.1)] cursor-pointer">
//               Book Demo
//             </button>
//           </div>
//           </div>

//           {/* Buttons */}
          
//         </div>

//         {/* Right Image */}
//         <div className="w-full md:w-[65%]">
//           <img
//             src={heroImg}
//             alt="Hero Illustration"
//             className="w-full  object-contain"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DoclineHero;










import React from "react";
import { useTranslation } from "react-i18next";

import heroImg from "../assets/svgIcon/heroImg.svg";
import tabImg from "../assets/svgIcon/Hero tab.png";
import herologo from "../assets/svgIcon/herologo.svg";
// import SectionHeader from "./SectionHeader";
import { useNavigate } from "react-router-dom";

const DoclineHero: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation()
  return (
    <section className="w-full bg-[#F3F6F6] pt-19 md:pt-[190px]">
      <div className="w-full flex flex-col lg:flex-row items-start justify-between sm:px-0 sm:pl-8 lg:pl-20 gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 px-4 sm:px-0">
          {/* <SectionHeader
            badgeIcon={herologo}
            badgeText="Your smarter telemedicine"
            heading={
              <div className="w-full md:w-[620px]">
                24/7 Availability for Your Patients. Zero Phone Stress for Your
                Team.
              </div>
            }
            subText=" Your intelligent AI assistant takes over all phone calls and allows your staff  
          to handle appointments, answer questions, and simplify tasks in your team."
            align="left"
            subAlign="left"
          /> */}

          <div className="text-center md:text-left mb-6 md:mb-10">
            {/* Badge */}
            <div
              style={{
                boxShadow: `-6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                1.2px 1.2px 0 -0.4px #FFF inset, 
                -1.2px -1.2px 0 -0.5px #FFF inset`,
                padding: "10px 20px",
                backdropFilter: "blur(5px)",
                fontFamily: "Urbanist, sans-serif",
                color: "#171C35",
              }}
              className="relative inline-flex items-center gap-2 backdrop-blur-lg sm:pr-5 sm:pl-2.5 py-2 bg-gray-200/20 rounded-full mb-3 md:mb-5 mx-auto md:mx-0"
            >
              <img src={herologo} alt="" className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-medium">{t("hero.badge")}</span>
            </div>

            {/* Heading */}
            <h1 className="mb-4 text-[40px] sm:text-[52px] leading-[120%]  lg:text-[64px]  sm:pr-5 md:pr-0 font-semibold text-[#171C35]">
            {t("hero.heading")}
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "Urbanist, sans-serif",
                color: "#171C35",
              }}
              className=" max-w-lg mx-auto md:mx-0  leading-[140%] text-base  sm:text-lg md:text-xl text-center  md:text-left"
            >
            {t("hero.subText")}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row w-full items-center gap-3 sm:pr-5 md:pr-0">
            <button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto py-4 px-6 md:py-5 leading-4 md:px-12 rounded-[25px] sm:rounded-[12px] text-base font-semibold bg-[#526FFF] text-white cursor-pointer"
            >
              {t("hero.getStarted")}
            </button>
            <button className="w-full md:w-auto py-3 px-6 leading-4 md:py-5 md:px-12 rounded-[25px] sm:rounded-[12px] text-base font-semibold border border-[#526FFF] text-[#526FFF] bg-[rgba(82,111,255,0.1)] cursor-pointer">
              {t("hero.bookDemo")}
            </button>
          </div>
        </div>

        <div></div>

        {/* Right Image */}
        {/* <div className="w-full lg:w-1/2 relative overflow-visible">
  <img
    src={heroImg}
    alt="Hero Illustration"
    className="
      w-full sm:w-[85%] md:w-[80%] lg:w-[120%] 
      h-full object-contain 
      lg:translate-x-10 xl:translate-x-20
    "
  />
</div> */}

        {/* Right Image */}
        <div className="w-full lg:w-1/2 -mt-5  lg:-mb-50 md:-mb-40 sm:-mb-20 " >
          <img
      /* Mobile Image (0–639px) */
  
    src={heroImg}
    alt="Hero Mobile"
    className="block sm:hidden w-full object-contain"
  />

  {/* Tablet Image (640–767px) */}
  <img
    src={tabImg}
    alt="Hero Tablet"
    className="hidden sm:block md:hidden w-full object-contain"
  />

  {/* Desktop Image (768px+) */}
  <img
    src={heroImg}
    alt="Hero Desktop"
    className="hidden md:block w-full object-contain"
  />
        </div>
      </div>
    </section>
  );
};

export default DoclineHero;
