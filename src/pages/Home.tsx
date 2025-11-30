import CTABanner from "@/Teamplate/CTABanner";
import ExampleSection from "@/Teamplate/ExamplesSection";
import FAQSection from "@/Teamplate/FAQSection";
import DoclineFeaturesSection from "@/Teamplate/FeatureSection";
import Functions from "@/Teamplate/Functions";

import DoclineHero from "@/Teamplate/DoclineHero";
import SecuritySection from "@/Teamplate/SequritySection";

import UpgradPlan from "@/Teamplate/UpgradPlan";
import TestimonialSection from "@/Teamplate/WonersSlider";
import Footer from "@/layout/Footer";
import Slider from "@/Teamplate/Slider";
import Navbar from "@/layout/Navbar";


const Home = () => {
  return (
 <div className="bg-[#F3F6F6] ">
<Navbar/>
  <DoclineHero />

  {/* content wrapper */}
  <div className="">
    <div id="features">
      <DoclineFeaturesSection />
    </div>
  </div>

  {/* Slider full width */}
  < Slider/>

  <div className=" mx-4 lg:mx-[75px]">
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
    {/* <LequidButton/> */}
   
  </div>
   <Footer />
</div>

  );
};


export default Home
