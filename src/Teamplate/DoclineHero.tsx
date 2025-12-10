import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import heroImg from "../assets/svgIcon/heroImg.svg";
import tabImg from "../assets/svgIcon/Hero tab.png";
import herologo from "../assets/svgIcon/herologo.svg";

const DoclineHero: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Helper function to render text with line breaks
  const renderTextWithBreaks = (text: string, delimiter: string = "|||") => {
    if (!text.includes(delimiter)) {
      return text;
    }

    return text.split(delimiter).map((part, index, array) => (
      <React.Fragment key={index}>
        {part}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <section className="w-full bg-[#F3F6F6] pt-19 md:pt-[190px]">
      <div className="w-full flex flex-col lg:flex-row items-start justify-between sm:px-0 sm:pl-8 lg:pl-20 gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 px-4 sm:px-0">
          <div className="text-center md:text-left mb-6 md:mb-10">
            {/* Badge */}
            <div
              style={{
                boxShadow: `-6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                1.2px 1.2px 0 -0.4px #FFF inset, 
                -1.2px -1.2px 0 -0.5px #FFF inset`,
                padding: "10px 20px",
                backdropFilter: "blur(5px)",
                fontFamily: "Urbanist, sans-serif",
                color: "#171C35",
              }}
              className="relative inline-flex items-center gap-2 backdrop-blur-lg sm:pr-5 sm:pl-2.5 py-2 bg-gray-200/20 rounded-full mb-3 md:mb-5 mx-auto md:mx-0"
            >
              <img src={herologo} alt="" className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-medium">
                {t("landingPage.hero.badge")}
              </span>
            </div>

            {/* Heading with custom line breaks */}
            <h1 className="mb-4 text-[40px] sm:text-[52px] leading-[120%] lg:text-[64px] xl:w-2xl sm:pr-5 md:pr-0 font-semibold text-[#171C35]">
              {renderTextWithBreaks(t("landingPage.hero.heading"))}
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "Urbanist, sans-serif",
                color: "#171C35",
              }}
              className="max-w-lg mx-auto md:mx-0 leading-[140%] text-base sm:text-lg md:text-xl text-center md:text-left"
            >
              {renderTextWithBreaks(t("landingPage.hero.subText"))}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row w-full items-center gap-3 sm:pr-5 md:pr-0">
            <button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto py-4 px-6 md:py-5 leading-4 md:px-12 rounded-[25px] sm:rounded-[12px] text-base font-semibold bg-[#526FFF] text-white cursor-pointer"
            >
              {t("landingPage.hero.getStarted")}
            </button>
            <button onClick={()=> navigate("/dashboard/calendar?openModal=true")} className="w-full md:w-auto py-3 px-6 leading-4 md:py-5 md:px-12 rounded-[25px] sm:rounded-[12px] text-base font-semibold border border-[#526FFF] text-[#526FFF] bg-[rgba(82,111,255,0.1)] cursor-pointer">
              {t("landingPage.hero.bookDemo")}
            </button>
          </div>
        </div>

        <div></div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 -mt-5 lg:-mb-50 md:-mb-40 sm:-mb-20">
          {/* Mobile Image (0–639px) */}
          <img
            src={heroImg}
            alt="Hero Mobile"
            className="block sm:hidden w-full object-contain"
          />

          {/* Tablet Image (640–767px) */}
          <img
            src={tabImg}
            alt="Hero Tablet"
            className="hidden sm:block md:hidden w-full object-contain"
          />

          {/* Desktop Image (768px+) */}
          <img
            src={heroImg}
            alt="Hero Desktop"
            className="hidden md:block w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DoclineHero;