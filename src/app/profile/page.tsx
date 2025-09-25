'use client';

import React, { useState, useCallback } from 'react';
import { Page } from '@/components/layout/Page';
import { useRouter } from 'next/navigation';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { PencilIcon, CheckIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import AwesomeButton from '@/components/button/AwesomeButton';

export default function ProfilePage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();

  // داده‌های پروفایل اولیه (در حالت واقعی از API دریافت می‌شود)
  const [profileData, setProfileData] = useState({
    name: 'علی احمدی',
    username: 'ali_ahmadi',
    level: 12,
    title: 'استاد کوئیز',
    avatarSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DefaultUser&backgroundColor=1e293b&clothesColor=3b82f6',
    stats: {
      score: 1250,
      coins: 300,
      games: 42
    },
    isOnline: true
  });

  // حالت‌های ویرایش
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempName, setTempName] = useState(profileData.name);
  const [tempUsername, setTempUsername] = useState(profileData.username);
  const [errors, setErrors] = useState({ name: '', username: '' });

  // اعتبارسنجی نام
  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'نام نمی‌تواند خالی باشد';
    }
    if (name.trim().length < 2) {
      return 'نام باید حداقل ۲ کاراکتر باشد';
    }
    if (name.trim().length > 50) {
      return 'نام نمی‌تواند بیش از ۵۰ کاراکتر باشد';
    }
    return '';
  };

  // اعتبارسنجی یوزرنیم
  const validateUsername = (username: string): string => {
    if (!username.trim()) {
      return 'یوزرنیم نمی‌تواند خالی باشد';
    }
    if (username.trim().length < 3) {
      return 'یوزرنیم باید حداقل ۳ کاراکتر باشد';
    }
    if (username.trim().length > 30) {
      return 'یوزرنیم نمی‌تواند بیش از ۳۰ کاراکتر باشد';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
      return 'یوزرنیم فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد';
    }
    return '';
  };

  // شروع ویرایش نام
  const handleStartEditName = useCallback(() => {
    setTempName(profileData.name);
    setIsEditingName(true);
    setErrors(prev => ({ ...prev, name: '' }));
  }, [profileData.name]);

  // شروع ویرایش یوزرنیم
  const handleStartEditUsername = useCallback(() => {
    setTempUsername(profileData.username);
    setIsEditingUsername(true);
    setErrors(prev => ({ ...prev, username: '' }));
  }, [profileData.username]);

  // ذخیره نام
  const handleSaveName = useCallback(() => {
    const error = validateName(tempName);
    if (error) {
      setErrors(prev => ({ ...prev, name: error }));
      return;
    }

    setProfileData(prev => ({ ...prev, name: tempName.trim() }));
    setIsEditingName(false);
    setErrors(prev => ({ ...prev, name: '' }));
  }, [tempName]);

  // ذخیره یوزرنیم
  const handleSaveUsername = useCallback(() => {
    const error = validateUsername(tempUsername);
    if (error) {
      setErrors(prev => ({ ...prev, username: error }));
      return;
    }

    setProfileData(prev => ({ ...prev, username: tempUsername.trim() }));
    setIsEditingUsername(false);
    setErrors(prev => ({ ...prev, username: '' }));
  }, [tempUsername]);

  // لغو ویرایش نام
  const handleCancelEditName = useCallback(() => {
    setTempName(profileData.name);
    setIsEditingName(false);
    setErrors(prev => ({ ...prev, name: '' }));
  }, [profileData.name]);

  // لغو ویرایش یوزرنیم
  const handleCancelEditUsername = useCallback(() => {
    setTempUsername(profileData.username);
    setIsEditingUsername(false);
    setErrors(prev => ({ ...prev, username: '' }));
  }, [profileData.username]);

  // بازگشت به صفحه اصلی
  const handleGoBack = useCallback(() => {
    delayedAction(() => {
      router.push('/');
    });
  }, [router, delayedAction]);

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text font-vazir-matn" dir="rtl">
        <div className="container mx-auto p-4 max-w-md">
          {/* آواتار و اطلاعات اصلی */}
          <div className="bg-brand-secondary rounded-2xl p-6 mb-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={profileData.avatarSrc}
                alt="آواتار"
                className="w-24 h-24 rounded-full border-4 border-brand-accent"
              />
              {profileData.isOnline && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-brand-secondary"></div>
              )}
            </div>

            {/* ویرایش نام */}
            <div className="mb-4">
              {isEditingName ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-dark text-brand-text rounded-lg border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-center"
                    placeholder="نام خود را وارد کنید"
                    autoFocus
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name}</p>
                  )}
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleSaveName}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancelEditName}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <button
                    onClick={handleStartEditName}
                    className="p-1 text-brand-accent hover:text-blue-400 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* ویرایش یوزرنیم */}
            <div className="mb-4">
              {isEditingUsername ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-dark text-brand-text rounded-lg border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-center"
                    placeholder="یوزرنیم خود را وارد کنید"
                    dir="ltr"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm">{errors.username}</p>
                  )}
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleSaveUsername}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancelEditUsername}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <p className="text-brand-subtext" dir="ltr">@{profileData.username}</p>
                  <button
                    onClick={handleStartEditUsername}
                    className="p-1 text-brand-accent hover:text-blue-400 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* سطح و عنوان */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                سطح {profileData.level.toLocaleString('fa-IR')}
              </span>
              <span className="text-brand-subtext">{profileData.title}</span>
            </div>
          </div>

          {/* آمار کاربر */}
          <div className="bg-brand-secondary rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">آمار شما</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-accent">{profileData.stats.score.toLocaleString('fa-IR')}</div>
                <div className="text-brand-subtext text-sm">امتیاز</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{profileData.stats.coins.toLocaleString('fa-IR')}</div>
                <div className="text-brand-subtext text-sm">سکه</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{profileData.stats.games.toLocaleString('fa-IR')}</div>
                <div className="text-brand-subtext text-sm">بازی</div>
              </div>
            </div>
          </div>

          {/* دکمه بازگشت */}
          <div className="mt-8">
            <AwesomeButton
              onClick={handleGoBack}
              icon={<UserIcon className="h-6 w-6" />}
              className="w-full"
            >
              بازگشت به صفحه اصلی
            </AwesomeButton>
          </div>
        </div>
      </div>
    </Page>
  );
}