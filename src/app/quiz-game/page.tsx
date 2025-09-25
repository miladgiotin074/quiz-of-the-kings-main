'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Page } from '@/components/layout/Page';
import AwesomeButton from '@/components/button/AwesomeButton';
import QuestionCard from '@/components/card/QuestionCard';
import AnswerCard from '@/components/card/AnswerCard';
import { useRouter } from 'next/navigation';
import { useDelayedAction } from '@/hooks/useDelayedAction';
import { EyeIcon, SparklesIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon, XMarkIcon, ArrowPathIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import QuickActionButton from '@/components/button/QuickActionButton';

interface QuestionData {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export default function QuizGamePage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [playerScore, setPlayerScore] = useState(4);
  const [opponentScore, setOpponentScore] = useState(3);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stepResults, setStepResults] = useState<boolean[]>([]);
  const [canStopTimer, setCanStopTimer] = useState(true);
  const [timerStopped, setTimerStopped] = useState(false);
  const [helpButtonsUsed, setHelpButtonsUsed] = useState({
    peopleAnswers: false,
    removeOptions: false,
    secondChance: false
  });

  const questions: QuestionData[] = [
    {
      id: 1,
      text: 'کدام یک از این شهرها پایتخت فرانسه است؟',
      options: ['لندن', 'پاریس', 'رم', 'برلین'],
      correctAnswer: 1,
      category: 'جغرافیا'
    },
    {
      id: 2,
      text: 'بزرگترین سیاره منظومه شمسی کدام است؟',
      options: ['زمین', 'مشتری', 'زحل', 'مریخ'],
      correctAnswer: 1,
      category: 'نجوم'
    },
    {
      id: 3,
      text: 'کدام عنصر نماد شیمیایی Au دارد؟',
      options: ['نقره', 'طلا', 'آهن', 'مس'],
      correctAnswer: 1,
      category: 'شیمی'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleShowQuestion = useCallback(() => {
    if (!isQuestionVisible) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsQuestionVisible(true);
        setIsTimerActive(true);
        setCanStopTimer(true);
        setTimerStopped(false);
      }, 700);
    }
  }, [isQuestionVisible]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0 && !timerStopped) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      // زمان تمام شد - خودکار پاسخ غلط ثبت کن
      if (!showResult) {
        setSelectedAnswer(-1); // پاسخ غلط (هیچ پاسخی انتخاب نشده)
        setShowResult(true);
        
        // ذخیره نتیجه این مرحله به عنوان غلط
        setStepResults(prev => {
          const newResults = [...prev];
          newResults[currentStep] = false;
          return newResults;
        });
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, timerStopped, showResult, currentStep]);

  const handleStopTimer = useCallback(() => {
    if (canStopTimer && isTimerActive) {
      setTimerStopped(true);
      setIsTimerActive(false);
      setCanStopTimer(false);
      // حذف خط کم کردن 30 ثانیه - فقط تایمر متوقف می‌شود
    }
  }, [canStopTimer, isTimerActive]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (isQuestionVisible && !showResult) {
      setSelectedAnswer(answerIndex);
      setIsTimerActive(false);
      setShowResult(true);
      
      // بررسی پاسخ و به‌روزرسانی امتیاز
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      if (isCorrect) {
        setPlayerScore(prev => prev + 1);
        console.log('پاسخ صحیح!');
      } else {
        console.log('پاسخ غلط!');
      }
      
      // ذخیره نتیجه این مرحله
      setStepResults(prev => {
        const newResults = [...prev];
        newResults[currentStep] = isCorrect;
        return newResults;
      });
    }
  }, [isQuestionVisible, showResult, currentQuestion.correctAnswer, currentStep]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
      
      // شروع انیمیشن چرخش
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentStep(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsQuestionVisible(true); // مستقیماً سوال را نمایش بده
        setTimeLeft(30);
        setIsTimerActive(true); // شروع تایمر
        setIsTransitioning(false);
      }, 350); // نصف مدت انیمیشن چرخش
    } else {
      console.log('بازی تمام شد!');
      // اینجا می‌توانید منطق پایان بازی را اضافه کنید
    }
  }, [currentQuestionIndex, questions.length]);

  const handleNavigation = useCallback(
    (path: string) => {
      delayedAction(() => router.push(path));
    },
    [router, delayedAction]
  );

  const handlePeopleAnswers = useCallback(() => {
    if (!helpButtonsUsed.peopleAnswers && !showResult) {
      setHelpButtonsUsed(prev => ({ ...prev, peopleAnswers: true }));
      // منطق نمایش نظرسنجی مردم
      console.log('نمایش نظرات مردم - 60 سکه کسر شد');
    }
  }, [helpButtonsUsed.peopleAnswers, showResult]);

  const handleRemoveOptions = useCallback(() => {
    if (!helpButtonsUsed.removeOptions && !showResult) {
      setHelpButtonsUsed(prev => ({ ...prev, removeOptions: true }));
      // منطق حذف دو گزینه غلط
      console.log('حذف دو گزینه غلط - 40 سکه کسر شد');
    }
  }, [helpButtonsUsed.removeOptions, showResult]);

  const handleSecondChance = useCallback(() => {
    if (!helpButtonsUsed.secondChance && !showResult) {
      setHelpButtonsUsed(prev => ({ ...prev, secondChance: true }));
      // منطق شانس مجدد
      console.log('شانس مجدد فعال شد - 40 سکه کسر شد');
    }
  }, [helpButtonsUsed.secondChance, showResult]);

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text p-4 font-vazir-matn" dir="rtl">
        {/* Header - امتیازات و مرحله */}
        <div className="flex flex-row items-center bg-brand-secondary/40 rounded-xl p-3 mb-4 backdrop-blur-sm">
          {/* ردیف اول: امتیازات و تایمر */}
          <div className="flex items-center justify-center flex-1">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center gap-2">
                <div className="text-xs text-brand-subtext font-medium">شما</div>
                  <div className="text-2xl font-bold text-brand-base">{playerScore}</div>
                </div>
                <div className="text-lg text-brand-base font-bold mx-4">-</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{opponentScore}</div>
                  <div className="text-xs text-brand-subtext font-medium">حریف</div>
                </div>
              </div>
            </div>

          {/* ردیف دوم: نشانگر مرحله */}
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: questions.length }, (_, index) => (
              <div key={index}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 ${
                    index < currentStep
                      ? stepResults[index] 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/40 border-2 border-green-300'
                        : 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/40 border-2 border-red-300'
                      : index === currentStep && showResult
                      ? stepResults[index]
                        ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/40 border-2 border-green-300 animate-pulse'
                        : 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/40 border-2 border-red-300 animate-pulse'
                      : 'bg-gradient-to-br from-gray-600 to-gray-800 shadow-md shadow-gray-500/20 border-2 border-gray-500'
                  }`}
                  style={{
                    boxShadow: index < currentStep || (index === currentStep && showResult) 
                      ? stepResults[index]
                        ? '0 8px 25px rgba(34, 197, 94, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                        : '0 8px 25px rgba(239, 68, 68, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                      : '0 4px 15px rgba(107, 114, 128, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
                  }}
                >
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* کادر سوال */}
        <div className="mb-4 mt-5">
          <QuestionCard
            isFlipped={isFlipping}
            className={`transition-transform duration-700 ${
              isTransitioning ? 'animate-spin-y' : ''
            }`}
            frontContent={
              <div className="bg-gradient-to-br from-brand-secondary/50 to-brand-dark/50 rounded-xl p-6 h-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                <div className="text-center z-10">
                  <div className="text-5xl mb-3 mt-4 animate-bounce">❓</div>
                </div>
              </div>
            }
            backContent={
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-secondary/50 rounded-xl p-6 h-full flex flex-col items-center justify-center relative">
                {/* Badge موضوع سوال */}
                {isQuestionVisible && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-brand-accent/80 to-brand-accent/60 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg border border-brand-accent/30 backdrop-blur-sm">
                      {currentQuestion.category}
                    </div>
                  </div>
                )}
                
                <div className="text-center mt-8">
                  <div className="text-lg font-semibold leading-relaxed text-brand-text">
                    {isQuestionVisible ? currentQuestion.text : ''}
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* Progress Bar */}
        {isQuestionVisible && !showResult && (
          <div className="mb-6">
            <div className="bg-brand-secondary/50 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${
                  timeLeft > 10 
                    ? 'bg-gradient-to-r from-green-400 to-green-500' 
                    : timeLeft > 5 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                    : 'bg-gradient-to-r from-red-400 to-red-600 animate-pulse'
                }`}
                style={{ 
                  width: `${(timeLeft / 30) * 100}%`,
                  boxShadow: timeLeft <= 5 ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* گزینه‌های پاسخ */}
        {isQuestionVisible && (
          <div className="mb-8 flex-1">
            <div className="grid grid-cols-2 gap-4 h-full">
              {currentQuestion.options.map((option, index) => {
                const isCorrectAnswer = index === currentQuestion.correctAnswer;
                const isSelectedAnswer = selectedAnswer === index;
                
                return (
                  <AnswerCard
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    text={option}
                    variant="gray"
                    isCorrect={showResult && isCorrectAnswer}
                    isWrong={showResult && isSelectedAnswer && !isCorrectAnswer}
                    disabled={showResult}
                    className="h-full"
                  />
                );
              })}
            </div>
            
            {/* پیام زمان تمام شده */}
            {showResult && selectedAnswer === -1 && (
              <div className="mt-4 text-center">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 font-medium">⏰ زمان تمام شد!</p>
                  <p className="text-red-300 text-sm mt-1">هیچ پاسخی انتخاب نکردید</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* دکمه نمایش سوال */}
        <div className="mt-auto">
          {!isQuestionVisible ? (
            <AwesomeButton
              onClick={handleShowQuestion}
              icon={<EyeIcon className="h-6 w-6" />}
              className="w-full"
            >
              نمایش سوال
            </AwesomeButton>
          ) : (
            <div className="space-y-4">
              {!showResult ? (
                /* دکمه‌های کمکی */
                <div className="grid grid-cols-3 gap-3">
                  <QuickActionButton
                    onClick={handlePeopleAnswers}
                    icon={
                      <div className="flex flex-col items-center justify-center gap-1">
                        <UserGroupIcon className="w-5 h-5" />
                      </div>
                    }
                    label="جواب مردم"
                    variant="green"
                    disabled={helpButtonsUsed.peopleAnswers}
                    className="text-xs"
                    isQuizPage={true}
                  />
                  
                  <QuickActionButton
                    onClick={handleRemoveOptions}
                    icon={
                      <div className="flex flex-col items-center justify-center gap-1">
                        <XMarkIcon className="w-5 h-5" />
                      </div>
                    }
                    label="حذف دو گزینه"
                    variant="green"
                    disabled={helpButtonsUsed.removeOptions}
                    className="text-xs"
                    isQuizPage={true}
                  />
                  
                  <QuickActionButton
                    onClick={handleSecondChance}
                    icon={
                      <div className="flex flex-col items-center justify-center gap-1">
                        <ArrowPathIcon className="w-5 h-5" />
                      </div>
                    }
                    label="شانس مجدد"
                    variant="green"
                    disabled={helpButtonsUsed.secondChance}
                    className="text-xs"
                    isQuizPage={true}
                  />
                </div>
              ) : (
                /* دکمه سوال بعدی */
                 <AwesomeButton
                   onClick={handleNextQuestion}
                   icon={<ChevronRightIcon className="h-6 w-6" />}
                   className="w-full"
                 >
                   {currentQuestionIndex < questions.length - 1 ? 'سوال بعدی' : 'پایان بازی'}
                 </AwesomeButton>
              )}


            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </Page>
  );
}