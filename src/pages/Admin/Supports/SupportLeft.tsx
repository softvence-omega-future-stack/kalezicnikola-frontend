import React, { useState } from 'react';
import call from '../../../assets/svgIcon/callLogs.svg';
import vediocal from '../../../assets/svgIcon/videoCall.svg';
import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
import searchIcon from '../../../assets/svgIcon/search.svg';
import home from '../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../assets/svgIcon/chevronnRight.svg';
import keren from '../../../assets/svgIcon/karen.svg';
import dr1 from '../../../assets/svgIcon/drChat1.svg';
import dr2 from '../../../assets/svgIcon/drChat3.svg';
import dr3 from '../../../assets/svgIcon/drChat4.svg';
import dr4 from '../../../assets/svgIcon/drChat2.svg';
import SupportRight from './SupportRight';

interface Message {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread?: boolean;
  online?: boolean;
  role: 'doctor' | 'admin';
}

const SupportLeft: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<Message | null>(null);

  const messages: Message[] = [
    { id: 1, name: 'Dr. Keren nix', avatar: keren, message: "I'll check the patient's records", time: '2 minutes ago', unread: true, online: true, role: 'doctor' },
    { id: 2, name: 'Dr. Floyd Miles', avatar: dr1, message: "I'll check the patient's records", time: 'Yesterday', online: true, role: 'doctor' },
    { id: 3, name: 'Dr. Jane Cooper', avatar: dr2, message: "I'll check the patient's records", time: 'Monday', unread: true, online: true, role: 'doctor' },
    { id: 4, name: 'Dr. Robert Fox', avatar: dr3, message: "I'll check the patient's records", time: 'Last week', online: true, role: 'doctor' },
    { id: 5, name: 'Dr. Arlene McCoy', avatar: dr1, message: "I'll check the patient's records", time: 'Last week', online: true, role: 'doctor' },
    { id: 6, name: 'Dr. Darlene Robertson', avatar: dr4, message: "I'll check the patient's records", time: 'Last week', online: true, role: 'doctor' },
    { id: 7, name: 'Dr. Ralph Edwards', avatar: dr2, message: "I'll check the patient's records", time: '02-12-2025', online: true, role: 'doctor' },
  ];

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Friend click handler
  const handleFriendClick = (friend: Message) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="w-full bg-[#F3F6F6] font-sans max-[767px]:mt-6">
      {/* Header */}
      <div className="pb-4 md:pb-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2 md:mb-4 flex-wrap">
          <img src={home} alt="Home" className="h-4 w-4" />
          <img src={chevron} alt="Chevron" className="h-3 w-3" />
          <span className="text-gray-600">Dashboard</span>
          <img src={chevron} alt="Chevron" className="h-3 w-3" />
          <span className="text-[#171c35] font-medium">Supports</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-headingBlack max-[767px]:mt-4">Supports</h1>
      </div>

      {/* Main Chat Content */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="bg-white rounded-xl md:rounded-3xl overflow-hidden flex flex-col h-full">
            {/* Doctor Profile Header */}
            <div className="p-3 md:p-5 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="relative">
                    <img src={kurmisadia} alt="Kurmisadia" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base text-headingBlack">Kurmisadia</h3>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    <img src={vediocal} alt="Video Call" className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    <img src={call} alt="Call" className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative bg-[#F3F6F6] rounded-[10px] md:rounded-[12px] p-2 flex items-center">
                <img src={searchIcon} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 md:w-4 md:h-4" alt="Search Icon" />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-2 pl-8 md:pl-10 py-2 md:py-2.5 bg-white rounded-[10px] md:rounded-[12px] text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto max-h-[400px] md:max-h-[600px]">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleFriendClick(msg)}
                  className={`relative flex items-center gap-2 md:gap-3 p-3 md:p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 ${
                    selectedFriend?.id === msg.id 
                      ? 'bg-blue-50 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#526FFF]' 
                      : ''
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                      <img src={msg.avatar} alt={msg.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    {msg.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-headingBlack mb-0.5 truncate">{msg.name}</h3>
                    <p className="text-xs text-subHeadingBlack truncate">{msg.message}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs text-subHeadingBlack whitespace-nowrap">{msg.time}</span>
                    {msg.unread && (
                      <span className="w-4 h-4 md:w-5 md:h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        1
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="w-full lg:w-2/3">
          {selectedFriend ? (
            <SupportRight selectedFriend={selectedFriend} />
          ) : (
            <div className="bg-white rounded-xl md:rounded-2xl h-full flex items-center justify-center min-h-[400px] md:min-h-[600px]">
              <div className="text-center text-gray-400 p-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm md:text-lg font-medium mb-2">Select a doctor to start chatting</p>
                <p className="text-xs md:text-sm text-gray-500">Choose from the list of available doctors</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportLeft;






// import React, { useState } from 'react';

// import call from '../../../assets/svgIcon/callLogs.svg';
// import vediocal from '../../../assets/svgIcon/videoCall.svg';
// import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
// import searchIcon from '../../../assets/svgIcon/search.svg';
// import home from '../../../assets/svgIcon/homeIcon.svg';
// import chevron from '../../../assets/svgIcon/chevronnRight.svg';
// import keren from '../../../assets/svgIcon/karen.svg';

// import dr1 from '../../../assets/svgIcon/drChat1.svg';
// import dr2 from '../../../assets/svgIcon/drChat3.svg';
// import dr3 from '../../../assets/svgIcon/drChat4.svg';
// import dr4 from '../../../assets/svgIcon/drChat2.svg';
// import SupportRight from './SupportRight';

// interface Message {
//   id: number;
//   name: string;
//   avatar: string;
//   message: string;
//   time: string;
//   unread?: boolean;
//   online?: boolean;
// }

// const SupportLeft: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const messages: Message[] = [
//     { id: 1, name: 'Dr. Keren nix', avatar: keren, message: "I'll check the patient's records", time: '2 minutes ago', unread: true, online: true },
//     { id: 2, name: 'Dr. Floyd Miles', avatar: dr1, message: "I'll check the patient's records", time: 'Yesterday', online: true },
//     { id: 3, name: 'Dr. Jane Cooper', avatar: dr2, message: "I'll check the patient's records", time: 'Monday', unread: true, online: true },
//     { id: 4, name: 'Dr. Robert Fox', avatar: dr3, message: "I'll check the patient's records", time: 'Last week', online: true },
//     { id: 5, name: 'Dr. Arlene McCoy', avatar: dr1, message: "I'll check the patient's records", time: 'Last week', online: true },
//     { id: 6, name: 'Dr. Darlene Robertson', avatar: dr4, message: "I'll check the patient's records", time: 'Last week', online: true },
//     { id: 7, name: 'Dr. Ralph Edwards', avatar: dr2, message: "I'll check the patient's records", time: '02-12-2025', online: true },
//   ];

//   const filteredMessages = messages.filter(msg =>
//     msg.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="w-full p-4 md:p-6 lg:p-8 bg-[#F3F6F6] font-sans min-h-screen">
//       {/* Header */}
//       <div className="pb-4 md:pb-6">
//         <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 md:mb-4">
//           <img src={home} alt="Home" className="h-4 w-4" />
//           <img src={chevron} alt="Chevron" className="h-3 w-3" />
//           <span className="text-gray-600">Dashboard</span>
//           <img src={chevron} alt="Chevron" className="h-3 w-3" />
//           <span className="text-[#171c35] font-medium">Supports</span>
//         </div>
//         <h1 className="text-2xl sm:text-3xl font-semibold text-[#171C35]">Supports</h1>
//       </div>

//       {/* Main Chat Content */}
//       <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
//         {/* Left Sidebar */}
//         <div className="w-full lg:w-1/3 flex-shrink-0">
//           <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full">
//             {/* Doctor Profile Header */}
//             <div className="p-5 border-b border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="relative">
//                     <img src={kurmisadia} alt="Kurmisadia" className="w-12 h-12 rounded-full object-cover" />
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-base text-[#171C35]">Kurmisadia</h3>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <img src={vediocal} alt="Video Call" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <img src={call} alt="Call" />
//                   </button>
//                 </div>
//               </div>

//               {/* Search */}
//               <div className="relative bg-[#F3F6F6] rounded-[12px] p-2 flex items-center">
//                 <img src={searchIcon} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4" alt="Search Icon" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 px-3 pl-10 py-2.5 bg-white rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Contacts List */}
//             <div className="flex-1 overflow-y-auto max-h-[600px]">
//               {filteredMessages.map((msg, index) => (
//                 <div
//                   key={msg.id}
//                   className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${index !== filteredMessages.length - 1 ? 'border-b border-gray-100' : ''}`}
//                 >
//                   <div className="relative flex-shrink-0">
//                     <div className="w-12 h-12 rounded-full flex items-center justify-center">
//                       <img src={msg.avatar} alt={msg.name} className="w-full h-full rounded-full object-cover" />
//                     </div>
//                     {msg.online && (
//                       <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-base font-semibold text-[#171C35] mb-0.5 truncate">{msg.name}</h3>
//                     <p className="text-xs text-[#111A2D] truncate">{msg.message}</p>
//                   </div>

//                   <div className="flex flex-col items-end gap-1 flex-shrink-0">
//                     <span className="text-xs text-[#111A2D]">{msg.time}</span>
//                     {msg.unread && (
//                       <span className="w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-medium">
//                         1
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="w-full lg:w-2/3">
//           <SupportRight />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportLeft;



// SupportLeft.tsx - Friend List Component
