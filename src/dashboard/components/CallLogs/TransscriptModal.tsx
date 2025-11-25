import React, { useState } from 'react';
import WaveBar from './Wevebar';
import TranscriptChat from './TranscriptChat';

// --- Dummy data ---
const AI_SUMMARY_TEXT = `AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. AI systems can detect early signs of cancers like breast or lung cancer. AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. For example, AI systems can detect early signs of cancers like breast or lung cancer.`;

const PATIENT_INFO = {
  name: 'Jonathon Sanders',
  insuranceID: '#PT0025',
  reason: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.',
};

// --- Copy Button Component with Bubble ---
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-flex items-center">
      {copied && (
        <span className="absolute right-full mr-2 px-2 py-1 text-xs bg-black text-white rounded-full">
          Copied
        </span>
      )}
      <button onClick={handleCopy} className="text-gray-400  cursor-pointer">
        <img src="https://i.ibb.co/C5fw58ZT/Copyicon.png" alt="Copy" className="w-6 h-6" />
      </button>
    </div>
  );
};

const PatientTranscriptPage: React.FC = () => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="bg-[#F3F6F6D9] rounded-2xl p-1 sm:p-4 flex items-center justify-center font-sans">
      <div className="w-[980px] mx-auto rounded-xl p-2 sm:p-6 relative">
        <h2 className="text-2xl md:text-2xl font-semibold text-[#171C35] mb-6">Patient Transcript</h2>

        {/* AI Summary */}
        <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">AI Summary</h3>
            <CopyButton text={AI_SUMMARY_TEXT} />
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

        {/* Patient Info */}
        <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">Information's are Summarized</h3>
            <CopyButton
              text={`Name: ${PATIENT_INFO.name}\nInsurance ID: ${PATIENT_INFO.insuranceID}\nReason for calling: ${PATIENT_INFO.reason}`}
            />
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
          <div className='h-full w-full'>
            <WaveBar />
          </div>
        </div>

        {/* Transcript Chat Section */}
        <TranscriptChat />
      </div>
    </div>
  );
};

export default PatientTranscriptPage;
