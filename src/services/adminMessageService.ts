import { apiClient, endpoints } from "@/api";
import {
  ConversationsResponse,
  MessagesResponse,
  SendMessagePayload,
  SendMessageResponse,
  UnreadCountResponse,
  CloseConversationResponse,
} from "@/types/adminMessage";

const adminMessageService = {
  getConversations: async (page = 1, limit = 20, status?: string) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (status) params.append("status", status);
    const response = await apiClient.get<ConversationsResponse>(
      `${endpoints.getConversationsByAdmin}?${params.toString()}`
    );
    return response.data;
  },

  getMessages: async (conversationId: string, page = 1, limit = 50) => {
    const response = await apiClient.get<MessagesResponse>(
      `${endpoints.getMessagesByAdmin(conversationId)}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  sendMessage: async (payload: SendMessagePayload) => {
    const response = await apiClient.post<SendMessageResponse>(
      endpoints.sendMessageByAdmin,
      payload
    );
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await apiClient.get<UnreadCountResponse>(
      endpoints.getUnreadCountByAdmin
    );
    return response.data;
  },

  closeConversation: async (conversationId: string) => {
    const response = await apiClient.put<CloseConversationResponse>(
      endpoints.closeConversationByAdmin(conversationId)
    );
    return response.data;
  },
};

export default adminMessageService;
