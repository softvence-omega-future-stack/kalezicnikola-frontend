
import React from "react";
import img from "@/assets/img/glass.png";
// import AppleGlassButton from "@/components/AppleGlassButton";
// import LiquidGlass from 'liquid-glass-react'
import './bnnarButon.css'
import { useNavigate } from "react-router-dom";


const CTABanner: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{ fontFamily: 'Urbanist, sans-serif' }}
      className="w-full px-4 mt-9 md:mt-[180px] lg:mt-[180px] xl:mt-[180px] relative"
    >
      <div className="">
        <div className="bg-[#526FFF] rounded-3xl sm:rounded-[2.5rem] md:rounded-[40px] p-6 sm:p-8 md:p-10 lg:p-[85px] relative overflow-hidden">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
  {/* Left Content */}
  <div className="flex-1 max-w-full lg:max-w-3xl">
    <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight mb-4 sm:mb-5 md:mb-6">
      Boost your team's satisfaction <br /> & productivity today.
    </h2>
    <p className="text-sm sm:text-base md:text-lg text-blue-50">
      Phone stress consumes valuable time and leads to overload. Free up your staff and enjoy smooth operations from the very first minute. Let our AI handle your calls while your team focuses on patient care.
    </p>
  </div>

  {/* Button */}
  <div className="w-full lg:w-auto mt-4 lg:mt-0 flex justify-center">
    <button onClick={()=> navigate('/login')} className="btn w-full lg:w-[218px] py-4 rounded-full cursor-pointer text-white bg-white/10">
      Start Now
    </button>
  </div>
</div>

          {/* <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            

            <div className="flex-1 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight mb-4 sm:mb-5 md:mb-6">
                Boost your team's satisfaction <br /> & productivity today.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-blue-50">
                Phone stress consumes valuable time and leads to overload. Free up your staff and enjoy smooth operations from the very first minute. Let our AI handle your calls while your team focuses on patient care.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <button className="btn py-4 px-8 h-[64px] w-[218px] rounded-full text-white bg-white/10">click me</button>
            </div>

           
            <div>
              {/* <AppleGlassButton>
                Jetzt starten
              </AppleGlassButton> */}
         {/* <LiquidGlass
  displacementScale={60}
  blurAmount={0.15}
  saturation={120}
  aberrationIntensity={1.5}
  elasticity={0.4}
  cornerRadius={80}
  padding="20px 60px"   // height 64px, width 218px
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }}
>
  <span className="text-white font-semibold text-lg">
    Start Now
  </span>
</LiquidGlass>

            </div>
          </div>

          {/* Right-bottom image */}
          <img
            src={img}
            alt="CTA Illustration"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 'auto',
              height: 'auto',
              maxHeight: '100%', 
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div> 
    </div>
  );
};

export default CTABanner;

