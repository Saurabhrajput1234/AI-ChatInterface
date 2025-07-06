import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const aiResponses = [
      "That's an interesting question! Let me think about it...",
      "I understand what you're asking. Here's my perspective:",
      "Based on what you've shared, I would suggest:",
      "That's a great point! Here are some thoughts:"
    ];
    
    const selectedResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    const truncatedMessage = message.length > 50 ? message.slice(0, 50) + "..." : message;
    
    const aiResponse = {
      id: randomUUID(),
      message: `${selectedResponse} (Replying to: "${truncatedMessage}")`,
      timestamp: new Date().toISOString(),
      sender: 'ai' as const,
      status: 'sent' as const
    };
    
    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 