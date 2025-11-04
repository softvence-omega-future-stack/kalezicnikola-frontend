
import icon from "../assets/svgIcon/herologo.svg";
import img1 from '../assets/svgIcon/Interface1.svg'
import img2 from '../assets/svgIcon/interface2.svg'
import img3 from '../assets/svgIcon/interface3.svg'

import img5 from '../assets/svgIcon/interface5.svg'
import img6 from '../assets/svgIcon/interface6.svg'

const Functions = () => {
  return (
    <section  style={{ fontFamily: 'Urbanist, sans-serif' }} className="py-12 sm:py-16 lg:py-20 ">
      <div className=" px-4 sm:px-6 lg:px-8 mx-10">

     <div className="text-start mb-16 ">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6">
          <img src={icon} alt="" />
          <span className="text-[#171C35] text-sm font-medium">Our Core Functions</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
           Everything you need to ease <br /> the burden on your practice
        </h2>
      </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Feature 1 - Reduzierte Telefonlast */}
          <div className="bg-gradient-to-br from-[blue-50] to-blue-100 rounded-4xl p-6 sm:p-8 relative">
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#171C35] mb-4">
              Reduzierte Telefonlast
            </h3>
            <p className="text-sm sm:text-base text-[#171c35] mb-6 leading-relaxed">
              Befreien Sie Ihr Personal von Routineanfragen. Unser KI-Voicebot übernimmt Terminbuchungen, Rezept- und Routinefragen 24/7, damit Ihr Team auf die Patienten konzentrieren kann.
            </p>
            
            {/* Dashboard Preview Image */}
            <div className="absolute bottom-4 right-4">
           <img src={img1} alt="" />
              
      
            </div>
          </div>

          {/* Feature 2 - Menschliche KI-Kommunikation */}
          <div className="bg-white rounded-4xl p-6 sm:p-8 ">
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#171C35] mb-4">
              Menschliche KI-Kommunikation
            </h3>
            <p className="text-sm sm:text-base text-[#171c35] mb-6 leading-relaxed">
              Docline ist die nächste Generation in der Patientenkommunikation. Er versteht Kontext, Sprachen und Dringlichkeit und verarbeitet Anliegen mit menschlicher Präzision.
            </p>
            
            {/* Audio Waveform Visualization */}
            <div className="w-full">
              
              <img src={img2} alt="" className='w-full' />
              <img src={img3} alt="" className='w-full' />
            </div>
          </div>

          {/* Feature 3 - Multilingual */}
        <div className='flex flex-col gap-3'>
          {/* Feature 3 - Multilingual */}
<div className="bg-white rounded-4xl p-6 sm:p-8 relative flex flex-col justify-between h-[350px]">
  {/* Top Text */}
  <div>
    <h3 className="text-2xl sm:text-3xl font-semibold text-[#171C35] mb-2">
      Multilingual
    </h3>
    <p className="text-sm sm:text-base text-[#171c35] leading-relaxed">
      Unser Voicebot kommuniziert fließend in über 25 Fremdsprachen.
    </p>
  </div>

  {/* Centered Image */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <img src={img5} alt="" className="" />
  </div>
</div>

{/* Feature 4 - DSGVO */}
<div className="bg-white rounded-4xl p-6 sm:p-8  relative flex flex-col justify-between h-[350px]">
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
  <div className="absolute bottom-4 right-4">
    <img src={img6} alt="" className="" />
  </div>
</div>

        </div>

        </div>
      </div>
    </section>
  );
};

export default Functions;