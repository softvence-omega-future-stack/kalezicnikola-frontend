// import React, { useState } from 'react';

// import call from '../../../assets/svgIcon/callLogs.svg'
// import vediocal from '../../../assets/svgIcon/videoCall.svg'
// import karennix from '../../../assets/svgIcon/karenNix.svg'
// import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg'
// import search from '../../../assets/svgIcon/search.svg'
// import home from '../../../assets/svgIcon/homeIcon.svg'
// import chevron from '../../../assets/svgIcon/chevronnRight.svg'
// import doc from '../../../assets/svgIcon/document.svg'
// import react from '../../../assets/svgIcon/react.svg'
// import send from '../../../assets/svgIcon/send.svg'

// interface Message {
//   id: number;
//   sender: string;
//   avatar: string;
//   timestamp: string;
//   content: string;
//   isDoctor: boolean;
// }

// interface Contact {
//   id: number;
//   name: string;
//   avatar: string;
//   lastMessage: string;
//   timestamp: string;
//   unread: number;
//   isOnline: boolean;
// }

// const SupportChat: React.FC = () => {
//   const [selectedContact, setSelectedContact] = useState<number>(1);
//   const [messageText, setMessageText] = useState('');
//   const [searchText, setSearchText] = useState('');

//   const contacts: Contact[] = [
//     {
//       id: 1,
//       name: 'Kurmisadia',
//       avatar: 'https://i.ibb.co.com/SwgjvKYG/kurmisiddha.png',
//       lastMessage: "I'll check the patient's records",
//       timestamp: '2 minutes ago',
//       unread: 1,
//       isOnline: true
//     }
//   ];

//   const messages: Message[] = [
//     {
//       id: 1,
//       sender: 'Kurmisadia',
//       avatar: kurmisadia,
//       timestamp: 'Jan 30, 2023, 5:11 AM',
//       content: 'Hello Dr. Johnson, I need to consult with you about a patient with unusual',
//       isDoctor: false
//     },
//     {
//       id: 2,
//       sender: 'Dr. Keren nix',
//       avatar: karennix,
//       timestamp: 'Jan 30, 2023, 5:10 AM',
//       content: 'Of course, Dr. Wilson. What are the symptoms you\'re seeing?',
//       isDoctor: true
//     },
//     {
//       id: 3,
//       sender: 'Kurmisadia',
//       avatar: kurmisadia,
//       timestamp: 'Jan 30, 2023, 5:11 AM',
//       content: 'Hello Dr. Johnson, I need to consult with you about a patient with unusual',
//       isDoctor: false
//     },
//     {
//       id: 4,
//       sender: 'Dr. Keren nix',
//       avatar: karennix,
//       timestamp: 'Jan 30, 2023, 5:10 AM',
//       content: 'Of course, Dr. Wilson. What are the symptoms you\'re seeing?',
//       isDoctor: true
//     }
//   ];

//   const handleSendMessage = () => {
//     if (messageText.trim()) {
//       console.log('Sending message:', messageText);
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F3F6F6] font-sans">
//       {/* Header */}
//       <div className="  px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//           <img src={home} alt="" />
//             <img src={chevron} alt="" />
//           <span className="text-gray-600">Dashboard</span>
//           <img src={chevron} alt="" />
//           <span className="text-gray-900 font-medium">Supports</span>
//         </div>
//         <h1 className="text-2xl sm:text-3xl font-semibold text-[#171C35]">Supports</h1>
//       </div>

