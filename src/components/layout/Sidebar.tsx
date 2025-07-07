"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Trash2, Menu, X, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onClearChat: () => void;
  className?: string;
}

export function Sidebar({ onClearChat, className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleClearChat = () => {
    const confirmed = window.confirm("Are you sure you want to clear all messages? This action cannot be undone.");
    if (confirmed) {
      onClearChat();
      // Close sidebar on mobile after clearing
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 h-10 w-10 bg-background/80 backdrop-blur border shadow-sm"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-14 items-center border-b px-4 lg:hidden pl-16">
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                Chat
              </div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleClearChat}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Chat
              </Button>
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="border-t p-[1.37rem]">
            <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-muted-foreground">
              <Settings className="h-4 w-4" />
              Settings
            </div>
            {/* <p className="px-2 text-xs text-muted-foreground">
              AI Chat Interface v1.0
            </p> */}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
} 