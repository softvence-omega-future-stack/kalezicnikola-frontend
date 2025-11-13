import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import icon from "../assets/svgIcon/herologo.svg";
import skipleft from "../assets/svgIcon/voiceskipLeft.svg";
import skipRight from "../assets/svgIcon/voiceskipRight.svg";
import speaker from "../assets/svgIcon/speaker.svg";
import borderIcon from "../assets/svgIcon/BorderPlay.svg";
import roundactiveImg from "../assets/svgIcon/activerecord.svg";
import roundImg from "../assets/svgIcon/recordbtnborder.svg";
import './buttom.css'


const SvgPlayIcon = ({ fill = "#526FFF", size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <mask
      id="mask0_2987_5353"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="30"
      height="30"
    >
      <path
        d="M15.9974 29.3327C23.3614 29.3327 29.3307 23.3633 29.3307 15.9993C29.3307 8.63535 23.3614 2.66602 15.9974 2.66602C8.6334 2.66602 2.66406 8.63535 2.66406 15.9993C2.66406 23.3633 8.6334 29.3327 15.9974 29.3327Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13.3281 15.9995V11.3809L17.3281 13.6902L21.3281 15.9995L17.3281 18.3089L13.3281 20.6182V15.9995Z"
        fill="black"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#mask0_2987_5353)">
      <path d="M0 0H32V32H0V0Z" fill={fill} />
    </g>
  </svg>
);

const DoclineInterface: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(33);
  const totalDuration = 100;
  const [activeAudioIndex, setActiveAudioIndex] = useState<number>(0);

  const handlePlayListItem = (index: number) => {
    if (activeAudioIndex === index) {
      setIsPlaying((prev) => !prev);
    } else {
      setActiveAudioIndex(index);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

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
      className=" px-9 md:mt-[180px] lg:mt-[180px] xl:mt-[180px] md:px-8 "
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-30">
        {/* Left Section */}
        <div className="flex flex-col justify-start">
          <div className="mb-4 mt-9">
            <div className="relative inline-flex items-center mb-4 gap-2  liquid-glass liquid-glass-md liquid-glass-rounded-xl ">
              <img src={icon} alt="Docline Logo" className="w-5 h-5" />
              <span className="text-[#171C35] text-sm font-medium">
                Real Examples
              </span>
             
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-14 mb-7">
              This is what Docline sounds <br className="hidden md:block" /> like
              in everyday practice
            </h1>
          </div>
          <p className="text-[#111A2D] text-base md:text-lg leading-relaxed">
            Your patients will hardly notice the difference. Easily <br />
            adapt the AI assistant's voice to your practice's style. Choose
            <br /> a confident male or female voice. This ensures a smooth and
            professional reception for every call.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-6 md:p-8 w-full">
          {/* Audio Player */}
          <div className="bg-[#526FFF] rounded-2xl p-5 mb-6">
            <div className="mb-4">
              <h3 className="text-white text-xl font-semibold mb-2">
                {menuItems[activeAudioIndex].title}
              </h3>
              <p className="text-blue-100 text-base">
                {menuItems[activeAudioIndex].subtitle}
              </p>
            </div>

            {/* Waveform */}
            <div className="relative mb-6 overflow-hidden">
              <div className="flex items-center justify-between gap-2 h-28 w-full relative">
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
                      <div
                        className="w-full h-10 rounded-full bg-white transition-all duration-300 flex items-center justify-center relative"
                        style={{ height: `${segment.height}px` }}
                      >
                        <img
                          src={roundImg}
                          alt="border"
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                        {isActive && (
                          <img
                            src={roundactiveImg}
                            alt="active"
                            className="relative z-10 h-full w-full"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Moving Line with Icon */}
                <div
                  className="absolute top-3 flex flex-col gap-1 items-center"
                  style={{
                    left: `${(currentTime / totalDuration) * 100}%`,
                    height: "100px",
                  }}
                >
                  <div className="w-0.5 h-full bg-white "></div>
                  <img
                    src={borderIcon}
                    alt="cursor-icon"
                    className="self-stretch"
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
                <button
  onClick={() => {
    setActiveAudioIndex((prev) =>
      prev > 0 ? prev - 1 : menuItems.length - 1
    );
    setIsPlaying(true);
    setCurrentTime(0);
  }}
  className="hover:scale-110 transition-transform"
>
  <img src={skipleft} alt="skip left" />
</button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 border border-white backdrop-blur-xl  rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-white" />
                  ) : (
                    <Play size={20} className="text-white ml-1" />
                  )}
                </button>

              <button
  onClick={() => {
    setActiveAudioIndex((prev) =>
      prev < menuItems.length - 1 ? prev + 1 : 0
    );
    setIsPlaying(true);
    setCurrentTime(0);
  }}
  className="hover:scale-110 transition-transform"
>
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
            {menuItems.map((item, index) => {
              const isThisItemPlaying =
                activeAudioIndex === index && isPlaying;
              return (
                <div key={index} className="relative overflow-visible">
                  <div
                    className="absolute inset-0 rounded-[24px] pointer-events-none"
                    style={{
                      boxShadow: "0 -20px 50px rgba(147, 170, 189, 0.3)",
                    }}
                  ></div>

                  <div className="w-full flex flex-col items-start gap-6 p-6 h-[97px] rounded-[24px] border border-white bg-white shadow-md hover:shadow-lg transition-shadow relative">
                    <div className="text-left flex-1">
                      <h4 className="text-[#171C35] font-semibold text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#111A2D] text-sm md:text-base">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Play/Pause button */}
                    <button
                      onClick={() => handlePlayListItem(index)}
                      className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg absolute right-6 top-1/2 -translate-y-1/2"
                    >
                      {isThisItemPlaying ? (
                        <Pause size={20} className="text-white" />
                      ) : (
                        <SvgPlayIcon size={24} fill="#FFFFFF" className="ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoclineInterface;
