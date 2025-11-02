
import DoclineFeaturesSection from "@/Teamplate/FeatureSection"
import Header from "@/Teamplate/Header"
import DoclineHero from "@/Teamplate/Hero"
import DoclineWorkflowSlider from "@/Teamplate/Slider"


const Home = () => {
  return (
    <div className="bg-[#F3F6F6]">
      <Header/>
      <DoclineHero/>
      <DoclineFeaturesSection/>
     <DoclineWorkflowSlider/>
    </div>
  )
}

export default Home
