'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import AwesomeButton from '@/components/button/AwesomeButton';
import QuickActionButton from '@/components/button/QuickActionButton';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { 
  SparklesIcon, 
  TrophyIcon, 
  UserGroupIcon,
  PlayIcon,
  ArrowRightIcon,
  CheckIcon,
  ChatBubbleBottomCenterIcon
} from '@heroicons/react/24/solid';

export default function WelcomePage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  const [currentStep, setCurrentStep] = useState(0);

  const handleGetStarted = useCallback(() => {
    delayedAction(() => router.push('/'));
  }, [router, delayedAction]);

  const handleNext = useCallback(() => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGetStarted();
    }
  }, [currentStep, handleGetStarted]);

  const handleSkip = useCallback(() => {
    handleGetStarted();
  }, [handleGetStarted]);

  const onboardingSteps = [
    {
      icon: <TrophyIcon className="w-16 h-16 text-white" />,
      title: "Quiz Of The Kings",
      subtitle: "به دنیای هیجان‌انگیز دانش و رقابت خوش آمدید!",
      description: "با هزاران سوال جذاب و چالش‌برانگیز، دانش خود را به آزمایش بگذارید",
      gradient: "from-brand-accent to-purple-600"
    },
    {
      icon: <UserGroupIcon className="w-16 h-16 text-white" />,
      title: "رقابت با دوستان",
      subtitle: "با دوستان خود به رقابت بپردازید",
      description: "دوستان خود را دعوت کنید و مسابقه دهید. ببینید چه کسی پادشاه واقعی کوئیز است!",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: <ChatBubbleBottomCenterIcon className="w-16 h-16 text-white" />,
      title: "چت و دوستیابی",
      subtitle: "چت هم میتونی بکنی",
      description: "در حین رقابت با حریف میتونی چت هم بکنی و کلی دوست پیدا کنی!",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  const currentStepData = onboardingSteps[currentStep];

  return (
    <Page back={false}>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text font-vazir-matn" dir="rtl">
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-md mx-auto text-center">
            {/* Logo */}
            <div className="mb-8 relative">
              <div className={`w-32 h-32 bg-gradient-to-br ${currentStepData.gradient} rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 mx-auto`}>
                {currentStepData.icon}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-brand-accent to-purple-400 bg-clip-text text-transparent transition-all duration-500">
              {currentStepData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-brand-text text-center mb-4 leading-relaxed font-medium transition-all duration-500">
              {currentStepData.subtitle}
            </p>

            {/* Description */}
            <p className="text-base text-brand-subtext text-center mb-10 leading-relaxed transition-all duration-500">
              {currentStepData.description}
            </p>
          </div>
        </div>
        
        {/* Bottom section with indicators and button */}
        <div className="w-full max-w-md mx-auto px-6 pb-8 space-y-6">
          {/* Step indicators */}
          <div className="flex justify-center space-x-2 space-x-reverse">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-brand-accent scale-125'
                    : index < currentStep
                    ? 'bg-brand-secondary'
                    : 'bg-brand-secondary'
                }`}
              />
            ))}
          </div>
          
          {/* Action Button */}
          <AwesomeButton
            onClick={handleNext}
            className="w-full"
            icon={
              currentStep === 2 ? 
                <CheckIcon className="h-6 w-6" /> : 
                <ArrowRightIcon className="h-6 w-6" />
            }
          >
            {currentStep === 2 ? 'شروع کنید' : 'ادامه'}
          </AwesomeButton>
        </div>
      </div>
    </Page>
  );
}