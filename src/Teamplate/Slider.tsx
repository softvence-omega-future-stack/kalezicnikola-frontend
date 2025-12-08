import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import icon from "../assets/svgIcon/herologo.svg";
import img1 from "../assets/svgIcon/taskSlider.svg";
import img2 from "../assets/svgIcon/callogsSlider.svg";
import img3 from "../assets/svgIcon/slider3.svg";
import img4 from "../assets/svgIcon/slider4.svg";

// -----------------------------
// Slide type
// -----------------------------
interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  cardBadge: string;
  list: string[];
  img: string;
  bgColor: string;
}

interface DashboardSlideProps extends SlideData {
  isActive?: boolean;
}

// -----------------------------
// Slide Component
// -----------------------------
const DashboardSlide: React.FC<DashboardSlideProps> = ({
  bgColor,
  title,
  cardBadge,
  subtitle,
  list,
  img,
  isActive,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`
        ${bgColor} rounded-3xl relative overflow-hidden flex flex-col transition-all duration-700 transform mx-auto w-full
        ${isActive ? "opacity-100" : "opacity-90"}
        min-h-[420px] md:min-h-[500px] lg:min-h-[530px]
        px-4 pt-4 pb-2 md:px-6 md:pt-6 md:pb-4 lg:px-8 lg:pt-8 lg:pb-0
      `}
    >
      {/* CONTENT */}
      <div className="relative z-10 shrink-0 flex flex-col lg:flex-row items-start justify-between w-full gap-3 mb-2 md:mb-4 lg:mb-6">
        <div className="flex-1">
          {/* Label */}
          <div className="flex w-fit items-center text-xs font-medium text-[#3B82F6] mb-2 rounded-full py-1.5 px-2.5 border border-[#3B82F6] gap-2">
            <img src={icon} alt="" className="w-4 h-4" />
            {t(cardBadge)}
          </div>

          {/* Title & Subtitle */}
          <div className="flex flex-col lg:flex-row gap-y-1.5 justify-between">
            <div>
              <h2 className="text-base md:text-xl lg:text-2xl font-medium text-[#171C35] leading-tight mb-1.5 md:mb-4">
                {t(title)}
              </h2>
              <p className="text-headingBlack text-xs max-w-md md:text-base font-normal leading-normal mb-1.5 md:mb-0">
                {t(subtitle)}
              </p>
            </div>

            {/* Feature List */}
            <ul className="list-disc pl-4 text-[11px] md:text-sm font-normal text-headingBlack space-y-0.5 md:space-y-4 flex-shrink-0">
              {list.map((item, i) => (
                <li key={i}>{t(item)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative flex-1 w-full h-full mt-auto flex items-end justify-center overflow-hidden">
        <img
          src={img}
          alt={t(title)}
          className="w-full h-auto max-h-[440px] md:max-h-[260px] lg:max-h-[320px] object-contain object-bottom select-none"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>
    </div>
  );
};

// -----------------------------
// Slider Component
// -----------------------------
const Slider: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // -----------------------------
  // Get slides from i18n
  // -----------------------------
  const slides: SlideData[] = (t("landingPage.slider.slides", { returnObjects: true }) as SlideData[]).map(
    (slide) => ({
      ...slide,
      img:
        slide.img === "slider1.svg"
          ? img1
          : slide.img === "Slider02.svg"
          ? img2
          : slide.img === "slider3.svg"
          ? img3
          : slide.img === "slider4.svg"
          ? img4
          : "",
    })
  );

  return (
    <section className="mt-12 md:mt-[120px] max-[767px]:px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-[92%] mx-auto mb-6">
        <SectionHeader
          badgeIcon={icon}
          badgeText={t("landingPage.slider.badge")}
          heading={t("landingPage.slider.heading")}
          align="left"
          subAlign="right"
        />
        <p className="text-base leading-[140%] md:text-lg font-normal text-subHeadingBlack max-w-sm text-center md:text-left -mt-8 md:mt-0">
          {t("landingPage.slider.subText")}
        </p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={isMobile ? false : { delay: 5000, disableOnInteraction: false }}
        spaceBetween={30}
        breakpoints={{
          768: { spaceBetween: 40 },
          1024: { spaceBetween: 50 },
        }}
        coverflowEffect={{ rotate: 0, stretch: -50, depth: 200, modifier: 2, slideShadows: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="!w-[343px] md:!w-[600px] lg:!w-[1040px] pt-5 pb-8 md:pt-5 md:pb-10 transition-transform duration-700"
          >
            {({ isActive }) => (
              <div className={`transition-all duration-700 ${isActive ? "scale-100" : "scale-90 lg:scale-[0.9]"}`}>
                <DashboardSlide {...slide} isActive={isActive} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              index === activeIndex ? "w-8 bg-black" : "w-2.5 bg-[#D0D5DD]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;