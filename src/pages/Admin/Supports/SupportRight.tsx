import { useState } from "react";
import karennix from '../../../assets/svgIcon/karenNix.svg'
import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg'
import call from '../../../assets/svgIcon/callLogs.svg'
import vediocal from '../../../assets/svgIcon/videoCall.svg'
import send from '../../../assets/svgIcon/send.svg'
import doc from '../../../assets/svgIcon/document.svg'
import react from '../../../assets/svgIcon/react.svg'

interface Message {
  id: number;
  sender: string;
  avatar: string;
  timestamp: string;
  content: string;
  isDoctor: boolean;
}

const SupportRight = () => {
  const [messageText, setMessageText] = useState('');
      const messages: Message[] = [
    {
      id: 1,
      sender: 'Kurmisadia',
      avatar: kurmisadia,
      timestamp: 'Jan 30, 2023, 5:11 AM',
      content: 'Hello Dr. Johnson, I need to consult with you about a patient with unusual',
      isDoctor: false
    },
    {
      id: 2,
      sender: 'Dr. Keren nix',
      avatar: karennix,
      timestamp: 'Jan 30, 2023, 5:10 AM',
      content: 'Of course, Dr. Wilson. What are the symptoms you\'re seeing?',
      isDoctor: true
    },
    {
      id: 3,
      sender: 'Kurmisadia',
      avatar: kurmisadia,
      timestamp: 'Jan 30, 2023, 5:11 AM',
      content: 'Hello Dr. Johnson, I need to consult with you about a patient with unusual',
      isDoctor: false
    },
    {
      id: 4,
      sender: 'Dr. Keren nix',
      avatar: karennix,
      timestamp: 'Jan 30, 2023, 5:10 AM',
      content: 'Of course, Dr. Wilson. What are the symptoms you\'re seeing?',
      isDoctor: true
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };
  return (
    <div>
       {/* Right Side - Chat */}
          <div className=" min-h-screen ">
            <div className="bg-white rounded-2xl pb-4 overflow-hidden flex flex-col ">
              {/* Chat Header */}
              <div className="p-5 m-4 bg-[#F3F6F6] rounded-2xl flex items-center justify-between ">
                <div className="flex items-center gap-3 ">
                  <div className="relative">
                    <img
                      src={kurmisadia}
                      alt="Dr. Keren nix"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-[#171C35] mb-2">Kurmisadia</h3>
                    <div className="flex items-center gap-8 text-sm text-[#111A2D]">
                      <span>Last seen 2 hours ago</span>
                      <span>Local time: Jan 30, 2023, 5:10 AM</span>
                    </div>
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

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white ">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3 border-b border-gray-100">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col items-baseline gap-1 mb-1">
                        <h4 className="font-semibold text-[#171C35] text-base">{message.sender}</h4>
                        <span className="text-sm text[#111A2D]">{message.timestamp}</span>
                      </div>
                      <div className={`inline-block  py-2.5 rounded-2xl max-w-lg ${
                        message.isDoctor 
                          ? '' 
                          : ''
                      }`}>
                        <p className="text-sm font-medium text-[#171C35] leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4  bg-[#F3F6F6] m-3 rounded-3xl">
                <div className="flex items-center gap-3">
                  <button className="    transition-colors flex-shrink-0">
                   <img src={doc} alt="" className='p-[10px] bg-white h-10 w-10 rounded-full' />
                  </button>
                  <button className="p-2  rounded-lg transition-colors flex-shrink-0">
                    <img src={react} alt="" className='p-[10px] bg-white h-10 w-10 rounded-full' />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-3 bg-white border border-gray-50 rounded-3xl  placeholder:text-[#111A2D]  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-5 py-2.5 bg-[#526FFF] text-white rounded-[25px] font-medium  transition-colors flex items-center gap-2 flex-shrink-0"
                  >
                    SEND
                    <img src={send} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default SupportRight
