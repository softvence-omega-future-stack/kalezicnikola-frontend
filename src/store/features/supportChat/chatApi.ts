
import { baseAPI } from "@/store/api/baseApi";


export interface User {
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
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  message: string;
  imageUrl?: string | null;
  isRead: boolean;
  attachments: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  userRole: "DOCTOR" | "ADMIN";
  adminId: string | null;
  status: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  admin?: User;
  messages: Message[];
}


export const chatApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    //  Get Doctor Conversations
    getMyConversations: builder.query<Conversation[], void>({
      query: () => "/chat/my-conversations",
      providesTags: ["Conversation"],
    }),

    //  Get Admin Conversations
    getAdminConversations: builder.query<Conversation[], void>({
      query: () => "/chat/conversations",
      providesTags: ["Conversation"],
    }),

    // 3️ Create Conversation
    createConversation: builder.mutation<Conversation, { subject: string }>({
      query: (body) => ({
        url: "/chat/conversations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),

    // 4️ Get Messages by Conversation ID
    getMessages: builder.query<Message[], string>({
      query: (conversationId) => `/chat/conversations/${conversationId}`,
      providesTags: ["Message"],
      transformResponse: (response: { data: Conversation }) => response.data.messages,
    }),

    // 5️ Send Message (Admin & Doctor)
    sendMessage: builder.mutation<
      Message,
      { conversationId: string; text?: string; image?: string; senderId: string }
    >({
      query: ({ conversationId, text, image, senderId }) => {
        const body: any = {
          senderId,
          conversation: { connect: { id: conversationId } },
        };
        if (text) body.message = text;
        if (image) body.imageUrl = image;

        return {
          url: "/chat/messages",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Message", "Conversation"],
    }),

    // 6️ Upload File / Image
    uploadChatFile: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: "/chat/upload",
        method: "POST",
        body: formData,
      }),
    }),

  }),
  overrideExisting: false,
});

// ---------------------
// Hooks
// ---------------------
export const {
  useGetMyConversationsQuery,
  useGetAdminConversationsQuery,
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useUploadChatFileMutation,
} = chatApi;
