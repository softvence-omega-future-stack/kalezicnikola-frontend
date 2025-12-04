import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import icon from "../assets/svgIcon/herologo.svg";
import skipleft from "../assets/svgIcon/voiceskipLeft.svg";
import skipRight from "../assets/svgIcon/voiceskipRight.svg";
import speaker from "../assets/svgIcon/speaker.svg";
import borderIcon from "../assets/svgIcon/BorderPlay.svg";
import roundactiveImg from "../assets/svgIcon/activerecord.svg";
import roundImg from "../assets/svgIcon/recordbtnborder.svg";
import './buttom.css';
import SectionHeader from "./SectionHeader";
import { useTranslation } from "react-i18next";

// ========================================
// TYPES
// ========================================
interface MenuItem {
  title: string;
  subtitle: string;
}

// ========================================
// SVG PLAY ICON COMPONENT
// ========================================
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

// ========================================
// MAIN COMPONENT
// ========================================
const ExampleSection: React.FC = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeAudioIndex, setActiveAudioIndex] = useState(0);
  const totalDuration = 100;

  // ✅ Translation fix: assert type to MenuItem[]
  const menuItems: MenuItem[] = t("landingPage.exampleSection.menuItems", { returnObjects: true }) as MenuItem[];

  // Handle card click
  const handleCardClick = (index: number) => {
    if (activeAudioIndex === index) {
      setIsPlaying(prev => !prev);
    } else {
      setActiveAudioIndex(index);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const handlePrevious = () => {
    setActiveAudioIndex(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleNext = () => {
    setActiveAudioIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
    setIsPlaying(true);
    setCurrentTime(0);
  };

  // Audio playback simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= totalDuration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div style={{ fontFamily: "Urbanist, sans-serif" }} className="mt-12 md:mt-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-8">
        <SectionHeader
          badgeIcon={icon}
          badgeText={t("landingPage.exampleSection.badge")}
          heading={t("landingPage.exampleSection.heading")}
          subText={t("landingPage.exampleSection.subText")}
          align="left"
          subAlign="left"
        />

        {/* Right Section - Audio Cards */}
        <div className="w-full">
          <div className="-space-y-1">
            {menuItems.map((item, index) => {
              const isActive = activeAudioIndex === index;

              return (
                <div key={index} className="relative">
                  <div
                    className={`w-full flex flex-col p-4 sm:p-6 rounded-xl md:rounded-3xl border border-white shadow-[0_-20px_50px_rgba(147,170,189,0.30)] transition-all duration-300 ease-in-out relative cursor-pointer ${isActive ? 'bg-[#526FFF]' : 'bg-white'}`}
                    onClick={() => handleCardClick(index)}
                  >
                    {/* Title & Subtitle */}
                    <div className="flex items-start justify-between w-full mb-4">
                      <div className="text-left flex-1 pr-16">
                        <h4 className={`font-semibold text-base sm:text-xl mb-1 ${isActive ? 'text-white' : 'text-headingBlack'}`}>
                          {item.title}
                        </h4>
                        <p className={`text-sm md:text-base ${isActive ? 'text-blue-100' : 'text-subHeadingBlack'}`}>
                          {item.subtitle}
                        </p>
                      </div>

                      {!isActive && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCardClick(index); }}
                          className="w-12 h-12 bg-gray-200 hover:bg-[#526FFF] cursor-pointer rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out shadow-lg flex-shrink-0"
                        >
                          <SvgPlayIcon size={24} fill="#FFFFFF" />
                        </button>
                      )}
                    </div>

                    {/* Accordion Content */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                      {/* Waveform */}
                      <div className="relative mb-6 overflow-hidden">
                        <div className="flex items-center justify-between  h-28 w-full relative">
                          {Array.from({ length: 6 }).map((_, i) => {
                            const currentBar = Math.floor((currentTime / totalDuration) * 6);
                            const isBarActive = i === currentBar && isPlaying;

                            return (
                              <div key={i} className="flex-1 flex items-center justify-center relative">
                                <div
                                  className="w-full rounded-full bg-white overflow-hidden transition-all duration-300 flex items-center justify-center relative"
                                  style={{ height: "45px" }}
                                >
                                  <img src={roundImg} alt="border" className="absolute inset-0 w-full h-full object-cover" />
                                  {isBarActive && <img src={roundactiveImg} alt="active" className="absolute w-full h-full object-cover z-10" />}
                                </div>
                              </div>
                            );
                          })}

                          <div
                            className="absolute top-3 flex flex-col gap-1 items-center"
                            style={{ left: `${(currentTime / totalDuration) * 100}%`, height: "100px" }}
                          >
                            <div className="w-0.5 h-full bg-white"></div>
                            <img src={borderIcon} alt="cursor-icon" className="self-stretch" />
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-white text-sm">0:30</span>
                        <div className="flex items-center gap-3">
                          <button onClick={(e) => { e.stopPropagation(); handlePrevious(); }} className="hover:scale-110 transition-transform">
                            <img src={skipleft} alt="skip left" />
                          </button>

                          <button
                            style={{ boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset,-6px -11px 18px 0 rgba(255,255,255,0.16) inset,1px 1px 0 -0.4px #FFF inset,-1px -1px 0 -0.5px #FFF inset`, backdropFilter: "blur(5px)" }}
                            onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                            className="w-12 h-12 backdrop-blur-xl rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg"
                          >
                            {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
                          </button>

                          <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="hover:scale-110 transition-transform">
                            <img src={skipRight} alt="skip right" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm">-1:23</span>
                          <img src={speaker} alt="speaker" />
                        </div>
                      </div>
                    </div>
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

export default ExampleSection;
