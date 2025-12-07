import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Paperclip, Smile, Send } from 'lucide-react';
import EmojiPicker from "emoji-picker-react";

import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';

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

interface AdminSupportRightProps {
  selectedFriend: Friend;
  onBack: () => void;
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

const SupportRight = ({ selectedFriend, onBack }: AdminSupportRightProps) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      initialMessages = karenNixConversation.map(msg => ({
        ...msg,
        avatar: msg.isOwn ? kurmisadia : selectedFriend.avatar
      }));
    } else {
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
    setShowEmojiPicker(false);
  }, [selectedFriend.id, selectedFriend.avatar, selectedFriend.name]);

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
      <div className="bg-white rounded-xl md:rounded-3xl pb-2 md:pb-4 overflow-hidden flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-140px)]">
        
        {/* Mobile Back Button */}
        <button
          className="lg:hidden p-4 text-blue-600 font-semibold text-left flex items-center gap-2 border-b"
          onClick={onBack}
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Contacts
        </button>

        {/* Chat Header */}
        <div className="p-3 md:p-5 m-2 md:m-4 bg-[#F3F6F6] rounded-xl md:rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className="relative shrink-0">
              <img
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              {selectedFriend.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm md:text-xl text-headingBlack mb-1 truncate">
                {selectedFriend.name}
              </h3>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 text-xs md:text-sm text-subHeadingBlack">
                <span className="truncate">
                  {selectedFriend.online 
                    ? t("adminDashboard.routes.support.chat.online")
                    : t("adminDashboard.routes.support.chat.lastSeen", { time: "2 hours" })
                  }
                </span>
                <span className="hidden md:inline truncate">
                  {t("adminDashboard.routes.support.chat.localTime")} {new Date().toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 md:px-5 py-2 md:py-4 space-y-3 md:space-y-4 bg-white">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 md:gap-3 pb-3 md:pb-4 border-b border-gray-100 ${
              message.isOwn ? 'flex-row-reverse' : ''
            }`}>
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover shrink-0"
              />
              <div className={`flex-1 min-w-0 ${message.isOwn ? 'text-right' : ''}`}>
                <div className={`flex ${message.isOwn ? 'flex-row-reverse' : ''} items-baseline gap-1 md:gap-2 mb-1 flex-wrap`}>
                  <h4 className="font-semibold text-headingBlack text-xs md:text-base truncate">
                    {message.sender}
                  </h4>
                  <span className="text-xs text-subHeadingBlack shrink-0">{message.timestamp}</span>
                </div>
                <div className={`inline-block px-3 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl max-w-full md:max-w-lg ${
                  message.isOwn 
                    ? 'bg-[#526FFF] text-white' 
                    : 'bg-[#F3F6F6] text-headingBlack'
                }`}>
                  <p className="text-xs md:text-sm font-medium leading-relaxed break-words">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-2 md:p-4 bg-[#F3F6F6] m-2 md:m-3 rounded-xl md:rounded-3xl relative">
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 z-50">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setMessageText(prev => prev + emojiData.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="transition-colors shrink-0 p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Paperclip className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" />

            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="transition-colors shrink-0 p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Smile className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>

            <input
              type="text"
              placeholder={t("adminDashboard.routes.support.chat.typeMessage")}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-50 rounded-xl md:rounded-3xl placeholder:text-subHeadingBlack text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
            />

            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className={`px-3 md:px-5 py-2 md:py-2.5 rounded-[20px] md:rounded-[25px] font-medium transition-colors flex items-center gap-1 md:gap-2 shrink-0 text-xs md:text-sm ${
                messageText.trim() 
                  ? 'bg-[#526FFF] text-white hover:bg-[#4158d9]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t("adminDashboard.routes.support.chat.sendButton")}
              <Send className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportRight;