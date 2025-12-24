import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ChevronRight, Search } from 'lucide-react';

import profile from '../../../assets/img/dummyImage.svg';
import AdminSupportChatDetails from './SupportChatDetails';

// Import API hooks and types
import { useGetAdminConversationsQuery } from '@/store/features/supportChat/chatApi';
import type { Conversation } from '@/store/features/supportChat/chatApi';
import { useAppSelector } from '@/store/hook';
//import type { Message } from '@/store/features/supportChat/chatApi';

interface AdminConversationsResponse {
  success: boolean;
  message: string;
  data: Conversation[]; 
}

const AdminSupportChatList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showChat, setShowChat] = useState(false);


  // Get admin info
  const { user: currentAdmin } = useAppSelector((state) => state.auth);

  // API hook
  const { data: conversationsResponse, isLoading: conversationsLoading } = useGetAdminConversationsQuery(undefined, {
    pollingInterval: 3000, 
  });

  // Extract conversations from response - ONLY show DOCTOR conversations
const allConversations: Conversation[] = Array.isArray(conversationsResponse)
 ? conversationsResponse : conversationsResponse?.data || [];


  // Filter to show ONLY doctors (userRole === "DOCTOR")
  const conversations = allConversations.filter(conv => conv.userRole === 'DOCTOR');

  // Filter conversations based on search
const filteredConversations = conversations.filter(conv => {
  const doctor = conv.user?.doctor;
  if (!doctor) return false;

  const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
  return fullName.includes(searchQuery.toLowerCase());
});


  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBackToContacts = () => {
    setShowChat(false);
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
      return lastMsg.message || 'Image';
    }
    return 'No messages yet';
  };

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
        <div className={`w-full lg:w-1/3 shrink-0 flex flex-col ${showChat ? 'hidden lg:flex' : 'flex'}`}>
          <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={currentAdmin?.photo || profile} 
                      alt="Admin" 
                      className="w-12 h-12 rounded-full object-cover" 
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
              </div>

              <div className="relative bg-[#F3F6F6] rounded-xl p-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("adminDashboard.routes.support.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 pl-10 py-2.5 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversationsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#526FFF]"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  <p>No doctor conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const doctor = conv.user?.doctor;
                  if (!doctor) return null;

                  const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');

                      const doctorPhotoUrl = doctor.photo
                      ? `${baseUrl}${doctor.photo}`
                     : profile;


                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleConversationClick(conv)}
                      className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-[#526FFF]' : ''
                      } border-b border-gray-100`}
                    >
                      <div className="relative flex-shrink-0">
                       <img 
          src={doctorPhotoUrl} 
          alt={`${doctor.firstName}`} 
          className="w-12 h-12 rounded-full object-cover" 
          onError={(e) => { (e.target as HTMLImageElement).src = profile }} 
        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-base font-semibold text-[#171C35] truncate">
                            Dr. {doctor.firstName} {doctor.lastName}
                          </h3>
                          <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full shrink-0">
                            Doctor
                          </span>
                        </div>
                        <p className="text-xs text-[#111A2D] truncate">{getLastMessage(conv)}</p>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs text-[#111A2D]">{formatTimestamp(conv.updatedAt)}</span>
                        {conv.messages && conv.messages.length > 0 && (
                          <span className="w-2 h-2 bg-[#526FFF] rounded-full"></span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className={`w-full lg:w-2/3 flex-shrink-0 ${showChat ? 'block' : 'hidden lg:block'}`}>
          {selectedConversation ? (
            <AdminSupportChatDetails
              selectedConversation={selectedConversation} 
              onBack={handleBackToContacts}
            />
          ) : (
            <div className="bg-white rounded-2xl h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-lg">Select a doctor to start chatting</p>
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