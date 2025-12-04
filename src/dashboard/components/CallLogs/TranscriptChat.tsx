import React, { useState } from 'react';
import copy from '../../../assets/svgIcon/copy2.svg';
import avatar from '../../../assets/img/avatar2.svg';
import { useTranslation } from 'react-i18next';


interface Message {
  id: number;
  sender: 'Floyd Miles' | 'user';
  userId: string;
  text: string;
  avatar?: string;
}

interface TranscriptChatProps {
  currentMessageId?: number; // Currently playing message ID
  isPlaying?: boolean; // Is audio playing
}

const TranscriptChat: React.FC<TranscriptChatProps> = ({ 
  currentMessageId = 1, 
  isPlaying = false 
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
    const [allCopied, setAllCopied] = useState(false);
   const {t} = useTranslation()

  const messages: Message[] = [
    { id: 1, sender: 'Floyd Miles', userId: '000032', text: 'Hello this is Floyd from USA. How are you doing?' },
    { id: 2, sender: 'user', userId: '', text: 'I am good. How can I help you?' },
    { id: 3, sender: 'Floyd Miles', userId: '000032', text: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.', avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png' },
    { id: 4, sender: 'user', userId: '', text: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.' },
    { id: 5, sender: 'Floyd Miles', userId: '000032', text: 'Hello this is Floyd from USA. How are you doing?' }
  ];

  const copyMessage = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };
  const copyAllMessages = () => {
    const fullText = messages
      .map(msg => `${msg.sender === 'user' ? 'User' : msg.sender}: ${msg.text}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000); // optional success feedback
  };

  return (
    <div>
      <div>
        <div className='flex items-center justify-between cursor-pointer mb-6'>
          <h1 className="text-2xl font-semibold text-[#171C35]">{t("dashboard.routes.callLogs.modal.transcriptChat.title")}</h1>
              <div className="relative">
        <button onClick={copyAllMessages} className='p-2 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
  <path d="M16 8V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.0799 2 5.2V12.8C2 13.9201 2 14.4802 2.21799 14.908C2.40973 15.2843 2.71569 15.5903 3.09202 15.782C3.51984 16 4.0799 16 5.2 16H8M11.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V11.2C22 10.0799 22 9.51984 21.782 9.09202C21.5903 8.71569 21.2843 8.40973 20.908 8.21799C20.4802 8 19.9201 8 18.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.71569 8.40973 8.40973 8.71569 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V18.8C8 19.9201 8 20.4802 8.21799 20.908C8.40973 21.2843 8.71569 21.5903 9.09202 21.782C9.51984 22 10.0799 22 11.2 22Z" stroke="#111A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </button>

          {allCopied && (
            <span className="absolute  right-8 top-0 bg-black text-white text-xs w-32 px-2 py-1.5 rounded-full shadow-lg z-10">
              {t("dashboard.routes.callLogs.modal.transcriptChat.allCopied")}
            </span>
          )}
        </div>
      </div>
    

        <div className="flex flex-col gap-3">
          {messages.map((msg) => {
            const isFloyd = msg.sender === 'Floyd Miles';
            const isActive = isPlaying && msg.id === currentMessageId;

            return (
              <div key={msg.id} className={`flex ${isFloyd ? 'justify-start' : 'justify-end'} gap-3 items-start`}>
                {/* Left Side - Floyd Avatar */}
                {isFloyd && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {msg.avatar ? (
                      <img src={msg.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      // <span className="flex items-center justify-center w-full h-full bg-[#E8E8E8] rounded-full">
                      //   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 13" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                      //     <g clipPath="url(#clip0_2500_15819)">
                      //       <path d="M7.71546 9.00737C7.68184 8.55228 7.67237 8.09575 7.68709 7.63967L7.68655 7.65971C8.0969 7.2371 8.35287 6.69017 8.41364 6.10621L8.41473 6.09483C8.59964 6.07967 8.89146 5.90092 8.97655 5.19242C9.00203 5.0704 8.99225 4.94371 8.94833 4.82697C8.90442 4.71024 8.82816 4.60821 8.72836 4.53267L8.72673 4.53158C9.02782 3.63242 9.65291 0.850417 7.56982 0.563333C7.35545 0.189583 6.80673 0 6.09327 0C3.23891 0.052 2.89473 2.14013 3.51873 4.53158C3.41787 4.6076 3.34094 4.71062 3.29698 4.82854C3.25302 4.94645 3.24385 5.07438 3.27055 5.19729L3.27 5.19296C3.35727 5.90038 3.64691 6.08021 3.83182 6.09538C3.89676 6.68585 4.16089 7.23716 4.58127 7.65971C4.59476 8.12379 4.5842 8.58825 4.54964 9.05125L4.55236 9.00737C3.98618 10.5154 0.174545 10.0918 0 13H12.2498C12.0742 10.0918 8.28 10.5154 7.71491 9.00737H7.71546Z" fill="#9EA3AB"/>
                      //     </g>
                      //     <defs>
                      //       <clipPath id="clip0_2500_15819">
                      //         <rect width="12" height="13" fill="white" />
                      //       </clipPath>
                      //     </defs>
                      //   </svg>
                      // </span>
                      <img src={avatar} alt="" />
                    )}
                  </div>
                )}

                {/* Message Box */}
                <div className={`relative group ${isFloyd ? '' : 'ml-auto'}`}>
                  <div 
                    className={`inline-block px-4 py-3 rounded-3xl transition-all duration-300 max-w-[600px] ${
                      isActive 
                        ? 'bg-white border border-[#526FFF]' 
                        : isFloyd 
                          ? 'bg-[#F5F5F5] border border-white'
                          : 'bg-[#EDEFF6] border border-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {/* Copy icon for Floyd (left side of text) */}
                      {isFloyd && (
                        <button
                          onClick={() => copyMessage(msg.id, msg.text)}
                          className="p-1 rounded transition-opacity opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer hover:bg-gray-100"
                          aria-label="Copy message"
                        >
                          <img src={copy} alt="Copy" className="w-4 h-4" />
                        </button>
                      )}

                      <p className={`text-[#171C35] text-sm leading-relaxed flex-1 ${isFloyd ? 'text-left' : 'text-left'}`}>
                        {msg.text}
                      </p>

                      {/* Copy icon for User (right side of text) */}
                      {!isFloyd && (
                        <button
                          onClick={() => copyMessage(msg.id, msg.text)}
                          className="p-1 rounded transition-opacity opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer hover:bg-gray-100"
                          aria-label="Copy message"
                        >
                          <img src={copy} alt="Copy" className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Copied message bubble */}
                    {copiedId === msg.id && (
                      <span className="absolute -top-10 right-0 bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-10">
                       {t("dashboard.routes.callLogs.modal.transcriptChat.copied")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side - Blue Icon for User Messages */}
                {!isFloyd && (
                  <div className=" flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <rect width="48" height="48" rx="24" fill="#526FFF"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3317 15.5648C18.7955 20.6005 19.7809 22.2962 22.9019 23.4307L25.5102 24.3783L23.0563 25.1021C20.0975 25.9743 18.8377 28.0142 18.3426 32.7366L18 36L20.0511 35.5651C33.3154 32.7527 33.3166 15.1951 20.0529 12.4278L18.003 12L18.3317 15.5648Z" fill="white"/>
</svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
</div>
  );
};

export default TranscriptChat;



// import React, { useState } from 'react';
// import copy from '../../../assets/svgIcon/copy2.svg';


// interface Message {
//   id: number;
//   sender: 'Floyd Miles' | 'user';
//   userId: string;
//   text: string;
//   avatar?: string;
// }

// interface TranscriptChatProps {
//   currentMessageId?: number; // Currently playing message ID
//   isPlaying?: boolean; // Is audio playing
// }

// const TranscriptChat: React.FC<TranscriptChatProps> = ({ 
//   currentMessageId = 1, 
//   isPlaying = false 
// }) => {
//   const [copiedId, setCopiedId] = useState<number | null>(null);

//   const messages: Message[] = [
//     { id: 1, sender: 'Floyd Miles', userId: '000032', text: 'Hello this is Floyd from USA. How are you doing?' },
//     { id: 2, sender: 'user', userId: '', text: 'I am good. How can I help you?' },
//     { id: 3, sender: 'Floyd Miles', userId: '000032', text: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.', avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png' },
//     { id: 4, sender: 'user', userId: '', text: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.' },
//     { id: 5, sender: 'Floyd Miles', userId: '000032', text: 'Hello this is Floyd from USA. How are you doing?' }
//   ];

//   const copyMessage = (id: number, text: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 1500);
//   };

//   const copyAllMessages = () => {
//     const fullText = messages.map(msg => `${msg.sender === 'user' ? 'User' : msg.sender}: ${msg.text}`).join('\n');
//     navigator.clipboard.writeText(fullText);
//   };

//   return (
//     <div>
//       <div>
//         <div className='flex items-center justify-between cursor-pointer mb-6'>
//           <h1 className="text-2xl font-semibold text-[#171C35]">Transcript</h1>
//           <img 
//             src="https://i.ibb.co/C5fw58ZT/Copyicon.png" 
//             className='shrink-0 w-6 h-6' 
//             alt="Copy All" 
//             onClick={copyAllMessages}
//           />
//         </div>

//         <div className="flex flex-col gap-3">
//           {messages.map((msg) => {
//             const isFloyd = msg.sender === 'Floyd Miles';
//             const isActive = isPlaying && msg.id === currentMessageId;

//             return (
//               <div key={msg.id} className={`flex ${isFloyd ? 'justify-start' : 'justify-end'} gap-3 items-start`}>
//                 {/* Left Side - Floyd Avatar */}
//                 {isFloyd && (
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     {msg.avatar ? (
//                       <img src={msg.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
//                     ) : (
//                       <span className="flex items-center justify-center w-full h-full bg-[#E8E8E8] rounded-full">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 13" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
//                           <g clipPath="url(#clip0_2500_15819)">
//                             <path d="M7.71546 9.00737C7.68184 8.55228 7.67237 8.09575 7.68709 7.63967L7.68655 7.65971C8.0969 7.2371 8.35287 6.69017 8.41364 6.10621L8.41473 6.09483C8.59964 6.07967 8.89146 5.90092 8.97655 5.19242C9.00203 5.0704 8.99225 4.94371 8.94833 4.82697C8.90442 4.71024 8.82816 4.60821 8.72836 4.53267L8.72673 4.53158C9.02782 3.63242 9.65291 0.850417 7.56982 0.563333C7.35545 0.189583 6.80673 0 6.09327 0C3.23891 0.052 2.89473 2.14013 3.51873 4.53158C3.41787 4.6076 3.34094 4.71062 3.29698 4.82854C3.25302 4.94645 3.24385 5.07438 3.27055 5.19729L3.27 5.19296C3.35727 5.90038 3.64691 6.08021 3.83182 6.09538C3.89676 6.68585 4.16089 7.23716 4.58127 7.65971C4.59476 8.12379 4.5842 8.58825 4.54964 9.05125L4.55236 9.00737C3.98618 10.5154 0.174545 10.0918 0 13H12.2498C12.0742 10.0918 8.28 10.5154 7.71491 9.00737H7.71546Z" fill="#9EA3AB"/>
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_2500_15819">
//                               <rect width="12" height="13" fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Message Box */}
//                 <div className={`relative group ${isFloyd ? '' : 'ml-auto'}`}>
//                   <div 
//                     className={`inline-block px-4 py-3 rounded-3xl transition-all duration-300 max-w-[600px] ${
//                       isActive 
//                         ? 'bg-white border-2 border-[#526FFF]' 
//                         : isFloyd 
//                           ? 'bg-[#F5F5F5] border border-white'
//                           : 'bg-[#526FFF0D] border border-white'
//                     }`}
//                   >
//                     <div className="flex items-start gap-2">
//                       {/* Copy icon for Floyd (left side of text) */}
//                       {isFloyd && (
//                         <button
//                           onClick={() => copyMessage(msg.id, msg.text)}
//                           className="p-1 rounded transition-opacity opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer hover:bg-gray-100"
//                           aria-label="Copy message"
//                         >
//                           <img src={copy} alt="Copy" className="w-4 h-4" />
//                         </button>
//                       )}

//                       <p className={`text-[#171C35] text-sm leading-relaxed flex-1 ${isFloyd ? 'text-left' : 'text-left'}`}>
//                         {msg.text}
//                       </p>

//                       {/* Copy icon for User (right side of text) */}
//                       {!isFloyd && (
//                         <button
//                           onClick={() => copyMessage(msg.id, msg.text)}
//                           className="p-1 rounded transition-opacity opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer hover:bg-gray-100"
//                           aria-label="Copy message"
//                         >
//                           <img src={copy} alt="Copy" className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>

//                     {/* Copied message bubble */}
//                     {copiedId === msg.id && (
//                       <span className="absolute -top-10 right-0 bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-10">
//                         Copied
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Side - Blue Icon for User Messages */}
//                 {!isFloyd && (
//                   <div className="  flex items-center justify-center flex-shrink-0">
                
//                   <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
//   <rect width="48" height="48" rx="24" fill="#526FFF"/>
//   <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3317 15.5648C18.7955 20.6005 19.7809 22.2962 22.9019 23.4307L25.5102 24.3783L23.0563 25.1021C20.0975 25.9743 18.8377 28.0142 18.3426 32.7366L18 36L20.0511 35.5651C33.3154 32.7527 33.3166 15.1951 20.0529 12.4278L18.003 12L18.3317 15.5648Z" fill="white"/>
// </svg>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TranscriptChat;





// import React, { useState } from 'react';
// import copy from '../../../assets/svgIcon/copy2.svg'; // Assuming this SVG is still used for 'Floyd Miles' copy

// interface Message {
//   id: number;
//   sender: 'Floyd Miles' | 'user';
//   userId: string;
//   text: string;
//   avatar?: string;
// }

// const TranscriptChat: React.FC = () => {
//   const [copiedId, setCopiedId] = useState<number | null>(null);

//   const messages: Message[] = [
//     { id: 1, sender: 'Floyd Miles', userId: '000032', text: 'Hello this is Floyd from USA. How are you doing?' },
//     { id: 2, sender: 'user', userId: '', text: 'I am good. How can I help you?' },
//     { id: 3, sender: 'Floyd Miles', userId: '000032', text: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.', avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png' },
//     { id: 4, sender: 'user', userId: '', text: 'AI-powered tools help radiologists analyze images (like X-rays, CT scans, and MRIs) to identify conditions such as tumors, fractures, and infections with remarkable accuracy.' },
//     { id: 5, sender: 'Floyd Miles', userId: '000032', text: 'Hello this is Floyd from USA. How are you doing?' }
//   ];

//   const copyMessage = (id: number, text: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 1500); // 1.5 second auto hide
//   };

//   // Avatar placeholder component (using the blue/purple avatar from the image)
//   const DefaultAvatar = () => (
//     <div className="w-10 h-10 flex-shrink-0">
//       <img
//         src="https://i.ibb.co/6P0L8yX/avatar-placeholder.png" // Placeholder for a standard blue/purple avatar
//         alt="Avatar"
//         className="w-full h-full rounded-full object-cover"
//       />
//     </div>
//   );
  
//   // Custom SVG for the User/Copy Button (Blue Arrow)
//   const CopyButtonSVG = (
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M12.6071 6.84078C12.9806 6.57861 13.4357 6.5168 13.8436 6.66649C14.2514 6.81618 14.5492 7.1593 14.6371 7.63223L15.4222 11.9678L15.4419 12.0743C15.4616 12.1808 15.5406 12.2618 15.6328 12.3023L19.4627 13.8863C19.9575 14.1205 20.1983 14.6738 19.9839 15.1764C19.7695 15.679 19.2458 15.9388 18.7397 15.7471L15.6841 14.5804L15.6669 14.5746C15.5495 14.5372 15.4578 14.4449 15.4206 14.3276L15.4148 14.3104L15.1664 12.6393L15.1472 12.5186C15.1417 12.4912 15.1473 12.4632 15.1631 12.4384L15.1731 12.4239C15.3622 12.146 15.4746 11.821 15.4746 11.4789C15.4746 11.0504 15.2586 10.6558 14.9084 10.4352L9.0494 6.78604C8.55835 6.48155 7.84279 6.64333 7.5383 7.13438C7.23381 7.62543 7.39559 8.341 7.88664 8.64549L10.3752 10.1506L10.5181 10.2393C10.7497 10.3855 10.8997 10.6358 10.9254 10.9161L10.9255 10.9162L10.9254 10.9163C10.9252 10.9407 10.9213 10.9649 10.9137 10.9882L10.9037 11.0207L10.8937 11.0478L10.8847 11.0717L10.8757 11.0956L9.75231 14.1278L9.73463 14.2253C9.71695 14.3228 9.63665 14.4022 9.53915 14.4199L5.47802 15.1428C4.98083 15.2289 4.54583 14.8966 4.46077 14.3995C4.37571 13.9023 4.70801 13.4673 5.2052 13.3823L9.12304 12.7136L9.16016 12.7073C9.27419 12.6881 9.37039 12.6074 9.40798 12.4934L9.41434 12.4563L9.58496 7.80802C9.6469 7.33235 9.88373 6.90159 10.2798 6.61794C10.6759 6.33429 11.168 6.22384 11.6601 6.31174L12.6071 6.84078Z" fill="white"/>
//       </svg>
//   );

//   return (
//     <div className='max-w-3xl mx-auto'>
//       <div>
//         {/* Header - Transcript and Copy All Button */}
//         <div className='flex items-center justify-between cursor-pointer mb-6'>
//           <h1 className="text-2xl font-semibold text-[#171C35]">Transcript</h1>
//           <button
//              onClick={() => {
//               const fullText = messages.map(msg => `${msg.sender === 'user' ? 'User' : msg.sender}: ${msg.text}`).join('\n');
//               navigator.clipboard.writeText(fullText);
//             }}
//             className='shrink-0 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition'
//             aria-label="Copy All Transcript"
//           >
//              <img 
//                src="https://i.ibb.co/C5fw58ZT/Copyicon.png" 
//                className='shrink-0 w-6 h-6' 
//                alt="Copy All" 
//              />
//           </button>
//         </div>
//         {/* --- */}

//         {/* Chat Messages */}
//         <div className="flex flex-col gap-5">
//           {messages.map((msg) => {
//             const isFloyd = msg.sender === 'Floyd Miles';
//             const isUser = msg.sender === 'user';
            
//             // Determine alignment and max-width for bubbles
//             const alignmentClass = isUser ? 'justify-end' : 'justify-start';
//             const bubbleWidthClass = 'max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]';

//             // Determine bubble style
//             const bubbleClasses = isUser
//               ? 'bg-[#E0E6FF] text-[#171C35] rounded-tl-2xl rounded-tr-none rounded-b-2xl' // User bubble (Right aligned, custom color)
//               : 'bg-[#F6F6F6] text-[#171C35] rounded-tr-2xl rounded-tl-none rounded-b-2xl'; // Floyd bubble (Left aligned, light gray)

//             return (
//               <div key={msg.id} className={`flex items-start ${alignmentClass} gap-3`}>

//                 {/* Floyd's Avatar (always on the left if the message is from Floyd) */}
//                 {isFloyd && (
//                   <div className='w-10 h-10 flex-shrink-0'>
//                     {msg.avatar ? (
//                       <img src={msg.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
//                     ) : (
//                       <DefaultAvatar />
//                     )}
//                   </div>
//                 )}
                
//                 {/* Spacer for User's messages to align with Floyd's avatar (visually) */}
//                 {isUser && <div className="w-10 h-10 invisible" />} 

//                 {/* Message Box */}
//                 <div className={`relative flex items-end group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
//                     <div className={`${bubbleWidthClass} p-3 md:p-4 ${bubbleClasses}`}>
//                         <p className="text-sm font-medium whitespace-pre-wrap">{msg.text}</p>
//                     </div>

//                     {/* Copy/Action Button */}
//                     <button
//                         onClick={() => copyMessage(msg.id, msg.text)}
//                         className={`
//                             p-2 rounded-full flex items-center justify-center transition-all shrink-0 
//                             ${isUser ? 'ml-3 bg-[#A8B3FE]' : 'mr-3 bg-white border border-gray-100'} 
//                             ${copiedId === msg.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
//                             hover:shadow-md
//                         `}
//                         aria-label="Copy message"
//                     >
//                         {isUser ? (
//                             CopyButtonSVG // Blue Arrow icon for User messages
//                         ) : (
//                             <img src={copy} alt="Copy" className="w-5 h-5" /> // Standard copy icon for Floyd's messages
//                         )}
//                     </button>
                    
//                     {/* Copied message bubble */}
//                     {copiedId === msg.id && (
//                         <span className={`absolute ${isUser ? '-top-5 right-16' : '-top-5 left-16'} 
//                              bg-black text-white text-xs px-2 py-0.5 rounded-full z-10`}>
//                             Copied
//                         </span>
//                     )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TranscriptChat;