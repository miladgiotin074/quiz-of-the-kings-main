'use client';

import React from 'react';

interface QuestionCardProps {
  isFlipped: boolean;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function QuestionCard({ 
  isFlipped, 
  frontContent, 
  backContent, 
  className = '',
  onClick
}: QuestionCardProps) {
  return (
    <div 
      className={`relative w-full h-40 cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 ease-in-out ${
          isFlipped ? '' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* جلوی کارت */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="game-card-3d w-full h-full">
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front w-full h-full" style={{ padding: 0, display: 'block' }}>
              {frontContent}
            </div>
          </div>
        </div>

        {/* پشت کارت */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="game-card-3d w-full h-full">
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front w-full h-full" style={{ padding: 0, display: 'block' }}>
              {backContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;