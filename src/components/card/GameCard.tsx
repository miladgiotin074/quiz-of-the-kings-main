'use client';

import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Avatar from '../common/Avatar';
import { useDelayedAction } from '@/hooks/useDelayedAction';

interface GameCardProps {
  playerName: string;
  playerAvatar: string;
  category: string;
  categoryEmoji: string;
  score: string;
  isOnline?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  finished?: boolean;
  borderColor?: string;
  status?: 'your_turn' | 'opponent_turn' | 'finished';
  result?: 'win' | 'lose' | 'draw' | 'timeout_win' | 'timeout_lose';
}

export const GameCard: React.FC<GameCardProps> = ({
  playerName,
  playerAvatar,
  category,
  categoryEmoji,
  score,
  isOnline = true,
  onClick,
  className = '',
  disabled = false,
  finished = false,
  borderColor = 'border-blue-500',
  status = 'your_turn',
  result
}) => {
  const executeWithDelay = useDelayedAction(200);

  const handleClick = () => {
    if (onClick && !disabled && !finished) {
      executeWithDelay(onClick);
    }
  };
  const cardClasses = `game-card-3d tap-highlight-transparent ${
    disabled ? 'disabled' : ''
  } ${finished ? 'finished' : ''} ${className}`;

  // Convert score numbers to Persian format
  const formatScoreToPersian = (scoreString: string): string => {
    return scoreString.replace(/\d+/g, (match) => {
      return parseInt(match).toLocaleString('fa-IR');
    });
  };

  const persianScore = formatScoreToPersian(score);

  // Get result emoji and text for finished games
  const getResultDisplay = (result?: 'win' | 'lose' | 'draw' | 'timeout_win' | 'timeout_lose') => {
    if (!result) return null;
    switch (result) {
      case 'win':
        return { emoji: '🏆', text: 'برد' };
      case 'lose':
        return { emoji: '😔', text: 'باخت' };
      case 'draw':
        return { emoji: '🤝', text: 'مساوی' };
      case 'timeout_win':
        return { emoji: '⏰', text: 'برد با وقت' };
      case 'timeout_lose':
        return { emoji: '⏰', text: 'باخت با وقت' };
      default:
        return null;
    }
  };

  const resultDisplay = getResultDisplay(result);

  // Get gradient colors based on borderColor
  const getScoreGradient = (borderColor: string): string => {
    if (borderColor.includes('blue')) {
      return 'from-blue-400 to-blue-700';
    } else if (borderColor.includes('orange')) {
      return 'from-orange-400 to-orange-700';
    } else if (borderColor.includes('slate')) {
      return 'from-slate-400 to-slate-700';
    } else {
      return 'from-blue-400 to-blue-700'; // default
    }
  };

  const getScoreShadow = (borderColor: string): string => {
    if (borderColor.includes('blue')) return '0 8px 16px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)';
    if (borderColor.includes('orange')) return '0 8px 16px rgba(251, 146, 60, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)';
    if (borderColor.includes('slate')) return '0 8px 16px rgba(100, 116, 139, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)';
    return '0 8px 16px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'; // default blue
  };

  const scoreGradient = getScoreGradient(borderColor);
  const scoreShadow = getScoreShadow(borderColor);

  return (
    <div className={cardClasses} onClick={handleClick}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <div className="front">
        <div className="flex items-center">
          <Avatar
            src={playerAvatar}
            alt={playerName}
            size="md"
            borderColor={`${borderColor} border-2`}
            isOnline={isOnline}
          />
          <div className="mr-4 flex-grow">
            <p className="font-bold text-lg text-white mb-2">{playerName}</p>
            <p className="text-xs text-brand-subtext flex items-center">
              {status === 'finished' && resultDisplay ? (
                <>
                  {resultDisplay.emoji} {resultDisplay.text}
                </>
              ) : (
                <>
                  {categoryEmoji} {category}
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span 
             className={`text-white flex items-center font-bold text-lg bg-gradient-to-br ${scoreGradient} px-3 py-1 rounded-full mr-2`}
             style={{ 
               boxShadow: scoreShadow,
               textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
             }}
           >
            {status === 'opponent_turn' ? '⏳' : status === 'finished' ? '🏁' : '⚔️'} {persianScore}
          </span>
          <ChevronLeftIcon className="h-9 w-9 text-brand-accent" />
        </div>
      </div>
      

    </div>
  );
};

export default GameCard;