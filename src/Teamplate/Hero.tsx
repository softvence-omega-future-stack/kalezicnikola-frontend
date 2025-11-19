import React from "react";
import heroImg from "../assets/svgIcon/heroImg.svg";
import herologo from "../assets/svgIcon/herologo.svg";

const DoclineHero: React.FC = () => {
  return (
    <section className="w-full bg-[#F3F6F6] pt-[160px] sm:pt-[140px]">
      <div className="flex flex-col lg:flex-row items-center justify-between pl-6 sm:pl-8 lg:pl-20 mt-14 gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-5 xl:-mt-10 2xl:-mt-80 px-5 lg:px-0">
          {/* Badge */}
          <div className="relative glass inline-flex items-center gap-3.5 px-3 py-2">
            <img src={herologo} alt="Docline Logo" className="w-5 h-5" />
            <span className="text-[#171C35] text-sm font-medium">
              Your smarter telemedicine
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{ fontFamily: 'Urbanist, sans-serif' }}
            className="text-[42px] sm:text-[52px] lg:text-[54px] xl:text-[64px] font-semibold text-[#171C35] leading-snug lg:leading-tight"
          >
            24/7 Availability <br /> for Your Patients.
           <br />
              Zero Phone Stress for Your Team.
          
          </h1>

          {/* Description */}
          <p
            style={{ fontFamily: 'Urbanist, sans-serif' }}
            className="text-lg text-gray-600 leading-relaxed pb-5"
          >
            Your intelligent AI assistant takes over all phone calls and allows your staff <br /> 
            to handle appointments, answer questions, and simplify tasks in your team.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row w-full items-center gap-3">
            <button className="w-full md:w-auto py-6 px-12 rounded-[12px] text-base font-medium bg-[#526FFF] text-white">
              Get Started
            </button>
            <button className="w-full md:w-auto py-6 px-12 rounded-[12px] text-base font-medium border border-[#526FFF] text-[#526FFF] bg-[rgba(82,111,255,0.1)]">
              Book Demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[95%] xl:w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DoclineHero;
