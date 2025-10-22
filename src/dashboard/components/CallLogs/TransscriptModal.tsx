

import React, { useState,  useEffect } from 'react';

import {
  FiCopy, 
  FiPlay, 
  FiPause, 
  FiSkipBack, 
  FiSkipForward, 
  FiDownload,
  FiVolume2, 
 
} from 'react-icons/fi';

// --- DUMMY DATA ---
const AI_SUMMARY_TEXT = `AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. AI systems can detect early signs of cancers like breast or lung cancer. AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy. For example, AI systems can detect early signs of cancers like breast or lung cancer.`;

const PATIENT_INFO = {
  name: 'Jonathon Sanders',
  insuranceID: '#PT0025',
  reason: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.',
};


const TRANSCRIPT_MESSAGES = [
  { id: 't1', sender: 'Floyd Miles', avatar: '/path/to/floyd-avatar.jpg', time: '00032', text: 'Hello this is Floyd from USA. How are you doing?', type: 'incoming' },
  { id: 't2', sender: 'User', avatar: '/path/to/user-avatar.jpg', time: '00032', text: 'I am good. How can I help you?', type: 'outgoing' },
  { id: 't3', sender: 'Floyd Miles', avatar: '/path/to/floyd-avatar.jpg', time: '00032', text: 'Hello this is Floyd from USA. How are you doing?', type: 'incoming' },
  { id: 't4', sender: 'Floyd Miles', avatar: '/path/to/floyd-avatar.jpg', time: '00032', text: 'Hello this is Floyd from USA. How are you doing?', type: 'incoming' },
  { id: 't5', sender: 'User', avatar: '/path/to/user-avatar.jpg', time: '00032', text: 'I am good. How can I help you?', type: 'outgoing' },
];

const AUDIO_SEGMENTS = [
  { start: 0, end: 5, color: 'bg-blue-200' },
  { start: 6, end: 10, color: 'bg-blue-300' },
  { start: 11, end: 16, color: 'bg-blue-200' },
  { start: 17, end: 22, color: 'bg-blue-300' },
  { start: 23, end: 28, color: 'bg-blue-200' },
  { start: 29, end: 30, color: 'bg-blue-300' },
];

// --- PatientTranscriptPage Component ---
const PatientTranscriptPage: React.FC = () => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, ] = useState(30); 
  

  // Effect for updating current time
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + 0.1 : duration));
      }, 100); 
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateProgressWidth = (time: number) => {
    return (time / duration) * 100;
  };

  return (
    <div className=" bg-gray-100 p-4 md:p-8 lg:p-12 flex items-center justify-center font-sans">
      <div className="bg-gray-100 w-[980px] mx-auto rounded-xl p-6 md:p-8 lg:p-10 relative">
      

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Patient Transcript</h2>

        {/* AI Summary Section */}
        <div className="mb-8 p-5 md:p-6 bg-white rounded-lg border border-gray-200 ">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">AI Summary</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <FiCopy className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
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
        <div className="mb-8 p-5 md:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Information's are Summarized</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <FiCopy className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-2 text-gray-600 text-sm md:text-base">
            <p className='text-black font-bold'><span className="font-semibold text-gray-700">Name:</span> {PATIENT_INFO.name}</p>
            <p className='text-black font-bold'><span className="font-semibold text-gray-700">Insurance ID:</span> {PATIENT_INFO.insuranceID}</p>
            <p className='text-black  font-semibold'><span className="font-semibold text-gray-700">Reason for calling:</span> {PATIENT_INFO.reason}</p>
          </div>
        </div>

        {/* Patients Transcript (Audio Player) Section */}
        <div className="mb-8 p-5 md:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Patients Transcript</h3>

          {/* Audio Waveform / Progress Bar */}
          <div className="relative w-full h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-between px-2">
            {AUDIO_SEGMENTS.map((segment, index) => (
              <div
                key={index}
                className={`${segment.color} h-8 rounded-md mx-0.5`}
                style={{ width: `${((segment.end - segment.start) / duration) * 100}%` }}
              ></div>
            ))}
            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0 w-1.5 bg-blue-600 rounded-full shadow-lg"
              style={{ left: `${calculateProgressWidth(currentTime)}%` }}
            ></div>
          </div>

          {/* Audio Controls */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm font-medium text-gray-600">{formatTime(currentTime)}</div>
            <div className="flex items-center space-x-4 md:space-x-6">
              <button className="text-gray-600 hover:text-blue-600"><FiSkipBack className="h-6 w-6" /></button>
              <button onClick={togglePlayPause} className="text-blue-600 hover:text-blue-700">
                {isPlaying ? <FiPause className="h-8 w-8" /> : <FiPlay className="h-8 w-8" />}
              </button>
              <button className="text-gray-600 hover:text-blue-600"><FiSkipForward className="h-6 w-6" /></button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">-1:23</span> {/* Static for now */}
              <button className="text-gray-600 hover:text-blue-600"><FiDownload className="h-5 w-5" /></button>
              <button className="text-gray-600 hover:text-blue-600"><FiVolume2 className="h-5 w-5" /></button>
            </div>
          </div>
        </div>

        {/* Transcript Chat Section */}
    <div className="p-5 md:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg md:text-xl font-semibold text-black">Transcript</h3>
    <button className="text-gray-400 hover:text-gray-600">
      <FiCopy className="h-5 w-5" />
    </button>
  </div>
<div className="space-y-5">
  {TRANSCRIPT_MESSAGES.map((msg) =>
    msg.type === "incoming" ? (
      <div
        key={msg.id}
        className="flex items-start gap-3 bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-200"
      >
        <img
          src={msg.avatar}
          alt={msg.sender}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {msg.sender}
              </h4>
              {/* <p className="text-xs text-gray-500">{msg.userId}</p> */}
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <FiCopy size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-700 mt-2">{msg.text}</p>
        </div>
      </div>
    ) : (
      <div
        key={msg.id}
        className="flex justify-end bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-200"
      >
        <p className="text-sm text-gray-800 max-w-[70%] text-right">
          {msg.text}
        </p>
      </div>
    )
  )}
</div>

</div>

      </div>
    </div>
  );
};

export default PatientTranscriptPage;