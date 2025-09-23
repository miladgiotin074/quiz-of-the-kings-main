'use client';

import { type PropsWithChildren } from 'react';
import {
  initData,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react';

import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { ErrorPage } from '@/components/error/ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';
// import { useLaunchParams } from '@telegram-apps/sdk-react';

function RootInner({ children }: PropsWithChildren) {
  const lp = useLaunchParams();
  const initDataUser = useSignal(initData.user);

  return (
      <div>
        {children}
      </div>
  );
}

export function Root(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
              <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-center items-center">

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-brand-accent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
  );
}
