import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import icon from "../assets/svgIcon/herologo.svg";
import skipleft from "../assets/svgIcon/voiceskipLeft.svg";
import skipRight from "../assets/svgIcon/voiceskipRight.svg";
import speaker from "../assets/svgIcon/speaker.svg";
import play from "../assets/svgIcon/play.svg";

const DoclineInterface: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(33);
  const totalDuration = 100;

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const menuItems = [
    { title: "Lectures & Training", subtitle: "Orthopedics Dr. Gruber" },
    {
      title: "Appointment Rescheduling/Cancellation",
      subtitle: "Dental Practice Dr. Meier",
    },
    { title: "Insurance Questions", subtitle: "Physiotherapy Dr. Fuchs" },
    {
      title: "Booking a Preventive Appointment",
      subtitle: "General Practice Dr. Koch",
    },
    { title: "Request for Referrals", subtitle: "Dermatology Dr. Wagner" },
  ];

  const waveSegments = [
    { height: 45, time: "0:00" },
    { height: 45, time: "0:30" },
    { height: 45, time: "1:00" },
    { height: 45, time: "1:30" },
    { height: 45, time: "2:00" },
    { height: 45, time: "2:30" },
  ];

  return (
    <div className="min-h-screen  px-4 py-10 md:px-8 mt-20">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  lg:px-30">
          {/* Left Section */}
          <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="flex flex-col justify-start">
            <div className="mb-6 mt-9">
              <div className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 mb-8 rounded-full bg-white shadow-sm">
                <img src={icon} alt="Docline Logo" className="w-5 h-5" />
                <span className="text-[#171C35] text-sm font-medium">
                  Real Examples
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
                This is what Docline sounds <br className="hidden md:block" />{" "}
                like in everyday practice
              </h1>
            </div>
            <p className="text-[#111A2D] text-base md:text-lg leading-relaxed">
              Your patients will hardly notice the difference. Easily <br />
              adapt the AI assistant's voice to your practice's style. Choose{" "}
              <br /> a confident male or female voice. This ensures a smooth and{" "}
              <br /> professional reception for every call.
            </p>
          </div>

          {/* Right Section */}
          <div className=" p-6 md:p-8 w-full">
            {/* Audio Player */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 mb-6">
              <div className="mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Appointment for Blood Draw
                </h3>
                <p className="text-blue-100 text-base">
                  General Practice Dr. Schmidt & Colleagues
                </p>
              </div>

              {/* Waveform */}
              <div className="relative mb-6">
                <div className="flex items-center justify-between mb-2 px-1">
                  {waveSegments.map((segment, i) => {
                    const currentBar = Math.floor(
                      (currentTime / totalDuration) * 6
                    );
                    const isActive = currentBar === i && isPlaying;
                    return (
                      <div key={i} className="flex-1 flex justify-center">
                        {isActive ? (
                          <span className="text-white text-xs font-medium">
                            {segment.time}
                          </span>
                        ) : (
                          <span className="text-xs opacity-0">
                            {segment.time}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-2 h-16">
                {waveSegments.map((segment, i) => {
  const currentBar = Math.floor((currentTime / totalDuration) * 6);
  const isActive = currentBar === i && isPlaying;
  return (
    <div key={i} className="flex-1 flex items-center justify-center">
      <div
        className={`w-full rounded-full transition-all duration-300 ${
          isActive ? "bg-white" : "bg-white/50"
        }`}
        style={{ height: `${segment.height}px` }} 
      ></div>
    </div>
  );
})}

                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-white text-xs mb-2">
                  <span>0:00</span>
                  <span>2:45</span>
                </div>
                <div className="relative h-1 bg-blue-400/30 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${currentTime}%` }}
                  ></div>
                  <div
                    className="absolute w-3 h-3 bg-white rounded-full top-1/2 -translate-y-1/2 shadow-lg"
                    style={{ left: `${currentTime}%`, marginLeft: "-6px" }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-white text-sm">0:30</span>
                <div className="flex items-center gap-3">
                  <button className="hover:scale-110 transition-transform">
                    <img src={skipleft} alt="skip left" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause size={20} className="text-blue-500" />
                    ) : (
                      <Play size={20} className="text-blue-500 ml-1" />
                    )}
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <img src={skipRight} alt="skip right" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">-1:23</span>
                  <img src={speaker} alt="speaker" />
                </div>
              </div>
            </div>

            {/* Menu Items */}
         <div className="-space-y-1 -mt-5">
  {menuItems.map((item, index) => (
    <div key={index} className="relative overflow-visible ">
      {/* Shadow */}
      <div
        className="absolute inset-x-0 top-6 bottom-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: "0 10px 15px -5px rgba(147, 170, 189, 0.3), 0 4px 6px -2px rgba(147, 170, 189, 0.2)",
        }}
      ></div>

      {/* Card */}
      <button className="w-full bg-white  shadow rounded-3xl p-4 flex items-center justify-between relative border border-gray-200">
        <div className="text-left">
          <h4 className="text-[#171C35] font-semibold text-lg mb-1">
            {item.title}
          </h4>
          <p className="text-[#111A2D] text-sm md:text-base s ">{item.subtitle}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 group-hover:bg-blue-500 flex items-center justify-center transition-colors flex-shrink-0 ml-4 cursor-pointer">
          <img src={play} alt="play" />
        </div>
      </button>
    </div>
  ))}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoclineInterface;









