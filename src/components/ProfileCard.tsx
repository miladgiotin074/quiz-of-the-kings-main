'use client';

import React from 'react';
import { ShieldCheckIcon, StarIcon, CircleStackIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid';
import Avatar from './Avatar';

interface ProfileStats {
  score: number;
  coins: number;
  games: number;
}

interface ProfileCardProps {
  name: string;
  level: number;
  title: string;
  avatarSrc: string;
  stats: ProfileStats;
  isOnline?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  level,
  title,
  avatarSrc,
  stats,
  isOnline = true,
  onClick,
  className = ''
}) => {
  return (
    <div className={`profile-card-3d tap-highlight-transparent ${className}`} onClick={onClick}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <div className="front">
        <div className="flex items-center mb-4 space-x-reverse">
          <Avatar
            src={avatarSrc}
            alt={name}
            size="xl"
            borderColor="border-brand-accent border-4"
            isOnline={isOnline}
          />
          <div className="mr-5 flex-grow">
            <h1 className="text-2xl font-bold mb-1 text-white">{name}</h1>
            <p className="text-brand-subtext flex items-center text-base space-x-reverse">
              <ShieldCheckIcon className="h-5 w-5 ml-2 text-yellow-400" />
              سطح {level} - {title}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-gray-600">
          <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-brand-subtext flex items-center justify-center mb-1 space-x-reverse">
              <StarIcon className="h-4 w-4 ml-1" />
              امتیاز
            </p>
            <p className="text-2xl font-bold text-brand-accent">
              {stats.score.toLocaleString('fa-IR')}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-brand-subtext flex items-center justify-center mb-1 space-x-reverse">
              <CircleStackIcon className="h-4 w-4 ml-1" />
              سکه
            </p>
            <p className="text-2xl font-bold text-brand-accent">
              {stats.coins.toLocaleString('fa-IR')}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-brand-subtext flex items-center justify-center mb-1 space-x-reverse">
              <PuzzlePieceIcon className="h-4 w-4 ml-1" />
              بازی‌ها
            </p>
            <p className="text-2xl font-bold text-brand-accent">
              {stats.games.toLocaleString('fa-IR')}
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .profile-card-3d {
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
        
        .profile-card-3d .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          will-change: transform;
          transform: translateY(3px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }
        
        .profile-card-3d .edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(
            to left,
            #0F172A 0%,
            #1E293B 8%,
            #1E293B 92%,
            #0F172A 100%
          );
        }
        
        .profile-card-3d .front {
          position: relative;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            #1E1E1E 0%,
            #2A2A2A 50%,
            #1A1A1A 100%
          );
          will-change: transform;
          transform: translateY(-6px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
          padding: 16px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .profile-card-3d:hover {
          filter: brightness(110%);
        }
        
        .profile-card-3d:hover .front {
          transform: translateY(-8px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        
        .profile-card-3d:active .front {
          transform: translateY(-3px);
          transition: transform 34ms;
        }
        
        .profile-card-3d:hover .shadow {
          transform: translateY(5px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        
        .profile-card-3d:active .shadow {
          transform: translateY(2px);
          transition: transform 34ms;
        }
        
        .profile-card-3d:focus:not(:focus-visible) {
          outline: none;
        }
        
        .tap-highlight-transparent {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;