

import CTABanner from "@/Teamplate/CTABanner";



import ExampleSection from "@/Teamplate/ExamplesSection";
import FAQSection from "@/Teamplate/FAQSection";
import DoclineFeaturesSection from "@/Teamplate/FeatureSection";
import Functions from "@/Teamplate/Functions";
import Header from "@/Teamplate/Header";
import DoclineHero from "@/Teamplate/DoclineHero";
import SecuritySection from "@/Teamplate/SequritySection";

import UpgradPlan from "@/Teamplate/UpgradPlan";
import TestimonialSection from "@/Teamplate/WonersSlider";
import Footer from "@/layout/Footer";
import Slider from "@/Teamplate/Slider";

const Home = () => {
  return (
 <div className="bg-[#F3F6F6] ">
  <Header />
  <DoclineHero />

  {/* content wrapper */}
  <div className="mx-[75px]">
    <div id="features">
      <DoclineFeaturesSection />
    </div>
  </div>

  {/* Slider full width */}
  < Slider/>

  <div className="mx-[75px]">
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
    <FAQSection />
    <CTABanner />
    <Footer />
  </div>
</div>

  );
};


export default Home
