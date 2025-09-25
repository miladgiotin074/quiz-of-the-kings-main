'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Page } from '@/components/layout/Page';
import { Avatar } from '@/components/common/Avatar';
import { useRouter } from 'next/navigation';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { 
  PaperAirplaneIcon
} from '@heroicons/react/24/solid';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface UserData {
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
}

export default function UserChatPage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample opponent data - در پروژه واقعی از URL params یا API دریافت می‌شود
  const [opponent] = useState<UserData>({
    name: 'سارا محمدی',
    username: 'sara_mohammadi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent&backgroundColor=e91e63&clothesColor=ec4899',
    isOnline: true
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'سلام! آماده‌ای برای بازی؟',
      isUser: false,
      timestamp: new Date(Date.now() - 300000),
      status: 'read'
    },
    {
      id: 2,
      text: 'سلام! بله، بیا شروع کنیم 🎮',
      isUser: true,
      timestamp: new Date(Date.now() - 240000),
      status: 'read'
    },
    {
      id: 3,
      text: 'عالی! این بار قراره ببینیم کی برنده میشه 😄',
      isUser: false,
      timestamp: new Date(Date.now() - 180000),
      status: 'read'
    },
    {
      id: 4,
      text: 'حتماً من! 😎',
      isUser: true,
      timestamp: new Date(Date.now() - 120000),
      status: 'delivered'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleNavigation = useCallback((path: string) => {
    delayedAction(() => router.push(path));
  }, [router, delayedAction]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage.trim(),
      isUser: true,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // شبیه‌سازی ارسال پیام
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 1000);

    // شبیه‌سازی پاسخ خودکار (اختیاری)
    setTimeout(() => {
      if (Math.random() > 0.7) { // 30% احتمال پاسخ خودکار
        const autoReply: Message = {
          id: messages.length + 2,
          text: 'متوجه شدم! 👍',
          isUser: false,
          timestamp: new Date(),
          status: 'read'
        };
        setMessages(prev => [...prev, autoReply]);
      }
    }, 2000);
  }, [newMessage, messages.length]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sending':
        return '⏳';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  return (
    <Page>
      <div className="flex flex-col h-screen bg-brand-dark text-brand-text font-vazir-matn" dir="rtl">
        {/* Header */}
        <div className="bg-brand-secondary border-b border-brand-accent/20 p-4 flex items-center gap-3">
          <Avatar
            alt={opponent.name}
            src={opponent.avatar}
            size="md"
            isOnline={opponent.isOnline}
            borderColor="brand-accent"
          />
          <div className="flex-1">
            <h2 className="font-bold text-brand-text">{opponent.name}</h2>
            <p className="text-sm text-brand-subtext">
              {opponent.username}
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.isUser
                    ? 'bg-brand-accent text-white rounded-br-md'
                    : 'bg-brand-secondary text-brand-text rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}>
                  <span className="text-xs opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.isUser && (
                    <span className={`text-xs ${
                      message.status === 'read' ? 'text-blue-400' : 'opacity-70'
                    }`}>
                      {getStatusIcon(message.status)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-brand-secondary text-brand-text rounded-2xl rounded-bl-md px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-brand-subtext mr-2">در حال تایپ...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-brand-secondary border-t border-brand-accent/20 p-4">
          <div className="flex items-end gap-3">
            {/* Message Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="پیام خود را بنویسید..."
                className="w-full bg-brand-dark text-brand-text rounded-full px-4 py-3 pr-4 pl-12 border border-brand-accent/20 focus:border-brand-accent focus:outline-none transition-colors"
              />
              
              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                  newMessage.trim()
                    ? 'bg-brand-accent text-white hover:bg-brand-accent/80'
                    : 'bg-brand-secondary text-brand-subtext cursor-not-allowed'
                }`}
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}