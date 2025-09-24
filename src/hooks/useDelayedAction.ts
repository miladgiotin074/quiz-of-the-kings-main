'use client';

import { useCallback } from 'react';

/**
 * Hook برای اضافه کردن تأخیر به اکشن‌ها جهت نمایش کامل انیمیشن کلیک
 * @param delay - مدت زمان تأخیر به میلی‌ثانیه (پیش‌فرض: 200)
 * @returns تابعی که اکشن را با تأخیر اجرا می‌کند
 */
export const useDelayedAction = (delay: number = 200) => {
  const executeWithDelay = useCallback((action: () => void) => {
    setTimeout(() => {
      action();
    }, delay);
  }, [delay]);

  return executeWithDelay;
};

export default useDelayedAction;