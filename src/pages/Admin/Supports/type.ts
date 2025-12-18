// src/store/features/supportChat/types.ts
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  message?: string; // optional because API might return undefined
  imageUrl?: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string | null;
  email: string;
}

export interface User {
  id: string;
  doctor: Doctor;
}

export interface Conversation {
  id: string;
  userId: string;
  adminId?: string | null;
  messages: Message[];
  user: User;
}
