import React from 'react';

const CTABanner: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="w-full px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="xl:px-30">
        <div className="bg-[#526FFF] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Content */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4 sm:mb-5 md:mb-6">
                Boost your team’s satisfaction <br /> & productivity today.
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-50 leading-relaxed">
                Phone stress consumes valuable time and leads to overload. Free up your staff and enjoy smooth operations from the very first minute. Let our AI handle your calls while your team focuses on patient care.
              </p>
            </div>

            {/* Right Button */}
            <div className="w-full lg:w-auto flex-shrink-0">
              <button className="w-full lg:w-auto bg-[#657cf2] text-white border border-white font-semibold px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-full sm:rounded-2xl transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
