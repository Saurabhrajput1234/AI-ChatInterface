# API Documentation

## Overview

The AI Chat Interface uses Next.js API routes to handle chat functionality. All endpoints are RESTful and return JSON responses.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, no authentication is required for the API endpoints. In a production environment, you would implement proper authentication and authorization.

## Endpoints

### POST /api/chat/send

Sends a message and returns an AI response.

#### Request

**URL**: `/api/chat/send`

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "message": "Hello, how are you?",
  "conversationId": "mock-conversation-id"
}
```

#### Response

**Success (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "That's an interesting question! Let me think about it... (Replying to: \"Hello, how are you?...\")",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "sender": "ai",
  "status": "sent"
}
```

**Error (400 Bad Request)**:
```json
{
  "error": "Invalid request body"
}
```

**Error (500 Internal Server Error)**:
```json
{
  "error": "Failed to process message"
}
```

#### Implementation Details

- **Delay**: Simulates processing time (1-3 seconds)
- **Response Variety**: Randomly selects from predefined AI responses
- **Message Format**: Includes reference to the original message
- **Status**: Always returns "sent" status

### GET /api/chat/history

Retrieves chat history for the current session.

#### Request

**URL**: `/api/chat/history`

**Method**: `GET`

**Headers**: None required

#### Response

**Success (200 OK)**:
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
  "conversationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Implementation Details

- **Mock Data**: Returns predefined welcome message
- **Conversation ID**: Generates new UUID for each request
- **Timestamp**: Set to 1 minute ago for realistic timing

## Data Types

### ChatMessage

```typescript
interface ChatMessage {
  id: string;                    // Unique message identifier
  message: string;               // Message content
  timestamp: string;             // ISO 8601 timestamp
  sender: 'user' | 'ai';         // Message sender
  status: 'sending' | 'sent' | 'failed'; // Message status
}
```

### ChatHistoryResponse

```typescript
interface ChatHistoryResponse {
  messages: ChatMessage[];        // Array of messages
  conversationId: string;         // Unique conversation identifier
}
```

## Error Handling

### HTTP Status Codes

- **200**: Success
- **400**: Bad Request (invalid input)
- **404**: Not Found (endpoint doesn't exist)
- **500**: Internal Server Error (server error)

### Error Response Format

```json
{
  "error": "Error message description"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. In production, you should add rate limiting to prevent abuse.

## CORS

CORS is enabled for all origins in development. In production, configure CORS to only allow your frontend domain.

## Security Considerations

### Input Validation

- Validate message length and content
- Sanitize user input to prevent XSS
- Implement proper error handling

### Production Recommendations

1. **Authentication**: Implement JWT or session-based auth
2. **Rate Limiting**: Add rate limiting per user/IP
3. **Input Validation**: Validate and sanitize all inputs
4. **HTTPS**: Use HTTPS in production
5. **Environment Variables**: Store sensitive data in env vars

## Testing

### Manual Testing

You can test the API endpoints using tools like:

- **cURL**:
  ```bash
  curl -X POST http://localhost:3000/api/chat/send \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello", "conversationId": "test"}'
  ```

- **Postman**: Import the endpoints and test with the provided examples
- **Browser DevTools**: Use the Network tab to inspect requests

### Automated Testing

The API endpoints should be tested with:

- Unit tests for individual functions
- Integration tests for endpoint behavior
- E2E tests for complete workflows

## Future Enhancements

### Planned Features

1. **Real AI Integration**: Connect to actual AI service
2. **Message Persistence**: Store messages in database
3. **User Authentication**: Add user accounts and sessions
4. **Real-time Updates**: Implement WebSocket for live updates
5. **File Upload**: Support for image/document uploads
6. **Message Search**: Search through chat history
7. **Export Functionality**: Export conversations as PDF/JSON

### Performance Improvements

1. **Caching**: Cache frequently accessed data
2. **Pagination**: Implement pagination for large message lists
3. **Compression**: Compress responses for better performance
4. **CDN**: Use CDN for static assets

## Conclusion

The API is designed to be simple, reliable, and extensible. The mock implementation provides a realistic simulation of a production chat API while maintaining simplicity for development and testing. 