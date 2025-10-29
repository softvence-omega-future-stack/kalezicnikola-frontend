import React, { useState } from 'react';
import { Home, Video, Phone, } from 'lucide-react';

interface Message {
  id: number;
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

  const messages: Message[] = [
    {
      id: 1,
      sender: 'Kurmisadia',
      avatar: 'https://i.ibb.co.com/SwgjvKYG/kurmisiddha.png',
      timestamp: 'Jan 30, 2023, 5:11 AM',
      content: 'Hello Dr. Johnson, I need to consult with you about a patient with unusual',
      isDoctor: false
    },
    {
      id: 2,
      sender: 'Dr. Keren nix',
      avatar: 'https://i.ibb.co.com/tM6Sb5kF/KarenNix.png',
      timestamp: 'Jan 30, 2023, 5:10 AM',
      content: 'Of course, Dr. Wilson. What are the symptoms you\'re seeing?',
      isDoctor: true
    },
    {
      id: 3,
      sender: 'Kurmisadia',
      avatar: 'https://i.ibb.co.com/SwgjvKYG/kurmisiddha.png',
      timestamp: 'Jan 30, 2023, 5:11 AM',
      content: 'Hello Dr. Johnson, I need to consult with you about a patient with unusual',
      isDoctor: false
    },
    {
      id: 4,
      sender: 'Dr. Keren nix',
      avatar: 'https://i.ibb.co.com/tM6Sb5kF/KarenNix.png',
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
    <div className="min-h-screen bg-[#F3F6F6] font-sans">
      {/* Header */}
      <div className="  px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home size={18} className="text-gray-400" />
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-600">Dashboard</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900 font-medium">Supports</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#171C35]">Supports</h1>
      </div>

      {/* Main Content */}
      <div className=" px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Contacts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl  min-h-screen border border-gray-200 overflow-hidden">
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
                      <Video size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

               {/* Search */}
<div className="relative bg-[#F3F6F6] rounded-[12px] p-2 flex items-center">
  <img src='https://i.ibb.co.com/XxdVjfHZ/search-Icon.png'  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  <input
    type="text"
    placeholder="search..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="flex-1 px-3 pl-10 py-2.5 bg-white  rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
  <button className="ml-2 px-3 py-2 text-sm font-medium transition-colors">
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
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                      selectedContact === contact.id ? 'bg-blue-50' : ''
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
              {/* Chat Header */}
              <div className="p-5 m-4 bg-[#F3F6F6] rounded-2xl flex items-center justify-between ">
                <div className="flex items-center gap-3 ">
                  <div className="relative">
                    <img
                      src="https://i.ibb.co.com/tM6Sb5kF/KarenNix.png"
                      alt="Dr. Keren nix"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-[#171C35] mb-2">Dr. Keren nix</h3>
                    <div className="flex items-center gap-8 text-sm text-[#111A2D]">
                      <span>Last seen 2 hours ago</span>
                      <span>Local time: Jan 30, 2023, 5:10 AM</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3 border-b border-gray-100">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
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
                  <button className="p-2  rounded-lg transition-colors flex-shrink-0">
                   <img src="https://i.ibb.co.com/4wJQ3mMQ/msgsender.png" alt="" />
                  </button>
                  <button className="p-2  rounded-lg transition-colors flex-shrink-0">
                    <img src="https://i.ibb.co.com/CpsyF4p4/msgreact-Icon.png" alt="" />
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
                    <img src="https://i.ibb.co.com/ynjTB3Nm/sendicon.png" alt="" />
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