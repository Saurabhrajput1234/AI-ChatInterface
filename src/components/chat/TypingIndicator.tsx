import React from "react";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn("flex w-full justify-start", className)}>
      <div className="bg-muted text-foreground rounded-lg px-4 py-2 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="text-sm">AI is typing</span>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 