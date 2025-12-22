import React, { useState, useEffect, useCallback, useRef } from "react";
import { Pause } from "lucide-react";

import roundactiveImg from "../../../assets/svgIcon/activerecord.svg";
import roundImg from "../../../assets/svgIcon/recordbtnborder.svg";

interface WaveBarProps {
  audioUrl: string; 
  
  onPlayingChange?: (isPlaying: boolean) => void;
  onMessageChange?: (messageId: number) => void;
}

const totalMessages = 5;
const skipSeconds = 10;

const WaveBar: React.FC<WaveBarProps> = ({ audioUrl, onPlayingChange, onMessageChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // সময় ফরম্যাট করা (সেকেন্ড থেকে MM:SS)
  const formatTime = useCallback((secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getRemainingTimeString = useCallback((secs: number, total: number) => {
    const remaining = Math.max(0, total - secs);
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      
     
      const messageId = Math.min(
        Math.floor((audio.currentTime / (audio.duration || 1)) * totalMessages) + 1,
        totalMessages
      );
      onMessageChange?.(messageId);
    };

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onPlayingChange?.(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onMessageChange, onPlayingChange]);

  // প্লে/পজ ফাংশন
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayingChange?.(!isPlaying);
    }
  };

  
  const skipTime = (amount: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + amount, duration));
    }
  };


  const waveSegments = Array(9).fill({ height: 40 });
  const currentBarIndex = Math.floor((currentTime / (duration || 1)) * waveSegments.length);
  const playheadPosition = (currentTime / (duration || 1)) * 100;

  return (
    <div>
      {/* Hidden Audio Tag */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="w-full">
        {/* Waveform Container */}
        <div className="relative bg-[#526FFF80] p-2 rounded-full mb-6 w-full h-16">
          <div className="flex items-center justify-between w-full relative h-full">
            {waveSegments.map((_, i) => {
              const isActive = i === currentBarIndex;
              return (
                <div key={i} className="flex-1 flex items-center justify-center">
                  <div className="w-full rounded-full bg-white overflow-hidden flex items-center justify-center relative h-10">
                    <img src={roundImg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                    {isActive && (
                      <img src={roundactiveImg} alt="" className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Playhead */}
            {(isPlaying || currentTime > 0) && (
              <div
                className="absolute flex flex-col items-center z-20 pointer-events-none"
                style={{
                  left: `${playheadPosition}%`,
                  transform: 'translateX(-50%)',
                  height: 'calc(100% + 10px)',
                  top: '-5px',
                  transition: 'left 0.1s linear' // স্মুথ মুভমেন্টের জন্য
                }}
              >
                <div className="w-[2px] h-full bg-[#526FFF] shadow-md"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none" className="absolute bottom-[-11px]">
                  <path d="M4.16834 0.999998C4.93814 -0.333335 6.86264 -0.333333 7.63244 1L11.5296 7.75C12.2994 9.08333 11.3371 10.75 9.7975 10.75H2.00327C0.463673 10.75 -0.498575 9.08333 0.271225 7.75L4.16834 0.999998Z" fill="#526FFF" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 w-full gap-4 px-2">
          <div className="min-w-[100px] flex items-center justify-start">
            <span className="text-black text-sm font-medium">{formatTime(currentTime)}</span> 
            <span className="mx-1">/</span>
            <span className="text-black text-sm font-medium">{getRemainingTimeString(currentTime, duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <button onClick={() => skipTime(-skipSeconds)} className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 19V5M16.4005 6.07961L10.5617 10.7506C10.0279 11.1777 9.76097 11.3912 9.66433 11.6492C9.5796 11.8754 9.5796 12.1246 9.66433 12.3508C9.76097 12.6088 10.0279 12.8223 10.5617 13.2494L16.4005 17.9204C17.2327 18.5861 17.6487 18.919 17.9989 18.9194C18.3035 18.9197 18.5916 18.7812 18.7815 18.5432C19 18.2695 19 17.7367 19 16.671V7.329C19 6.2633 19 5.73045 18.7815 5.45677C18.5916 5.21876 18.3035 5.0803 17.9989 5.08063C17.6487 5.081 17.2327 5.41387 16.4005 6.07961Z" stroke="#111A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="cursor-pointer rounded-full bg-[#526FFF30] w-10 h-10 flex items-center justify-center shadow-inner"
            >
              {isPlaying ? (
                <Pause size={20} className="text-[#526FFF]" fill="#526FFF" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17 11.7321C18.3333 10.9623 18.3333 9.03775 17 8.26795L8 3.0718C6.66667 2.302 5 3.26425 5 4.80385L5 15.1962C5 16.7358 6.66667 17.698 8 16.9282L17 11.7321Z" fill="#526FFF" />
                </svg>
              )}
            </button>

            <button onClick={() => skipTime(skipSeconds)} className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 19V5M7.59951 6.07961L13.4383 10.7506C13.9721 11.1777 14.239 11.3912 14.3357 11.6492C14.4204 11.8754 14.4204 12.1246 14.3357 12.3508C14.239 12.6088 13.9721 12.8223 13.4383 13.2494L7.59951 17.9204C6.76734 18.5861 6.35125 18.919 6.00108 18.9194C5.69654 18.9197 5.40845 18.7812 5.21846 18.5432C5 18.2695 5 17.7367 5 16.671V7.329C5 6.2633 5 5.73045 5.21846 5.45677C5.40845 5.21876 5.69654 5.0803 6.00108 5.08063C6.35125 5.081 6.76734 5.41387 7.59951 6.07961Z" stroke="#111A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="flex bg-[#0000000D] h-10 px-2 rounded-full items-center gap-1">
              <button className="cursor-pointer p-1"><VolumeIcon /></button>
              <button className="cursor-pointer p-1" onClick={() => window.open(audioUrl)}><DownloadIcon /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// আইকনগুলোর ছোট ছোট কম্পোনেন্ট (পরিচ্ছন্নতার জন্য)
const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.4569 4.16693C17.638 5.8088 18.3337 7.82329 18.3337 10.0003C18.3337 12.1772 17.638 14.1917 16.4569 15.8336M13.1214 6.66693C13.7805 7.61179 14.167 8.76089 14.167 10.0003C14.167 11.2396 13.7805 12.3887 13.1214 13.3336M8.02892 4.47167L5.39085 7.10974C5.24672 7.25387 5.17466 7.32593 5.09056 7.37746C5.016 7.42316 4.93472 7.45683 4.84969 7.47724C4.75378 7.50026 4.65187 7.50026 4.44804 7.50026H3.00033C2.53362 7.50026 2.30026 7.50026 2.122 7.59109C1.9652 7.67099 1.83771 7.79847 1.75782 7.95527C1.66699 8.13353 1.66699 8.36689 1.66699 8.8336V11.1669C1.66699 11.6336 1.66699 11.867 1.75782 12.0453C1.83771 12.2021 1.9652 12.3295 2.122 12.4094C2.30026 12.5003 2.53362 12.5003 3.00033 12.5003H4.44804C4.65187 12.5003 4.75378 12.5003 4.84969 12.5233C4.93472 12.5437 5.016 12.5774 5.09056 12.6231C5.17466 12.6746 5.24672 12.7467 5.39085 12.8908L8.02892 15.5289C8.3859 15.8858 8.56439 16.0643 8.71763 16.0764C8.8506 16.0869 8.98054 16.033 9.06716 15.9316C9.16699 15.8147 9.16699 15.5623 9.16699 15.0575V4.94307C9.16699 4.43823 9.16699 4.1858 9.06716 4.06892C8.98054 3.9675 8.8506 3.91367 8.71763 3.92414C8.56439 3.9362 8.3859 4.11469 8.02892 4.47167Z" stroke="#111A2D" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 8.33333L10 12.5M10 12.5L5.83333 8.33333M10 12.5V2.5" stroke="#111A2D" strokeWidth="1.39" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default WaveBar;


// import React, { useState, useEffect } from "react";
// import { Pause } from "lucide-react";

// import roundactiveImg from "../../../assets/svgIcon/activerecord.svg";
// import roundImg from "../../../assets/svgIcon/recordbtnborder.svg";

// const WaveBar: React.FC = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(33);
//   const totalDuration = 100;
//   const totalSeconds = 165; 

//   useEffect(() => {
//     if (isPlaying) {
//       const interval = setInterval(() => {
//         setCurrentTime((prev) => {
//           if (prev >= totalDuration) {
//             setIsPlaying(false);
//             return 0;
//           }
//           return prev + 0.5;
//         });
//       }, 100);
//       return () => clearInterval(interval);
//     }
//   }, [isPlaying]);

//   const waveSegments = [
//     { height: 45, time: "0:00" },
//     { height: 45, time: "0:30" },
//     { height: 45, time: "1:00" },
//     { height: 45, time: "1:30" },
//     { height: 45, time: "2:00" },
//     { height: 45, time: "2:30" },
//   ];

//   const formatTime = (timeUnit: number) => {
//     const elapsedSeconds = Math.round((timeUnit / totalDuration) * totalSeconds);
//     const minutes = Math.floor(elapsedSeconds / 60);
//     const seconds = elapsedSeconds % 60;
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const remainingTimeUnits = totalDuration - currentTime;
//   const remainingSeconds = Math.round((remainingTimeUnits / totalDuration) * totalSeconds); 
//   const remainingMinutes = Math.floor(remainingSeconds / 60);
//   const remainingSecs = remainingSeconds % 60;
//   const remainingTimeString = `-${remainingMinutes}:${remainingSecs.toString().padStart(2, '0')}`;

//   return (
//     <div className="max-w-2xl mx-auto font-urbanist">
//       <div className="w-full">
        
//         {/* Waveform Container */}
//         <div className="relative bg-[#526FFF80] p-2 rounded-full mb-6 w-full h-16">
//           <div className="flex items-center justify-between gap-2 w-full relative h-full"> 
//             {waveSegments.map((segment, i) => {
//               const currentBar = Math.floor((currentTime / totalDuration) * waveSegments.length);
//               const isActive = i === currentBar && isPlaying;

//               return (
//                 <div key={i} className="flex-1 flex items-center justify-center relative">
//                   <div
//                     className="w-full rounded-full bg-white overflow-hidden transition-all duration-300 flex items-center justify-center relative"
//                     style={{ height: `${segment.height}px` }}
//                   >
//                     <img src={roundImg} alt="border" className="absolute inset-0 w-full h-full object-cover" />
//                     {isActive && <img src={roundactiveImg} alt="active" className="absolute inset-0 w-full h-full object-cover z-10" />}
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Vertical moving line with icon (Playhead) */}
//             <div
//               className="absolute flex flex-col items-center z-20"
//               style={{
//                 left: `${(currentTime / totalDuration) * 100}%`,
//                 transform: 'translateX(-50%)', 
//                 height: 'calc(100% + 10px)', 
//                 top: '-5px', 
//               }}
//             >
//               <div className="w-[2px] h-full bg-[#526FFF] shadow-md"></div>
//               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none" className="absolute bottom-[-11px]"> 
//                 <path d="M4.16834 0.999998C4.93814 -0.333335 6.86264 -0.333333 7.63244 1L11.5296 7.75C12.2994 9.08333 11.3371 10.75 9.7975 10.75H2.00327C0.463673 10.75 -0.498575 9.08333 0.271225 7.75L4.16834 0.999998Z" fill="#526FFF"/>
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex items-center justify-between gap-4">
//           {/* Current Time */}
//           <span className="text-black text-sm font-medium min-w-[45px]">{formatTime(currentTime)}</span>

//           {/* Play controls */}
//           <div className="flex items-center gap-3">
//             <button className="transition-transform hover:scale-110 flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path d="M5 19V5M16.4005 6.07961L10.5617 10.7506C10.0279 11.1777 9.76097 11.3912 9.66433 11.6492C9.5796 11.8754 9.5796 12.1246 9.66433 12.3508C9.76097 12.6088 10.0279 12.8223 10.5617 13.2494L16.4005 17.9204C17.2327 18.5861 17.6487 18.919 17.9989 18.9194C18.3035 18.9197 18.5916 18.7812 18.7815 18.5432C19 18.2695 19 17.7367 19 16.671V7.329C19 6.2633 19 5.73045 18.7815 5.45677C18.5916 5.21876 18.3035 5.0803 17.9989 5.08063C17.6487 5.081 17.2327 5.41387 16.4005 6.07961Z" stroke="#111A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>

//             {/* Play/Pause Button */}
//             <button 
//               onClick={() => setIsPlaying(!isPlaying)} 
//               className="cursor-pointer w-10 h-10 flex items-center justify-center transition-transform hover:scale-110"
//             >
//               {isPlaying ? (
//                 <div className="w-10 h-10 rounded-full bg-[#526FFF33] flex items-center justify-center">
//                   <Pause size={24} className="text-[#526FFF]" fill="#526FFF" />
//                 </div>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
//                   <rect width="40" height="40" rx="20" fill="#526FFF" fillOpacity="0.19"/>
//                   <path d="M27 21.7321C28.3333 20.9623 28.3333 19.0377 27 18.2679L18 13.0718C16.6667 12.302 15 13.2642 15 14.8038L15 25.1962C15 26.7358 16.6667 27.698 18 26.9282L27 21.7321Z" fill="#526FFF"/>
//                 </svg>
//               )}
//             </button>

//             <button className="transition-transform hover:scale-110 flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path d="M19 19V5M7.59951 6.07961L13.4383 10.7506C13.9721 11.1777 14.239 11.3912 14.3357 11.6492C14.4204 11.8754 14.4204 12.1246 14.3357 12.3508C14.239 12.6088 13.9721 12.8223 13.4383 13.2494L7.59951 17.9204C6.76734 18.5861 6.35125 18.919 6.00108 18.9194C5.69654 18.9197 5.40845 18.7812 5.21846 18.5432C5 18.2695 5 17.7367 5 16.671V7.329C5 6.2633 5 5.73045 5.21846 5.45677C5.40845 5.21876 5.69654 5.0803 6.00108 5.08063C6.35125 5.081 6.76734 5.41387 7.59951 6.07961Z" stroke="#111A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           </div>

//           {/* Remaining Time + Volume + Download */}
//           <div className="flex items-center gap-3">
//             <span className="text-black text-sm font-medium min-w-[50px]">{remainingTimeString}</span>

//             <button className="transition-transform hover:scale-110 flex items-center justify-center">
//               <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" width="22" height="17" viewBox="0 0 22 17" fill="none">
//                 <path d="M18.5829 1.12786C20.0002 3.09809 20.835 5.51549 20.835 8.12786C20.835 10.7402 20.0002 13.1576 18.5829 15.1279M14.5803 4.12786C15.3711 5.26169 15.835 6.64061 15.835 8.12786C15.835 9.6151 15.3711 10.994 14.5803 12.1279M8.46928 1.49354L5.30359 4.65923C5.13064 4.83218 5.04416 4.91866 4.94325 4.9805C4.85377 5.03533 4.75623 5.07573 4.65419 5.10023C4.53911 5.12786 4.41681 5.12786 4.17222 5.12786H2.43496C1.87491 5.12786 1.59488 5.12786 1.38097 5.23685C1.19281 5.33272 1.03983 5.4857 0.943954 5.67387C0.834961 5.88778 0.834961 6.1678 0.834961 6.72786V9.52786C0.834961 10.0879 0.834961 10.3679 0.943954 10.5818C1.03983 10.77 1.19281 10.923 1.38097 11.0189C1.59488 11.1279 1.87491 11.1279 2.43496 11.1279H4.17222C4.41681 11.1279 4.53911 11.1279 4.65419 11.1555C4.75623 11.18 4.85377 11.2204 4.94325 11.2752C5.04416 11.3371 5.13064 11.4235 5.30359 11.5965L8.46928 14.7622C8.89765 15.1905 9.11184 15.4047 9.29573 15.4192C9.45529 15.4318 9.61122 15.3672 9.71516 15.2455C9.83496 15.1052 9.83496 14.8023 9.83496 14.1965V2.05923C9.83496 1.45341 9.83496 1.1505 9.71516 1.01024C9.61122 0.888535 9.45529 0.823947 9.29573 0.836505C9.11184 0.850978 8.89765 1.06517 8.46928 1.49354Z" stroke="#111A2D" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>

//             <button className="transition-transform hover:scale-110 flex items-center justify-center">
//               <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                 <path d="M18.835 12.835V14.035C18.835 15.7151 18.835 16.5552 18.508 17.1969C18.2204 17.7614 17.7614 18.2204 17.1969 18.508C16.5552 18.835 15.7151 18.835 14.035 18.835H5.63496C3.9548 18.835 3.11472 18.835 2.47299 18.508C1.9085 18.2204 1.44956 17.7614 1.16194 17.1969C0.834961 16.5552 0.834961 15.7151 0.834961 14.035V12.835M14.835 7.83496L9.83496 12.835M9.83496 12.835L4.83496 7.83496M9.83496 12.835V0.834961" stroke="#111A2D" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default WaveBar;