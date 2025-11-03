
import Footer from "@/layout/Footer"
import CTABanner from "@/Teamplate/CTABanner"
import DoclineInterface from "@/Teamplate/DoclineInterface"
import FAQSection from "@/Teamplate/FAQSection"
import DoclineFeaturesSection from "@/Teamplate/FeatureSection"
import Functions from "@/Teamplate/Functions"
import Header from "@/Teamplate/Header"
import DoclineHero from "@/Teamplate/Hero"
import SecuritySection from "@/Teamplate/SequritySection"
import DoclineWorkflowSlider from "@/Teamplate/Slider"
import UpgradPlan from "@/Teamplate/UpgradPlan"
import TestimonialSection from "@/Teamplate/WonersSlider"


const Home = () => {
  return (
    <div className="bg-[#F3F6F6]">
      <Header/>
      <DoclineHero/>
      <DoclineFeaturesSection/>
     <DoclineWorkflowSlider/>
     <DoclineInterface/>
     <Functions/>
     <SecuritySection/>
     <TestimonialSection/>
     <UpgradPlan/>
     <FAQSection/>
     <CTABanner/>
     <Footer/>
    </div>
  )
}

export default Home
