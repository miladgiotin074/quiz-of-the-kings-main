'use client';

import React from 'react';
import { BoltIcon } from '@heroicons/react/24/solid';

interface AwesomeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const AwesomeButton: React.FC<AwesomeButtonProps> = ({
  children,
  onClick,
  className = '',
  icon,
  disabled = false
}) => {
  return (
    <button
      className={`btn-awesome tap-highlight-transparent ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">
        <div className="flex items-center justify-center">
          {icon && (
            <span className="icon ml-3 animate-pulse">
              {icon}
            </span>
          )}
          <span className="text-xl font-bold">{children}</span>
        </div>
      </span>
      

    </button>
  );
};

export default AwesomeButton;