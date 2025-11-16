<<<<<<< HEAD
import Footer from "@/layout/Footer";
// import DoclineHeader from "@/layout/Navbar"
import CTABanner from "@/Teamplate/CTABanner";
import DoclineInterface from "@/Teamplate/ExamplesSection";
import FAQSection from "@/Teamplate/FAQSection";
import DoclineFeaturesSection from "@/Teamplate/FeatureSection";
import Functions from "@/Teamplate/Functions";
import Header from "@/Teamplate/Header";
import DoclineHero from "@/Teamplate/Hero";
import SecuritySection from "@/Teamplate/SequritySection";
import DoclineWorkflowSlider from "@/Teamplate/Slider";
import UpgradPlan from "@/Teamplate/UpgradPlan";
import TestimonialSection from "@/Teamplate/WonersSlider";

const Home = () => {
  return (
    <div className="bg-[#F3F6F6] ">
      <Header />
      <DoclineHero />
      <div id="features">
        <DoclineFeaturesSection />
      </div>
      <DoclineWorkflowSlider />
      <div id="examples">
        <DoclineInterface />
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
  );
};
=======

import Footer from "@/layout/Footer"
import NavbarShapes from "@/layout/Navbar"
// import DoclineHeader from "@/layout/Navbar"
import CTABanner from "@/Teamplate/CTABanner"
import DoclineInterface from "@/Teamplate/DoclineInterface"
import FAQSection from "@/Teamplate/FAQSection"
import DoclineFeaturesSection from "@/Teamplate/FeatureSection"
import Functions from "@/Teamplate/Functions"
// import Header from "@/Teamplate/Header"
import DoclineHero from "@/Teamplate/Hero"
import SecuritySection from "@/Teamplate/SequritySection"
import DoclineWorkflowSlider from "@/Teamplate/Slider"
import UpgradPlan from "@/Teamplate/UpgradPlan"
import TestimonialSection from "@/Teamplate/WonersSlider"


const Home = () => {
  return (
  <div className="bg-[#F3F6F6] ">
   
  {/* <Header /> */}
  <NavbarShapes/>
  <DoclineHero />
 <div id="features">
   <DoclineFeaturesSection />
 </div>
  <DoclineWorkflowSlider />
  <div id="examples">
    <DoclineInterface />
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
>>>>>>> 6424fb2d925a0ba2efc40cae5b04441dd52e94ee

export default Home;
