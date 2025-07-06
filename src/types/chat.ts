// chat.ts
export type MessageStatus = 'sending' | 'sent' | 'failed';
export type Sender = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  message: string;
  timestamp: string;
  sender: Sender;
  status: MessageStatus;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
  conversationId: string;
} 