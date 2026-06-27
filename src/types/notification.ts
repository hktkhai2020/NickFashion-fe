export interface notification {
  _id: string;
  recipientId: string;
  senderId: string;
  type: string;
  title: string;
  content: string;
  relatedId: string;
  relatedType: string;
  isRead: boolean;
  readAt: Date | null;
  data: any;
  isDeleted: boolean;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface getNotification {
  success: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
    notifications: notification[];
  };
}
export interface markAllAsReadNotification {
  success: boolean;
  message: string;
  data: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: any;
    upsertedCount: number;
    matchedCount: number;
  };
}

export interface deleteNotification {
  success: boolean;
  message: string;
}
