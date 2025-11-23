import React from "react";
import heroImg from "../assets/svgIcon/heroImg.svg";
import herologo from "../assets/svgIcon/herologo.svg";
import SectionHeader from "./SectionHeader";
import { useNavigate } from "react-router-dom";

const DoclineHero: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#F3F6F6] pt-[80px] sm:pt-[140px]">
      <div className="flex flex-col lg:flex-row items-center justify-between pl-6 sm:pl-8 lg:pl-20 mt-14 gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2  xl:-mt-10 2xl:-mt-80 px-5 lg:px-0">
     

          <SectionHeader
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
/>


          {/* Buttons */}
          <div className="flex flex-col md:flex-row w-full items-center gap-3">
            <button onClick={()=> navigate('/login')} className="w-full md:w-auto py-6 px-12 rounded-[12px] text-base font-medium bg-[#526FFF] text-white cursor-pointer">
              Get Started
            </button>
            <button className="w-full md:w-auto py-6 px-12 rounded-[12px] text-base font-medium border border-[#526FFF] text-[#526FFF] bg-[rgba(82,111,255,0.1)] cursor-pointer">
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
