"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatProvider, useChatContext } from "@/contexts/ChatContext";

function HomePageContent() {
  const { clearChat } = useChatContext();

  return (
    <div className="flex min-h-screen">
      <Sidebar onClearChat={clearChat} />
      <main className="flex-1 flex flex-col lg:ml-0">
        <Header />
        <div className="flex-1 pt-0 lg:pt-0">
          <ChatContainer />
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <ChatProvider>
      <HomePageContent />
    </ChatProvider>
  );
} 