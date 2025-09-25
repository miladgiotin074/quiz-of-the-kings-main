'use client';

import React from 'react';
import { useDelayedAction } from '@/hooks/useDelayedAction';

interface QuickActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: 'gray' | 'blue' | 'yellow' | 'green' | 'red' | 'purple';
  badge?: number;
  className?: string;
  isQuizPage?: boolean; // پراپ جدید برای تشخیص صفحه quiz-game
  disabled?: boolean; // پراپ disabled اضافه شد
}

export default function QuickActionButton({
  onClick,
  icon,
  label,
  variant = 'gray',
  badge,
  className = '',
  isQuizPage = false,
  disabled = false
}: QuickActionButtonProps) {
  const executeWithDelay = useDelayedAction(200);

  const handleClick = () => {
    if (!disabled) {
      executeWithDelay(onClick);
    }
  };
  const getVariantClasses = () => {
    const suffix = isQuizPage && variant === 'green' ? '-quiz' : '';
    
    switch (variant) {
      case 'blue':
        return {
          edge: 'edge-blue',
          front: 'front-blue'
        };
      case 'yellow':
        return {
          edge: 'edge-yellow',
          front: 'front-yellow'
        };
      case 'green':
        return {
          edge: `edge-green${suffix}`,
          front: `front-green${suffix}`
        };
      case 'red':
        return {
          edge: 'edge-red',
          front: 'front-red'
        };
      case 'purple':
        return {
          edge: 'edge-purple',
          front: 'front-purple'
        };
      default:
        return {
          edge: 'edge-gray',
          front: 'front-gray'
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <>
      <div className={`action-button-3d tap-highlight-transparent ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}>
        <span className="shadow"></span>
        <span className={`edge ${variantClasses.edge}`}></span>
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`front ${variantClasses.front} flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300`}
        >
          <div className="relative">
            {React.cloneElement(icon as React.ReactElement, {
              className: `h-6 w-6 mb-1 ${
                variant === 'green' && isQuizPage ? 'text-brand-accent' : 
                variant === 'gray' ? 'text-brand-accent' : 
                'text-white'
              }`
            })}
            {badge && badge > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                {badge}
              </div>
            )}
          </div>
          <span className="font-semibold text-sm text-white">{label}</span>
        </button>
      </div>


    </>
  );
}