import React from 'react';
import imgScreen from '../assets/svgIcon/fuctionScreen.svg'
import icon from '../assets/svgIcon/herologo.svg'

const Functions: React.FC = () => {
  return (
    <div className="  px-4 py-12 md:py-16 lg:py-20">
      <div className="lg:px-30 w-full">
         <div className="text-start mb-16 ">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6">
          <img src={icon} alt="" />
          <span className="text-[#171C35] text-sm font-medium">Our Core Functions</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
           Everything you need to ease <br /> the burden on your practice
        </h2>
      </div>
 <div>
                <img src={imgScreen} alt="" className='w-full' />
            </div>
       
        </div>

           
       
      </div>
   
  );
};

export default Functions;