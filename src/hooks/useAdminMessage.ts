import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useCallback, useRef } from "react";
import adminMessageService from "@/services/adminMessageService";
import socketService from "@/lib/socket";
import {
  Conversation,
  Message,
  SendMessagePayload,
} from "@/types/adminMessage";
import { notification } from "antd";
import { NewMessagePayload } from "@/lib/socket";

const useAdminMessage = () => {
  const queryClient = useQueryClient();
  const [_api, contextHolder] = notification.useNotification();

  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [statusFilter, setStatusFilter] = useState<string>("open");
  const [isTyping, setIsTyping] = useState(false);
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevConversationIdRef = useRef<string | null>(null);

  const conversationsQuery = useQuery({
    queryKey: ["admin-conversations", statusFilter],
    queryFn: () => adminMessageService.getConversations(1, 50, statusFilter),
    refetchInterval: 10000,
  });

  const messagesQuery = useQuery({
    queryKey: ["admin-messages", selectedConversationId],
    queryFn: () =>
      adminMessageService.getMessages(selectedConversationId!, 1, 100),
    enabled: !!selectedConversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (payload: SendMessagePayload) =>
      adminMessageService.sendMessage(payload),
    onSuccess: (data) => {
      if (data.success) {
        const newMessage = data.data.message;

        setSocketMessages((prev) => {
          const exists = prev.some((m) => m._id === newMessage._id);
          if (exists) return prev;
          return [...prev, newMessage];
        });

        socketService.emitSendMessage(
          `user:${data.data.conversation.userId._id}`,
          {
            content: newMessage.content,
          },
        );

        queryClient.invalidateQueries({ queryKey: ["admin-conversations"] });
      }
    },
    onError: () => {
      _api.error({
        message: "Gửi tin nhắn thất bại",
        description: "Không thể gửi tin nhắn. Vui lòng thử lại.",
        placement: "topRight",
      });
    },
  });

  const closeConversationMutation = useMutation({
    mutationFn: (conversationId: string) =>
      adminMessageService.closeConversation(conversationId),
    onSuccess: (data) => {
      if (data.success) {
        _api.success({
          message: "Đã đóng cuộc trò chuyện",
          description: "Cuộc trò chuyện đã được đóng thành công.",
          placement: "topRight",
        });
        queryClient.invalidateQueries({ queryKey: ["admin-conversations"] });

        if (selectedConversationId === data.data._id) {
          setSelectedConversationId(null);
        }
      }
    },
    onError: () => {
      _api.error({
        message: "Đóng cuộc trò chuyện thất bại",
        description: "Không thể đóng cuộc trò chuyện. Vui lòng thử lại.",
        placement: "topRight",
      });
    },
  });

  useEffect(() => {
    if (prevConversationIdRef.current !== selectedConversationId) {
      prevConversationIdRef.current = selectedConversationId;
      setSocketMessages([]);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    if (!selectedConversationId) return;

    socketService.emitJoinConversation(selectedConversationId);

    const unsubNewMessage = socketService.onNewMessage(
      (payload: NewMessagePayload) => {
        if (payload.conversationId === selectedConversationId) {
          const msg: Message = {
            _id: payload.message._id,
            senderId: payload.sender as unknown as Message["senderId"],
            receiverId: payload.sender as unknown as Message["receiverId"],
            conversationId: payload.conversationId,
            content: payload.message.content,
            type: (payload.message.attachments &&
            payload.message.attachments.length > 0
              ? (payload.message.attachments[0].type as "image" | "file")
              : "text") as Message["type"],
            attachments: payload.message.attachments?.map((a) => a.url),
            isRead: true,
            isEdited: payload.message.isEdited,
            createdAt: new Date(payload.message.createdAt),
            updatedAt: new Date(payload.message.updatedAt),
          };
          setSocketMessages((prev) => {
            const exists = prev.some((m) => m._id === msg._id);
            if (exists) return prev;
            return [...prev, msg];
          });
          queryClient.invalidateQueries({ queryKey: ["admin-conversations"] });
        }
      },
    );

    const unsubTyping = socketService.onUserTyping((payload) => {
      if (payload.conversationId === selectedConversationId) {
        setIsOtherTyping(true);
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
        }
        typingTimerRef.current = setTimeout(() => {
          setIsOtherTyping(false);
        }, 3000);
      }
    });

    const unsubStopTyping = socketService.onUserStopTyping((payload) => {
      if (payload.conversationId === selectedConversationId) {
        setIsOtherTyping(false);
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
        }
      }
    });

    const unsubConversationClosed = socketService.onConversationClosed(
      (payload) => {
        if (payload.conversationId === selectedConversationId) {
          _api.warning({
            message: "Cuộc trò chuyện đã bị đóng",
            description: "Người dùng đã đóng cuộc trò chuyện này.",
            placement: "topRight",
          });
          queryClient.invalidateQueries({ queryKey: ["admin-conversations"] });
        }
      },
    );

    return () => {
      socketService.emitLeaveConversation(selectedConversationId);
      unsubNewMessage();
      unsubTyping();
      unsubStopTyping();
      unsubConversationClosed();
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [selectedConversationId, queryClient, _api]);

  const selectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId);
  }, []);

  const submitMessage = useCallback(
    (content: string) => {
      if (!selectedConversationId || !content.trim()) return;
      sendMessageMutation.mutate({
        conversationId: selectedConversationId,
        content: content.trim(),
        type: "text",
      });
    },
    [selectedConversationId, sendMessageMutation],
  );

  const emitTyping = useCallback(() => {
    if (!selectedConversationId) return;
    socketService.emitTyping(selectedConversationId);
    setIsTyping(true);
  }, [selectedConversationId]);

  const emitStopTyping = useCallback(() => {
    if (!selectedConversationId) return;
    socketService.emitStopTyping(selectedConversationId);
    setIsTyping(false);
  }, [selectedConversationId]);

  const closeConversation = useCallback(
    (conversationId: string) => {
      closeConversationMutation.mutate(conversationId);
    },
    [closeConversationMutation],
  );

  const apiMessages: Message[] = messagesQuery.data?.data?.messages || [];

  const dedupedSocketMessages = socketMessages.filter(
    (sm) => !apiMessages.some((am) => am._id === sm._id),
  );

  const allMessages: Message[] = [
    ...apiMessages,
    ...dedupedSocketMessages,
  ].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const conversations: Conversation[] =
    conversationsQuery.data?.data?.conversations || [];

  const selectedConversation: Conversation | undefined = conversations.find(
    (c) => c._id === selectedConversationId,
  );

  return {
    contextHolder,
    conversations,
    messages: allMessages,
    selectedConversation,
    selectedConversationId,
    selectConversation,
    isLoadingConversations: conversationsQuery.isPending,
    isLoadingMessages: messagesQuery.isPending,
    isErrorConversations: conversationsQuery.isError,
    isErrorMessages: messagesQuery.isError,
    errorConversations: conversationsQuery.error,
    errorMessages: messagesQuery.error,
    isSending: sendMessageMutation.isPending,
    isClosing: closeConversationMutation.isPending,
    statusFilter,
    setStatusFilter,
    isTyping,
    isOtherTyping,
    submitMessage,
    emitTyping,
    emitStopTyping,
    closeConversation,
    refetchConversations: conversationsQuery.refetch,
    refetchMessages: messagesQuery.refetch,
  };
};

export default useAdminMessage;
