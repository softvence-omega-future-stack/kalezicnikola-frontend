





// import roundactiveImg from "../../../assets/svgIcon/activerecord.svg"; 
// import roundImg from "../../../assets/svgIcon/recordbtnborder.svg"; 

import React, { useEffect, useState, } from 'react';
import WaveBar from './Wevebar';


import TranscriptChat from './TranscriptChat';


// --- Dummy data ---
const AI_SUMMARY_TEXT = `AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. AI systems can detect early signs of cancers like breast or lung cancer. AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. For example, AI systems can detect early signs of cancers like breast or lung cancer.`;

const PATIENT_INFO = {
  name: 'Jonathon Sanders',
  insuranceID: '#PT0025',
  reason: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.',
};



const totalDuration = 100; // normalized total duration

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

  const [isPlaying, setIsPlaying] = useState(false);
  const [, setCurrentTime] = useState(33);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);









  return (
    <div className="bg-[#F3F6F6D9] rounded-2xl p-4 flex items-center justify-center font-sans">
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

