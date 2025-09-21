'use client';

import { type PropsWithChildren } from 'react';
import {
  initData,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';

import './styles.css';
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
    <div className="root__loading">Loading</div>
  );
}
