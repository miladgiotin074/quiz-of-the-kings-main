'use client';

import { Page } from '@/components/Page';

export default function Home() {
 return (
    <Page back={false}>
      <p className='text-red-200'>Hello world</p>
    </Page>
  );
}