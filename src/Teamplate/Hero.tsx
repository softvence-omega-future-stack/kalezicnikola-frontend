import React from "react";
import heroImg from "../assets/svgIcon/heroImg.svg";
import herologo from "../assets/svgIcon/herologo.svg";

const DoclineHero: React.FC = () => {
  return (
    <section className="w-full bg-[#F3F6F6] py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-6 2xl:-mt-72">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 bg-white/10 rounded-full">
            <img src={herologo} alt="Docline Logo" className="w-5 h-5" />
            <span className="text-[#171C35] text-sm font-medium">
              Your smarter telemedicine
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[42px] sm:text-[52px] lg:text-[64px] font-semibold text-[#171C35] leading-tight">
            24/7 Availability <br /> for Your Patients.
            <span className="block mt-2">
              Zero Phone Stress for Your Team.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">
            Your intelligent AI assistant takes over all phone calls and allows your staff 
            to handle appointments, answer questions, and simplify tasks in your team.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-[#526FFF] text-white rounded-[12px] font-medium transition-colors cursor-pointer">
              Get Started
            </button>
            <button className="px-12 py-5 border-2 border-[#526FFF] bg-[#526FFF1A] text-[#526FFF] rounded-[12px] font-medium cursor-pointer transition-colors">
              Book Demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-[90%] lg:w-[95%] xl:w-[100%] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DoclineHero;
