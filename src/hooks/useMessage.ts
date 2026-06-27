import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import messageService from "@/services/messageService";
import { useState, useEffect, useRef, useCallback } from "react";
import socketService from "@/lib/socket";
import { notification } from "antd";
import { ChatMessage } from "@/types/message";
import {
  NewMessagePayload,
  MessageSentPayload,
  UserTypingPayload,
  UserStopTypingPayload,
  ConversationClosedPayload,
} from "@/lib/socket";

const useMessage = () => {
  const queryClient = useQueryClient();
  const [_api, contextHolder] = notification.useNotification();

  const [valueMessage, setValueMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [isOpenSmile, setIsOpenSmile] = useState(false);
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const otherTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const conversationIdRef = useRef<string | null>(null);

  const {
    data: dataConversations,
    isPending: isPendingConversations,
    isError: isErrorConversations,
    error: errorConversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => messageService.getConversations(),
  });
  
  const {
    data: dataMessages,
    isPending: isPendingMessages,
    isError: isErrorMessages,
    error: errorMessages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => messageService.getMessages(),
    enabled: !!dataConversations?.data?._id,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (payload: {
      content: string;
      type: "text" | "image" | "file";
    }) => messageService.sendMessage(payload),
  });

  // Track conversation id
  useEffect(() => {
    const convId = dataConversations?.data?._id || null;
    if (convId && convId !== conversationIdRef.current) {
      conversationIdRef.current = convId;
    }

  }, [dataConversations]);

  // Join conversation + subscribe socket events
  useEffect(() => {
    const convId = conversationIdRef.current;
    if (!convId) return;
    console.log(convId);
    socketService.emitJoinConversation(convId);

    const unsubNewMessage = socketService.onNewMessage(
      (payload: NewMessagePayload) => {
        if (payload.conversationId !== convId) return;
        const msg: ChatMessage = {
          _id: payload.message._id,
          conversationId: payload.conversationId,
          content: payload.message.content,
          type:
            payload.message.attachments?.[0]?.type === "image"
              ? "image"
              : "text",
          attachments: payload.message.attachments?.map((a) => a.url),
          isRead: true,
          isEdited: payload.message.isEdited,
          createdAt: new Date(payload.message.createdAt),
          updatedAt: new Date(payload.message.updatedAt),
          senderId: payload.sender._id,
          receiverId: undefined,
        };
        setRealtimeMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      },
    );

    const unsubMessageSent = socketService.onMessageSent(
      (payload: MessageSentPayload) => {
        if (payload.conversationId !== convId) return;
        const msg: ChatMessage = {
          _id: payload.message._id,
          conversationId: payload.conversationId,
          content: payload.message.content,
          type:
            payload.message.attachments?.[0]?.type === "image"
              ? "image"
              : "text",
          attachments: payload.message.attachments?.map((a) => a.url),
          isRead: true,
          isEdited: payload.message.isEdited,
          createdAt: new Date(payload.message.createdAt),
          updatedAt: new Date(payload.message.updatedAt),
          senderId: "self",
          receiverId: undefined,
        };
        setRealtimeMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      },
    );

    const unsubTyping = socketService.onUserTyping(
      (payload: UserTypingPayload) => {
        if (payload.conversationId !== convId) return;
        setIsOtherTyping(true);
        console.log(payload);
        if (otherTypingTimeoutRef.current)
          clearTimeout(otherTypingTimeoutRef.current);
        otherTypingTimeoutRef.current = setTimeout(
          () => setIsOtherTyping(false),
          3000,
        );
      },
    );

    const unsubStopTyping = socketService.onUserStopTyping(
      (payload: UserStopTypingPayload) => {
        if (payload.conversationId !== convId) return;
        setIsOtherTyping(false);
        if (otherTypingTimeoutRef.current) {
          clearTimeout(otherTypingTimeoutRef.current);
          otherTypingTimeoutRef.current = null;
        }
      },
    );

    const unsubClosed = socketService.onConversationClosed(
      (payload: ConversationClosedPayload) => {
        if (payload.conversationId !== convId) return;
        _api.warning({
          message: "Cuộc trò chuyện đã đóng",
          description: "Nhân viên đã đóng cuộc trò chuyện này.",
          placement: "top",
        });
      },
    );

    return () => {
      socketService.emitLeaveConversation(convId);
      unsubNewMessage();
      unsubMessageSent();
      unsubTyping();
      unsubStopTyping();
      unsubClosed();
      if (otherTypingTimeoutRef.current) {
        clearTimeout(otherTypingTimeoutRef.current);
        otherTypingTimeoutRef.current = null;
      }
    };
  }, [dataConversations?.data?._id, queryClient, _api]);

  const joinConversation = useCallback(() => {
    const convId = conversationIdRef.current || dataConversations?.data?._id;
    if (convId) {
      socketService.emitJoinConversation(convId);
    }
  }, [dataConversations]);

  const leaveConversation = useCallback(() => {
    const convId = conversationIdRef.current;
    if (convId) {
      socketService.emitLeaveConversation(convId);
    }
  }, []);

  const typingMessage = useCallback(() => {
    const convId = conversationIdRef.current;
    if (!convId) return;
    socketService.emitTyping(convId);
  }, []);

  const stopTypingMessage = useCallback(() => {
    const convId = conversationIdRef.current;
    if (!convId) return;
    socketService.emitStopTyping(convId);
  }, []);

  const submitMessage = useCallback(
    async (value: string) => {
      const content = value?.trim();
      if (!content) return;
      try {
        await sendMessageMutation.mutateAsync({ content, type: "text" });
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        setIsTyping(false);
        stopTypingMessage();
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      } catch (error) {
        console.log(error);
        _api.error({
          message: "Gửi tin nhắn thất bại",
          placement: "top",
        });
      }
    },
    [sendMessageMutation, queryClient, _api, stopTypingMessage],
  );

  // Debounced stop_typing khi user ngừng gõ
  useEffect(() => {
    if (isTyping) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        stopTypingMessage();
      }, 2000);
    }
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [isTyping, stopTypingMessage]);

  const apiMessages: ChatMessage[] = dataMessages?.data?.messages || [];
  const dedupedRealtime = realtimeMessages.filter(
    (rm) => !apiMessages.some((am) => am._id === rm._id),
  );
  const messages: ChatMessage[] = [...apiMessages, ...dedupedRealtime].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return {
    contextHolder,
    submitMessage,
    joinConversation,
    leaveConversation,
    typingMessage,
    stopTypingMessage,
    dataMessages,
    isPendingMessages,
    isErrorMessages,
    errorMessages,
    dataConversations,
    isPendingConversations,
    isErrorConversations,
    errorConversations,
    messages,
    isTyping,
    setIsTyping,
    isOtherTyping,
    isOpenSmile,
    setIsOpenSmile,
    valueMessage,
    setValueMessage,
    isSending: sendMessageMutation.isPending,
  };
};

export default useMessage;
