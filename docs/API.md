# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### POST /api/chat/send
Send a message and get a response.

**Request:**
- URL: `/api/chat/send`
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body:
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
  "message": "Response message",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "sender": "ai",
  "status": "sent"
}
```

### GET /api/chat/history
Get chat history for the session.

**Request:**
- URL: `/api/chat/history`
- Method: `GET`

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

## Data Types

### ChatMessage
```typescript
interface ChatMessage {
  id: string;
  message: string;
  timestamp: string;
  sender: 'user' | 'ai';
  status: 'sending' | 'sent' | 'failed';
}
```

### ChatHistoryResponse
```typescript
interface ChatHistoryResponse {
  messages: ChatMessage[];
  conversationId: string;
}
```

## Errors

- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Server Error

**Error Response:**
```json
{
  "error": "Error message"
}
``` 