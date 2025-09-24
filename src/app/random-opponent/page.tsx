'use client';

import React, { useState, useEffect } from 'react';
import { Page } from '@/components/layout/Page';
import { AwesomeButton } from '@/components/button/AwesomeButton';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function RandomOpponentPage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  const [searchDots, setSearchDots] = useState('');
  const [isSearching, setIsSearching] = useState(true);

  // انیمیشن نقطه‌های جستجو
  useEffect(() => {
    if (!isSearching) return;

    const interval = setInterval(() => {
      setSearchDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isSearching]);

  const handleCancelSearch = useCallback(() => {
    delayedAction(() => {
      setIsSearching(false);
      router.back();
    });
  }, [router, delayedAction]);

  const handleNavigation = useCallback((path: string) => {
    delayedAction(() => router.push(path));
  }, [router, delayedAction]);

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text p-4 font-vazir-matn" dir="rtl">
        
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-2xl font-bold text-brand-text mb-2">
            جستجوی حریف شانسی
          </h1>
          <p className="text-brand-subtext text-sm">
            در حال یافتن حریف مناسب برای شما...
          </p>
        </div>

        {/* Search Animation Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="game-card-3d mb-8">
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front">
              <div className="flex flex-col items-center justify-center p-12">
                
                {/* Animated Search Icon */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-brand-accent/20 flex items-center justify-center animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-brand-accent/40 flex items-center justify-center">
                      <MagnifyingGlassIcon className="w-8 h-8 text-brand-accent animate-bounce" />
                    </div>
                  </div>
                  
                  {/* Rotating Border */}
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-brand-accent animate-spin"></div>
                </div>

                {/* Search Text */}
                <div className="text-center">
                  <h2 className="text-xl font-bold text-brand-text mb-2">
                    در حال جستجو{searchDots}
                  </h2>
                  <p className="text-brand-subtext text-sm">
                    لطفاً صبر کنید تا حریف مناسبی پیدا کنیم
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex space-x-2 space-x-reverse mt-6">
                  <div className="w-3 h-3 rounded-full bg-brand-accent animate-bounce"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-accent animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 rounded-full bg-brand-accent animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>

              </div>
            </div>
          </div>

          {/* Search Stats */}
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-8 space-x-reverse text-sm text-brand-subtext">
              <div className="flex flex-col items-center">
                <span className="text-brand-accent font-bold text-lg">1,247</span>
                <span>بازیکن آنلاین</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-brand-accent font-bold text-lg">~30s</span>
                <span>زمان متوسط جستجو</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="pb-8">
          <AwesomeButton
            onClick={handleCancelSearch}
            icon={<XMarkIcon className="h-6 w-6" />}
          >
            لغو جستجو
          </AwesomeButton>
        </div>

      </div>
    </Page>
  );
}