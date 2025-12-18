import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import { socket } from "@/store/socketIo/socketClient";

import karennix from '../../../assets/svgIcon/karenNix.svg';
import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
import search from '../../../assets/svgIcon/search.svg';
import home from '../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../assets/svgIcon/chevronnRight.svg';
import doc from '../../../assets/svgIcon/document.svg';
import react from '../../../assets/svgIcon/react.svg';
import send from '../../../assets/svgIcon/send.svg';

// Import API hooks
import {
  useGetMyConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useUploadChatFileMutation,
} from '@/store/features/supportChat/chatApi';
import type { RootState } from '@/store/store';

// Interface definitions to solve 'data' property errors
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  message: string;
  imageUrl: string | null;
  isRead: boolean;
  createdAt: string;
}

interface Conversation {
  id: string;
  userId: string;
  userRole: string;
  adminId: string | null;
  status: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  user: {
    id: string;
    role: string;
    doctor?: {
      id: string;
      firstName: string;
      lastName: string;
      photo: string | null;
      email: string;
    };
  };
  admin: {
    id: string;
    role: string;
    admin: {
      id: string;
      firstName: string;
      lastName: string;
      photo: string | null;
      email: string;
    };
  } | null;
}

// Defining response types for API data
interface ConversationsResponse {
  data: Conversation[];
}

interface MessagesResponse {
  data: {
    messages: Message[];
  };
}

