import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Root } from '@/components/Root/Root';
import DisableRightClick from '@/components/common/DisableRightClick';

import 'normalize.css/normalize.css';
import './_assets/globals.css';

export const metadata: Metadata = {
  title: 'Quiz Of The Kings',
  description: 'A Telegram web app for engaging in intelligence and general knowledge competitions',
};

export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-white">
        <DisableRightClick />
        <div className="h-screen w-[400px] bg-brand-dark">
          <Root>{children}</Root>
        </div>
      </body>
    </html>
  );
}