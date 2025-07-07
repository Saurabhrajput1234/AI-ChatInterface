# Architecture

## Overview

This project uses React, Next.js 14+, and TypeScript. The code is organized by components and hooks.

## Components

- Layout: Header, Sidebar
- Chat: ChatContainer, MessageList, MessageBubble, MessageInput, TypingIndicator
- UI: Button, Input, ThemeToggle

## Hooks

- useChat: Manages chat messages and API calls
- useWebSocket: Simulates WebSocket connection
- useLocalStorage: Handles persistent storage

## Data Flow

1. User types a message in MessageInput
2. useChat updates state and sends API request
3. Response is added to messages
4. MessageList updates and scrolls to bottom

## Error Handling

- API/network errors are shown in the UI
- Failed messages can be retried

## Accessibility

- All buttons and inputs have labels
- Keyboard navigation is supported
