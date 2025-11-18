





// import roundactiveImg from "../../../assets/svgIcon/activerecord.svg"; 
// import roundImg from "../../../assets/svgIcon/recordbtnborder.svg"; 

import React, {  useState, } from 'react';
import WaveBar from './Wevebar';


import TranscriptChat from './TranscriptChat';

// import { Pause } from "lucide-react";




// --- Dummy data ---
const AI_SUMMARY_TEXT = `AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. AI systems can detect early signs of cancers like breast or lung cancer. AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. For example, AI systems can detect early signs of cancers like breast or lung cancer.`;

const PATIENT_INFO = {
  name: 'Jonathon Sanders',
  insuranceID: '#PT0025',
  reason: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.',
};



// const PLAYER_WAVE_SEGMENTS = [
//   { height: 45, time: "0:00" },
//   { height: 45, time: "0:30" },
//   { height: 45, time: "1:00" },
//   { height: 45, time: "1:30" },
//   { height: 45, time: "2:00" },
//   { height: 45, time: "2:30" },
// ];
// const totalDuration = 100; 


// const totalDuration = 100;


// --- Custom Play Icon SVG ---
// const SvgPlayIcon = ({ fill = "#526FFF", size = 20, className = "" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
//     <mask id="mask0_2987_5353" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="1" y="1" width="30" height="30">
//       <path d="M15.9974 29.3327C23.3614 29.3327 29.3307 23.3633 29.3307 15.9993C29.3307 8.63535 23.3614 2.66602 15.9974 2.66602C8.6334 2.66602 2.66406 8.63535 2.66406 15.9993C2.66406 23.3633 8.6334 29.3327 15.9974 29.3327Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
//       <path d="M13.3281 15.9995V11.3809L17.3281 13.6902L21.3281 15.9995L17.3281 18.3089L13.3281 20.6182V15.9995Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
//     </mask>
//     <g mask="url(#mask0_2987_5353)">
//       <path d="M0 0H32V32H0V0Z" fill={fill} />
//     </g>
//   </svg>
// );





