import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Paperclip, Smile, Send } from 'lucide-react';
import EmojiPicker from "emoji-picker-react";
import kurmisadia from '../../../assets/img/dummyImage.svg';

// API hooks
import {
  useGetMessagesQuery,
  useUploadChatFileMutation,
} from '../../../store/features/supportChat/chatApi';

// Redux
import { useAppSelector } from '@/store/hook';
import type { RootState } from '@/store/store';
import { socket } from "@/store/socketIo/socketClient";

// Local interface aligned with chatApi
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  message?: string;
  imageUrl?: string | null;
  isRead: boolean;
  createdAt: string;
}

interface Conversation {
  id: string;
  userId: string;
  userRole: string;
  adminId: string | null;
  messages: Message[];
  user: {
    id: string;
    doctor?: {
      id: string;
      firstName: string;
      lastName: string;
      photo: string | null;
      email: string;
    };
    admin?: {
      id: string;
      firstName: string;
      lastName: string;
      photo: string | null;
      email: string;
    };
  };
}

interface AdminSupportRightProps {
  selectedConversation: Conversation;
  onBack: () => void;
}
// interface MessagesResponse {
//   data: {
//     messages: Message[];
//   };
// }


const AdminSupportChatDetails = ({ selectedConversation, onBack }: AdminSupportRightProps) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');



  // Get user info (doctor or admin)
  const otherUser = selectedConversation.user?.doctor || selectedConversation.user?.admin;
  const otherUserPhotoUrl = otherUser?.photo
  ? `${baseUrl}${otherUser.photo}`
  : kurmisadia;


  // Get current admin ID from auth
  const currentUserId = useAppSelector((state: RootState) => state.auth.user?.id);

  // Fetch messages
  const { data: messagesData, isLoading: messagesLoading, refetch: refetchMessages } = useGetMessagesQuery(
    selectedConversation.id
  );

  // File upload mutation
  const [uploadFile, { isLoading: uploadingFile }] = useUploadChatFileMutation();

  // Normalize messages data
