'use client';

import React from 'react';
import { useDelayedAction } from '@/hooks/useDelayedAction';

interface AnswerCardProps {
  onClick: () => void;
  text: string;
  variant?: 'gray' | 'blue' | 'yellow' | 'green' | 'red' | 'purple';
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AnswerCard({
  onClick,
  text,
  variant = 'gray',
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  disabled = false,
  className = ''
}: AnswerCardProps) {
  const executeWithDelay = useDelayedAction(200);

  const handleClick = () => {
    if (!disabled) {
      executeWithDelay(onClick);
    }
  };

  return (
    <div className={`profile-card-3d tap-highlight-transparent ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`} onClick={handleClick}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <div className="front" style={{
        background: isCorrect ? 'rgba(34, 197, 94, 0.3)' :
                   isWrong ? 'rgba(220, 38, 38, 0.3)' :
                   isSelected ? 'rgba(37, 99, 235, 0.3)' :
                   undefined,
        border: isCorrect ? '2px solid rgb(74, 222, 128)' :
               isWrong ? '2px solid rgb(248, 113, 113)' :
               isSelected ? '2px solid rgb(96, 165, 250)' :
               undefined
      }}>
        <div className="flex items-center justify-center p-4 rounded-xl transition-all duration-300 min-h-[60px] relative overflow-hidden">
          <span className="text-lg font-medium text-center leading-relaxed text-white">
            {text}
          </span>
          
          {/* آیکون وضعیت */}
          {isCorrect && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
          )}
          {isWrong && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✗</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;