const SupportChat: React.FC = () => {
  const { t } = useTranslation();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  // API hooks with explicit typing to fix 'data' errors
  const { data: conversationsData, isLoading: conversationsLoading, refetch: refetchConversations } = useGetMyConversationsQuery(undefined);
  
  const { data: messagesData, isLoading: messagesLoading, refetch: refetchMessages } = useGetMessagesQuery(
    selectedConversation || '', 
    { skip: !selectedConversation }
  );
  
  const [sendMessageMutation, { isLoading: sendingMessage }] = useSendMessageMutation();
  const [uploadFile, { isLoading: uploadingFile }] = useUploadChatFileMutation();

  // Casting data to handle potential undefined or nested structures
  const conversations: Conversation[] = (conversationsData as unknown as ConversationsResponse)?.data || [];
  const activeMessages: Message[] = (messagesData as unknown as MessagesResponse)?.data?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  useEffect(() => {
    if (selectedConversation) {
      socket.connect();
      socket.emit("joinRoom", selectedConversation);

      socket.on("newMessage", (message: Message) => {
        console.log("New message via socket:", message);
        refetchMessages();
      });

      return () => {
        socket.emit("leaveRoom", selectedConversation);
        socket.off("newMessage");
        socket.disconnect();
      };
    }
  }, [selectedConversation, refetchMessages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const handleSendMessage = async () => {
    if (messageText.trim() && selectedConversation && currentUserId) {
      try {
        const result = await sendMessageMutation({
          conversationId: selectedConversation,
          text: messageText,
          senderId: currentUserId,
        }).unwrap();
        
        setMessageText('');
        socket.emit("sendMessage", { conversationId: selectedConversation, message: result });
        refetchMessages();
        refetchConversations();
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    } else if (!currentUserId) {
      alert('User ID not found. Please login again.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedConversation && currentUserId) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResult = await uploadFile(formData).unwrap();
        
        await sendMessageMutation({
          conversationId: selectedConversation,
          image: uploadResult.url,
          senderId: currentUserId,
        }).unwrap();
        
        refetchMessages();
        refetchConversations();
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
  };

  const filteredConversations = conversations.filter((conv: Conversation) => {
    const admin = conv.admin?.admin;
    if (!admin) return false;
    const fullName = `${admin.firstName} ${admin.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  const selectedConvDetails = conversations.find((conv) => conv.id === selectedConversation);
  const adminInfo = selectedConvDetails?.admin?.admin;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const getDisplayName = (person: any) => person ? `${person.firstName || ''} ${person.lastName || ''}`.trim() : 'Support Team';
  const getAvatar = (person: any) => person?.photo || kurmisadia;

  const getLastMessage = (conversation: Conversation) => {
    if (conversation.messages && conversation.messages.length > 0) {
      const lastMsg = conversation.messages[conversation.messages.length - 1];
      return lastMsg.message || 'Image';
    }
    return 'No messages yet';
  };

  const getCurrentUserId = () => conversations[0]?.userId || '';

  return (
    <div className="bg-[#F3F6F6] md:mt-[30px]">
      {!showChat && (
        <div className="pb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <img src={home} alt="" className="w-4 h-4" />
            <img src={chevron} alt="" />
            <span onClick={() => navigate('/dashboard')} className="cursor-pointer">
              {t("dashboard.routes.supportChat.breadcrumb.home")}
            </span>
            <img src={chevron} alt="" />
            <span className="font-semibold">{t("dashboard.routes.supportChat.breadcrumb.current")}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#171C35]">{t("dashboard.routes.supportChat.title")}</h1>
        </div>
      )}

      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          <div className={`bg-white rounded-2xl flex flex-col overflow-hidden h-full ${showChat ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-5 border-b flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img src="https://i.ibb.co.com/tM6Sb5kF/KarenNix.png" className="w-12 h-12 rounded-full" alt="Profile" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-semibold text-base text-[#171C35]">Support Chat</h3>
              </div>
              <div className="flex gap-2 bg-[#F3F6F6] rounded-[12px] p-2">
                <div className="relative w-full">
                  <img src={search} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" alt="Search" />
                  <input
                    placeholder={t("dashboard.routes.supportChat.searchPlaceholder")}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full px-10 py-2.5 rounded-[12px] bg-white border"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y">
              {conversationsLoading ? (
                <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#526FFF]"></div></div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400 px-4">
                  <p>{searchText ? 'No conversations found' : 'No conversations yet'}</p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => { setSelectedConversation(conversation.id); setShowChat(true); }}
                    className={`w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors ${selectedConversation === conversation.id ? 'bg-blue-50' : ''}`}
                  >
                    <div className="relative shrink-0">
                      <img src={getAvatar(conversation.admin?.admin)} className="w-12 h-12 rounded-full object-cover" alt="" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-[#526FFF] text-sm truncate">{getDisplayName(conversation.admin?.admin)}</h4>
                        <span className="text-xs text-gray-400 ml-2">{formatTimestamp(conversation.updatedAt)}</span>
                      </div>
                      <p className="text-sm text-[#111A2D] truncate">{getLastMessage(conversation)}</p>
                    </div>
                    {conversation.status === 'OPEN' && conversation.messages.length > 0 && <div className="w-2 h-2 bg-[#526FFF] shrink-0 rounded-full ml-2"></div>}
                  </button>
                ))
              )}
            </div>
          </div>

          {showChat && selectedConversation && (
            <div className="fixed inset-0 lg:static z-50 bg-white rounded-2xl flex flex-col overflow-hidden lg:col-span-2 h-full">
              <button className="lg:hidden p-4 text-[#526FFF] font-semibold text-left flex-shrink-0" onClick={() => setShowChat(false)}>
                ← {t("dashboard.routes.supportChat.backButton")}
              </button>

              <div className="p-5 m-4 bg-[#F3F6F6] rounded-2xl flex items-center gap-3 justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={getAvatar(adminInfo)} className="w-12 h-12 rounded-full object-cover" alt="" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-[#171C35]">{getDisplayName(adminInfo)}</h3>
                    <span className="text-sm text-gray-500">Support Staff - Online</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messagesLoading ? (
                  <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#526FFF]"></div></div>
                ) : (
                  <>
                    {activeMessages.length > 0 ? (
                      activeMessages.map((message) => {
                        const isCurrentUser = message.senderId === getCurrentUserId();
                        return (
                          <div key={message.id} className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            {!isCurrentUser && <img src={getAvatar(adminInfo)} className="w-10 h-10 rounded-full object-cover" alt="" />}
                            <div className="max-w-lg">
                              <span className="text-xs text-gray-400">{new Date(message.createdAt).toLocaleString()}</span>
                              <div className={`py-2.5 px-4 rounded-2xl text-sm font-medium ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-[#171C35]'}`}>
                                {message.imageUrl ? <img src={message.imageUrl} alt="Attachment" className="max-w-xs rounded-lg" /> : message.message}
                              </div>
                            </div>
                            {isCurrentUser && <img src={karennix} className="w-10 h-10 rounded-full object-cover" alt="You" />}
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400"><p>No messages yet. Start the conversation!</p></div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              <div className="p-5 bg-[#F3F6F6] m-2 rounded-[20px] relative flex-shrink-0">
                <div ref={emojiPickerRef} className="flex flex-wrap items-center gap-2">
                  <button onClick={() => fileInputRef.current?.click()} disabled={uploadingFile}>
                    <img src={doc} className="p-1.5 bg-white h-8 w-8 rounded-full min-w-max" alt="Upload" />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />
                  <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <img src={react} className="p-1.5 bg-white h-8 w-8 rounded-full min-w-max" alt="Emoji" />
                  </button>

                  {showEmojiPicker && (
                    <div className="absolute bottom-16 left-2 z-50">
                      <EmojiPicker onEmojiClick={(emojiData) => setMessageText(prev => prev + emojiData.emoji)} />
                    </div>
                  )}

                  <input
                    placeholder={t("dashboard.routes.supportChat.chat.typeMessage")}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !sendingMessage && handleSendMessage()}
                    className="flex-1 w-full px-4 h-10 bg-white rounded-3xl text-xs"
                    disabled={sendingMessage || uploadingFile}
                  />

                  <button
                    onClick={handleSendMessage}
                    disabled={sendingMessage || uploadingFile || !messageText.trim()}
                    className="px-3 py-2 bg-[#526FFF] text-white rounded-3xl text-xs flex items-center gap-1 min-w-max disabled:opacity-50"
                  >
                    {sendingMessage ? 'Sending...' : t("dashboard.routes.supportChat.chat.sendButton")}
                    <img src={send} className="h-3 w-3" alt="Send" />
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