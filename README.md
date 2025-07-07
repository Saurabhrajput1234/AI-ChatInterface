# Chat Interface

A chat app built with Next.js, React, TypeScript, and Tailwind CSS.

## Features
- Chat interface with message bubbles
- Send, retry, and clear messages
- Typing indicator and connection status
- Responsive design and theme toggle

## Tech Stack
- Next.js 14+
- TypeScript
- Tailwind CSS
- React hooks

## Installation
1. Clone the repository
   ```bash
   git clone (https://github.com/Saurabhrajput1234/AI-ChatInterface.git)
   cd frontend-intern-assignment
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
src/
  components/
    chat/
      ChatContainer.tsx
      MessageList.tsx
      MessageBubble.tsx
      MessageInput.tsx
      TypingIndicator.tsx
    ui/
      Button.tsx
      Input.tsx
      ThemeToggle.tsx
    layout/
      Header.tsx
      Sidebar.tsx
  hooks/
    useChat.ts
    useWebSocket.ts
    useLocalStorage.ts
  types/
    chat.ts
  lib/
    utils.ts
  app/
    page.tsx
    layout.tsx
    globals.css
    api/
      chat/
        send/route.ts
        history/route.ts
```

## API Endpoints

### POST /api/chat/send
Send a message and get a response.

### GET /api/chat/history
Get chat history.

## Deployment
- Vercel: Connect repo and deploy
- Netlify: Build and deploy `.next` directory

## Development
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint 
