import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ChevronRight, Search } from 'lucide-react';

import profile from '../../../assets/img/dummyImage.svg';
import AdminSupportChatDetails from './SupportChatDetails';

// Import API hooks and types
import { 
  useGetAdminConversationsQuery,
  type Conversation 
} from '@/store/features/supportChat/chatApi';
import { useAppSelector } from '@/store/hook';
import { socket } from '@/store/socketIo/socketClient';
//import { connectSocket, socket } from "@/store/socketIo/socketClient";

const AdminSupportChatList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showChat, setShowChat] = useState(false);
 // const [onlineUsers, setOnlineUsers] = useState([]);

  // useEffect(() => {
  //   // ১. কানেক্ট করা
  //   if (currentUser?._id) {
  //     connectSocket(currentUser._id);
  //   }

   
  //   // 'getOnlineUsers' ইভেন্ট নেমটি ব্যাকএন্ড টিমের থেকে কনফার্ম করে নিন
  //   socket.on("getOnlineUsers", (users) => {
  //     setOnlineUsers(users); 
  //     console.log("Ekhon online ache:", users);
  //   });

  //   return () => {
  //     socket.off("getOnlineUsers"); // Component unmount hole listener bondho kora
  //   };
  // }, [currentUser]);

  // Get admin info
  const { user: currentAdmin } = useAppSelector((state) => state.auth);

  // ✅ API hook with refetch to get latest conversations
  const { 
    data: conversations = [], 
    isLoading: conversationsLoading,
    refetch: refetchConversations 
  } = useGetAdminConversationsQuery(undefined, {
    pollingInterval: 5000, // Poll every 5 seconds for new conversations
  });

  // ✅ Socket listener for new conversations and messages
  useEffect(() => {
    socket.connect();

    // Listen for new conversations
    socket.on("newConversation", (data) => {
      console.log("🔔 New conversation detected:", data);
      refetchConversations();
    });

    // Listen for new messages to update list
    socket.on("newMessage", (message) => {
      console.log("💬 New message in admin list:", message);
      refetchConversations();
    });

    return () => {
      socket.off("newConversation");
      socket.off("newMessage");
      socket.disconnect();
    };
  }, [refetchConversations]);

  // ✅ Filter conversations based on search
  const filteredConversations = conversations.filter(conv => {
    const doctor = conv.user?.doctor;
    if (!doctor) return false;

    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const email = doctor.email?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    return fullName.includes(query) || email.includes(query);
  });

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBackToContacts = () => {
    setShowChat(false);
    setSelectedConversation(null);
  };

  // Format timestamp
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

  // Get last message safely
  const getLastMessage = (conversation: Conversation) => {
    if (conversation.messages && conversation.messages.length > 0) {
      const lastMsg = conversation.messages[conversation.messages.length - 1];
      return lastMsg.message || (lastMsg.imageUrl ? '📷 Image' : 'No messages yet');
    }
    return 'No messages yet';
  };

  // Get unread count
  const getUnreadCount = (conversation: Conversation) => {
    if (!conversation.messages) return 0;
    return conversation.messages.filter(msg => 
      !msg.isRead && msg.senderId !== currentAdmin?.id
    ).length;
  };

  const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');
  const adminPhotoUrl = currentAdmin?.photo 
    ? `${baseUrl}${currentAdmin.photo}` 
    : profile;

  return (
    <div className="w-full mt-7 bg-[#F3F6F6] font-sans min-h-screen px-2 md:px-6">
      {!showChat && (
        <div className="pb-4 md:pb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 md:mb-4">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-3 w-3" />
            <span 
              onClick={() => navigate('/admin')} 
              className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {t("adminDashboard.routes.support.breadcrumb.dashboard")}
            </span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#171c35] font-medium">
              {t("adminDashboard.routes.support.breadcrumb.support")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-headingBlack">
            {t("adminDashboard.routes.support.title")}
          </h1>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-[calc(100vh-180px)]">
        {/* Left Sidebar - Conversations List */}
        <div className={`w-full lg:w-1/3 shrink-0 flex flex-col ${showChat ? 'hidden lg:flex' : 'flex'}`}>
          <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={adminPhotoUrl} 
                      alt="Admin" 
                      className="w-12 h-12 rounded-full object-cover" 
                      onError={(e) => { (e.target as HTMLImageElement).src = profile }}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#171C35]">
                      {currentAdmin?.firstName} {currentAdmin?.lastName}
                    </h3>
                    <p className="text-xs text-gray-500">Admin - Online</p>
                  </div>
                </div>
                {conversations.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {conversations.length} {conversations.length === 1 ? 'chat' : 'chats'}
                  </span>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative bg-[#F3F6F6] rounded-xl p-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("adminDashboard.routes.support.searchPlaceholder") || "Search doctors..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 pl-10 py-2.5 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversationsLoading ? (
                <div className="flex flex-col items-center justify-center h-32 gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#526FFF]"></div>
                  <p className="text-sm text-gray-400">Loading conversations...</p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400 px-4">
                  <p className="text-center">
                    {searchQuery 
                      ? 'No doctors found matching your search' 
                      : 'No doctor conversations yet. Doctors will appear here when they start a conversation.'}
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const doctor = conv.user?.doctor;
                  if (!doctor) return null;

                  const doctorPhotoUrl = doctor.photo
                    ? `${baseUrl}${doctor.photo}`
                    : profile;

                  const unreadCount = getUnreadCount(conv);

                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleConversationClick(conv)}
                      className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedConversation?.id === conv.id 
                          ? 'bg-blue-50 border-l-4 border-[#526FFF]' 
                          : 'border-l-4 border-transparent'
                      } border-b border-gray-100`}
                    >
                      <div className="relative flex-shrink-0">
                        <img 
                          src={doctorPhotoUrl} 
                          alt={`Dr. ${doctor.firstName}`} 
                          className="w-12 h-12 rounded-full object-cover" 
                          onError={(e) => { (e.target as HTMLImageElement).src = profile }} 
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-semibold text-[#171C35] truncate">
                            Dr. {doctor.firstName} {doctor.lastName}
                          </h3>
                          <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full shrink-0">
                            Doctor
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">
                          {getLastMessage(conv)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(conv.updatedAt)}
                        </span>
                        {unreadCount > 0 && (
                          <span className="min-w-[20px] h-5 bg-[#526FFF] text-white text-xs rounded-full flex items-center justify-center px-1.5">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Chat Details */}
        <div className={`w-full lg:w-2/3 flex-shrink-0 ${showChat ? 'block' : 'hidden lg:block'}`}>
          {selectedConversation ? (
            <AdminSupportChatDetails
              selectedConversation={selectedConversation} 
              onBack={handleBackToContacts}
            />
          ) : (
            <div className="bg-white rounded-2xl h-full flex items-center justify-center">
              <div className="text-center text-gray-400 px-4">
                <svg 
                  className="w-24 h-24 mx-auto mb-4 text-gray-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                  />
                </svg>
                <p className="text-lg font-medium mb-1">No conversation selected</p>
                <p className="text-sm">Select a doctor from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSupportChatList;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { Home, ChevronRight, Search } from 'lucide-react';

// import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
// import AdminSupportChatDetails from './SupportChatDetails';

// // Import API hooks and types
// import { useGetAdminConversationsQuery } from '@/store/features/supportChat/chatApi';
// import type { Conversation } from '@/store/features/supportChat/chatApi';

// const AdminSupporChatList: React.FC = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [showChat, setShowChat] = useState(false);

//   // API hook
//   const { data: conversationsData, isLoading: conversationsLoading } = useGetAdminConversationsQuery(undefined, {
//     pollingInterval: 3000, 
//   });

//   // Type cast to handle the 'message' potentially being undefined error
//  // Ensure conversations is always an array
// const conversations: Conversation[] = Array.isArray(conversationsData) ? conversationsData : [];


//   // Filter conversations based on search
//   const filteredConversations = conversations.filter(conv => {
//     const doctor = conv.user?.doctor;
//     if (!doctor) return false;
//     const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
//     return fullName.includes(searchQuery.toLowerCase());
//   });

//   const handleConversationClick = (conversation: Conversation) => {
//     setSelectedConversation(conversation);
//     setShowChat(true);
//   };

//   const handleBackToContacts = () => {
//     setShowChat(false);
//   };

//   // Format timestamp
//   const formatTimestamp = (timestamp: string) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffMins = Math.floor(diffMs / 60000);
    
//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} minutes ago`;
//     if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
//     return date.toLocaleDateString();
//   };

//   // Get last message safely
//   const getLastMessage = (conversation: Conversation) => {
//     if (conversation.messages && conversation.messages.length > 0) {
//       const lastMsg = conversation.messages[conversation.messages.length - 1];
//       // TypeScript error solved here using optional chaining or empty string check
//       return lastMsg.message || 'Image';
//     }
//     return 'No messages yet';
//   };

//   return (
//     <div className="w-full mt-7 bg-[#F3F6F6] font-sans min-h-screen px-2 md:px-6">
//       {!showChat && (
//         <div className="pb-4 md:pb-6">
//           <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 md:mb-4">
//             <Home className="h-4 w-4" />
//             <ChevronRight className="h-3 w-3" />
//             <span 
//               onClick={() => navigate('/admin')} 
//               className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
//             >
//               {t("adminDashboard.routes.support.breadcrumb.dashboard")}
//             </span>
//             <ChevronRight className="h-3 w-3" />
//             <span className="text-[#171c35] font-medium">
//               {t("adminDashboard.routes.support.breadcrumb.support")}
//             </span>
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-semibold text-headingBlack">
//             {t("adminDashboard.routes.support.title")}
//           </h1>
//         </div>
//       )}

//       <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-[calc(100vh-180px)]">
//         <div className={`w-full lg:w-1/3 shrink-0 flex flex-col ${showChat ? 'hidden lg:flex' : 'flex'}`}>
//           <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full">
//             <div className="p-5 border-b border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="relative">
//                     <img 
//                       src={kurmisadia} 
//                       alt="Admin" 
//                       className="w-12 h-12 rounded-full object-cover" 
//                     />
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <h3 className="font-semibold text-base text-[#171C35]">Admin Support</h3>
//                 </div>
//               </div>

//               <div className="relative bg-[#F3F6F6] rounded-xl p-2">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder={t("adminDashboard.routes.support.searchPlaceholder")}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full px-3 pl-10 py-2.5 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto">
//               {conversationsLoading ? (
//                 <div className="flex items-center justify-center h-32">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#526FFF]"></div>
//                 </div>
//               ) : filteredConversations.length === 0 ? (
//                 <div className="flex items-center justify-center h-32 text-gray-400">
//                   <p>No conversations found</p>
//                 </div>
//               ) : (
//                 filteredConversations.map((conv) => {
//                   const doctor = conv.user?.doctor;
//                   if (!doctor) return null;

//                   return (
//                     <div
//                       key={conv.id}
//                       onClick={() => handleConversationClick(conv)}
//                       className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
//                         selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-[#526FFF]' : ''
//                       } border-b border-gray-100`}
//                     >
//                       <div className="relative flex-shrink-0">
//                         <img 
//                           src={doctor.photo || kurmisadia} 
//                           alt={`${doctor.firstName} ${doctor.lastName}`} 
//                           className="w-12 h-12 rounded-full object-cover" 
//                         />
//                         <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-base font-semibold text-[#171C35] mb-0.5 truncate">
//                           {doctor.firstName} {doctor.lastName}
//                         </h3>
//                         <p className="text-xs text-[#111A2D] truncate">{getLastMessage(conv)}</p>
//                       </div>

//                       <div className="flex flex-col items-end gap-1 flex-shrink-0">
//                         <span className="text-xs text-[#111A2D]">{formatTimestamp(conv.updatedAt)}</span>
//                         {conv.messages && conv.messages.length > 0 && (
//                           <span className="w-2 h-2 bg-[#526FFF] rounded-full"></span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>
//         </div>

//         <div className={`w-full lg:w-2/3 flex-shrink-0 ${showChat ? 'block' : 'hidden lg:block'}`}>
//           {selectedConversation ? (
//             <AdminSupportChatDetails
//               selectedConversation={selectedConversation} 
//               onBack={handleBackToContacts}
//             />
//           ) : (
//             <div className="bg-white rounded-2xl h-full flex items-center justify-center">
//               <div className="text-center text-gray-400">
//                 <p className="text-lg">{t("adminDashboard.routes.support.selectFriend")}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSupporChatList;