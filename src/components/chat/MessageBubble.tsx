"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";
import { Check, X, Clock, AlertCircle } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
  onRetry?: (messageId: string) => void;
  showTypewriter?: boolean;
}

export function MessageBubble({ message, onRetry, showTypewriter = false }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const isFailed = message.status === "failed";
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect for AI messages
  useEffect(() => {
    if (isUser || !showTypewriter) {
      setDisplayedMessage(message.message);
      return;
    }

    setIsTyping(true);
    setDisplayedMessage("");
    let index = 0;
    let cancelled = false;

    function typeNextChar() {
      if (cancelled) return;
      setDisplayedMessage(message.message.slice(0, index + 1));
      if (index < message.message.length - 1) {
        index++;
        setTimeout(typeNextChar, 30);
      } else {
        setIsTyping(false);
      }
    }

    typeNextChar();

    return () => {
      cancelled = true;
    };
  }, [message.message, isUser, showTypewriter]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case "sending":
        return <Clock className="h-3 w-3 animate-spin" />;
      case "sent":
        return <Check className="h-3 w-3" />;
      case "failed":
        return <AlertCircle className="h-3 w-3 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "group relative max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="break-words break-all hyphens-auto overflow-wrap-anywhere text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {displayedMessage}
          {isTyping && <span className="animate-pulse">|</span>}
        </div>
        
        <div className="mt-1 flex items-center justify-between gap-2 text-xs opacity-70">
          <span>{formatTime(message.timestamp)}</span>
          
          <div className="flex items-center gap-1">
            {getStatusIcon()}
            {isFailed && onRetry && (
              <button
                onClick={() => onRetry(message.id)}
                className="ml-1 rounded p-0.5 hover:bg-black/10"
                aria-label="Retry message"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 