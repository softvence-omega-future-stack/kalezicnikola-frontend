
import icon from "../assets/svgIcon/herologo.svg";
import img1 from '../assets/svgIcon/Interface1.svg'
import img2 from '../assets/svgIcon/interface2.svg'
import img3 from '../assets/svgIcon/interface3.svg'


import img6 from '../assets/svgIcon/interface6.svg'
import './buttom.css'

const Functions = () => {
  return (
    <section  style={{ fontFamily: 'Urbanist, sans-serif' }} className="xl:mt-[180px] lg:mt-[180px] mt-5 ">
      <div className=" px-4 sm:px-6 lg:px-8 mx-10">

     <div className="text-start mb-16 ">
        <div className="relative inline-flex glass items-center gap-2 pr-5 pl-2.5 py-2   mb-4">
          <img src={icon} alt="" />
          <span className="text-[#171C35] text-sm font-medium">Our Core Functions</span>

        
  
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-12">
           Everything you need to ease <br /> the burden on your practice
        </h2>
      </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
  {/* Feature 1 - Reduzierte Telefonlast */}
<div
  className="relative p-6 sm:p-8"
  style={{
    borderRadius: "30px",
    border: "1px solid #FFF",
    background: `
      radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 100%),
      radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.50) 0%, rgba(43, 142, 255, 0.00) 100%),
      rgba(255, 255, 255, 0.50)
    `,
    backdropFilter: "blur(50px)",
    fontFamily: "Urbanist, sans-serif",
    overflow: "hidden", // ensures image respects card border-radius
  }}
>
  <h3 className="text-2xl sm:text-3xl font-semibold text-[#171C35] mb-4">
    Reduzierte Telefonlast
  </h3>
  <p className="text-sm sm:text-base text-[#171c35] mb-6 leading-relaxed">
    Befreien Sie Ihr Personal von Routineanfragen. Unser KI-Voicebot übernimmt Terminbuchungen, Rezept- und Routinefragen 24/7, damit Ihr Team auf die Patienten konzentrieren kann.
  </p>

  {/* Dashboard Preview Image */}
  <div
    className="absolute"
    style={{
      left: "0",            // aligns with card’s left padding internally
      bottom: "0",          // touches bottom border
      right: "0",           // touches right border
      borderRadius: "inherit",
      overflow: "hidden",
    }}
  >
    <img src={img1} alt="" className="block w-full h-auto" />
  </div>
</div>




{/* Feature 2 - Menschliche KI-Kommunikation */}
<div
  className="relative p-6 sm:p-8"
  style={{
    borderRadius: "30px",
    border: "1px solid #FFF",
    background: "#FFF",
    backdropFilter: "blur(50px)",
    fontFamily: "Urbanist, sans-serif",
    overflow: "hidden", // card rounded
  }}
>
  <h3 className="text-2xl sm:text-3xl font-semibold text-[#171C35] mb-4">
    Menschliche KI-Kommunikation
  </h3>
  <p className="text-sm sm:text-base text-[#171c35] mb-6 leading-relaxed">
    Docline ist die nächste Generation in der Patientenkommunikation. Er versteht Kontext, Sprachen und Dringlichkeit und verarbeitet Anliegen mit menschlicher Präzision.
  </p>

  {/* Audio Waveform Visualization */}
  <div
    className="absolute bottom-0 right-0 left-0"
    style={{
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      overflow: "hidden",
    }}
  >
    <img src={img2} alt="" className="w-full h-auto pl-5" />
    <img src={img3} alt="" className="w-full h-auto" />
  </div>
</div>





          {/* Feature 3 - Multilingual */}
        <div className='flex flex-col gap-3'>
          {/* Feature 3 - Multilingual */}
<div
  className="relative flex flex-col justify-between h-[350px] p-6 sm:p-8"
  style={{
    borderRadius: "30px",
    border: "1px solid #FFF",
    background: "#FFF",
    backdropFilter: "blur(50px)",
    fontFamily: "Urbanist, sans-serif",
    overflow: "hidden", // ensures images respect card border-radius
  }}
>
  {/* Top Text */}
  <div>
    <h3 className="text-2xl sm:text-3xl font-semibold text-[#171C35] mb-2">
      Multilingual
    </h3>
    <p className="text-sm sm:text-base text-[#171c35] leading-relaxed pb-[143px]">
      Unser Voicebot kommuniziert fließend in über 25 Fremdsprachen.
    </p>
  </div>

  {/* Centered Image */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    {/* <img src={img5} alt="" style={{ borderRadius: "inherit" }} /> */}
<button
  className="flex justify-center items-center text-[#3B5CFF] mt-[143px] "
  style={{
    width: "208px",
    height: "70px",
    borderRadius: "30px",
    border: "1px solid #FFF",
    background: `
      radial-gradient(77.75% 73.99% at 100% 106.39%, rgba(71, 43, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 100%),
      radial-gradient(138.26% 157.29% at -16.83% -75.11%, rgba(61, 165, 245, 0.50) 0%, rgba(43, 142, 255, 0.00) 100%),
      rgba(255, 255, 255, 0.50)
    `,
    backdropFilter: "blur(50px)",
    fontFamily: "Urbanist, sans-serif",
    fontWeight: 600,
    fontSize: "25px",
    flexShrink: 0,
    cursor: "pointer",
     // remove extra padding to keep text centered
  }}
>
  25+ Sprachen
</button>


  </div>
</div>


{/* Feature 4 - DSGVO */}
<div
  className="relative flex flex-col justify-between h-[350px] p-6 sm:p-8"
  style={{
    borderRadius: "30px",
    border: "1px solid #FFF",
    background: "#FFF",
    backdropFilter: "blur(50px)",
    fontFamily: "Urbanist, sans-serif",
    overflow: "hidden", // ensures image respects border-radius
  }}
>
  {/* Top Text */}
  <div>
    <h3 className="text-2xl sm:text-3xl font-semibold text-[#171C35] mb-2">
      DSGVO-konform
    </h3>
    <p className="text-sm sm:text-base text-[#171c35] leading-relaxed">
      Ihre Sicherheit hat höchste Priorität.
    </p>
  </div>

  {/* Bottom Right Image */}
  <div
    className="absolute"
    style={{
      bottom: 0,   // flush with bottom
      right: 0,    // flush with right
      left: "auto", // ignore left padding
      borderRadius: "inherit",
      overflow: "hidden",
    }}
  >
    <img src={img6} alt="" className="w-auto h-auto" />
  </div>
</div>


        </div>

        </div>
      </div>
    </section>
  );
};

export default Functions;