"use client";

import React from "react";
import img from "@/assets/img/steigern.png";
import AppleGlassButton from "@/dashboard/components/AppleGlassButton";

const CTABanner: React.FC = () => {
  return (
    <div
      style={{ fontFamily: 'Urbanist, sans-serif' }}
      className="w-full px-4 mt-9 md:mt-[180px] lg:mt-[180px] xl:mt-[180px] relative"
    >
      <div className="xl:px-30">
        <div className="bg-[#526FFF] rounded-3xl sm:rounded-[2.5rem] md:rounded-[40px] p-6 sm:p-8 md:p-10 lg:p-[85px] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            
            {/* Left Content */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight mb-4 sm:mb-5 md:mb-6">
                Boost your team's satisfaction <br /> & productivity today.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-blue-50">
                Phone stress consumes valuable time and leads to overload. Free up your staff and enjoy smooth operations from the very first minute. Let our AI handle your calls while your team focuses on patient care.
              </p>
            </div>

            {/* Button */}
            <div>
              <AppleGlassButton>
                Jetzt starten
              </AppleGlassButton>
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
              maxHeight: '100%', // limits image to 3/4 of container height
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
