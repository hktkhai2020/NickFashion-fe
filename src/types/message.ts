export interface ChatUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: string;
}

export interface LastMessage {
  content: string;
  senderId: string;
  createdAt: Date | string;
}

export interface ChatConversation {
  _id: string;
  userId: ChatUser;
  adminId: ChatUser;
  status: "open" | "closed";
  lastMessage: LastMessage;
  lastMessageAt: Date | string;
  lastMessageBy: "user" | "admin";
  unreadCount?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ChatMessage {
  _id: string;
  senderId: ChatUser | string;
  receiverId?: ChatUser | string;
  conversationId: string;
  content: string;
  type: "text" | "image" | "file";
  attachments?: string[];
  isRead: boolean;
  readAt?: Date | string | null;
  isEdited: boolean;
  editedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface GetConversationResponse {
  success: boolean;
  message?: string;
  data: ChatConversation;
}

export interface GetMessagesResponse {
  success: boolean;
  message?: string;
  data: {
    messages: ChatMessage[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SendMessageResponse {
  success: boolean;
  message?: string;
  data: {
    message: ChatMessage;
    conversation: ChatConversation;
  };
}

export interface SendMessagePayload {
  content: string;
  type: "text" | "image" | "file";
  attachments?: string[];
}
