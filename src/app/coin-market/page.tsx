'use client';

import React, { useState, useCallback } from 'react';
import { Page } from '@/components/layout/Page';
import { useRouter } from 'next/navigation';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import AwesomeButton from '@/components/button/AwesomeButton';
import QuickActionButton from '@/components/button/QuickActionButton';
import {
  CurrencyDollarIcon,
  UserPlusIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  TvIcon,
  ShareIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

interface SponsorChannel {
  id: number;
  name: string;
  description: string;
  reward: number;
  isJoined: boolean;
  channelUrl: string;
  icon: string;
}

export default function CoinMarketPage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  const [activeTab, setActiveTab] = useState<'referral' | 'sponsors'>('sponsors');
  const [referralLink] = useState('https://t.me/QuizOfTheKingsBot?start=ref_ali_ahmadi');
  const [copiedLink, setCopiedLink] = useState(false);
  const [totalReferrals] = useState(12);
  const [totalEarned] = useState(600);

  const [sponsorChannels, setSponsorChannels] = useState<SponsorChannel[]>([
    {
      id: 1,
      name: 'کانال تکنولوژی',
      description: 'آخرین اخبار دنیای تکنولوژی',
      reward: 50,
      isJoined: false,
      channelUrl: 'https://t.me/tech_channel',
      icon: 'https://api.dicebear.com/7.x/initials/svg?seed=Tech&backgroundColor=3b82f6&textColor=ffffff'
    },
    {
      id: 2,
      name: 'کانال ورزشی',
      description: 'اخبار و نتایج ورزشی',
      reward: 30,
      isJoined: false,
      channelUrl: 'https://t.me/sport_channel',
      icon: 'https://api.dicebear.com/7.x/initials/svg?seed=Sport&backgroundColor=10b981&textColor=ffffff'
    },
    {
      id: 3,
      name: 'کانال آموزشی',
      description: 'آموزش‌های رایگان و مفید',
      reward: 40,
      isJoined: true,
      channelUrl: 'https://t.me/education_channel',
      icon: 'https://api.dicebear.com/7.x/initials/svg?seed=Edu&backgroundColor=f59e0b&textColor=ffffff'
    },
    {
      id: 4,
      name: 'کانال سرگرمی',
      description: 'محتوای سرگرم‌کننده و جالب',
      reward: 25,
      isJoined: false,
      channelUrl: 'https://t.me/entertainment_channel',
      icon: 'https://api.dicebear.com/7.x/initials/svg?seed=Fun&backgroundColor=ec4899&textColor=ffffff'
    }
  ]);

  const handleCopyReferralLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error('خطا در کپی کردن لینک:', error);
    }
  }, [referralLink]);

  const handleShareReferralLink = useCallback(() => {
    delayedAction(() => {
      if (navigator.share) {
        navigator.share({
          title: 'بازی Quiz of the Kings',
          text: 'به بازی Quiz of the Kings بپیوند و سکه رایگان دریافت کن!',
          url: referralLink
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        handleCopyReferralLink();
      }
    });
  }, [referralLink, handleCopyReferralLink, delayedAction]);

  const handleJoinChannel = useCallback((channelUrl: string) => {
    // باز کردن کانال در تلگرام
    window.open(channelUrl, '_blank');
  }, []);

  const handleCheckMembership = useCallback((channelId: number) => {
    // شبیه‌سازی چک کردن عضویت
    setSponsorChannels(prev => 
      prev.map(channel => 
        channel.id === channelId 
          ? { ...channel, isJoined: true }
          : channel
      )
    );
    
    // نمایش پیام موفقیت
    const channel = sponsorChannels.find(c => c.id === channelId);
    if (channel) {
      alert(`عضویت شما در کانال "${channel.name}" تأیید شد! ${channel.reward.toLocaleString('fa-IR')} سکه دریافت کردید.`);
    }
  }, [sponsorChannels]);

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text font-vazir-matn" dir="rtl">
        <div className="container mx-auto p-4 max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="w-12 h-12 text-yellow-500 ml-3" />
              <h1 className="text-3xl font-bold text-brand-text">سکه بازار</h1>
            </div>
            <p className="text-brand-subtext text-lg">
              سکه رایگان کسب کنید و از امکانات ویژه استفاده کنید
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex gap-2 bg-brand-secondary rounded-lg p-1">
              <QuickActionButton
                variant={activeTab === 'referral' ? 'blue' : 'gray'}
                onClick={() => setActiveTab('referral')}
                className="flex-1"
                icon={<UserPlusIcon className="w-5 h-5" />}
                label="دعوت دوستان"
              />
              
              <QuickActionButton
                variant={activeTab === 'sponsors' ? 'blue' : 'gray'}
                onClick={() => setActiveTab('sponsors')}
                className="flex-1"
                icon={<TvIcon className="w-5 h-5" />}
                label="کانال‌های اسپانسر"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'referral' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-secondary rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {totalReferrals.toLocaleString('fa-IR')}
                    </div>
                    <div className="text-brand-subtext text-sm">
                      دوست دعوت شده
                    </div>
                  </div>
                  
                  <div className="bg-brand-secondary rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                      {totalEarned.toLocaleString('fa-IR')}
                    </div>
                    <div className="text-brand-subtext text-sm">
                      سکه کسب شده
                    </div>
                  </div>
                </div>

                {/* Referral Info */}
                <div className="bg-brand-secondary rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <GiftIcon className="w-6 h-6 text-green-400 ml-2" />
                    <h3 className="text-lg font-semibold">دعوت از دوستان</h3>
                  </div>
                  
                  <p className="text-brand-subtext mb-4 leading-relaxed">
                    برای هر دوستی که با لینک شما به بازی بپیوندد، شما و دوستتان هر کدام 
                    <span className="text-yellow-400 font-semibold mx-1">{(50).toLocaleString('fa-IR')} سکه</span>
                    دریافت خواهید کرد!
                  </p>

                  {/* Referral Link */}
                  <div className="bg-brand-dark rounded-lg p-4 mb-4">
                    <div className="text-brand-subtext text-sm mb-2">لینک دعوت شما:</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-brand-secondary rounded px-3 py-2 text-sm font-mono text-blue-400 overflow-hidden">
                        {referralLink}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <QuickActionButton
                      variant={copiedLink ? "green" : "blue"}
                      onClick={handleCopyReferralLink}
                      className="text-sm py-3"
                      icon={copiedLink ? 
                        <CheckCircleIcon className="w-5 h-5" /> : 
                        <ClipboardDocumentIcon className="w-5 h-5" />
                      }
                      label={copiedLink ? 'کپی شد!' : 'کپی لینک'}
                    />

                    <QuickActionButton
                      variant="yellow"
                      onClick={handleShareReferralLink}
                      className="text-sm py-3"
                      icon={<ShareIcon className="w-5 h-5" />}
                      label="اشتراک‌گذاری"
                    />
                  </div>
                </div>

                {/* How it works */}
                <div className="bg-brand-secondary rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <LinkIcon className="w-6 h-6 text-blue-400 ml-2" />
                    چگونه کار می‌کند؟
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold ml-3 mt-0.5">
                        {(1).toLocaleString('fa-IR')}
                      </div>
                      <div className="text-brand-subtext">
                        لینک دعوت خود را کپی کنید
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold ml-3 mt-0.5">
                        {(2).toLocaleString('fa-IR')}
                      </div>
                      <div className="text-brand-subtext">
                        آن را با دوستان خود در تلگرام به اشتراک بگذارید
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold ml-3 mt-0.5">
                        {(3).toLocaleString('fa-IR')}
                      </div>
                      <div className="text-brand-subtext">
                        وقتی دوستان شما عضو شوند، هر دو نفر سکه دریافت می‌کنید
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sponsors' && (
              <div className="space-y-6">
                {/* Info Card */}
                <div className="bg-brand-secondary rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <TvIcon className="w-6 h-6 text-purple-400 ml-2" />
                    <h3 className="text-lg font-semibold">کانال‌های اسپانسر</h3>
                  </div>
                  
                  <p className="text-brand-subtext leading-relaxed">
                    با عضویت در کانال‌های اسپانسر ما، سکه رایگان دریافت کنید و از محتوای باکیفیت آن‌ها لذت ببرید.
                  </p>
                </div>

                {/* Sponsor Channels List */}
                <div className="space-y-4">
                  {sponsorChannels.map((channel) => (
                    <div key={channel.id} className="bg-brand-secondary rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-xl overflow-hidden ml-3">
                            <img 
                              src={channel.icon} 
                              alt={channel.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // در صورت خطا در بارگذاری تصویر، نمایش حرف اول نام کانال
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = channel.name.charAt(0);
                                  parent.className = "w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-xl text-white font-bold";
                                }
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-text">{channel.name}</h4>
                            <p className="text-brand-subtext text-sm">{channel.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-yellow-400">
                          <CurrencyDollarIcon className="w-4 h-4 ml-1" />
                          <span className="font-semibold">{channel.reward.toLocaleString('fa-IR')}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        {!channel.isJoined ? (
                          <>
                              <QuickActionButton
                                variant="blue"
                                onClick={() => handleJoinChannel(channel.channelUrl)}
                                className="flex-1"
                                icon={<LinkIcon className="w-4 h-4" />}
                                label="عضویت در کانال"
                              />
                              <QuickActionButton
                                variant="green"
                                onClick={() => handleCheckMembership(channel.id)}
                                className="flex-1"
                                icon={<UserPlusIcon className="w-4 h-4" />}
                                label="عضو شدم"
                              />
                            </>
                        ) : (
                          <div className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-center">
                            <span className="text-sm">✅ عضو شده‌اید</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}