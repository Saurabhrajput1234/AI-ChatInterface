"use client";

import React, { useEffect } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useChatContext } from "@/contexts/ChatContext";

export function ChatContainer() {
  const { messages, isTyping, sendMessage, retryMessage, clearChat, isLoading } = useChatContext();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K to clear chat
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        clearChat();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [clearChat]);

  return (
    <div className="flex h-full flex-col">
      <MessageList
        messages={messages}
        isTyping={isTyping}
        onRetryMessage={retryMessage}
        isLoading={isLoading}
      />
      <MessageInput
        onSendMessage={sendMessage}
        disabled={isTyping || isLoading}
        placeholder="Type your message... (Ctrl+K to clear chat)"
      />
    </div>
  );
} 