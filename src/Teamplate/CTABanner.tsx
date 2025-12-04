import React from "react";
import img from "@/assets/img/glass.png";

import "./bnnarButon.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CTABanner: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation()
  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="w-full max-[767px]:px-1 mt-12 md:mt-[120px] relative"
    >
      <div className="">
        <div className="bg-[#526FFF] rounded-3xl sm:rounded-[2.5rem] md:rounded-[40px] p-6 sm:p-8 md:p-10 lg:p-[85px] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Content */}
            <div className="flex-1 max-w-full lg:max-w-3xl">
              <h2 className="text-xl sm:text-2xl md:text-5xl font-semibold text-white leading-[120%] mb-4 sm:mb-5 md:mb-7">
                {t("landingPage.ctaBanner.heading")}
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-normal leading-[140%] text-blue-50">
               {t("landingPage.ctaBanner.description")}
              </p>
            </div>

            {/* Button */}
            <div className="w-full lg:w-auto mt-4 lg:mt-0 flex justify-center">
              <button
                onClick={() => navigate("/login")}
                className="btn w-full lg:w-[218px] py-4 text-base leading-4 font-semibold rounded-full cursor-pointer text-white bg-white/10"
              >
                {t("landingPage.ctaBanner.buttonText")}
              </button>
            </div>
          </div>

      

          {/* Right-bottom image */}
          <img
            src={img}
            alt="CTA Illustration"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "auto",
              height: "auto",
              maxHeight: "100%", // limits image to 3/4 of container height
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CTABanner;