const messages: Message[] = useMemo(() => {
  const data = messagesData as any; // temporarily tell TS "trust me"
  
  if (Array.isArray(data)) {
    return data as Message[];
  }
  if (data?.messages) {
    return data.messages as Message[];
  }
  if (data?.data?.messages) {
    return data.data.messages as Message[];
  }
  return [];
}, [messagesData]);


  // Scroll to bottom
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  // Reset on conversation change
  useEffect(() => {
    setMessageText('');
    setShowEmojiPicker(false);
  }, [selectedConversation.id]);

  // Socket.IO setup
  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", selectedConversation.id);

    // Listen for new messages
    socket.on("newMessage", () => {
      refetchMessages();
    });

    socket.on("messageSent", () => {
      setIsSending(false);
      refetchMessages();
    });

    socket.on("error", (error: any) => {
      setIsSending(false);
      console.error("Socket error:", error);
    });

    return () => {
      socket.emit("leaveRoom", selectedConversation.id);
      socket.off("newMessage");
      socket.off("messageSent");
      socket.off("error");
      socket.disconnect();
    };
  }, [selectedConversation.id, refetchMessages]);

  // Send message via Socket.IO
  const handleSendMessage = async () => {
    if (!messageText.trim() || !currentUserId || isSending) return;

    try {
      setIsSending(true);

      socket.emit("sendMessage", {
        conversationId: selectedConversation.id,
        senderId: currentUserId,
        message: messageText,
      });

      setMessageText('');
      
      setTimeout(() => {
        refetchMessages();
        setIsSending(false);
      }, 1000);

    } catch (error) {
      setIsSending(false);
      console.error('Failed to send message:', error);
    }
  };

  // Upload file and send
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUserId) return;

    try {
      setIsSending(true);
      const formData = new FormData();
      formData.append('file', file);

      const uploadResult = await uploadFile(formData).unwrap();

      socket.emit("sendMessage", {
        conversationId: selectedConversation.id,
        senderId: currentUserId,
        imageUrl: uploadResult.url,
      });

      setTimeout(() => {
        refetchMessages();
        setIsSending(false);
      }, 1000);

    } catch (error) {
      setIsSending(false);
      console.error('File upload error:', error);
    }
  };

  const isAdminMessage = (message: Message) => message.senderId === currentUserId;

  return (
    <div className="h-full">
      <div className="bg-white rounded-xl md:rounded-3xl pb-2 md:pb-4 overflow-hidden flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-140px)]">

        <button
          className="lg:hidden p-4 text-blue-600 font-semibold text-left flex items-center gap-2 border-b"
          onClick={onBack}
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Contacts
        </button>

        {/* Header */}
        <div className="p-3 md:p-5 m-2 md:m-4 bg-[#F3F6F6] rounded-xl md:rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className="relative shrink-0">
              <img
  src={otherUserPhotoUrl}
  alt="User"
  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
  onError={(e) => {
    (e.target as HTMLImageElement).src = kurmisadia;
  }}
/>

              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm md:text-xl text-headingBlack truncate">
                  {otherUser?.firstName} {otherUser?.lastName}
                </h3>
                <span className="text-xs text-gray-500 px-2 py-0.5 bg-white rounded-full shrink-0">
                  {selectedConversation.userRole === 'DOCTOR' ? 'Doctor' : 'Admin'}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 text-xs md:text-sm text-subHeadingBlack">
                <span className="truncate">{t("adminDashboard.routes.support.chat.online")}</span>
                <span className="hidden md:inline truncate">{otherUser?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 md:px-5 py-2 md:py-4 space-y-3 md:space-y-4 bg-white">
          {messagesLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#526FFF]"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>No messages yet.</p>
            </div>
          ) : (
            messages.map((message) => {
              const isAdmin = isAdminMessage(message);
              return (
                <div key={message.id} className={`flex gap-2 md:gap-3 pb-3 md:pb-4 border-b border-gray-100 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                 <img
        src={otherUserPhotoUrl}
  alt="User"
  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
  onError={(e) => {
    (e.target as HTMLImageElement).src = kurmisadia;
  }}
/>

                  <div className={`flex-1 min-w-0 ${isAdmin ? 'text-right' : ''}`}>
                    <div className={`flex ${isAdmin ? 'flex-row-reverse' : ''} items-baseline gap-1 md:gap-2 mb-1 flex-wrap`}>
                      <h4 className="font-semibold text-headingBlack text-xs md:text-base truncate">
                        {isAdmin ? 'You (Admin)' : `${otherUser?.firstName} ${otherUser?.lastName}`}
                      </h4>
                      <span className="text-xs text-subHeadingBlack shrink-0">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`inline-block px-3 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl max-w-full md:max-w-lg ${isAdmin ? 'bg-[#526FFF] text-white' : 'bg-[#F3F6F6] text-headingBlack'}`}>
                      {message.imageUrl ? (
                        <img src={message.imageUrl} alt="Attachment" className="max-w-xs rounded-lg" />
                      ) : (
                        <p className="text-xs md:text-sm font-medium leading-relaxed break-words">{message.message || "No content"}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
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
            <button onClick={() => fileInputRef.current?.click()} disabled={uploadingFile || isSending} className="transition-colors shrink-0 p-2 bg-white rounded-full hover:bg-gray-100 disabled:opacity-50">
              <Paperclip className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />

            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="transition-colors shrink-0 p-2 bg-white rounded-full hover:bg-gray-100">
              <Smile className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>

            <input
              type="text"
              placeholder={t("adminDashboard.routes.support.chat.typeMessage")}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSendMessage()}
              disabled={isSending || uploadingFile}
              className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-50 rounded-xl md:rounded-3xl placeholder:text-subHeadingBlack text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
            />

            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim() || isSending || uploadingFile}
              className={`px-3 md:px-5 py-2 md:py-2.5 rounded-[20px] md:rounded-[25px] font-medium transition-colors flex items-center gap-1 md:gap-2 shrink-0 text-xs md:text-sm ${messageText.trim() && !isSending ? 'bg-[#526FFF] text-white hover:bg-[#4158d9]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isSending ? 'Sending...' : t("adminDashboard.routes.support.chat.sendButton")}
              <Send className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSupportChatDetails;


// import { useState, useEffect, useRef, useMemo } from "react";
// import { useTranslation } from "react-i18next";
// import { ChevronLeft, Paperclip, Smile, Send } from 'lucide-react';
// import EmojiPicker from "emoji-picker-react";
// import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';

// // API hooks
// import {
//   useGetMessagesQuery,
//   useUploadChatFileMutation,
// } from '../../../store/features/supportChat/chatApi';

// // Redux
// import { useSelector } from 'react-redux';
// import type { RootState } from '@/store/store';
// import { socket } from "@/store/socketIo/socketClient";

// // Local interface aligned with chatApi
// interface Message {
//   id: string;
//   conversationId: string;
//   senderId: string;
//   message?: string; // Optional because of chatApi definition
//   imageUrl?: string | null;
//   isRead: boolean;
//   createdAt: string;
// }

// interface Conversation {
//   id: string;
//   userId: string;
//   adminId: string | null;
//   messages: Message[];
//   user: {
//     id: string;
//     doctor?: { // Safe check
//       id: string;
//       firstName: string;
//       lastName: string;
//       photo: string | null;
//       email: string;
//     };
//   };
// }

// interface AdminSupportRightProps {
//   selectedConversation: Conversation;
//   onBack: () => void;
// }

// const AdminSupportChatDetails = ({ selectedConversation, onBack }: AdminSupportRightProps) => {
//   const { t } = useTranslation();
//   const [messageText, setMessageText] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isSending, setIsSending] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const doctor = selectedConversation.user?.doctor;

//   // Get current admin ID from auth
//   const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

//   // Fetch messages with safe casting
//   const { data: messagesData, isLoading: messagesLoading, refetch: refetchMessages } = useGetMessagesQuery(
//     selectedConversation.id
//   ) as any;

//   // File upload mutation
//   const [uploadFile, { isLoading: uploadingFile }] = useUploadChatFileMutation();

//   // Normalize messages data safely
//   const messages: Message[] = useMemo(() => {
//     if (Array.isArray(messagesData)) {
//       return messagesData;
//     }
//     if (messagesData?.messages) {
//       return messagesData.messages;
//     }
//     if (messagesData?.data?.messages) {
//       return messagesData.data.messages;
//     }
//     return [];
//   }, [messagesData]);

//   // Scroll to bottom
//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   useEffect(() => scrollToBottom(), [messages]);

//   // Reset on conversation change
//   useEffect(() => {
//     setMessageText('');
//     setShowEmojiPicker(false);
//   }, [selectedConversation.id]);

//   // Socket.IO setup
//   useEffect(() => {
//     socket.connect();
//     socket.emit("joinRoom", selectedConversation.id);

//     // Listen for new messages
//     socket.on("newMessage", () => {
//       refetchMessages();
//     });

//     socket.on("messageSent", () => {
//       setIsSending(false);
//       refetchMessages();
//     });

//     socket.on("error", (error: any) => {
//       setIsSending(false);
//       console.error("Socket error:", error);
//     });

//     return () => {
//       socket.emit("leaveRoom", selectedConversation.id);
//       socket.off("newMessage");
//       socket.off("messageSent");
//       socket.off("error");
//       socket.disconnect();
//     };
//   }, [selectedConversation.id, refetchMessages]);

//   // Send message via Socket.IO
//   const handleSendMessage = async () => {
//     if (!messageText.trim() || !currentUserId || isSending) return;

//     try {
//       setIsSending(true);

//       socket.emit("sendMessage", {
//         conversationId: selectedConversation.id,
//         senderId: currentUserId,
//         message: messageText,
//       });

//       setMessageText('');
      
//       setTimeout(() => {
//         refetchMessages();
//         setIsSending(false);
//       }, 1000);

//     } catch (error) {
//       setIsSending(false);
//       console.error('Failed to send message:', error);
//     }
//   };

//   // Upload file and send
//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || !currentUserId) return;

//     try {
//       setIsSending(true);
//       const formData = new FormData();
//       formData.append('file', file);

//       const uploadResult = await uploadFile(formData).unwrap();

//       socket.emit("sendMessage", {
//         conversationId: selectedConversation.id,
//         senderId: currentUserId,
//         imageUrl: uploadResult.url,
//       });

//       setTimeout(() => {
//         refetchMessages();
//         setIsSending(false);
//       }, 1000);

//     } catch (error) {
//       setIsSending(false);
//       console.error('File upload error:', error);
//     }
//   };

//   const isAdminMessage = (message: Message) => message.senderId === currentUserId;

//   return (
//     <div className="h-full">
//       <div className="bg-white rounded-xl md:rounded-3xl pb-2 md:pb-4 overflow-hidden flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-140px)]">

//         <button
//           className="lg:hidden p-4 text-blue-600 font-semibold text-left flex items-center gap-2 border-b"
//           onClick={onBack}
//         >
//           <ChevronLeft className="w-5 h-5" />
//           Back to Contacts
//         </button>

//         {/* Header */}
//         <div className="p-3 md:p-5 m-2 md:m-4 bg-[#F3F6F6] rounded-xl md:rounded-2xl flex items-center justify-between">
//           <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
//             <div className="relative shrink-0">
//               <img
//                 src={doctor?.photo || kurmisadia}
//                 alt="Doctor"
//                 className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
//               />
//               <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//             <div className="min-w-0 flex-1">
//               <h3 className="font-semibold text-sm md:text-xl text-headingBlack mb-1 truncate">
//                 {doctor?.firstName} {doctor?.lastName}
//               </h3>
//               <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 text-xs md:text-sm text-subHeadingBlack">
//                 <span className="truncate">{t("adminDashboard.routes.support.chat.online")}</span>
//                 <span className="hidden md:inline truncate">{doctor?.email}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-3 md:px-5 py-2 md:py-4 space-y-3 md:space-y-4 bg-white">
//           {messagesLoading ? (
//             <div className="flex items-center justify-center h-full">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#526FFF]"></div>
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="flex items-center justify-center h-full text-gray-400">
//               <p>No messages yet.</p>
//             </div>
//           ) : (
//             messages.map((message) => {
//               const isAdmin = isAdminMessage(message);
//               return (
//                 <div key={message.id} className={`flex gap-2 md:gap-3 pb-3 md:pb-4 border-b border-gray-100 ${isAdmin ? 'flex-row-reverse' : ''}`}>
//                   <img
//                     src={isAdmin ? kurmisadia : (doctor?.photo || kurmisadia)}
//                     alt="Avatar"
//                     className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover shrink-0"
//                   />
//                   <div className={`flex-1 min-w-0 ${isAdmin ? 'text-right' : ''}`}>
//                     <div className={`flex ${isAdmin ? 'flex-row-reverse' : ''} items-baseline gap-1 md:gap-2 mb-1 flex-wrap`}>
//                       <h4 className="font-semibold text-headingBlack text-xs md:text-base truncate">
//                         {isAdmin ? 'You (Admin)' : `${doctor?.firstName} ${doctor?.lastName}`}
//                       </h4>
//                       <span className="text-xs text-subHeadingBlack shrink-0">
//                         {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </span>
//                     </div>
//                     <div className={`inline-block px-3 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl max-w-full md:max-w-lg ${isAdmin ? 'bg-[#526FFF] text-white' : 'bg-[#F3F6F6] text-headingBlack'}`}>
//                       {message.imageUrl ? (
//                         <img src={message.imageUrl} alt="Attachment" className="max-w-xs rounded-lg" />
//                       ) : (
//                         <p className="text-xs md:text-sm font-medium leading-relaxed break-words">{message.message || "No content"}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <div className="p-2 md:p-4 bg-[#F3F6F6] m-2 md:m-3 rounded-xl md:rounded-3xl relative">
//           {showEmojiPicker && (
//             <div className="absolute bottom-16 left-4 z-50">
//               <EmojiPicker
//                 onEmojiClick={(emojiData) => {
//                   setMessageText(prev => prev + emojiData.emoji);
//                   setShowEmojiPicker(false);
//                 }}
//               />
//             </div>
//           )}

//           <div className="flex items-center gap-2 md:gap-3">
//             <button onClick={() => fileInputRef.current?.click()} disabled={uploadingFile || isSending} className="transition-colors shrink-0 p-2 bg-white rounded-full hover:bg-gray-100 disabled:opacity-50">
//               <Paperclip className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
//             </button>
//             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />

//             <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="transition-colors shrink-0 p-2 bg-white rounded-full hover:bg-gray-100">
//               <Smile className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
//             </button>

//             <input
//               type="text"
//               placeholder={t("adminDashboard.routes.support.chat.typeMessage")}
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSendMessage()}
//               disabled={isSending || uploadingFile}
//               className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-50 rounded-xl md:rounded-3xl placeholder:text-subHeadingBlack text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
//             />

//             <button
//               onClick={handleSendMessage}
//               disabled={!messageText.trim() || isSending || uploadingFile}
//               className={`px-3 md:px-5 py-2 md:py-2.5 rounded-[20px] md:rounded-[25px] font-medium transition-colors flex items-center gap-1 md:gap-2 shrink-0 text-xs md:text-sm ${messageText.trim() && !isSending ? 'bg-[#526FFF] text-white hover:bg-[#4158d9]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//             >
//               {isSending ? 'Sending...' : t("adminDashboard.routes.support.chat.sendButton")}
//               <Send className="w-3 h-3 md:w-4 md:h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSupportChatDetails;