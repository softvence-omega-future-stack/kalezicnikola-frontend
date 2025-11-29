import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import icon from "../assets/svgIcon/herologo.svg";
import skipleft from "../assets/svgIcon/voiceskipLeft.svg";
import skipRight from "../assets/svgIcon/voiceskipRight.svg";
import speaker from "../assets/svgIcon/speaker.svg";
import play from "../assets/svgIcon/play.svg";
import borderIcon from "../assets/svgIcon/BorderPlay.svg";
import roundactiveImg from "../assets/svgIcon/activerecord.svg";
import roundImg from "../assets/svgIcon/recordbtnborder.svg";

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
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="min-h-screen  px-4 py-10 md:px-8 "
    >
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8  lg:px-30">
          {/* Left Section */}
          <div
            style={{ fontFamily: "Urbanist, sans-serif" }}
            className="flex flex-col justify-start"
          >
            <div className="mb-6 mt-9 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 mb-8 rounded-full bg-white shadow-sm">
                <img src={icon} alt="Docline Logo" className="w-5 h-5" />
                <span className="text-[#171C35] text-sm font-medium">
                  Real Examples
                </span>
              </div>
              <h1 className="mb-4 text-2xl sm:text-[32px] md:text-[64px] font-semibold text-[#171C35]">
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
            <div className="bg-[#526FFF] rounded-2xl p-6 mb-6">
              <div className="mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Appointment for Blood Draw
                </h3>
                <p className="text-blue-100 text-base">
                  General Practice Dr. Schmidt & Colleagues
                </p>
              </div>

              {/* Waveform */}
              {/* Waveform */}
              <div className="relative mb-6 overflow-hidden">
                {/* Waveform bars */}
                <div className="flex items-center justify-between gap-2 h-28 relative">
                  {waveSegments.map((segment, i) => {
                    const currentBar = Math.floor(
                      (currentTime / totalDuration) * waveSegments.length
                    );
                    const isActive = i === currentBar && isPlaying;

                    return (
                      <div
                        key={i}
                        className="flex-1 flex items-center justify-center relative"
                      >
                        {/* Wave bar */}
                        <div
                          className="w-full max-w-[60px] sm:max-w-[70px] md:max-w-[80px] lg:max-w-[90px] xl:max-w-[100px] rounded-full bg-white overflow-hidden transition-all duration-300 flex items-center justify-center relative"
                          style={{ height: `${segment.height}px` }}
                        >
                          {/* Always visible border image */}
                          <img
                            src={roundImg}
                            alt="border"
                            className="absolute inset-0 w-full h-full object-cover"
                          />

                          {/* Active round image inside the bar */}
                          {isActive && (
                            <img
                              src={roundactiveImg}
                              alt="active"
                              className="absolute inset-0 w-full h-full object-cover z-10"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Vertical moving line with icon */}
                  <div
                    className="absolute top-3 flex flex-col gap-1 items-center"
                    style={{
                      left: `${(currentTime / totalDuration) * 100}%`,
                      height: "100px", // line height
                    }}
                  >
                    {/* Vertical line */}
                    <div className="w-[2px] h-full bg-white "></div>

                    {/* Icon at bottom of line */}

                    <img
                      src={borderIcon}
                      alt="cursor-icon"
                      className="  self-stretch"
                    />
                  </div>
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
                <div key={index} className="relative overflow-visible">
                  {/* Shadow overlay */}
                  <div
                    className="absolute inset-0 rounded-[24px] pointer-events-none"
                    style={{
                      boxShadow: "0 -20px 50px rgba(147, 170, 189, 0.3)",
                    }}
                  ></div>

                  {/* Card */}
                  <div className="w-full flex flex-col items-start gap-6 p-6 h-[97px] rounded-[24px] border border-white bg-white shadow-md hover:shadow-lg transition-shadow relative">
                    <div className="text-left flex-1">
                      <h4 className="text-[#171C35] font-semibold text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#111A2D] text-sm md:text-base">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Play button */}
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 group-hover:bg-blue-500 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 absolute right-6 top-1/2 -translate-y-1/2"
                      onClick={() => console.log(`Play ${item.title}`)}
                    >
                      <img src={play} alt="play" />
                    </button>
                  </div>
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
