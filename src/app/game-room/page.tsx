'use client';

import React, { useState } from 'react';
import { Page } from '@/components/layout/Page';
import { AwesomeButton } from '@/components/button/AwesomeButton';
import { Avatar } from '@/components/common/Avatar';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { PlayIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface PlayerData {
  name: string;
  avatar: string;
  score: number;
  isOnline: boolean;
}

interface RoundResult {
  userAnswers: (boolean | null)[]; // true = correct, false = wrong, null = not answered
  opponentAnswers: (boolean | null)[];
  category: string;
  categoryEmoji: string;
}

export default function GameRoomPage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();

  // Sample data - در پروژه واقعی از API دریافت می‌شود
  const [user] = useState<PlayerData>({
    name: 'علی احمدی',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=1e293b&clothesColor=3b82f6',
    score: 5,
    isOnline: true
  });

  const [opponent] = useState<PlayerData>({
    name: 'سارا محمدی',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent&backgroundColor=e91e63&clothesColor=ec4899',
    score: 4,
    isOnline: true
  });

  // نتایج 6 راند - هر راند 3 سوال برای هر بازیکن
  const [roundResults] = useState<RoundResult[]>([
    {
      userAnswers: [true, true, false],
      opponentAnswers: [true, false, true],
      category: 'اطلاعات عمومی',
      categoryEmoji: '🧠'
    },
    {
      userAnswers: [false, true, true],
      opponentAnswers: [true, true, false],
      category: 'سینما',
      categoryEmoji: '🎬'
    },
    {
      userAnswers: [true, false, true],
      opponentAnswers: [false, false, true],
      category: 'ورزش',
      categoryEmoji: '⚽'
    },
    {
      userAnswers: [true, true, true],
      opponentAnswers: [true, true, true],
      category: 'تاریخ',
      categoryEmoji: '📚'
    },
    {
      userAnswers: [false, true, false],
      opponentAnswers: [true, false, true],
      category: 'علوم',
      categoryEmoji: '🔬'
    },
    {
      userAnswers: [null, null, null], // راند جاری - هنوز بازی نشده
      opponentAnswers: [null, null, null],
      category: 'بازی نشده',
      categoryEmoji: '⏳'
    }
  ]);

  const handlePlayGame = useCallback(() => {
    delayedAction(() => {
      // اینجا منطق شروع بازی قرار می‌گیرد
      console.log('Starting game...');
    });
  }, [delayedAction]);

  const handleNavigation = useCallback((path: string) => {
    delayedAction(() => router.push(path));
  }, [router, delayedAction]);

  const renderAnswerIndicator = (answer: boolean | null) => {
    if (answer === null) {
      return (
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-gray-600 border border-gray-500 shadow-lg" />
          <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-inner" />
        </div>
      );
    }
    return answer ? (
      <div className="relative">
        <div className="w-6 h-6 rounded-full bg-green-500 shadow-lg transform hover:scale-110 transition-transform" />
        <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-inner" />
        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-green-300 opacity-60" />
      </div>
    ) : (
      <div className="relative">
        <div className="w-6 h-6 rounded-full bg-red-500 shadow-lg transform hover:scale-110 transition-transform" />
        <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-inner" />
        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-300 opacity-60" />
      </div>
    );
  };

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text p-4 font-vazir-matn" dir="rtl">
        {/* Player vs Opponent Card */}
        <div className="game-card-3d mb-6">
          <span className="shadow"></span>
          <span className="edge"></span>
          <div className="front">
            <div className="flex items-center justify-between w-full">
              {/* User Profile */}
              <div className="flex flex-col items-center">
                <Avatar
                  alt={user.name}
                  src={user.avatar}
                  size="lg"
                  isOnline={user.isOnline}
                  borderColor="brand-accent"
                />
                <div className="text-center mt-2">
                  <h3 className="font-bold text-brand-text text-sm">{user.name}</h3>
                </div>
              </div>

              {/* Score */}
              <div className="flex items-center">
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <span className='text-base text-brand-text'>شما</span>
                    <span className="text-2xl font-bold text-brand-base">{user.score}</span>  
                  </div>
                </div>
                <div className="text-brand-accent text-xl font-bold mx-2">-</div>
                <div className="text-center">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-brand-base">{opponent.score}</span> 
                    <span className='text-base text-brand-text'>حریف</span>   
                  </div>

                </div>
              </div>

              {/* Opponent Profile */}
              <div className="flex flex-col items-center">
                <Avatar
                  alt={opponent.name}
                  src={opponent.avatar}
                  size="lg"
                  isOnline={opponent.isOnline}
                  borderColor="red-400"
                />
                <div className="text-center mt-2">
                  <h3 className="font-bold text-brand-text text-sm">{opponent.name}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Play Game Button */}
        <div className="mb-8">
          <AwesomeButton
            onClick={handlePlayGame}
            icon={<PlayIcon className="h-7 w-7" />}
          >
            بازی کن
          </AwesomeButton>
        </div>

        {/* Rounds Results */}
        <div className="game-card-3d">
          <span className="shadow"></span>
          <span className="edge"></span>
          <div className="front">
            <div className="w-full">
              <h3 className="text-xl font-bold text-brand-text mb-6 text-center">
                نتایج راندها
              </h3>
              
              <div className="space-y-5">
                {roundResults.map((round, roundIndex) => {
                  const isCurrentRound = round.userAnswers.every(answer => answer === null);
                  
                  return (
                    <div 
                      key={roundIndex} 
                      className={`p-2 rounded-lg border ${
                        isCurrentRound 
                          ? 'border-brand-accent bg-brand-accent/10' 
                          : 'border-brand-secondary bg-brand-secondary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {/* User Answers */}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {round.userAnswers.map((answer, answerIndex) => (
                            <div key={`user-${answerIndex}`}>
                              {renderAnswerIndicator(answer)}
                            </div>
                          ))}
                        </div>
                        
                        {/* Category */}
                        <div className="text-sm text-brand-text font-bold flex items-center">
                          <span className="ml-1 text-sm">{round.categoryEmoji}</span>
                          <span>{round.category}</span>
                        </div>
                        
                        {/* Opponent Answers */}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {round.opponentAnswers.map((answer, answerIndex) => (
                            <div key={`opponent-${answerIndex}`}>
                              {renderAnswerIndicator(answer)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}