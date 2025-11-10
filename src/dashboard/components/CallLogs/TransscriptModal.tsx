

import React, { useState, } from 'react';
import WaveBar from './Wevebar';


import TranscriptChat from './TranscriptChat';

// --- DUMMY DATA ---
const AI_SUMMARY_TEXT = `AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. AI systems can detect early signs of cancers like breast or lung cancer. AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. For example, AI systems can detect early signs of cancers like breast or lung cancer.`;

const PATIENT_INFO = {
  name: 'Jonathon Sanders',
  insuranceID: '#PT0025',
  reason: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.',
};






// --- PatientTranscriptPage Component ---
const PatientTranscriptPage: React.FC = () => {
  const [showFullSummary, setShowFullSummary] = useState(false);






  return (
    <div className=" bg-[#F3F6F6D9] rounded-2xl p-4  flex items-center justify-center font-sans">
      <div className=" w-[980px] mx-auto rounded-xl p-6  relative">
      

        <h2 className="text-2xl md:text-2xl font-semibold text-[#171C35] mb-6">Patient Transcript</h2>

        {/* AI Summary Section */}
        <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]  ">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">AI Summary</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <img src="https://i.ibb.co.com/C5fw58ZT/Copyicon.png" alt="" />
            </button>
          </div>
          <p className="text-[#171C35] text-base font-medium md:text-base leading-relaxed mb-3">
            {showFullSummary ? AI_SUMMARY_TEXT : `${AI_SUMMARY_TEXT.substring(0, 300)}...`}
          </p>
          <button
            onClick={() => setShowFullSummary(!showFullSummary)}
            className="text-black underline text-sm font-medium"
          >
            {showFullSummary ? 'Hide' : 'Show more'}
          </button>
        </div>

        {/* Summarized Information Section */}
        <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">Information's are Summarized</h3>
            <button className="text-gray-400 hover:text-gray-600">
                <img src="https://i.ibb.co.com/C5fw58ZT/Copyicon.png" alt="" />
            </button>
          </div>
          <div className="space-y-2text-[#171C35] text-base font-medium  md:text-base">
            <p className='text-[#111A2D] '><span className="font-normal text-[#111A2D]">Name:</span > {PATIENT_INFO.name}</p>
            <p className='text-[#111A2D] '><span className=" font-normal text-[#171C35]">Insurance ID:</span> {PATIENT_INFO.insuranceID}</p>
            <p className='text-[#111A2D]  '><span className="font-normal text-[#171C35]">Reason for calling:</span> {PATIENT_INFO.reason}</p>
          </div>
        </div>

        {/* Patients Transcript (Audio Player) Section */}
        <div className="mb-8 p-5 md:p-6  ">
          <h3 className="text-lg md:text-xl bg-[#F3F6F6D9] font-semibold text-[#171C35] mb-4">Patients Transcript</h3>
    <div className='h-full w-full'>
      <WaveBar/>
    </div>
        

   
          
        </div>

        {/* Transcript Chat Section */}
  <TranscriptChat/>

      </div>
    </div>
  );
};

export default PatientTranscriptPage;