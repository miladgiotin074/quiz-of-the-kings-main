'use client';

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  borderColor?: string;
  isOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { width: 48, height: 48 },
  md: { width: 64, height: 64 },
  lg: { width: 80, height: 80 },
  xl: { width: 96, height: 96 }
};

const sizeClassNames = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24'
};

const statusSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6'
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  borderColor = 'border-brand-accent',
  isOnline,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        className={`${sizeClassNames[size]} rounded-full border-2 ${borderColor} shadow-lg object-cover`}
        src={src}
        alt={alt}
        width={sizeClasses[size].width}
        height={sizeClasses[size].height}
        priority={false}
      />
      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${
            statusSizeClasses[size]
          } ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          } border-2 border-white rounded-full`}
        ></span>
      )}
    </div>
  );
};

export default Avatar;