const PatientTranscriptPage: React.FC = () => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  // const [isPlaying, setIsPlaying] = useState(false);
  // const [, setCurrentTime] = useState(33);

  // useEffect(() => {
  //   if (isPlaying) {
  //     const interval = setInterval(() => {
  //       setCurrentTime((prev) => {
  //         if (prev >= totalDuration) {
  //           setIsPlaying(false);
  //           return 0;
  //         }
  //         return prev + 0.5;
  //       });
  //     }, 100);
  //     return () => clearInterval(interval);
  //   }
  // }, [isPlaying]);


  // const togglePlayPause = () => setIsPlaying(!isPlaying);

  // const calculateProgressWidth = (time: number) => (time / totalDuration) * 100;









  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="bg-[#F3F6F6D9] rounded-2xl p-4 flex items-center justify-center font-sans">
      <div className="w-[980px] mx-auto rounded-xl p-6 relative">
        <h2 className="text-2xl md:text-2xl font-semibold text-[#171C35] mb-6">Patient Transcript</h2>

        {/* AI Summary */}
        <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">AI Summary</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <img src="https://i.ibb.co.com/C5fw58ZT/Copyicon.png" alt="" />
            </button>
          </div>
          <p className="text-[#171C35] text-base font-medium md:text-base leading-relaxed mb-3">
            {showFullSummary ? AI_SUMMARY_TEXT : `${AI_SUMMARY_TEXT.substring(0, 300)}...`}
          </p>
          <button onClick={() => setShowFullSummary(!showFullSummary)} className="text-black underline text-sm font-medium">
            {showFullSummary ? 'Hide' : 'Show more'}
          </button>
        </div>

        {/* Patient Info */}
        <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">Information's are Summarized</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <img src="https://i.ibb.co.com/C5fw58ZT/Copyicon.png" alt="" />
            </button>
          </div>
          <div className="space-y-2 text-[#171C35] text-base font-medium md:text-base">
            <p><span className="font-normal text-[#111A2D]">Name:</span> {PATIENT_INFO.name}</p>
            <p><span className="font-normal text-[#171C35]">Insurance ID:</span> {PATIENT_INFO.insuranceID}</p>
            <p><span className="font-normal text-[#171C35]">Reason for calling:</span> {PATIENT_INFO.reason}</p>
          </div>
        </div>


        {/* Audio Player */}
        <div className="mb-8 p-5 md:p-6">

          <h3 className="text-lg md:text-xl font-semibold text-[#171C35] mb-4">Patients Transcript</h3>
           {/* <div className=" rounded-2xl p-6">
          

          
            <div className="relative mb-6 overflow-hidden">
              <div className="flex bg-[#526FFF80] px-2 rounded-full items-center justify-between gap-2 h-28 relative">
              {PLAYER_WAVE_SEGMENTS.map((segment, i) => {
  const currentBar = Math.floor((currentTime / totalDuration) * PLAYER_WAVE_SEGMENTS.length);
  const isActive = i === currentBar; 
  return (
    <div key={i} className="flex-1 flex items-center justify-center relative">
      <div
        className="w-full rounded-full bg-white transition-all duration-300 flex items-center justify-center relative"
        style={{ height: `${segment.height}px` }}
      >
        <img src={roundImg} alt="border" className="absolute inset-0 w-full h-full object-contain" />
        {isActive && <img src={roundactiveImg} alt="active" className="relative z-10 h-full w-full" />}
      </div>
    </div>
  );
})}

                <div className="absolute top-3 flex flex-col gap-1 items-center" style={{ left: `${calculateProgressWidth(currentTime)}%`, height: "100px", transform: 'translateX(-50%)' }}>
                  <div className="w-[2px] h-full bg-[#526FFF]"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
  <path d="M4.16834 0.999998C4.93814 -0.333335 6.86264 -0.333333 7.63244 1L11.5296 7.75C12.2994 9.08333 11.3371 10.75 9.7975 10.75H2.00327C0.463673 10.75 -0.498575 9.08333 0.271225 7.75L4.16834 0.999998Z" fill="#526FFF"/>
</svg>
                </div>
              </div>
            </div>

            

            
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-black text-sm">0:30</span>
              <div className="flex items-center gap-3">
                <button className="hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 19V5M16.4005 6.07961L10.5617 10.7506C10.0279 11.1777 9.76097 11.3912 9.66433 11.6492C9.5796 11.8754 9.5796 12.1246 9.66433 12.3508C9.76097 12.6088 10.0279 12.8223 10.5617 13.2494L16.4005 17.9204C17.2327 18.5861 17.6487 18.919 17.9989 18.9194C18.3035 18.9197 18.5916 18.7812 18.7815 18.5432C19 18.2695 19 17.7367 19 16.671V7.329C19 6.2633 19 5.73045 18.7815 5.45677C18.5916 5.21876 18.3035 5.0803 17.9989 5.08063C17.6487 5.081 17.2327 5.41387 16.4005 6.07961Z" stroke="#111A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </button>
                <button onClick={togglePlayPause} className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                  {isPlaying ? <Pause size={20} className="text-blue-500" /> : <SvgPlayIcon size={24} fill="#526FFF" className="ml-0.5" />}
                </button>
                <button className="hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M15 15V1M3.59951 2.07961L9.43826 6.75061C9.97211 7.17769 10.239 7.39122 10.3357 7.6492C10.4204 7.87539 10.4204 8.12461 10.3357 8.3508C10.239 8.60878 9.97211 8.82231 9.43826 9.24939L3.59951 13.9204C2.76734 14.5861 2.35125 14.919 2.00108 14.9194C1.69654 14.9197 1.40845 14.7812 1.21846 14.5432C1 14.2695 1 13.7367 1 12.671V3.329C1 2.2633 1 1.73045 1.21846 1.45677C1.40845 1.21876 1.69654 1.0803 2.00108 1.08063C2.35125 1.081 2.76734 1.41387 3.59951 2.07961Z" stroke="#111A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black text-sm">-1:23</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19.7479 4.99993C21.1652 6.97016 22 9.38756 22 11.9999C22 14.6123 21.1652 17.0297 19.7479 18.9999M15.7453 7.99993C16.5362 9.13376 17 10.5127 17 11.9999C17 13.4872 16.5362 14.8661 15.7453 15.9999M9.63432 5.36561L6.46863 8.5313C6.29568 8.70425 6.2092 8.79073 6.10828 8.85257C6.01881 8.9074 5.92127 8.9478 5.81923 8.9723C5.70414 8.99993 5.58185 8.99993 5.33726 8.99993H3.6C3.03995 8.99993 2.75992 8.99993 2.54601 9.10892C2.35785 9.20479 2.20487 9.35777 2.10899 9.54594C2 9.75985 2 10.0399 2 10.5999V13.3999C2 13.96 2 14.24 2.10899 14.4539C2.20487 14.6421 2.35785 14.7951 2.54601 14.8909C2.75992 14.9999 3.03995 14.9999 3.6 14.9999H5.33726C5.58185 14.9999 5.70414 14.9999 5.81923 15.0276C5.92127 15.0521 6.01881 15.0925 6.10828 15.1473C6.2092 15.2091 6.29568 15.2956 6.46863 15.4686L9.63431 18.6342C10.0627 19.0626 10.2769 19.2768 10.4608 19.2913C10.6203 19.3038 10.7763 19.2392 10.8802 19.1175C11 18.9773 11 18.6744 11 18.0686V5.9313C11 5.32548 11 5.02257 10.8802 4.88231C10.7763 4.76061 10.6203 4.69602 10.4608 4.70858C10.2769 4.72305 10.0627 4.93724 9.63432 5.36561Z" stroke="#111A2D" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.835 12.835V14.035C18.835 15.7151 18.835 16.5552 18.508 17.1969C18.2204 17.7614 17.7614 18.2204 17.1969 18.508C16.5552 18.835 15.7151 18.835 14.035 18.835H5.63496C3.9548 18.835 3.11472 18.835 2.47299 18.508C1.9085 18.2204 1.44956 17.7614 1.16194 17.1969C0.834961 16.5552 0.834961 15.7151 0.834961 14.035V12.835M14.835 7.83496L9.83496 12.835M9.83496 12.835L4.83496 7.83496M9.83496 12.835V0.834961" stroke="#111A2D" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
            </div>
          </div>  */}

         
        


        {/* Patients Transcript (Audio Player) Section */}
        <div className="mb-8 p-5 md:p-6  ">
          <h3 className="text-lg md:text-xl bg-[#F3F6F6D9] font-semibold text-[#171C35] mb-4">Patients Transcript</h3>
    <div className='h-full w-full'>
      <WaveBar/>
    </div>
        

   
          

        </div>

        {/* Transcript Chat Section */}
        <TranscriptChat />
      </div>
    </div>
    </div>
  );
};

export default PatientTranscriptPage;

