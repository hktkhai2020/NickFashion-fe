export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface LastMessage {
  content: string;
  senderId: string;
  createdAt: Date | string;
}

export interface Conversation {
  _id: string;
  userId: UserInfo;
  adminId: UserInfo;
  status: "open" | "closed";
  lastMessage: LastMessage;
  lastMessageAt: Date | string;
  lastMessageBy: "user" | "admin";
  unreadCount?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Message {
  _id: string;
  senderId: UserInfo;
  receiverId: UserInfo;
  conversationId: string;
  content: string;
  type: "text" | "image" | "file";
  attachments?: string[];
  isRead: boolean;
  isEdited: boolean;
  editedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ConversationsResponse {
  success: boolean;
  message?: string;
  data: {
    conversations: Conversation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MessagesResponse {
  success: boolean;
  message?: string;
  data: {
    messages: Message[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
  type?: "text" | "image" | "file";
  attachments?: string[];
}

export interface SendMessageResponse {
  success: boolean;
  message?: string;
  data: {
    message: Message;
    conversation: Conversation;
  };
}

export interface UnreadCountResponse {
  success: boolean;
  data: {
    unreadCount: number;
  };
}

export interface CloseConversationResponse {
  success: boolean;
  message?: string;
  data: Conversation;
}
