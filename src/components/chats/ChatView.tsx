
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatMessage, ChatLog } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface ChatViewProps {
  chatLog: ChatLog | null;
  candidatePhone?: string;
}

export function ChatView({ chatLog, candidatePhone }: ChatViewProps) {
  if (!chatLog || chatLog.messages.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8 text-muted-foreground">
            {candidatePhone ? 'No chat messages found' : 'Select a candidate to view chat'}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-medium">
          Chat with {candidatePhone ? `+${candidatePhone}` : 'Candidate'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {chatLog.messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={cn(
      "flex",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "rounded-lg px-4 py-2 max-w-[80%]",
        isBot ? "bg-muted text-foreground rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"
      )}>
        <div className="text-sm">{message.message}</div>
        <div className="text-xs mt-1 opacity-70">
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          {message.step && isBot && (
            <span className="ml-2 text-xs opacity-50">[{message.step}]</span>
          )}
        </div>
      </div>
    </div>
  );
}
