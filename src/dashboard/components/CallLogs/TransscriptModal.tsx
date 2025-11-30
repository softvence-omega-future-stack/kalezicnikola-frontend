
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
      <button onClick={handleCopy} className="text-gray-400 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M16 8V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.0799 2 5.2V12.8C2 13.9201 2 14.4802 2.21799 14.908C2.40973 15.2843 2.71569 15.5903 3.09202 15.782C3.51984 16 4.0799 16 5.2 16H8M11.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V11.2C22 10.0799 22 9.51984 21.782 9.09202C21.5903 8.71569 21.2843 8.40973 20.908 8.21799C20.4802 8 19.9201 8 18.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.71569 8.40973 8.40973 8.71569 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V18.8C8 19.9201 8 20.4802 8.21799 20.908C8.40973 21.2843 8.71569 21.5903 9.09202 21.782C9.51984 22 10.0799 22 11.2 22Z" stroke="#111A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </button>
    </div>
  );
};

const PatientTranscriptPage: React.FC = () => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(1);

  const handlePlayingChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  const handleMessageChange = (messageId: number) => {
    setCurrentMessageId(messageId);
  };

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="p-2 sm:p-6 relative bg-[#F3F6F6D9] backdrop-blur-md rounded-4xl ">

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
            <WaveBar 
              onPlayingChange={handlePlayingChange}
              onMessageChange={handleMessageChange}
            />
          </div>
        </div>

        {/* Transcript Chat Section */}
        <TranscriptChat 
          currentMessageId={currentMessageId}
          isPlaying={isPlaying}
        />
      </div>
 
  );
};

export default PatientTranscriptPage;



// import React, { useState } from 'react';
// import WaveBar from './Wevebar';
// import TranscriptChat from './TranscriptChat';

// // --- Dummy data ---
// const AI_SUMMARY_TEXT = `AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. AI systems can detect early signs of cancers like breast or lung cancer. AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. For example, AI systems can detect early signs of cancers like breast or lung cancer.`;

// const PATIENT_INFO = {
//   name: 'Jonathon Sanders',
//   insuranceID: '#PT0025',
//   reason: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.',
// };

// // --- Copy Button Component with Bubble ---
// const CopyButton: React.FC<{ text: string }> = ({ text }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="relative inline-flex items-center">
//       {copied && (
//         <span className="absolute right-full mr-2 px-2 py-1 text-xs bg-black text-white rounded-full">
//           Copied
//         </span>
//       )}
//       <button onClick={handleCopy} className="text-gray-400  cursor-pointer">
//         <img src="https://i.ibb.co/C5fw58ZT/Copyicon.png" alt="Copy" className="w-6 h-6" />
//       </button>
//     </div>
//   );
// };

// const PatientTranscriptPage: React.FC = () => {
//   const [showFullSummary, setShowFullSummary] = useState(false);

//   return (
//     <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="bg-[#F3F6F6D9] rounded-2xl p-4 sm:p-4 flex items-center justify-center font-sans overflow-auto scrollbar-hide">
//       <div className="w-[980px] mx-auto rounded-xl p-2 sm:p-6 relative">
//         <h2 className="text-xl md:text-2xl font-semibold text-[#171C35] mb-6">Patient Transcript</h2>

//         {/* AI Summary */}
//         <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">AI Summary</h3>
//             <CopyButton text={AI_SUMMARY_TEXT} />
//           </div>
//           <p className="text-[#171C35] text-base font-medium md:text-base leading-relaxed mb-3">
//             {showFullSummary ? AI_SUMMARY_TEXT : `${AI_SUMMARY_TEXT.substring(0, 300)}...`}
//           </p>
//           <button
//             onClick={() => setShowFullSummary(!showFullSummary)}
//             className="text-black underline text-sm font-medium"
//           >
//             {showFullSummary ? 'Hide' : 'Show more'}
//           </button>
//         </div>

//         {/* Patient Info */}
//         <div className="mb-8 p-5 md:p-6 bg-[#F5F5F5] border border-[#FFFFFF] rounded-[32px]">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg md:text-xl font-semibold text-[#171C35]">Information's are Summarized</h3>
//             <CopyButton
//               text={`Name: ${PATIENT_INFO.name}\nInsurance ID: ${PATIENT_INFO.insuranceID}\nReason for calling: ${PATIENT_INFO.reason}`}
//             />
//           </div>
//           <div className="space-y-2 text-[#171C35] text-base font-medium md:text-base">
//             <p><span className="font-normal text-[#111A2D]">Name:</span> {PATIENT_INFO.name}</p>
//             <p><span className="font-normal text-[#171C35]">Insurance ID:</span> {PATIENT_INFO.insuranceID}</p>
//             <p><span className="font-normal text-[#171C35]">Reason for calling:</span> {PATIENT_INFO.reason}</p>
//           </div>
//         </div>

//         {/* Audio Player */}
//         <div className="mb-8 p-5 md:p-6">
//           <h3 className="text-lg md:text-xl font-semibold text-[#171C35] mb-4">Patients Transcript</h3>
//           <div className='h-full w-full'>
//             <WaveBar />
//           </div>
//         </div>

//         {/* Transcript Chat Section */}
//         <TranscriptChat />
//       </div>
//     </div>
//   );
// };

// export default PatientTranscriptPage;
