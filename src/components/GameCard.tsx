'use client';

import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Avatar from './Avatar';

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
      
      <style jsx>{`
        .game-card-3d {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline-offset: 4px;
          transition: filter 250ms;
          user-select: none;
          width: 100%;
          display: block;
        }
        
        .game-card-3d .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.5) 100%
          );
          will-change: transform;
          transform: translateY(2px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }
        
        .game-card-3d .edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          background: linear-gradient(
            to left,
            #0F172A 0%,
            #1E293B 8%,
            #1E293B 92%,
            #0F172A 100%
          );
        }
        
        .game-card-3d .front {
          position: relative;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #1E1E1E 0%,
            #2A2A2A 50%,
            #1A1A1A 100%
          );
          will-change: transform;
          transform: translateY(-4px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
          padding: 16px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .game-card-3d:hover {
          filter: brightness(110%);
        }
        
        .game-card-3d:hover .front {
          transform: translateY(-6px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        
        .game-card-3d:active .front {
          transform: translateY(-2px);
          transition: transform 34ms;
        }
        
        .game-card-3d:hover .shadow {
          transform: translateY(4px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        
        .game-card-3d:active .shadow {
          transform: translateY(1px);
          transition: transform 34ms;
        }
        
        .game-card-3d:focus:not(:focus-visible) {
          outline: none;
        }
        
        .game-card-3d.disabled {
          pointer-events: none;
          filter: brightness(70%) opacity(60%);
        }
        
        .game-card-3d.finished {
          pointer-events: none;
          filter: brightness(60%) opacity(50%);
        }
        
        .score-badge {
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .tap-highlight-transparent {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default GameCard;