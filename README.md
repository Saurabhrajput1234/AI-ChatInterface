# AI Chat Interface - Frontend Intern Assignment

A modern AI chat interface built with Next.js 14+, React, TypeScript, and Tailwind CSS. This project demonstrates proficiency in building real-time chat applications with modern web technologies.

## 🚀 Features

### Core Features
- **Chat Interface**: Message bubbles for user and AI with auto-scrolling
- **Message Management**: Send, retry failed messages, clear chat history
- **Real-time Features**: WebSocket simulation, typing indicators, connection status
- **UI/UX Excellence**: Responsive design, dark/light theme, smooth animations

### Technical Features
- **Next.js 14+** with App Router
- **TypeScript** with strict mode
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom Hooks** for state management
- **API Integration** with mock endpoints
- **Keyboard Shortcuts** (Enter to send, Ctrl+K to clear)

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with class-variance-authority
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect, useCallback)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-intern-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatContainer.tsx    # Main chat container
│   │   ├── MessageList.tsx      # Message list with auto-scroll
│   │   ├── MessageBubble.tsx    # Individual message component
│   │   ├── MessageInput.tsx     # Message input with shortcuts
│   │   └── TypingIndicator.tsx  # AI typing animation
│   ├── ui/
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── Input.tsx            # Reusable input component
│   │   └── ThemeToggle.tsx      # Dark/light theme toggle
│   └── layout/
│       ├── Header.tsx           # App header with status
│       └── Sidebar.tsx          # Navigation sidebar
├── hooks/
│   ├── useChat.ts               # Chat logic and API integration
│   ├── useWebSocket.ts          # WebSocket simulation
│   └── useLocalStorage.ts       # Local storage utilities
├── types/
│   └── chat.ts                  # TypeScript type definitions
├── lib/
│   └── utils.ts                 # Utility functions
└── app/
    ├── page.tsx                 # Main page component
    ├── layout.tsx               # Root layout
    ├── globals.css              # Global styles
    └── api/
        └── chat/
            ├── send/route.ts    # POST /api/chat/send
            └── history/route.ts # GET /api/chat/history
```

## 🎯 API Endpoints

### POST /api/chat/send
Sends a message and returns an AI response.

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "conversationId": "mock-conversation-id"
}
```

**Response:**
```json
{
  "id": "uuid",
  "message": "That's an interesting question! Let me think about it...",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "sender": "ai",
  "status": "sent"
}
```

### GET /api/chat/history
Retrieves chat history.

**Response:**
```json
{
  "messages": [
    {
      "id": "1",
      "message": "Hello! How can I help you today?",
      "timestamp": "2024-01-01T11:59:00.000Z",
      "sender": "ai",
      "status": "sent"
    }
  ],
  "conversationId": "uuid"
}
```

## 🎨 Features in Detail

### Chat Interface (40 points)
- ✅ Message bubbles for user and AI
- ✅ Auto-scrolling to latest message
- ✅ Typing indicators when AI is responding
- ✅ Message timestamps
- ✅ Long message text wrapping

### Message Management (30 points)
- ✅ Send messages via API calls
- ✅ Store chat history in local state
- ✅ Message status (sending, sent, failed)
- ✅ Retry functionality for failed messages
- ✅ Clear chat functionality

### Real-time Features (20 points)
- ✅ WebSocket connection simulation
- ✅ AI typing indicator
- ✅ Message streaming effect
- ✅ Connection status indicators

### UI/UX Excellence (10 points)
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling
- ✅ Dark/light theme toggle
- ✅ Keyboard shortcuts

## 🎮 Usage

### Keyboard Shortcuts
- **Enter**: Send message
- **Ctrl+K**: Clear chat history

### Features
- **Send Messages**: Type in the input field and press Enter or click Send
- **Retry Failed Messages**: Click the retry icon on failed messages
- **Clear Chat**: Use Ctrl+K or click "Clear Chat" in the sidebar
- **Toggle Theme**: Click the theme toggle button in the header
- **Mobile Navigation**: Use the hamburger menu on mobile devices

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` directory

## 📱 Responsive Design

- **Mobile**: < 768px (single column, hidden sidebar)
- **Tablet**: 768px - 1024px (collapsible sidebar)
- **Desktop**: > 1024px (full layout)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Prettier formatting
- Component-based architecture

## 📄 License

This project is created for the Frontend Developer Intern Assignment.

## 🤝 Contributing

This is an assignment project, but feel free to suggest improvements or report issues.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS** 