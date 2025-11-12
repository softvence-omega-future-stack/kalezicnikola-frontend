import React from "react";
import heroImg from "../assets/svgIcon/heroImg.svg";
import herologo from "../assets/svgIcon/herologo.svg";

const DoclineHero: React.FC = () => {
  return (
    <section className="w-full bg-[#F3F6F6] pt-16 lg:py-20 ">
      <div className="flex flex-col lg:flex-row items-center justify-between pl-8 lg:pl-20 mt-14">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-6 xl:-mt-72">
          {/* Badge */}
          <div className="relative inline-flex items-center gap-2 px-[10px] py-2 backdrop-blur-2xl border border-white bg-white/10 rounded-full">
  <img src={herologo} alt="Docline Logo" className="w-5 h-5" />
  <span className="text-[#171C35] text-sm font-medium">
    Your smarter telemedicine
  </span>

 
  <span className="absolute top-0 right-0  h-3 w-5 bg-[#F3F6F6] z-10"></span>
  <span className="absolute bottom-0 left-0  h-5 w-5 bg-[#F3F6F6] z-10"> </span>
</div>


          {/* Heading */}
          <h1 style={{ fontFamily: 'Urbanist, sans-serif' }} className="text-[42px] sm:text-[52px] lg:text-[64px] font-semibold text-[#171C35] leading-tight">
            24/7 Availability <br /> for Your Patients.
            <span className="block mt-2">
              Zero Phone Stress for Your Team.
            </span>
          </h1>

          {/* Description */}
          <p style={{ fontFamily: 'Urbanist, sans-serif' }} className="text-lg text-gray-600 leading-relaxed">
            Your intelligent AI assistant takes over all phone calls and allows your staff <br /> 
            to handle appointments, answer  questions, and simplify tasks in your team.
          </p>

          {/* CTA Buttons */}

{/* <div className="flex items-center p-2 bg-white rounded-2xl shadow-lg border border-white max-w-md mx-auto">
  <input 
    type="tel" 
    placeholder="Enter phone number" 
    className="flex-grow p-3 text-lg text-gray-700 placeholder-gray-400 focus:outline-none bg-white rounded-l-2xl"
  />
  <button 
    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Hit Me Up
  </button>
</div> */}

          {/* <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-[#526FFF] text-white rounded-[12px] font-medium transition-colors cursor-pointer">
              Get Started
            </button>
            <button className="px-12 py-5 border-2 border-[#526FFF] bg-[#526FFF1A] text-[#526FFF] rounded-[12px] font-medium cursor-pointer transition-colors">
              Book Demo
            </button>
          </div> */}


<div className="flex items-center justify-center p-4">
      <div 
        className="
          flex items-center bg-white 
          p-1 pr-1 pl-5 // Wrapper-এর প্যাডিং
          rounded-2xl // 16px বর্ডার রেডিয়াস
          
          // ✨ মূল অংশ: মোটা নীল বর্ডার
          border-[2.5px] border-[#526FFF] 
          
          // ✨ মূল অংশ: গভীর বক্স শ্যাডো
          shadow-2xl shadow-black/20 
          
          max-w-xl w-full
          
          // Gap 125px রাখা হলো, যদি এটি খুব বেশি হয় তবে কমিয়ে দেবেন (যেমন: gap-6)
          gap-[125px] 
        "
      >
        {/* Input Field (No Border of its own) */}
        <input
          type="tel"
          placeholder="Enter phone number"
          className="
            flex-1 
            p-1 
            text-gray-700 text-base sm:text-lg 
            outline-none border-none bg-transparent
          "
        />

        {/* Button */}
        <button
          className="
            bg-[#526FFF] text-white font-semibold 
            px-6 sm:px-7 py-3 sm:py-4 
            rounded-xl 
            transition-colors duration-200 
            hover:bg-[#405fff] active:scale-95
            whitespace-nowrap
            text-base sm:text-lg
            shadow-md shadow-[#526FFF]/50
          "
        >
          Hit Me Up
        </button>
      </div>
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
