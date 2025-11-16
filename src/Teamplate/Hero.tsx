import React from "react";
import heroImg from "../assets/svgIcon/heroImg.svg";
import herologo from "../assets/svgIcon/herologo.svg";
import './buttom.css'

const DoclineHero: React.FC = () => {
  return (
    <section className="w-full bg-[#F3F6F6] pt-[160px]  ">
      <div className="flex flex-col lg:flex-row items-center justify-between pl-8 lg:pl-20 mt-14">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-5 xl:-mt-75 2xl:-mt-96">
          {/* Badge */}
<<<<<<< HEAD
          
          <div className="relative glass pr-5 pl-2.5 py-2   inline-flex items-center gap-3.5">
  <img src={herologo} alt="Docline Logo" className="w-5 h-5" />
  <span className="text-[#171C35] text-sm font-medium">
    Your smarter telemedicine
  </span>

 
</div>

=======
          <div className="inline-flex items-center gap-2 px-[10px] py-2  bg-[rgba(255, 255, 255, 0.10)] border-t-2 border-l-2 border border-white rounded-full relative">
            <img src={herologo} alt="Docline Logo" className="w-5 h-5" />
            <span className="text-[#171C35] text-sm font-medium">
              Your smarter telemedicine
            </span>
            <div className="absolute">
            <span className="top-0 right-0">a</span>
          </div>
          </div>
          
>>>>>>> 6424fb2d925a0ba2efc40cae5b04441dd52e94ee

          {/* Heading */}
          <h1 style={{ fontFamily: 'Urbanist, sans-serif' }} className="text-[42px] sm:text-[52px] lg:text-[64px] font-semibold text-[#171C35] leading-19">
            24/7 Availability <br /> for Your Patients.
            <span className="block ">
              Zero Phone Stress for Your Team.
            </span>
          </h1>

          {/* Description */}
          <p style={{ fontFamily: 'Urbanist, sans-serif' }} className="text-lg text-gray-600 leading-relaxed pb-5">
            Your intelligent AI assistant takes over all phone calls and allows your staff <br /> 
            to handle appointments, answer  questions, and simplify tasks in your team.
          </p>

  
<div className="w-full max-w-[468px] relative ">
        <div style={{
    boxShadow: '0 30px 70px 0 rgba(4, 6, 45, 0.15)'
  }} className="flex items-center bg-white relative rounded-2xl  border-2 border-transparent">
       
          
          {/* top-right corner border */}
          <div  className="absolute top-0 right-0 w-52 h-20 pointer-events-none">
            <div     
         className="absolute top-0 right-0 w-full h-full border-r-2 border-t-2 border-[#526FFF] rounded-tr-2xl"></div>
          </div>
             {/* botom-left corner border */}
          <div className="absolute bottom-0 left-0 w-52 h-20 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-[#526FFF] rounded-bl-2xl"></div>
          </div>

          {/* Input Field */}
          <div className="flex-1">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-8 py-6 text-lg bg-white focus:outline-none placeholder-gray-400 border-none rounded-2xl"
            />
          </div>

          {/* Button */}
          <button
            className="px-10 py-6 bg-[#526FFF]  text-white text-xl font-normal rounded-2xl transition-colors duration-200 whitespace-nowrap mx-3 my-2"
          >
            Hit Me Up
          </button>
        </div>
      </div>




        </div>

    {/* Right Image */}
   <div className="w-full lg:w-1/2 flex justify-center  lg:justify-end ">
      <img
        src={heroImg}
        alt="Hero Illustration"
        className="w-[90%] lg:w-[95%] xl:w-[100%]  object-contain"
      />
    </div>
      </div>
    </section>
  );
};

export default DoclineHero;
