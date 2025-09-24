# قوانین و الگوهای طراحی پروژه Quiz of the Kings

## قوانین کلی پروژه

### 1. محدودیت‌های اصلی

- **موبایل-فقط**: تمام طراحی‌ها باید برای موبایل بهینه شوند
- **تم تیره**: (رنگ های اصلی در tailwind.config تعریف شده)استفاده از رنگ‌های تیره به عنوان تم اصلی

### 2. قوانین بومی‌سازی (Localization)

- پشتیبانی کامل از RTL/LTR
- استفاده از `tailwindcss-rtl` برای مدیریت جهت متن

### 3. استانداردهای UI/UX

- طراحی موبایل-فقط (Mobile-First)
- عدم وجود AppBar در صفحات
- تمرکز بر تجربه کاربری ساده و روان

## ساختار کامپوننت و صفحه

### 1. قوانین فایل‌ها

- یک فایل برای هر کامپوننت
- استفاده از کامپوننت `<Page>` برای همه صفحات
- قرارگیری کامپوننت‌ها در پوشه‌های مناسب:
  - `src/components/common/` - کامپوننت‌های عمومی
  - `src/components/layout/` - کامپوننت‌های مربوط به layout
  - `src/components/button/` - انواع دکمه‌ها
  - `src/components/card/` - انواع کارت‌ها

### 2. ساختار صفحات

همه صفحات باید از این الگو پیروی کنند:

```tsx
import { Page } from "@/components/layout/Page";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDelayedAction } from "@/hooks/useDelayedAction";

export default function PageName() {
  const router = useRouter();
  const delayedAction = useDelayedAction();

  const handleNavigation = useCallback(
    (path: string) => {
      delayedAction(() => router.push(path));
    },
    [router, delayedAction]
  );

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text">
        {/* محتوای صفحه */}
      </div>
    </Page>
  );
}
```

## رنگ‌بندی و تم

### رنگ‌های اصلی (از tailwind.config.ts)

```css
--brand-dark: #1a1a1a
--brand-secondary: #2a2a2a
--brand-accent: #4a90e2
--brand-text: #ffffff
--brand-subtext: #b0b0b0
```

### کلاس‌های رنگی

- `bg-brand-dark` - پس‌زمینه اصلی
- `bg-brand-secondary` - پس‌زمینه ثانویه
- `bg-brand-accent` - رنگ تاکیدی
- `text-brand-text` - متن اصلی
- `text-brand-subtext` - متن فرعی

## کامپوننت‌های آماده

### 1. دکمه‌ها

#### AwesomeButton

```tsx
<AwesomeButton onClick={handleClick} className="w-full" disabled={false}>
  متن دکمه
</AwesomeButton>
```

#### QuickActionButton

```tsx
<QuickActionButton
  color="blue" // gray, blue, yellow, green, red, purple
  onClick={handleClick}
  className="w-full"
>
  <Icon className="w-6 h-6" />
  <span>متن دکمه</span>
</QuickActionButton>
```

### 2. کارت‌ها

#### GameCard

```tsx
<GameCard
  title="عنوان بازی"
  description="توضیحات بازی"
  image="/path/to/image.jpg"
  onClick={handleGameClick}
/>
```

#### ProfileCard

```tsx
<ProfileCard
  name="نام کاربر"
  avatar="/path/to/avatar.jpg"
  level={5}
  score={1250}
  isOnline={true}
/>
```

### 3. کامپوننت‌های عمومی

#### Avatar

```tsx
<Avatar
  src="/path/to/avatar.jpg"
  size="md" // sm, md, lg
  isOnline={true}
  borderColor="brand-accent"
/>
```

## الگوهای انیمیشن و افکت‌های 3D

### کلاس‌های CSS آماده

- `.game-card-3d` - افکت سه‌بعدی برای کارت‌های بازی
- `.btn-awesome` - افکت سه‌بعدی برای دکمه‌های اصلی
- `.action-button-3d` - افکت سه‌بعدی برای دکمه‌های عملیات

### رنگ‌های دکمه‌های عملیات

- `gray` - خاکستری
- `blue` - آبی
- `yellow` - زرد
- `green` - سبز
- `red` - قرمز
- `purple` - بنفش

