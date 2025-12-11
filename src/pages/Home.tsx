import  { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CTABanner from "@/Teamplate/CTABanner";
import ExampleSection from "@/Teamplate/ExamplesSection";
import FAQSection from "@/Teamplate/FAQSection";
import DoclineFeaturesSection from "@/Teamplate/FeatureSection";
import Functions from "@/Teamplate/Functions";

import DoclineHero from "@/Teamplate/DoclineHero";
import SecuritySection from "@/Teamplate/SequritySection";
import UpgradPlan from "@/Teamplate/UpgradPlan";
import TestimonialSection from "@/Teamplate/Testimonials";
import Slider from "@/Teamplate/Slider";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="bg-[#F3F6F6]" id="home">
      <DoclineHero />

      <div className="w-[92%] mx-auto">
        <div id="features">
          <DoclineFeaturesSection />
        </div>
      </div>

      <Slider />

      <div className="w-[92%] mx-auto">
        <div id="examples">
          <ExampleSection />
        </div>
        <Functions />
        <SecuritySection />
        <div id="testimonials">
          <TestimonialSection />
        </div>
        <div id="pricing">
          <UpgradPlan />
        </div>

        <div id="faq">
          <FAQSection />
        </div>

        <CTABanner />
      </div>
    </div>
  );
};

export default Home;
