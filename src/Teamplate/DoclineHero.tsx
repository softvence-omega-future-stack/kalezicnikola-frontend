import React from "react";
import heroImg from "../assets/svgIcon/heroImg.svg";
import herologo from "../assets/svgIcon/herologo.svg";
// import SectionHeader from "./SectionHeader";
import { useNavigate } from "react-router-dom";

const DoclineHero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-[#F3F6F6] pt-19 lg:pt-[190px]">
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

          <div className="text-center md:text-left mb-6">
            {/* Badge */}
            <div
              style={{
                boxShadow: `1px 1px 4px 0 rgba(0, 0, 0, 0.05) inset, 
                -6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                  1px 1px 0 -0.4px #FFF inset, 
                  -1px -1px 0 -0.5px #FFF inset`,
                padding: "10px 20px",
                backdropFilter: "blur(5px)",
                fontFamily: "Urbanist, sans-serif",
                color: "#171C35",
              }}
              className="relative inline-flex items-center gap-2 backdrop-blur-lg sm:pr-5 sm:pl-2.5 py-2 bg-gray-200/20 rounded-full mb-3 md:mb-6 mx-auto md:mx-0"
            >
              <img src={herologo} alt="" className="w-5 h-5" />
              <span>Your Badge Text</span>
            </div>

            {/* Heading */}
            <h1 className="mb-4 text-2xl sm:text-[32px] md:leading-[120%] md:text-[60px] font-semibold text-[#171C35]">
              24/7 Availability for Your Patients. Zero Phone Stress for Your
                Team.
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "Urbanist, sans-serif",
                color: "#171C35",
              }}
              className="max-w-lg leading-7 text-sm md:text-base xl:text-xl text-center md:text-left"
            >
              Your intelligent AI assistant takes over all phone calls and allows your staff  
          to handle appointments, answer questions, and simplify tasks in your team.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row sm:pr-6 w-full items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto py-2 px-5 md:py-5 md:px-12 rounded-[25px] sm:rounded-[12px] text-base font-medium bg-[#526FFF] text-white cursor-pointer"
            >
              Get Started
            </button>
            <button className="w-full md:w-auto py-2 px-5 md:py-5 md:px-12 rounded-[25px] sm:rounded-[12px] text-base font-medium border border-[#526FFF] text-[#526FFF] bg-[rgba(82,111,255,0.1)] cursor-pointer">
              Book Demo
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
        <div className="w-full lg:w-1/2 -mt-5">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full sm:w-[85%] md:w-[80%] lg:w-[95%] h-[100%] xl:w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DoclineHero;
