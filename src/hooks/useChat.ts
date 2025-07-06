"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChatMessage, MessageStatus } from "@/types/chat";

interface UseChatReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  retryMessage: (messageId: string) => Promise<void>;
  clearChat: () => void;
  isLoading: boolean;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/chat/history");
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  // Debounced typing indicator
  const setTypingWithDelay = useCallback((typing: boolean, delay: number = 1000) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (typing) {
      setIsTyping(true);
    } else {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, delay);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      message: content,
      timestamp: new Date().toISOString(),
      sender: "user",
      status: "sending",
    };

    // Optimistic UI update
    setMessages(prev => [...prev, userMessage]);
    setTypingWithDelay(true, 500);

    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          conversationId: "mock-conversation-id",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      const aiMessage: ChatMessage = await response.json();
      
      // Validate AI message format
      if (!aiMessage.message || typeof aiMessage.message !== 'string') {
        throw new Error("Invalid response format from server");
      }
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: "sent" as MessageStatus }
            : msg
        ).concat(aiMessage)
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: "failed" as MessageStatus }
            : msg
        )
      );
    } finally {
      setTypingWithDelay(false, 1000);
    }
  }, [setTypingWithDelay]);

  const retryMessage = useCallback(async (messageId: string) => {
    const messageToRetry = messages.find(msg => msg.id === messageId);
    if (!messageToRetry || messageToRetry.sender !== "user") return;

    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: "sending" as MessageStatus }
          : msg
      )
    );

    setTypingWithDelay(true, 500);

    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToRetry.message,
          conversationId: "mock-conversation-id",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      const aiMessage: ChatMessage = await response.json();
      
      // Validate AI message format
      if (!aiMessage.message || typeof aiMessage.message !== 'string') {
        throw new Error("Invalid response format from server");
      }
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, status: "sent" as MessageStatus }
            : msg
        ).concat(aiMessage)
      );
    } catch (error) {
      console.error("Failed to retry message:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, status: "failed" as MessageStatus }
            : msg
        )
      );
    } finally {
      setTypingWithDelay(false, 1000);
    }
  }, [messages, setTypingWithDelay]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    retryMessage,
    clearChat,
    isLoading,
  };
} 