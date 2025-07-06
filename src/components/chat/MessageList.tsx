"use client";

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { Loader2 } from "lucide-react";

interface MessageListProps {
  messages: ChatMessage[];
  isTyping?: boolean;
  onRetryMessage?: (messageId: string) => void;
  isLoading?: boolean;
}

export function MessageList({ 
  messages, 
  isTyping = false, 
  onRetryMessage,
  isLoading = false
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm">Loading chat history...</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground max-w-sm">
          <h3 className="text-lg font-semibold mb-2">Welcome to AI Chat</h3>
          <p className="text-sm">Start a conversation by typing a message below.</p>
          <div className="mt-4 text-xs opacity-70">
            <p>💡 Try asking:</p>
            <ul className="mt-2 space-y-1">
              <li>&ldquo;What can you help me with?&rdquo;</li>
              <li>&ldquo;Tell me a joke&rdquo;</li>
              <li>&ldquo;How does this chat work?&rdquo;</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          onRetry={onRetryMessage}
          showTypewriter={message.sender === "ai" && index === messages.length - 1}
        />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
} 