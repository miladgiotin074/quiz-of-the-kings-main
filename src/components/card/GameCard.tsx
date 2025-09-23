'use client';

import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Avatar from '../common/Avatar';

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
  borderColor = 'border-pink-500'
}) => {
  const cardClasses = `game-card-3d tap-highlight-transparent ${
    disabled ? 'disabled' : ''
  } ${finished ? 'finished' : ''} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
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
              {categoryEmoji} {category}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-white flex items-center font-bold text-lg bg-gradient-to-br from-blue-400 to-blue-700 px-3 py-1 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 mr-2 score-badge">
            ⚔️ {score}
          </span>
          <ChevronLeftIcon className="h-9 w-9 text-brand-accent" />
        </div>
      </div>
      

    </div>
  );
};

export default GameCard;