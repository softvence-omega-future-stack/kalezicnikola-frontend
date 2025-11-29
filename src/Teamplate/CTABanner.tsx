

// import { useNavigate } from 'react-router-dom';
import './bnnarButon.css'
// e

//import { useNavigate } from 'react-router-dom';
// import LiquidGlassButton from './LequiedGlassBtn';


//import { useNavigate } from 'react-router-dom';
// import LiquidGlassButton from './LequiedGlassBtn';

// import { useNavigate } from 'react-router-dom';

import React from "react";
import img from "@/assets/img/steigern.png";
import AppleGlassButton from "@/dashboard/components/AppleGlassButton";


const CTABanner: React.FC = () => {
  // const navigate = useNavigate();
  // const [isHovered, setIsHovered] = useState(false);
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  //  const [isPressed, setIsPressed] = useState(false);


  //  const [isPressed, setIsPressed] = useState(false);



  // const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   setMousePos({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //   });
  // };

  


  return (
    <div  className="w-full  mt-19 md:mt-[180px] lg:mt-[180px] xl:mt-[180px]">
      <div className="">
        <div className="bg-[#526FFF] rounded-[40px]  p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl">
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
  
  );
};

export default CTABanner;
