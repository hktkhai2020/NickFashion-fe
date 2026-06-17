import { useState } from "react";
import useAdminMessage from "@/hooks/useAdminMessage";
import {
  ConversationList,
  MessageList,
  ChatInput,
  ChatHeader,
  ChatPlaceholder,
} from "@/components/admin/chat";
import { Tabs, Badge } from "antd";
import "@/styles/admin/chat.scss";

const AdminChat = () => {
  const {
    contextHolder,
    conversations,
    messages,
    selectedConversation,
    selectedConversationId,
    selectConversation,
    isLoadingConversations,
    isLoadingMessages,
    isSending,
    isClosing,
    setStatusFilter,
    isOtherTyping,
    submitMessage,
    emitTyping,
    emitStopTyping,
    closeConversation,
  } = useAdminMessage();

  const [activeTab, setActiveTab] = useState("open");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setStatusFilter(key);
  };

  const openCount = conversations.filter((c) => c.status === "open").length;
  const closedCount = conversations.filter((c) => c.status === "closed").length;

  return (
    <div className="admin-chat">
      {contextHolder}

      {/* Left panel - Conversation list */}
      <div className="admin-chat__sidebar">
        <div className="admin-chat__sidebar-header">
          <h2 className="admin-chat__sidebar-title">Cuộc trò chuyện</h2>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            size="small"
            className="admin-chat__tabs"
            items={[
              {
                key: "open",
                label: (
                  <span className="flex items-center gap-1">
                    Đang mở
                    {openCount > 0 && (
                      <Badge
                        count={openCount}
                        size="small"
                        style={{ backgroundColor: "#52c41a" }}
                      />
                    )}
                  </span>
                ),
              },
              {
                key: "closed",
                label: (
                  <span className="flex items-center gap-1">
                    Đã đóng
                    {closedCount > 0 && (
                      <Badge count={closedCount} size="small" />
                    )}
                  </span>
                ),
              },
            ]}
          />
        </div>

        <div className="admin-chat__conversation-list">
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversationId}
            onSelect={selectConversation}
            isLoading={isLoadingConversations}
          />
        </div>
      </div>

      {/* Right panel - Chat area */}
      <div className="admin-chat__main">
        {selectedConversation ? (
          <>
            <ChatHeader
              conversation={selectedConversation}
              onClose={closeConversation}
              isClosing={isClosing}
            />
            <div className="admin-chat__messages">
              <MessageList
                messages={messages}
                isLoading={isLoadingMessages}
                isOtherTyping={isOtherTyping}
              />
            </div>
            <ChatInput
              onSend={submitMessage}
              onTyping={emitTyping}
              onStopTyping={emitStopTyping}
              isSending={isSending}
              disabled={selectedConversation.status === "closed"}
              placeholder={
                selectedConversation.status === "closed"
                  ? "Cuộc trò chuyện đã đóng"
                  : "Nhập tin nhắn trả lời..."
              }
            />
          </>
        ) : (
          <ChatPlaceholder selectedCount={openCount} />
        )}
      </div>
    </div>
  );
};

export default AdminChat;
