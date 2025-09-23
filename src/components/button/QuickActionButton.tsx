'use client';

import React from 'react';

interface QuickActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: 'gray' | 'blue' | 'yellow' | 'green' | 'red' | 'purple';
  badge?: number;
  className?: string;
}

export default function QuickActionButton({
  onClick,
  icon,
  label,
  variant = 'gray',
  badge,
  className = ''
}: QuickActionButtonProps) {
  const getVariantClasses = () => {
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
          edge: 'edge-green',
          front: 'front-green'
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
      <div className={`action-button-3d tap-highlight-transparent ${className}`}>
        <span className="shadow"></span>
        <span className={`edge ${variantClasses.edge}`}></span>
        <button
          onClick={onClick}
          className={`front ${variantClasses.front} flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300`}
        >
          <div className="relative">
            {React.cloneElement(icon as React.ReactElement, {
              className: `h-6 w-6 mb-1 ${variant === 'gray' ? 'text-brand-accent' : 'text-white'}`
            })}
            {badge && badge > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                {badge}
              </div>
            )}
          </div>
          <span className="text-white font-semibold text-sm">{label}</span>
        </button>
      </div>


    </>
  );
}