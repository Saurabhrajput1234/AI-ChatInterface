"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message..." 
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    
    // Ctrl+K to clear chat (handled by parent)
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // This will be handled by the parent component
    }
  };

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-end gap-2 p-3 sm:p-4 border-t"
      aria-label="Chat message form"
    >
      <div className="flex-1 relative min-w-0">
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10 resize-none text-sm sm:text-base"
          aria-label="Message input"
          aria-describedby="message-help"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-7 sm:w-7"
          disabled={disabled}
          aria-label="Attach file"
        >
          <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
      
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        size="icon"
        className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
      
      <div id="message-help" className="sr-only">
        Press Enter to send your message. Use Ctrl+K to clear the chat.
      </div>
    </form>
  );
} 