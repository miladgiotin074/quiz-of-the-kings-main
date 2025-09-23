'use client';

import React from 'react';
import { BoltIcon, PlayCircleIcon, ClockIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Page } from '@/components/layout/Page';
import ProfileCard from '@/components/card/ProfileCard';
import AwesomeButton from '@/components/button/AwesomeButton';
import QuickActionButton from '@/components/button/QuickActionButton';
import GameSection from '@/components/layout/GameSection';
import type { Game } from '@/components/layout/GameSection';

export default function HomePage() {
  const profileData = {
    name: 'علی احمدی',
    level: 12,
    title: 'استاد کوئیز',
    avatarSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DefaultUser&backgroundColor=1e293b&clothesColor=3b82f6',
    stats: {
      score: 1250,
      coins: 300,
      games: 42
    },
    isOnline: true
  };

  const yourTurnGames: Game[] = [
    {
      id: 1,
      playerName: 'سارا محمدی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player1&backgroundColor=e91e63&clothesColor=ec4899',
      category: 'اطلاعات عمومی',
      categoryEmoji: '🧠',
      score: '4 - 2',
      isOnline: true,
      borderColor: 'border-pink-500'
    },
    {
      id: 2,
      playerName: 'رضا کریمی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player2&backgroundColor=9c27b0&clothesColor=a855f7',
      category: 'سینما',
      categoryEmoji: '🎬',
      score: '6 - 3',
      isOnline: true,
      borderColor: 'border-purple-500'
    },
    {
      id: 3,
      playerName: 'مریم حسینی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player3&backgroundColor=4caf50&clothesColor=22c55e',
      category: 'ورزش',
      categoryEmoji: '⚽',
      score: '2 - 1',
      isOnline: false,
      borderColor: 'border-green-500'
    }
  ];

  const opponentTurnGames: Game[] = [
    {
      id: 4,
      playerName: 'احمد رضایی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player4&backgroundColor=ff9800&clothesColor=f57c00',
      category: 'تاریخ',
      categoryEmoji: '📚',
      score: '3 - 5',
      isOnline: true,
      borderColor: 'border-orange-500'
    },
    {
      id: 5,
      playerName: 'فاطمه نوری',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player5&backgroundColor=2196f3&clothesColor=1976d2',
      category: 'علوم',
      categoryEmoji: '🔬',
      score: '1 - 4',
      isOnline: false,
      borderColor: 'border-blue-500'
    },
    {
      id: 6,
      playerName: 'حسین امینی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player6&backgroundColor=795548&clothesColor=5d4037',
      category: 'جغرافیا',
      categoryEmoji: '🌍',
      score: '7 - 2',
      isOnline: true,
      borderColor: 'border-yellow-500'
    }
  ];

  const finishedGames: Game[] = [
    {
      id: 7,
      playerName: 'زهرا صادقی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player7&backgroundColor=607d8b&clothesColor=455a64',
      category: 'ادبیات',
      categoryEmoji: '📖',
      score: '8 - 6',
      isOnline: false,
      borderColor: 'border-gray-500',
      finished: true
    },
    {
      id: 8,
      playerName: 'محمد حکیمی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player8&backgroundColor=673ab7&clothesColor=512da8',
      category: 'هنر',
      categoryEmoji: '🎨',
      score: '5 - 5',
      isOnline: true,
      borderColor: 'border-indigo-500',
      finished: true
    },
    {
      id: 9,
      playerName: 'لیلا رحیمی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player9&backgroundColor=f44336&clothesColor=d32f2f',
      category: 'موسیقی',
      categoryEmoji: '🎵',
      score: '3 - 9',
      isOnline: false,
      borderColor: 'border-red-500',
      finished: true
    }
  ];

  const handleStartNewGame = () => {
    console.log('Starting new game...');
  };

  const handleGameClick = (gameId: number) => {
    console.log(`Clicked game with ID: ${gameId}`);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    // اینجا می‌توانید به صفحه تنظیمات هدایت کنید
  };

  const handleChatsClick = () => {
    console.log('Chats clicked');
    // اینجا می‌توانید به صفحه چت‌ها هدایت کنید
  };

  const handleCoinMarketClick = () => {
    console.log('Coin Market clicked');
    // اینجا می‌توانید به صفحه سکه بازار هدایت کنید
  };

  return (
    <Page back={false}>
      <div className="bg-brand-dark text-brand-text min-h-screen font-vazir-matn" dir="rtl">
        <div className="container mx-auto p-4 max-w-md">
          {/* Profile Section */}
          <div className="mb-8">
            <ProfileCard
              name={profileData.name}
              level={profileData.level}
              title={profileData.title}
              avatarSrc={profileData.avatarSrc}
              stats={profileData.stats}
              isOnline={profileData.isOnline}
              onClick={handleProfileClick}
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-3">
              <QuickActionButton
                onClick={handleSettingsClick}
                icon={<Cog6ToothIcon />}
                label="تنظیمات"
                variant="gray"
              />
              <QuickActionButton
                onClick={handleChatsClick}
                icon={<ChatBubbleLeftRightIcon />}
                label="چت‌ها"
                variant="blue"
                badge={3}
              />
              <QuickActionButton
                onClick={handleCoinMarketClick}
                icon={<CurrencyDollarIcon />}
                label="سکه بازار"
                variant="yellow"
              />
            </div>
          </div>



          {/* Start New Game Button */}
          <div className="mb-10">
            <AwesomeButton
              onClick={handleStartNewGame}
              icon={<BoltIcon className="h-7 w-7" />}
            >
              شروع بازی جدید
            </AwesomeButton>
          </div>

          {/* Game Lists */}
          <main>
            <GameSection
              title="نوبت شما"
              icon={<PlayCircleIcon />}
              games={yourTurnGames}
              onGameClick={handleGameClick}
            />

            <GameSection
              title="نوبت حریف"
              icon={<ClockIcon />}
              games={opponentTurnGames}
              onGameClick={handleGameClick}
              disabled={true}
            />

            <GameSection
              title="بازی‌های تمام شده"
              icon={<PlayCircleIcon />}
              games={finishedGames}
              onGameClick={handleGameClick}
            />
          </main>
        </div>
      </div>
    </Page>
  );
}