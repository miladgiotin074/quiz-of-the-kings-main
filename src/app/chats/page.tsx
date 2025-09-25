'use client';

import React, { useCallback } from 'react';
import { Page } from '@/components/layout/Page';
import { Avatar } from '@/components/common/Avatar';
import { useRouter } from 'next/navigation';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ChatData {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function ChatsPage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();

  const handleNavigation = useCallback(
    (path: string) => {
      delayedAction(() => router.push(path));
    },
    [router, delayedAction]
  );

  // Sample chat data
  const chats: ChatData[] = [
    {
      id: 1,
      name: 'سارا محمدی',
      username: 'sara_mohammadi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara&backgroundColor=e91e63&clothesColor=ec4899',
      lastMessage: 'سلام! بازی جدید رو شروع کردی؟',
      timestamp: '۱۰:۳۰',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: 'رضا کریمی',
      username: 'reza_karimi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reza&backgroundColor=9c27b0&clothesColor=a855f7',
      lastMessage: 'عالی بود! نوبت من است؟',
      timestamp: '۹:۴۵',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 3,
      name: 'مریم حسینی',
      username: 'maryam_hosseini',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam&backgroundColor=4caf50&clothesColor=22c55e',
      lastMessage: 'فردا بازی می‌کنیم؟',
      timestamp: 'دیروز',
      unreadCount: 1,
      isOnline: false
    },
    {
      id: 4,
      name: 'احمد رضایی',
      username: 'ahmad_rezaei',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad&backgroundColor=ff9800&clothesColor=f57c00',
      lastMessage: 'تبریک برای برد!',
      timestamp: 'دیروز',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 5,
      name: 'فاطمه نوری',
      username: 'fatemeh_nouri',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatemeh&backgroundColor=2196f3&clothesColor=1976d2',
      lastMessage: 'سوال‌های جدید اضافه شده؟',
      timestamp: '۲ روز پیش',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 6,
      name: 'حسین امینی',
      username: 'hossein_amini',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hossein&backgroundColor=795548&clothesColor=5d4037',
      lastMessage: 'بازی فوق‌العاده بود!',
      timestamp: '۳ روز پیش',
      unreadCount: 0,
      isOnline: true
    }
  ];

  const handleChatClick = useCallback(
    (chatId: number) => {
      console.log(`Opening chat with ID: ${chatId}`);
      handleNavigation('/user-chat');
    },
    [handleNavigation]
  );

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text" dir="rtl">
        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className="flex items-center gap-3 p-4 border-b border-brand-secondary/50 hover:bg-brand-secondary/30 active:bg-brand-secondary/50 transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative">
                <Avatar
                  src={chat.avatar}
                  alt={chat.name}
                  size="md"
                  isOnline={chat.isOnline}
                  borderColor="brand-accent"
                />
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-brand-text truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-brand-subtext flex-shrink-0">
                    {chat.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-brand-subtext truncate">
                    {chat.lastMessage}
                  </p>
                  
                  {chat.unreadCount > 0 && (
                    <div className="bg-brand-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mr-2">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no chats) */}
        {chats.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <ChatBubbleLeftRightIcon className="w-16 h-16 text-brand-subtext/50 mb-4" />
            <h2 className="text-lg font-semibold text-brand-subtext mb-2">
              هنوز چتی ندارید
            </h2>
            <p className="text-sm text-brand-subtext/70 text-center">
              با شروع بازی با دوستان، چت‌های شما اینجا نمایش داده می‌شوند
            </p>
          </div>
        )}
      </div>
    </Page>
  );
}