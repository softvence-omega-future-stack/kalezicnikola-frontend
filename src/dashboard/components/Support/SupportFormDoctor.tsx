import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";

import karennix from '../../../assets/svgIcon/karenNix.svg';
import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
import search from '../../../assets/svgIcon/search.svg';
import home from '../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../assets/svgIcon/chevronnRight.svg';
import doc from '../../../assets/svgIcon/document.svg';
import react from '../../../assets/svgIcon/react.svg';
import send from '../../../assets/svgIcon/send.svg';

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
  const { t } = useTranslation();
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messageText, setMessageText] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      contactId: 1,
      sender: 'Kurmisadia',
      avatar: kurmisadia,
      timestamp: 'Jan 30, 2023, 5:11 AM',
      content: 'Hello Dr. Johnson, I need to consult with you about a patient.',
      isDoctor: false
    },
    {
      id: 2,
      contactId: 1,
      sender: 'Dr. Keren nix',
      avatar: karennix,
      timestamp: 'Jan 30, 2023, 5:10 AM',
      content: 'Of course, Dr. Wilson. What are the symptoms?',
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
    if (messageText.trim() && selectedContact) {
      const newMessage: Message = {
        id: messages.length + 1,
        contactId: selectedContact,
        sender: 'You',
        avatar: karennix,
        timestamp: new Date().toLocaleTimeString(),
        content: messageText,
        isDoctor: true
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const filteredMessages = messages.filter(
    (msg) => msg.contactId === selectedContact
  );

  return (
    <div className="bg-[#F3F6F6] md:mt-[30px] font-sans min-h-screen">

      {/* Desktop Header */}
      {!showChat && (
        <div className="pb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <img src={home} alt="" className="w-4 h-4" />
            <img src={chevron} alt="" />
            <span onClick={() => navigate('/dashboard')} className="cursor-pointer">
              {t("dashboard.routes.supportChat.breadcrumb.home")}
            </span>
            <img src={chevron} alt="" />
            <span className="font-semibold">
              {t("dashboard.routes.supportChat.breadcrumb.current")}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#171C35]">
            {t("dashboard.routes.supportChat.title")}
          </h1>
        </div>
      )}

      {/* Main Grid */}
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[calc(100vh-180px)]">

          {/* LEFT CONTACT LIST */}
          <div className={`bg-white rounded-2xl flex flex-col overflow-hidden ${showChat ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-5 border-b">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img src="https://i.ibb.co.com/tM6Sb5kF/KarenNix.png" className="w-12 h-12 rounded-full" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-semibold text-base text-[#171C35]">Dr. Keren nix</h3>
              </div>

              {/* Search Box */}
              <div className="flex gap-2 bg-[#F3F6F6] rounded-[12px] p-2">
                <div className="relative w-full">
                  <img src={search} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                  <input
                    placeholder={t("dashboard.routes.supportChat.searchPlaceholder")}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full px-10 py-2.5 rounded-[12px] bg-white border"
                  />
                </div>
              </div>
            </div>

            {/* CONTACT LIST */}
            <div className="flex-1 overflow-y-auto divide-y">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact.id);
                    setShowChat(true);
                  }}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="relative shrink-0">
                    <img src={contact.avatar} className="w-12 h-12 rounded-full" />
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-[#526FFF] text-sm truncate max-w-[120px] md:max-w-full">{contact.name}</h4>
                      <span className="text-xs text-gray-400 ml-2">{contact.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#111A2D] truncate max-w-[150px] md:max-w-full" title={contact.lastMessage}>
                      {contact.lastMessage}
                    </p>
                  </div>

                  {contact.unread > 0 && (
                    <div className="w-5 h-5 bg-[#171C35] shrink-0 rounded-full flex items-center justify-center ml-2">
                      <span className="text-xs text-white">{contact.unread}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CHAT AREA */}
          {showChat && selectedContact && (
            <div className="fixed inset-0 lg:static z-50 bg-white rounded-2xl flex flex-col justify-start cursor-pointer overflow-hidden lg:col-span-2">
              
              {/* Mobile Back Button */}
              <button
                className="lg:hidden p-4 text-[#526FFF] font-semibold text-left"
                onClick={() => setShowChat(false)}
              >
                {t("dashboard.routes.supportChat.backButton")}
              </button>

              {/* Chat Header */}
              <div className="p-5 m-4 bg-[#F3F6F6] rounded-2xl flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={karennix} className="w-12 h-12 rounded-full" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-[#171C35]">Dr. Keren nix</h3>
                    <span className="text-sm text-gray-500">
                      {t("dashboard.routes.supportChat.chat.lastSeen", { time: "2 hours" })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isDoctor ? 'justify-end' : 'justify-start'}`}>
                    {!message.isDoctor && <img src={message.avatar} className="w-10 h-10 rounded-full" />}

                    <div className="max-w-lg">
                      <span className="text-xs text-gray-400">{message.timestamp}</span>
                      <div className={`py-2.5 px-4 rounded-2xl text-sm font-medium ${message.isDoctor ? 'bg-blue-500 text-white self-end' : 'bg-gray-100 text-[#171C35]'}`}>
                        {message.content}
                      </div>
                    </div>

                    {message.isDoctor && <img src={message.avatar} className="w-10 h-10 rounded-full" />}
                  </div>
                ))}
              </div>

              {/* Input Box */}
              <div className="p-5 bg-[#F3F6F6] m-2 rounded-[20px] relative">
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => fileInputRef.current?.click()}>
                    <img src={doc} className="p-1.5 bg-white h-8 w-8 rounded-full min-w-max" />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" />

                  <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <img src={react} className="p-1.5 bg-white h-8 w-8 rounded-full min-w-max" />
                  </button>

                  {showEmojiPicker && (
                    <div className="absolute bottom-16 left-2 z-50">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => setMessageText(prev => prev + emojiData.emoji)}
                      />
                    </div>
                  )}

                  <input
                    placeholder={t("dashboard.routes.supportChat.chat.typeMessage")}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 w-full px-4 h-10 bg-white rounded-3xl text-xs"
                  />

                  <button
                    onClick={handleSendMessage}
                    className="px-3 py-2 bg-[#526FFF] text-white rounded-3xl text-xs flex items-center gap-1 min-w-max"
                  >
                    {t("dashboard.routes.supportChat.chat.sendButton")}
                    <img src={send} className="h-3 w-3" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SupportChat;
