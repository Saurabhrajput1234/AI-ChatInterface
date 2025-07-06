"use client";

import { useState, useEffect, useCallback } from "react";

interface UseWebSocketReturn {
  isConnected: boolean;
  connectionStatus: "connecting" | "connected" | "disconnected" | "error";
  reconnect: () => void;
}

export function useWebSocket(): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">("disconnected");

  const connect = useCallback(() => {
    setConnectionStatus("connecting");
    
    // Simulate WebSocket connection
    setTimeout(() => {
      const shouldConnect = Math.random() > 0; // 90% success rate
      
      if (shouldConnect) {
        setIsConnected(true);
        setConnectionStatus("connected");
      } else {
        setIsConnected(false);
        setConnectionStatus("error");
      }
    }, 1000);
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setConnectionStatus("disconnected");
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(connect, 1000);
  }, [connect, disconnect]);

  useEffect(() => {
    // Simulate initial connection
    connect();

    // Simulate connection drops
    const interval = setInterval(() => {
      if (isConnected && Math.random() < 0.05) { // 5% chance of disconnection
        disconnect();
      }
    }, 30000); // Check every 30 seconds

    return () => {
      clearInterval(interval);
      disconnect();
    };
  }, [connect, disconnect, isConnected]);

  return {
    isConnected,
    connectionStatus,
    reconnect,
  };
} 