import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Root } from '@/components/Root/Root';


import 'normalize.css/normalize.css';
import './_assets/globals.css';

export const metadata: Metadata = {
  title: 'Quiz Of The Kings',
  description: 'A Telegram web app for engaging in intelligence and general knowledge competitions',
};

export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-screen w-[400px] bg-slate-700">
          <Root>{children}</Root>
        </div>
      </body>
    </html>
  );
}