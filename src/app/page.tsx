'use client';

import React, { useState } from 'react';
import { BoltIcon, PlayCircleIcon, ClockIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon, CheckCircleIcon, QuestionMarkCircleIcon} from '@heroicons/react/24/solid';
import { Page } from '@/components/layout/Page';
import ProfileCard from '@/components/card/ProfileCard';
import AwesomeButton from '@/components/button/AwesomeButton';
import QuickActionButton from '@/components/button/QuickActionButton';
import GameSection from '@/components/layout/GameSection';
import GameModeModal from '@/components/common/GameModeModal';
import type { Game } from '@/components/layout/GameSection';

export default function HomePage() {
  const [isGameModeModalOpen, setIsGameModeModalOpen] = useState(false);

  const profileData = {
    name: 'علی احمدی',
    username: 'ali_ahmadi',
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
      borderColor: 'border-blue-500',
      status: 'your_turn'
    },
    {
      id: 2,
      playerName: 'رضا کریمی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player2&backgroundColor=9c27b0&clothesColor=a855f7',
      category: 'سینما',
      categoryEmoji: '🎬',
      score: '6 - 3',
      isOnline: true,
      borderColor: 'border-blue-500',
      status: 'your_turn'
    },
    {
      id: 3,
      playerName: 'مریم حسینی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player3&backgroundColor=4caf50&clothesColor=22c55e',
      category: 'ورزش',
      categoryEmoji: '⚽',
      score: '2 - 1',
      isOnline: false,
      borderColor: 'border-blue-500',
      status: 'your_turn'
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
      borderColor: 'border-orange-500',
      status: 'opponent_turn'
    },
    {
      id: 5,
      playerName: 'فاطمه نوری',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player5&backgroundColor=2196f3&clothesColor=1976d2',
      category: 'علوم',
      categoryEmoji: '🔬',
      score: '1 - 4',
      isOnline: false,
      borderColor: 'border-orange-500',
      status: 'opponent_turn'
    },
    {
      id: 6,
      playerName: 'حسین امینی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player6&backgroundColor=795548&clothesColor=5d4037',
      category: 'جغرافیا',
      categoryEmoji: '🌍',
      score: '7 - 2',
      isOnline: true,
      borderColor: 'border-orange-500',
      status: 'opponent_turn'
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
      borderColor: 'border-slate-500',
      status: 'finished',
      result: 'win'
    },
    {
      id: 8,
      playerName: 'محمد حکیمی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player8&backgroundColor=673ab7&clothesColor=512da8',
      category: 'هنر',
      categoryEmoji: '🎨',
      score: '5 - 5',
      isOnline: true,
      borderColor: 'border-slate-500',
      status: 'finished',
      result: 'draw'
    },
    {
      id: 9,
      playerName: 'لیلا رحیمی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player9&backgroundColor=f44336&clothesColor=d32f2f',
      category: 'موسیقی',
      categoryEmoji: '🎵',
      score: '3 - 9',
      isOnline: false,
      borderColor: 'border-slate-500',
      status: 'finished',
      result: 'lose'
    },
    {
      id: 10,
      playerName: 'احمد کریمی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player10&backgroundColor=4caf50&clothesColor=388e3c',
      category: 'تاریخ',
      categoryEmoji: '🏛️',
      score: '7 - 0',
      isOnline: true,
      borderColor: 'border-slate-500',
      status: 'finished',
      result: 'timeout_win'
    },
    {
      id: 11,
      playerName: 'فاطمه احمدی',
      playerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player11&backgroundColor=ff9800&clothesColor=f57c00',
      category: 'علوم',
      categoryEmoji: '🔬',
      score: '2 - 8',
      isOnline: false,
      borderColor: 'border-slate-500',
      status: 'finished',
      result: 'timeout_lose'
    }
  ];

  const handleStartNewGame = () => {
    console.log('Opening game mode modal...');
    setIsGameModeModalOpen(true);
  };

  const handleCloseGameModeModal = () => {
    setIsGameModeModalOpen(false);
  };

  const handleRandomOpponent = () => {
    console.log('Starting game with random opponent...');
    setIsGameModeModalOpen(false);
    // اینجا می‌توانید منطق شروع بازی با حریف شانسی را اضافه کنید
  };

  const handlePlayWithFriends = () => {
    console.log('Starting game with friends...');
    setIsGameModeModalOpen(false);
    // اینجا می‌توانید منطق شروع بازی با دوستان را اضافه کنید
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

  const handleQuestionFactoryClick = () => {
    console.log('Question Factory clicked');
    // اینجا می‌توانید به صفحه کارخانه سوال هدایت کنید
  };

  const handleUnlimitedGamesClick = () => {
    console.log('Unlimited Games clicked');
    // اینجا می‌توانید به صفحه بازی‌های نامحدود هدایت کنید
  };

  return (
    <Page back={false}>
      <div className="bg-brand-dark text-brand-text min-h-screen font-vazir-matn" dir="rtl">
        <div className="container mx-auto p-4 max-w-md">
          {/* Profile Section */}
          <div className="mb-8">
            <ProfileCard
              name={profileData.name}
              username={profileData.username}
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
            <div className="grid grid-cols-3 gap-3 mb-3">
              <QuickActionButton
                onClick={handleQuestionFactoryClick}
                icon={<QuestionMarkCircleIcon />}
                label="کارخانه سوال"
                variant="green"
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
            />

            <GameSection
              title="بازی‌های تمام شده"
              icon={<CheckCircleIcon />}
              games={finishedGames}
              onGameClick={handleGameClick}
            />
          </main>
        </div>
      </div>
      
      {/* Game Mode Modal */}
      <GameModeModal
        isOpen={isGameModeModalOpen}
        onClose={handleCloseGameModeModal}
        onRandomOpponent={handleRandomOpponent}
        onPlayWithFriends={handlePlayWithFriends}
      />
    </Page>
  );
}