## قوانین ناوبری

### 1. استفاده از هوک‌ها

```tsx
const router = useRouter();
const delayedAction = useDelayedAction();

const handleNavigation = useCallback(
  (path: string) => {
    delayedAction(() => router.push(path));
  },
  [router, delayedAction]
);
```

### 2. مدیریت دکمه بازگشت تلگرام

- کامپوننت `Page` به طور خودکار دکمه بازگشت را مدیریت می‌کند
- در مودال‌ها از `backButton` استفاده کنید:

```tsx
import { backButton } from "@telegram-apps/sdk-react";

useEffect(() => {
  backButton.show();
  const handleBackClick = () => onClose();
  backButton.on("click", handleBackClick);

  return () => {
    backButton.off("click", handleBackClick);
    backButton.hide();
  };
}, [onClose]);
```

## ساختار مودال‌ها

### الگوی استاندارد مودال

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // سایر پراپ‌های مخصوص مودال
}

export function CustomModal({ isOpen, onClose, ...props }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      backButton.show();
      const handleBackClick = () => onClose();
      backButton.on("click", handleBackClick);

      return () => {
        backButton.off("click", handleBackClick);
        backButton.hide();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-brand-secondary rounded-lg p-6 w-full max-w-md">
        {/* محتوای مودال */}
      </div>
    </div>
  );
}
```

## کیفیت کد و بهترین شیوه‌ها

### 1. TypeScript

- استفاده کامل از TypeScript
- تعریف interface برای همه پراپ‌ها
- استفاده از Generic Types در صورت نیاز

### 2. کامپوننت‌های تابعی

- استفاده از Function Components
- استفاده از React Hooks
- مدیریت state با useState و useEffect

### 3. هوک‌های سفارشی

- `useDelayedAction` - برای تاخیر در اجرای عملیات

### 4. مدیریت خطا

- مدیریت خطاهای async با try-catch

## صفحات اصلی پروژه

## نکات مهم برای توسعه

### 1. بهینه‌سازی عملکرد

- استفاده از `useCallback` برای توابع

### 2. تست و کیفیت

- نوشتن کد تمیز و قابل نگهداری
- استفاده از ESLint برای کیفیت کد
- تست کامپوننت‌ها قبل از ادغام

### 3. سازگاری

- تست روی دستگاه‌های مختلف
- بررسی عملکرد در مرورگرهای مختلف

## مثال کامل یک صفحه

```tsx
// src/app/example/page.tsx
import { Page } from "@/components/layout/Page";
import { AwesomeButton } from "@/components/button/AwesomeButton";
import { QuickActionButton } from "@/components/button/QuickActionButton";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDelayedAction } from "@/hooks/useDelayedAction";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";

export default function ExamplePage() {
  const router = useRouter();
  const delayedAction = useDelayedAction();
  const [loading, setLoading] = useState(false);

  const handleNavigation = useCallback(
    (path: string) => {
      delayedAction(() => router.push(path));
    },
    [router, delayedAction]
  );

  const handleAction = useCallback(async () => {
    setLoading(true);
    try {
      // انجام عملیات
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("خطا در انجام عملیات:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Page>
      <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">صفحه نمونه</h1>

        <div className="flex-1 space-y-4">
          <AwesomeButton
            onClick={handleAction}
            disabled={loading}
            className="w-full"
          >
            {loading ? "در حال انجام..." : "انجام عملیات"}
          </AwesomeButton>

          <div className="grid grid-cols-2 gap-4">
            <QuickActionButton
              color="blue"
              onClick={() => handleNavigation("/home")}
            >
              <HomeIcon className="w-6 h-6" />
              <span>خانه</span>
            </QuickActionButton>

            <QuickActionButton
              color="green"
              onClick={() => handleNavigation("/profile")}
            >
              <UserIcon className="w-6 h-6" />
              <span>پروفایل</span>
            </QuickActionButton>
          </div>
        </div>
      </div>
    </Page>
  );
}
```

این قوانین و الگوها باید در تمام مراحل توسعه رعایت شوند تا یکپارچگی و کیفیت پروژه حفظ شود.
