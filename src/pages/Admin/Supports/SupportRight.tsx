// import { useState } from "react";
// import karennix from '../../../assets/svgIcon/karenNix.svg'
// import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg'
// import call from '../../../assets/svgIcon/callLogs.svg'
// import vediocal from '../../../assets/svgIcon/videoCall.svg'
// import send from '../../../assets/svgIcon/send.svg'
// import doc from '../../../assets/svgIcon/document.svg'
// import react from '../../../assets/svgIcon/react.svg'

// interface Message {
//   id: number;
//   sender: string;
//   avatar: string;
//   timestamp: string;
//   content: string;
//   isDoctor: boolean;
// }

// const SupportRight = () => {
//   const [messageText, setMessageText] = useState('');
//       const messages: Message[] = [
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
//     <div>
//        {/* Right Side - Chat */}
//           <div className=" min-h-screen ">
//             <div className="bg-white rounded-2xl pb-4 overflow-hidden flex flex-col ">
//               {/* Chat Header */}
//               <div className="p-5 m-4 bg-[#F3F6F6] rounded-2xl flex items-center justify-between ">
//                 <div className="flex items-center gap-3 ">
//                   <div className="relative">
//                     <img
//                       src={kurmisadia}
//                       alt="Dr. Keren nix"
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-xl text-[#171C35] mb-2">Kurmisadia</h3>
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
//               <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white ">
//                 {messages.map((message) => (
//                   <div key={message.id} className="flex gap-3 border-b border-gray-100">
//                     <img
//                       src={message.avatar}
//                       alt={message.sender}
//                       className="w-12 h-12 rounded-full object-cover flex-shrink-0"
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
//     </div>
//   )
// }

// export default SupportRight




// SupportRight.tsx - Chat Window Component
import { useState, useEffect, useRef } from "react";
import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
import call from '../../../assets/svgIcon/callLogs.svg';
import vediocal from '../../../assets/svgIcon/videoCall.svg';
import send from '../../../assets/svgIcon/send.svg';
import doc from '../../../assets/svgIcon/document.svg';
import react from '../../../assets/svgIcon/react.svg';

interface Message {
  id: number;
  sender: string;
  avatar: string;
  timestamp: string;
  content: string;
  isOwn: boolean;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  online?: boolean;
}

interface SupportRightProps {
  selectedFriend: Friend;
}

// Dr. Keren nix er fixed conversation
const karenNixConversation: Message[] = [
  {
    id: 1,
    sender: 'Dr. Keren nix',
    avatar: '',
    timestamp: 'Jan 30, 2023, 5:10 AM',
    content: 'Hello! How can I assist you today?',
    isOwn: false
  },
  {
    id: 2,
    sender: 'Kurmisadia',
    avatar: kurmisadia,
    timestamp: 'Jan 30, 2023, 5:11 AM',
    content: 'Hi Dr. Keren, I need to consult with you about a patient case.',
    isOwn: true
  },
  {
    id: 3,
    sender: 'Dr. Keren nix',
    avatar: '',
    timestamp: 'Jan 30, 2023, 5:12 AM',
    content: 'Of course! What are the symptoms you\'re observing?',
    isOwn: false
  },
  {
    id: 4,
    sender: 'Kurmisadia',
    avatar: kurmisadia,
    timestamp: 'Jan 30, 2023, 5:13 AM',
    content: 'The patient is experiencing severe headaches and occasional dizziness.',
    isOwn: true
  }
];

const SupportRight = ({ selectedFriend }: SupportRightProps) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages when friend changes
  useEffect(() => {
    let initialMessages: Message[];
    
    if (selectedFriend.name === 'Dr. Keren nix') {
      // Karen Nix er fixed conversation
      initialMessages = karenNixConversation.map(msg => ({
        ...msg,
        avatar: msg.isOwn ? kurmisadia : selectedFriend.avatar
      }));
    } else {
      // Other friends er dynamic conversation
      initialMessages = [
        {
          id: 1,
          sender: selectedFriend.name,
          avatar: selectedFriend.avatar,
          timestamp: new Date(Date.now() - 10 * 60000).toLocaleString('en-US', { 
            month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true 
          }),
          content: 'Hello! Good to hear from you.',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Kurmisadia',
          avatar: kurmisadia,
          timestamp: new Date(Date.now() - 8 * 60000).toLocaleString('en-US', { 
            month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true 
          }),
          content: 'Hi! I wanted to discuss something important.',
          isOwn: true
        }
      ];
    }
    
    setMessages(initialMessages);
    setMessageText('');
  }, [selectedFriend.id]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'Kurmisadia',
        avatar: kurmisadia,
        timestamp: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true 
        }),
        content: messageText,
        isOwn: true
      };
      
      setMessages([...messages, newMessage]);
      setMessageText('');

      // Simulate reply
      setTimeout(() => {
        const replyMessage: Message = {
          id: messages.length + 2,
          sender: selectedFriend.name,
          avatar: selectedFriend.avatar,
          timestamp: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
          }),
          content: 'Thank you for sharing. I\'ll review this information.',
          isOwn: false
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 2000);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-xl sm:rounded-2xl pb-2 sm:pb-4 overflow-hidden flex flex-col h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)]">
        {/* Chat Header */}
        <div className="p-3 sm:p-4 md:p-5 m-2 sm:m-3 md:m-4 bg-[#F3F6F6] rounded-xl sm:rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              {selectedFriend.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-[#171C35] mb-1 truncate">{selectedFriend.name}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 text-xs sm:text-sm text-[#111A2D]">
                <span className="truncate">{selectedFriend.online ? 'Online' : 'Last seen 2 hours ago'}</span>
                <span className="hidden sm:inline truncate">Local time: {new Date().toLocaleString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric', 
                  hour: 'numeric', 
                  minute: 'numeric', 
                  hour12: true 
                })}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <img src={vediocal} alt="Video Call" className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <img src={call} alt="Call" className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 py-2 sm:py-4 space-y-3 sm:space-y-4 bg-white">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100 ${
              message.isOwn ? 'flex-row-reverse' : ''
            }`}>
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className={`flex-1 min-w-0 ${message.isOwn ? 'text-right' : ''}`}>
                <div className={`flex ${message.isOwn ? 'flex-row-reverse' : ''} items-baseline gap-2 mb-1 flex-wrap`}>
                  <h4 className="font-semibold text-[#171C35] text-sm sm:text-base truncate">{message.sender}</h4>
                  <span className="text-xs sm:text-sm text-[#111A2D] flex-shrink-0">{message.timestamp}</span>
                </div>
                <div className={`inline-block px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl max-w-full sm:max-w-lg ${
                  message.isOwn 
                    ? 'bg-[#526FFF] text-white' 
                    : 'bg-[#F3F6F6] text-[#171C35]'
                }`}>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed break-words">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-2 sm:p-3 md:p-4 bg-[#F3F6F6] m-2 sm:m-3 rounded-2xl sm:rounded-3xl">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <button className="transition-colors flex-shrink-0 hidden sm:block">
              <img src={doc} alt="Attach" className='p-2 sm:p-[10px] bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full' />
            </button>
            <button className="transition-colors flex-shrink-0 hidden sm:block">
              <img src={react} alt="React" className='p-2 sm:p-[10px] bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full' />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-50 rounded-2xl sm:rounded-3xl placeholder:text-[#111A2D] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-[20px] sm:rounded-[25px] font-medium transition-colors flex items-center gap-1.5 sm:gap-2 flex-shrink-0 text-xs sm:text-sm ${
                messageText.trim() 
                  ? 'bg-[#526FFF] text-white hover:bg-[#4158d9]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">SEND</span>
              <span className="sm:hidden">Send</span>
              <img src={send} alt="Send" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportRight;