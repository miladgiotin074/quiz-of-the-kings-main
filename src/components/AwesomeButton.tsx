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
      
      <style jsx>{`
        .btn-awesome {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline-offset: 4px;
          transition: filter 250ms;
          user-select: none;
          width: 100%;
        }
        
        .btn-awesome .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(89, 66, 0, 0.8) 0%,
            rgba(89, 66, 0, 0.9) 50%,
            rgba(89, 66, 0, 1) 100%
          );
          will-change: transform;
          transform: translateY(2px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }
        
        .btn-awesome .edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(
            to left,
            #B8860B 0%,
            #DAA520 8%,
            #DAA520 92%,
            #B8860B 100%
          );
        }
        
        .btn-awesome .front {
          display: flex;
          position: relative;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            #FBBF24 0%,
            #F59E0B 50%,
            #D97706 100%
          );
          will-change: transform;
          transform: translateY(-4px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
          align-items: center;
          justify-content: center;
          padding: 16px 24px;
          font-weight: bold;
          font-size: 18px;
          color: #1F2937;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .btn-awesome:hover {
          filter: brightness(110%);
        }
        
        .btn-awesome:hover .front {
          transform: translateY(-6px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        
        .btn-awesome:active .front {
          transform: translateY(-2px);
          transition: transform 34ms;
        }
        
        .btn-awesome:hover .shadow {
          transform: translateY(4px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        
        .btn-awesome:active .shadow {
          transform: translateY(1px);
          transition: transform 34ms;
        }
        
        .btn-awesome:focus:not(:focus-visible) {
          outline: none;
        }
        
        .btn-awesome .front .icon {
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
        }
        
        .tap-highlight-transparent {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </button>
  );
};

export default AwesomeButton;