'use client';

import React, { useState } from 'react';
import { Page } from '@/components/layout/Page';
import { AwesomeButton } from '@/components/button/AwesomeButton';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { UserPlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function PlayWithFriendsPage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = useCallback((path: string) => {
    delayedAction(() => router.push(path));
  }, [router, delayedAction]);

  const handleSendGameRequest = useCallback(async () => {
    if (!username.trim()) {
      alert('لطفاً یوزرنیم را وارد کنید');
      return;
    }

    setIsLoading(true);
    
    try {
      // شبیه‌سازی ارسال درخواست بازی
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // نمایش پیام موفقیت
      alert(`درخواست بازی به ${username} ارسال شد!`);
      
      // پاک کردن فیلد
      setUsername('');
      
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      alert('خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text p-4 font-vazir-matn" dir="rtl">
        
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-accent/20 flex items-center justify-center">
            <UserPlusIcon className="w-10 h-10 text-brand-accent" />
          </div>
          <h1 className="text-2xl font-bold text-brand-text mb-2">
            بازی با دوستان
          </h1>
          <p className="text-brand-subtext text-sm">
            یوزرنیم دوست خود را وارد کنید و درخواست بازی ارسال کنید
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="game-card-3d mb-8">
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front">
              <div className="px-8">
                
                {/* Username Input Section */}
                <div className="mb-8">
                  <label className="block text-brand-text text-lg font-semibold mb-4 text-center">
                    یوزرنیم دوست
                  </label>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="مثال: ali_ahmadi"
                      className="w-full px-4 py-4 bg-brand-secondary border-2 border-brand-accent/30 rounded-lg text-brand-text placeholder-brand-subtext focus:border-brand-accent focus:outline-none transition-colors text-center text-lg font-medium"
                      disabled={isLoading}
                    />
                    
                    {/* Input Icon */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <UserPlusIcon className="w-6 h-6 text-brand-accent/60" />
                    </div>
                  </div>
                  
                  {/* Input Helper Text */}
                  <p className="text-brand-subtext text-sm mt-2 text-center">
                    یوزرنیم باید بدون @ وارد شود
                  </p>
                </div>

                          {/* Quick Tips */}
          <div className="bg-brand-secondary/30 rounded-lg p-4">
            <h3 className="text-brand-text font-semibold mb-3 text-center">
              💡 نکات مفید
            </h3>
            <ul className="text-brand-subtext text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-brand-accent ml-2">•</span>
                درخواست بازی برای کاربر ارسال میشود و در صورت تایید کاربر بازی استارت میشود.
              </li>
            </ul>
          </div>

              </div>
            </div>
          </div>

          {/* Send Request Button */}
          <div className="mb-8">
            <AwesomeButton
              onClick={handleSendGameRequest}
              disabled={isLoading || !username.trim()}
              icon={<PaperAirplaneIcon className="h-6 w-6" />}
              className={`transition-all duration-300 ${
                !username.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'در حال ارسال...' : 'ارسال درخواست بازی'}
            </AwesomeButton>
          </div>
        </div>

      </div>
    </Page>
  );
}