//       {/* Main Content */}
//       <div className=" px-4 sm:px-6 lg:px-8 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
//           {/* Left Sidebar - Contacts */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl  min-h-screen  overflow-hidden">
//               {/* Doctor Profile Header */} 
//               <div className="p-5 border-b border-gray-200">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="relative">
//                       <img
//                         src="https://i.ibb.co.com/tM6Sb5kF/KarenNix.png"
//                         alt="Dr. Keren nix"
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-base text-[#171C35]">Dr. Keren nix</h3>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                      <img src={vediocal} alt="" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                       <img src={call} alt="" />
//                     </button>
//                   </div>
//                 </div>

//                {/* Search */}
// <div className="relative bg-[#F3F6F6] rounded-[12px] p-2 flex items-center">
//   <img src={search} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//   <input
//     type="text"
//     placeholder="search..."
//     value={searchText}
//     onChange={(e) => setSearchText(e.target.value)}
//     className="flex-1 px-3 pl-10 py-2.5 bg-white  rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//   />
//   <button className="ml-2 px-3 py-2 text-sm font-medium transition-colors">
//     Search
//   </button>
// </div>

//               </div>

//               {/* Contact List */}
//               <div className="divide-y divide-gray-100">
//                 {contacts.map((contact) => (
//                   <button
//                     key={contact.id}
//                     onClick={() => setSelectedContact(contact.id)}
//                     className={`w-full p-4 flex items-start gap-3 transition-colors text-left ${
//                       selectedContact === contact.id ? '' : ''
//                     }`}
//                   >
//                     <div className="relative flex-shrink-0">
//                       <img
//                         src={contact.avatar}
//                         alt={contact.name}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                       {contact.isOnline && (
//                         <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between mb-1">
//                         <h4 className="font-semibold text-[#526FFF] text-sm">{contact.name}</h4>
//                         <span className="text-xs text-[#111A2D] whitespace-nowrap ml-2">{contact.timestamp}</span>
//                       </div>
//                       <p className="text-sm text-[#111A2D] truncate">{contact.lastMessage}</p>
//                     </div>
//                     {contact.unread > 0 && (
//                       <div className="flex-shrink-0 w-5 h-5 bg-[#171C35] rounded-full flex items-center justify-center">
//                         <span className="text-xs text-white font-medium">{contact.unread}</span>
//                       </div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Chat */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl  overflow-hidden flex flex-col ">
//               {/* Chat Header */}
//               <div className="p-5 m-4 bg-[#F3F6F6] rounded-2xl flex items-center justify-between ">
//                 <div className="flex items-center gap-3 ">
//                   <div className="relative">
//                     <img
//                       src={karennix}
//                       alt="Dr. Keren nix"
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-xl text-[#171C35] mb-2">Dr. Keren nix</h3>
//                     <div className="flex items-center gap-8 text-sm text-[#111A2D]">
//                       <span>Last seen 2 hours ago</span>
//                       <span>Local time: Jan 30, 2023, 5:10 AM</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <img src={vediocal} alt="" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <img src={call} alt="" />
//                   </button>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
//                 {messages.map((message) => (
//                   <div key={message.id} className="flex gap-3 border-b border-gray-100">
//                     <img
//                       src={message.avatar}
//                       alt={message.sender}
//                       className="w-10 h-10 rounded-full object-cover flex-shrink-0"
//                     />
//                     <div className="flex-1">
//                       <div className="flex flex-col items-baseline gap-1 mb-1">
//                         <h4 className="font-semibold text-[#171C35] text-base">{message.sender}</h4>
//                         <span className="text-sm text[#111A2D]">{message.timestamp}</span>
//                       </div>
//                       <div className={`inline-block  py-2.5 rounded-2xl max-w-lg ${
//                         message.isDoctor 
//                           ? '' 
//                           : ''
//                       }`}>
//                         <p className="text-sm font-medium text-[#171C35] leading-relaxed">{message.content}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Message Input */}
//               <div className="p-4  bg-[#F3F6F6] m-3 rounded-3xl">
//                 <div className="flex items-center gap-3">
//                   <button className="    transition-colors flex-shrink-0">
//                    <img src={doc} alt="" className='p-[10px] bg-white h-10 w-10 rounded-full' />
//                   </button>
//                   <button className="p-2  rounded-lg transition-colors flex-shrink-0">
//                     <img src={react} alt="" className='p-[10px] bg-white h-10 w-10 rounded-full' />
//                   </button>
//                   <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={messageText}
//                     onChange={(e) => setMessageText(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                     className="flex-1 px-4 py-3 bg-white border border-gray-50 rounded-3xl  placeholder:text-[#111A2D]  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="px-5 py-2.5 bg-[#526FFF] text-white rounded-[25px] font-medium  transition-colors flex items-center gap-2 flex-shrink-0"
//                   >
//                     SEND
//                     <img src={send} alt="" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportChat;






import React, { useRef, useState } from 'react';

import call from '../../../assets/svgIcon/callLogs.svg';
import vediocal from '../../../assets/svgIcon/videoCall.svg';
import karennix from '../../../assets/svgIcon/karenNix.svg';
import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
import search from '../../../assets/svgIcon/search.svg';
import home from '../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../assets/svgIcon/chevronnRight.svg';
import doc from '../../../assets/svgIcon/document.svg';
import react from '../../../assets/svgIcon/react.svg';
import send from '../../../assets/svgIcon/send.svg';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";

interface Message {
  id: number;
  contactId: number;
  sender: string;
  avatar: string;
  timestamp: string;
  content: string;
  isDoctor: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

const SupportChat: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<number>(1);
  const [messageText, setMessageText] = useState('');
  const navigate = useNavigate()
  
const fileInputRef = useRef<HTMLInputElement>(null);
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      contactId: 1,
      sender: 'Kurmisadia',
      avatar: kurmisadia,
      timestamp: 'Jan 30, 2023, 5:11 AM',
      content: 'Hello Dr. Johnson, I need to consult with you about a patient with unusual',
      isDoctor: false
    },
    {
      id: 2,
      contactId: 1,
      sender: 'Dr. Keren nix',
      avatar: karennix,
      timestamp: 'Jan 30, 2023, 5:10 AM',
      content: 'Of course, Dr. Wilson. What are the symptoms you\'re seeing?',
      isDoctor: true
    }
  ]);
  const [searchText, setSearchText] = useState('');

  const contacts: Contact[] = [
    {
      id: 1,
      name: 'Kurmisadia',
      avatar: 'https://i.ibb.co.com/SwgjvKYG/kurmisiddha.png',
      lastMessage: "I'll check the patient's records",
      timestamp: '2 minutes ago',
      unread: 1,
      isOnline: true
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        contactId: selectedContact,
        sender: 'You',
        avatar: karennix, // your avatar
        timestamp: new Date().toLocaleTimeString(),
        content: messageText,
        isDoctor: true
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const filteredMessages = messages.filter(msg => msg.contactId === selectedContact);

  return (
    <div className="min-h-screen bg-[#F3F6F6] mt-6 font-sans">
      {/* Header */}
      <div className="py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <img src={home} alt="" className="w-4 h-4" />
          <img src={chevron} alt="" />
          <span onClick={()=> navigate('/dashboard')} className="text-gray-600 cursor-pointer">Dashboard</span>
          <img src={chevron} alt="" />
          <span className="text-gray-900 font-medium">Supports</span>
        </div>
        <h1 className="text-xl md:text-2xl  font-semibold text-[#171C35]">Supports</h1>
      </div>

      {/* Main Content */}
      <div className=" py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
          {/* Left Sidebar - Contacts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl min-h-screen overflow-hidden">
              {/* Doctor Profile Header */}
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://i.ibb.co.com/tM6Sb5kF/KarenNix.png"
                        alt="Dr. Keren nix"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-[#171C35]">Dr. Keren nix</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <img src={vediocal} alt="" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <img src={call} alt="" />
                    </button>
                  </div>
                </div>

                {/* Search */}
             <div className="flex flex-col sm:flex-row items-center gap-2 bg-[#F3F6F6] rounded-[12px] p-2">
  {/* Input with icon */}
  <div className="relative w-full sm:flex-1">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      <img src={search} className="w-5 h-5" />
    </span>
    <input
      type="text"
      placeholder="search..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="w-full px-10 py-2.5 rounded-[12px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  {/* Button */}
  <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition-colors">
    Search
  </button>
</div>

              </div>

              {/* Contact List */}
              <div className="divide-y divide-gray-100">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full p-4 flex items-start gap-3 transition-colors text-left ${
                      selectedContact === contact.id ? '' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {contact.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-[#526FFF] text-sm">{contact.name}</h4>
                        <span className="text-xs text-[#111A2D] whitespace-nowrap ml-2">{contact.timestamp}</span>
                      </div>
                      <p className="text-sm text-[#111A2D] truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <div className="flex-shrink-0 w-5 h-5 bg-[#171C35] rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">{contact.unread}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
              {/* Chat Header */}
            <div className="p-5 m-4 bg-[#F3F6F6] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  {/* Left: Profile */}
  <div className="flex items-center gap-3">
    <div className="relative">
      <img
        src={karennix}
        alt="Dr. Keren nix"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
    <div>
      <h3 className="font-semibold text-xl text-[#171C35] mb-1 sm:mb-2">Dr. Keren nix</h3>
      <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-[#111A2D]">
        <span>Last seen 2 hours ago</span>
        <span>Local time: Jan 30, 2023, 5:10 AM</span>
      </div>
    </div>
  </div>

  {/* Right: Buttons */}
  <div className="flex items-center gap-2 sm:ml-auto">
    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <img src={vediocal} alt="Video Call" />
    </button>
    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <img src={call} alt="Call" />
    </button>
  </div>
</div>


              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
  {filteredMessages.map((message) => (
    <div
      key={message.id}
      className={`flex gap-3 ${message.isDoctor ? 'justify-end' : 'justify-start'}`}
    >
      {!message.isDoctor && (
        <img
          src={message.avatar}
          alt={message.sender}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      )}

      {/* Message + Timestamp wrapper */}
      <div className="flex flex-col items-start space-y-1 max-w-lg">
        {/* Timestamp on top */}
        <span
          className={`text-xs text-gray-400 ${
            message.isDoctor ? 'self-end' : 'self-start'
          }`}
        >
          {message.timestamp}
        </span>

        {/* Message bubble */}
        <div
          className={`py-2.5 px-4 rounded-2xl text-sm font-medium leading-relaxed ${
            message.isDoctor ? 'bg-blue-500 text-white self-end' : 'bg-gray-100 text-[#171C35]'
          }`}
        >
          {message.content}
        </div>
      </div>

      {message.isDoctor && (
        <img
          src={message.avatar}
          alt={message.sender}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      )}
    </div>
  ))}
</div>


              {/* Message Input */}
<div className=" p-5 bg-[#F3F6F6] m-2 rounded-[20px] m-4 relative">
  <div className="flex items-center gap-2">
    {/* Left icons */}
    <div className="flex items-center gap-2">
      {/* Document icon */}
      <button
        className="shrink-0 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <img src={doc} alt="Upload" className="p-1.5 bg-white h-8 w-8 rounded-full" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) console.log("Selected file:", file);
        }}
      />

      {/* React / Emoji icon */}
      <button
        className="shrink-0 cursor-pointer"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        <img src={react} alt="React / Emoji" className="p-1.5 bg-white h-8 w-8 rounded-full" />
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-16 left-2 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setMessageText((prev) => prev + emojiData.emoji);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>

    {/* Input field */}
    <input
      type="text"
      placeholder="Type a message..."
      value={messageText}
      onChange={(e) => setMessageText(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      className="flex-1 min-w-0 px-4 h-10 bg-white border border-gray-50 rounded-3xl placeholder:text-[#111A2D] text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />

    {/* Send button */}
    <button
      onClick={handleSendMessage}
      className="flex-shrink-0 px-3 py-2 bg-[#526FFF] text-white rounded-3xl font-medium text-xs flex items-center gap-1"
    >
      SEND
      <img src={send} alt="" className="h-3 w-3" />
    </button>
  </div>
</div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
