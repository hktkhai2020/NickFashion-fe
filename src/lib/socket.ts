import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "https://api.nickfashion.asia";
const SOCKET_URL = "http://localhost:5000";

class SocketService {
  private socket: Socket | null = null;

  connect(token?: string) {
    if (this.socket?.connected) return this.socket;

    this.socket = io(SOCKET_URL, {
      auth: {
        token: token || localStorage.getItem("accessToken"),
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      autoConnect: true,
    });

    this.socket.on("connect", () => {
      console.log("[socket] Connected:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("[socket] Disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("[socket] Connection error:", error.message);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  // ============================================================
  // SERVER -> CLIENT EVENTS (Listening)
  // ============================================================

  // --- Order Events ---
  /** Triggers when order status changes (from order.controller.js) */
  onOrderUpdated(callback: (data: OrderUpdatedPayload) => void) {
    this.socket?.on("order_updated", callback);
    return () => this.socket?.off("order_updated", callback);
  }

  // --- Chat Events ---
  /** Triggers when a new message is sent in a conversation */
  onNewMessage(callback: (data: NewMessagePayload) => void) {
    this.socket?.on("new_message", callback);
    return () => this.socket?.off("new_message", callback);
  }

  /** Triggers when the current user receives a message */
  onReceiveMessage(callback: (data: ReceiveMessagePayload) => void) {
    this.socket?.on("receive_message", callback);
    return () => this.socket?.off("receive_message", callback);
  }

  /** Triggers when a message is sent confirmation */
  onMessageSent(callback: (data: MessageSentPayload) => void) {
    this.socket?.on("message_sent", callback);
    return () => this.socket?.off("message_sent", callback);
  }

  /** Triggers when another user in a conversation is typing */
  onUserTyping(callback: (data: UserTypingPayload) => void) {
    this.socket?.on("user_typing", callback);
    return () => this.socket?.off("user_typing", callback);
  }

  /** Triggers when another user stops typing */
  onUserStopTyping(callback: (data: UserStopTypingPayload) => void) {
    this.socket?.on("user_stop_typing", callback);
    return () => this.socket?.off("user_stop_typing", callback);
  }

  /** Triggers when a conversation is closed */
  onConversationClosed(callback: (data: ConversationClosedPayload) => void) {
    this.socket?.on("conversation_closed", callback);
    return () => this.socket?.off("conversation_closed", callback);
  }

  /** Triggers when an admin sends a message (confirmation broadcast) */
  onAdminMessageSent(callback: (data: AdminMessageSentPayload) => void) {
    this.socket?.on("admin_message_sent", callback);
    return () => this.socket?.off("admin_message_sent", callback);
  }

  /** Triggers when a message is edited */
  onMessageEdited(callback: (data: MessageEditedPayload) => void) {
    this.socket?.on("message_edited", callback);
    return () => this.socket?.off("message_edited", callback);
  }

  // --- Notification Events ---
  /** Triggers when a new notification arrives */
  onNewNotification(callback: (data: NewNotificationPayload) => void) {
    this.socket?.on("new_notification", callback);
    return () => this.socket?.off("new_notification", callback);
  }

  // ============================================================
  // CLIENT -> SERVER EVENTS (Emitting)
  // ============================================================

  // --- Conversation / Room Events ---
  /** Join a conversation room to receive messages */
  emitJoinConversation(conversationId: string) {
    this.socket?.emit("join_conversation", conversationId);
  }

  /** Leave a conversation room */
  emitLeaveConversation(conversationId: string) {
    this.socket?.emit("leave_conversation", conversationId);
  }

  /** Join a custom room */
  emitJoinRoom(room: string) {
    this.socket?.emit("join_room", room);
  }

  /** Leave a custom room */
  emitLeaveRoom(room: string) {
    this.socket?.emit("leave_room", room);
  }

  // --- Typing Indicator Events ---
  /** Notify others that current user is typing in a conversation */
  emitTyping(conversationId: string) {
    this.socket?.emit("typing", { conversationId });
  }

  /** Notify others that current user stopped typing */
  emitStopTyping(conversationId: string) {
    this.socket?.emit("stop_typing", { conversationId });
  }

  // --- Chat Events ---
  /** Send a message to a room */
  emitSendMessage(room: string, message: SendMessagePayload) {
    this.socket?.emit("send_message", { room, message });
  }

  // --- Notification Events ---
  /** Send a notification to a specific user (admin use) */
  emitSendNotification(targetUserId: string, notification: NotificationData) {
    this.socket?.emit("send_notification", { targetUserId, notification });
  }

  // --- Order Events ---
  /** Trigger order status update event */
  emitOrderStatusUpdate(orderId: string, status: string, userId: string) {
    this.socket?.emit("order_status_update", { orderId, status, userId });
  }
}

// ============================================================
// TYPES - must match backend socket.io.js and controllers
// ============================================================

/** Payload for order_updated event (server -> client) */
export interface OrderUpdatedPayload {
  orderId: string;
  status: string;
  updatedAt: Date;
}

/** Payload for new_message event (server -> client, from message.controller.js) */
export interface NewMessagePayload {
  conversationId: string;
  message: {
    _id: string;
    conversationId: string;
    sender: string;
    content: string;
    attachments?: { url: string; type: string }[];
    replyTo?: string;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  lastMessage: string;
  lastMessageBy: string;
  sender: {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    avatar?: string;
    role: string;
    isOnline: boolean;
    lastSeen: Date;
  };
}

/** Payload for receive_message event (server -> client) */
export interface ReceiveMessagePayload {
  _id: string;
  conversationId: string;
  sender: string;
  content: string;
  attachments?: { url: string; type: string }[];
  replyTo?: string;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
  senderData?: {
    _id: string;
    username: string;
    fullName: string;
    avatar?: string;
    role: string;
    isOnline: boolean;
  };
}

/** Payload for message_sent event (server -> client) */
export interface MessageSentPayload {
  conversationId: string;
  message: {
    _id: string;
    conversationId: string;
    sender: string;
    content: string;
    attachments?: { url: string; type: string }[];
    replyTo?: string;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

/** Payload for user_typing event (server -> client) */
export interface UserTypingPayload {
  conversationId: string;
  userId: string;
  username: string;
}

/** Payload for user_stop_typing event (server -> client) */
export interface UserStopTypingPayload {
  conversationId: string;
  userId: string;
}

/** Payload for conversation_closed event (server -> client) */
export interface ConversationClosedPayload {
  conversationId: string;
  closedBy: "user" | "admin";
}

/** Payload for admin_message_sent event (server -> client) */
export interface AdminMessageSentPayload {
  conversationId: string;
  message: {
    _id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    type: "text" | "image" | "file";
    attachments?: string[];
    isRead: boolean;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

/** Payload for message_edited event (server -> client) */
export interface MessageEditedPayload {
  conversationId: string;
  messageId: string;
  newContent: string;
  editedAt: Date;
}

/** Payload for new_notification event (server -> client) */
export interface NewNotificationPayload {
  _id: string;
  userId: string;
  type: "order" | "message" | "system" | "promotion" | "review" | "support";
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

/** Payload for send_message event (client -> server) */
export interface SendMessagePayload {
  content: string;
  attachments?: { url: string; type: string }[];
  replyTo?: string;
}

/** Data shape for send_notification event (client -> server) */
export interface NotificationData {
  type: "order" | "message" | "system" | "promotion" | "review" | "support";
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

const socketService = new SocketService();
export default socketService;
