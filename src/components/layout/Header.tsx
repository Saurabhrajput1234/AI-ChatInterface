"use client";

import React from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Wifi, WifiOff, Loader2 } from "lucide-react";

export function Header() {
  const { isConnected, connectionStatus } = useWebSocket();

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-500" />;
      case "connecting":
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
      case "error":
      case "disconnected":
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <WifiOff className="h-4 w-4 text-gray-500" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Connection Error";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 lg:px-4 pl-16 lg:pl-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <h1 className="text-lg font-semibold truncate sm:text-xl">AI Chat Interface</h1>
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            {getConnectionIcon()}
            <span>{getConnectionText()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="sm:hidden flex items-center gap-1 text-xs text-muted-foreground">
            {getConnectionIcon()}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 