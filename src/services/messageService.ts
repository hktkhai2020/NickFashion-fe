import { apiClient, endpoints } from "@/api";
import {getConversations, getMessages} from "@/types/message"
const messageService = {
  getConversations: async() => {
    const response =  await apiClient.get<getConversations>(endpoints.getConversations)
    return response.data
  },
  getMessages:async()=>{
    const response = await apiClient.get<getMessages>(endpoints.getMessages);
    return response.data
  },
  sendMessage: async({content,type}:{content:string,type:string}) => {
    const response = await apiClient.post(endpoints.sendMessage, {content,type});
    return response.data
  },
  editMessage: async(messageId: string, content: string) => {
    const response = await apiClient.put(endpoints.editMessage(messageId), {content});
    return response.data
  },
  getUnreadCount: async() => {
    const response = await apiClient.get(endpoints.getUnreadCount);
    return response.data
  },
  closeConversation: async() => {
    const response = await apiClient.put(endpoints.closeConversation);
    return response.data
  },
};

export default messageService;
