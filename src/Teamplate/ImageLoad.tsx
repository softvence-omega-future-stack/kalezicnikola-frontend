import { useState, useEffect } from 'react';
import heroImgMobile from "../assets/svgIcon/Hero tab.png";
import heroImgTablet from "../assets/svgIcon/heroImg.svg";
import heroImgDesktop from "../assets/svgIcon/heroImg.svg";

export const ImageLoad = () => {
  const [currentImage, setCurrentImage] = useState(heroImgDesktop);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCurrentImage(heroImgMobile);
      } else if (window.innerWidth < 768) {
        setCurrentImage(heroImgTablet);
      } else {
        setCurrentImage(heroImgDesktop);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="w-full lg:w-1/2 -mt-5 lg:-mb-50 md:-mb-40 sm:-mb-20">
      <img
        src={currentImage}
        alt="Hero Illustration"
        className="w-full sm:w-[85%] md:w-full h-full xl:w-full object-contain"
      />
    </div>
  );
};