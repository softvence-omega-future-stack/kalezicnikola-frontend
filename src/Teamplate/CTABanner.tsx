import React, { } from 'react';
//import { useNavigate } from 'react-router-dom';
// import LiquidGlassButton from './LequiedGlassBtn';

const CTABanner: React.FC = () => {
  // const navigate = useNavigate();
  // const [isHovered, setIsHovered] = useState(false);
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   setMousePos({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //   });
  // };

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="w-full px-4 mt-9 md:mt-[180px] lg:mt-[180px] xl:mt-[180px]">
      <div className="xl:px-30">
        <div className="bg-[#526FFF] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Content */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4 sm:mb-5 md:mb-6">
                Boost your team's satisfaction <br /> & productivity today.
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-50 leading-relaxed">
                Phone stress consumes valuable time and leads to overload. Free up your staff and enjoy smooth operations from the very first minute. Let our AI handle your calls while your team focuses on patient care.
              </p>
            </div>
   
             {/* <div>
              <LiquidGlassButton/>
             </div> */}

             <div>
              <button
  className="flex justify-center items-center gap-3 px-2 py-2 w-[218px] h-[64px] 
             rounded-[100px] border border-white/100 
             bg-[rgba(255,255,255,0.10)] backdrop-blur-[7.5px]
             relative overflow-hidden"
  style={{
    background: "rgba(255, 255, 255, 0.10)",
    border: "0.8px solid #FFFFFF",
    backdropFilter: "blur(7.5px)",
  }}
>
  <span className="text-white font-medium text-lg">Start Now</span>
</button>

             </div>

            {/* Right Button with Liquid Glass Effect */}
            {/* <div className="relative">
              <button
                onClick={() => navigate('/signup')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="relative z-10 text-white font-semibold px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 
                           rounded-full sm:rounded-2xl transition-all duration-300 overflow-hidden
                           active:scale-95 text-sm sm:text-base md:text-lg lg:text-xl 
                           whitespace-nowrap cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.10)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: isHovered
                    ? '0 20px 60px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
                    : '',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                Start Now
                </button>
           
                <div
                  className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    opacity: isHovered ? 1 : 0,
                  }}
                />
                
        
                {isHovered && (
                  <div
                    className="absolute rounded-full pointer-events-none transition-all duration-500 ease-out"
                    style={{
                      width: '250px',
                      height: '250px',
                      left: `${mousePos.x}px`,
                      top: `${mousePos.y}px`,
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
                      filter: 'blur(25px)',
                    }}
                  />
                )}

              
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 60%)',
                  }}
                />

              
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-full sm:rounded-2xl pointer-events-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      filter: 'blur(30px)',
                      transform: 'scale(1.15)',
                      zIndex: -1,
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                )}

                

          
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CTABanner;