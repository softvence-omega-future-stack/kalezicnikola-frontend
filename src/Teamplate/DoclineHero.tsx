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
import heroImg from "../assets/svgIcon/heroImg.svg";
import herologo from "../assets/svgIcon/herologo.svg";
// import SectionHeader from "./SectionHeader";
import { useNavigate } from "react-router-dom";

const descStyle = {
  fontFamily: "Urbanist, sans-serif",
  color: "#171C35",

};

const DoclineHero: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#F3F6F6] pt-19 lg:pt-[190px] ">
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:pl-8 lg:pl-20 mt-14 gap-10">
        {/* Left Content */}



        <div className="w-full lg:w-1/2">
          <div className="relative  inline-flex items-center gap-2 backdrop-blur-lg px-2 py-2 border border-white bg-white/10 rounded-full mb-6 mx-auto md:mx-0">
            <img src={herologo} alt="" className="w-5 h-5" />
            <span style={descStyle}>Your smarter telemedicine</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-[64px] font-semibold text-headingBlack font-Urbanist   font-urbanist text-[64px]  leading-[120%]">24/7 Availability <br /> for Your Patients. <br />
              Zero Phone Stress for Your Team.</h1>
            <p className="text-[var(--Title-color)] font-urbanist text-[20px] font-normal max-w-[584px] mt-5 mb-10">Unser intelligenter KI-Assistent übernimmt alle Telefonate rund um die Uhr. Er vereinbart Termine, beantwortet Fragen, erstellt automatisiert Aufgaben und entlastet Ihr Team.</p>
          </div>
          {/* <SectionHeader
            badgeIcon={herologo}
            badgeText="Your smarter telemedicine"
            heading={
              <>
                24/7 Availability <br /> for Your Patients. <br />
                Zero Phone Stress for Your Team.
              </>
            }
            subText=" Your intelligent AI assistant takes over all phone calls and allows your staff  
          to handle appointments, answer questions, and simplify tasks in your team.."
            align="left"
            subAlign="left"
          /> */}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row w-full items-center gap-3">

            <button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto py-3 px-5 xl:py-5 xl:px-12 rounded-[12px] text-base font-medium bg-[#526FFF] text-white cursor-pointer"
            >
              Get Started
            </button>
            <button className="w-full md:w-auto py-3 px-5 xl:py-5 xl:px-12  rounded-[12px] text-base font-medium border border-[#526FFF] text-[#526FFF] bg-[rgba(82,111,255,0.1)] cursor-pointer">
              Book Demo
            </button>
          </div>


        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>

  );
};

export default DoclineHero;
