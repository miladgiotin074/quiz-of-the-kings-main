'use client';

import React, { useEffect } from 'react';
import { XMarkIcon, UserIcon, UsersIcon, BoltIcon } from '@heroicons/react/24/solid';
import { backButton } from '@telegram-apps/sdk-react';
import AwesomeButton from '@/components/button/AwesomeButton';

interface GameModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRandomOpponent: () => void;
  onPlayWithFriends: () => void;
}

export const GameModeModal: React.FC<GameModeModalProps> = ({
  isOpen,
  onClose,
  onRandomOpponent,
  onPlayWithFriends
}) => {
  useEffect(() => {
    if (isOpen) {
      backButton.show();
      const unsubscribe = backButton.onClick(() => {
        onClose();
      });
      return () => {
        backButton.hide();
        unsubscribe();
      };
    } else {
      backButton.hide();
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          backdropFilter: 'blur(4px)',
          background: 'linear-gradient(135deg, rgba(89, 66, 0, 0.3) 0%, rgba(89, 66, 0, 0.4) 50%, rgba(89, 66, 0, 0.5) 100%)'
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl transform transition-transform duration-300 ease-out bg-brand-dark ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.3)'
        }}
        dir="rtl"
      >
        <div className="p-6 font-vazir-matn">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <BoltIcon className="h-6 w-6 text-brand-text" />
              <h2 className="text-xl font-bold text-brand-text font-vazir-matn">انتخاب حالت بازی</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-brand-text" />
            </button>
          </div>

          {/* Game Mode Options */}
          <div className="space-y-4">
            {/* Random Opponent */}
            <div className="w-full">
              <AwesomeButton
                onClick={onRandomOpponent}
              >
                حریف شانسی
              </AwesomeButton>
            </div>

            {/* Play with Friends */}
            <div className="w-full">
              <AwesomeButton
                onClick={onPlayWithFriends}
              >
                بازی با دوستان
              </AwesomeButton>
            </div>
          </div>
        </div>

        {/* Bottom spacing for safe area */}
        <div className="h-4" />
      </div>
    </>
  );
};

export default GameModeModal;