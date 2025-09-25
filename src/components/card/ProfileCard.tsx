'use client';

import React from 'react';
import { ShieldCheckIcon, StarIcon, CircleStackIcon, BoltIcon } from '@heroicons/react/24/solid';
import Avatar from '../common/Avatar';
import { useDelayedAction } from '@/hooks/useDelayedAction';

interface ProfileStats {
  score: number;
  coins: number;
  games: number;
}

interface ProfileCardProps {
  name: string;
  username: string;
  level: number;
  title: string;
  avatarSrc: string;
  stats: ProfileStats;
  isOnline?: boolean;
  onClick?: () => void;
  onEditClick?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  level,
  title,
  avatarSrc,
  stats,
  isOnline = true,
  onClick,
  onEditClick,
  className = ''
}) => {
  const executeWithDelay = useDelayedAction(200);

  const handleClick = () => {
    if (onClick) {
      executeWithDelay(onClick);
    }
  };
  return (
    <div className={`profile-card-3d tap-highlight-transparent ${className}`} onClick={handleClick}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <div className="front">
        <div className="flex items-center mb-4">
          <Avatar
            src={avatarSrc}
            alt={name}
            size="xl"
            borderColor="border-brand-accent border-4"
            isOnline={isOnline}
          />
          <div className="mr-5 flex-grow">
            <h1 className="text-2xl font-bold mb-1 text-white">{name}</h1>
            <p className="text-sm text-brand-subtext mb-1">{username}</p>
            <p className="text-brand-subtext flex items-center text-base">
              <ShieldCheckIcon className="h-5 w-5 ml-2 text-yellow-400" />
              سطح {level.toLocaleString('fa-IR')} - {title}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-gray-600">
          <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-brand-subtext flex items-center justify-center mb-1">
              <StarIcon className="h-4 w-4 ml-1" />
              امتیاز
            </p>
            <p className="text-2xl font-bold text-brand-accent">
              {stats.score.toLocaleString('fa-IR')}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-brand-subtext flex items-center justify-center mb-1">
              <CircleStackIcon className="h-4 w-4 ml-1" />
              سکه
            </p>
            <p className="text-2xl font-bold text-brand-accent">
              {stats.coins.toLocaleString('fa-IR')}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-brand-subtext flex items-center justify-center mb-1">
              <BoltIcon className="h-4 w-4 ml-1" />
              بازی‌ها
            </p>
            <p className="text-2xl font-bold text-brand-accent">
              {stats.games.toLocaleString('fa-IR')}
            </p>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default ProfileCard;