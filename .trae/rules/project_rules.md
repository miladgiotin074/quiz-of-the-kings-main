📦 PROJECT RULES – Telegram WebApp Quiz (Mobile Only)

🧠 General Overview:
- Build a Telegram Web App for mobile users only.
- App allows users to compete in real-time quiz games.
- Users can play in different categories.
- The app must feel like a native mobile app, not a website.
- Entire UI must use a unified dark theme.
- No top AppBar anywhere in the app.
- Sticky Bottom Navigation with 4 tabs:
  - Home
  - Chats
  - Notifications
  - Settings
- Use Skeleton Loading for async content or page transitions.
- Entire UI must be fully responsive and mobile-first.
- Must be fully i18n (English + Persian) with:
  - Language switching in real-time
  - Full RTL/LTR layout switching
- Code must be error-free, production-ready, and component-based.
- One component per file – clean, modular structure.

🌐 Localization:
- Use `i18next` (or similar) for all strings.
- **NEVER hardcode strings; ALWAYS use translation keys from locale files.**
- All text content must use `t('key')` function for translations.
- Add new translation keys to both `en.json` and `fa.json` files.
- Settings page must allow switching between English & Persian.
- Direction must be `rtl` for Persian and `ltr` for English.
- Language change must apply in real-time across all components.
- **Rule: Any hardcoded text is strictly forbidden - use i18n keys only.**

🎨 UI/UX Standards:
- Responsive mobile-first design only.
- No desktop-specific layouts or elements.
- No AppBar – use bottom navigation only.
- Bottom nav must look and behave like native mobile apps.
- Use Skeleton Loaders during loading states (e.g., Home, Notifications).
- Smooth and elegant dark UI with consistent theming.

📁 Component & Page Structure:
- One file per component.
- Use folders like `/components`, `/pages`, `/hooks`, `/i18n`, etc.
- All pages must be wrapped in the `<Page>` component.

✅ Page Component Usage:
```tsx
import { Page } from '@/components/Page';

// Main entry pages (e.g., Home, Settings)
<Page back={false}>{content}</Page>

// All other pages (with default back button)
<Page>{content}</Page>

✅ Always wrap every page in <Page>.

✅ Use back={false} only on main/root pages.

✅ Default behavior shows a back button.

✅ <Page> should auto-manage the Telegram back button behavior.

🧭 Navigation Rules:

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const router = useRouter();

const handleNavigateTo[PageName] = useCallback(() => {
  console.log('Navigating to [page-name]...');
  router.push('/route-path');
}, [router]);


Rules:

✅ Always use useRouter from next/navigation.

✅ Wrap navigation handlers in useCallback.

✅ Include [router] in dependency array.

✅ Add console.log for debug visibility.

✅ Use descriptive function names: handleNavigateTo[PageName].

💡 Code Quality & Best Practices:

Use TypeScript across all files.

Use functional components only.

Create reusable components when needed.

Avoid repetition.

Validate all code before use — no syntax or runtime errors.

Prefer custom hooks for shared logic.

Follow modern naming conventions.

Prioritize mobile performance and UX polish.

🔌 Backend Communication Architecture:

- **Socket.io Integration**: All real-time communication with backend must use Socket.io.
- **Connection Management**: Establish persistent WebSocket connection on app initialization.
- **Event-Based Communication**: Use event-driven architecture for all data exchange.
- **Real-time Features**: Quiz games, notifications, chat messages via WebSocket events.
- **Fallback Strategy**: HTTP requests only for initial authentication and critical operations.
- **Connection States**: Handle connecting, connected, disconnected, and reconnecting states.
- **Error Handling**: Implement robust error handling for socket connection failures.
- **Auto-Reconnection**: Automatic reconnection with exponential backoff strategy.
- **Message Queue**: Queue messages when offline and send when connection restored.
- **Typing Indicators**: Real-time typing indicators in chat using socket events.
- **Live Updates**: Game scores, leaderboards, and user status via socket broadcasts.

🚀 First Steps To Implement:

Create main layout with bottom navigation.

Build Home, Chats, Notifications, Settings pages.

Wrap all pages with <Page> as per rules.

Add real-time language switcher in Settings.

Implement RTL/LTR switching based on language.

Add Skeleton loaders for Home & Notifications pages.

Use consistent dark theme throughout the app.

Implement Socket.io client connection and event handlers.