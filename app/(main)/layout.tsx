'use client';

import { redirect } from 'next/navigation';

import Spinner from '@/components/layout/Spinner';
import Navigation from '@/components/layout/Navigation';

import { useConvexAuth } from 'convex/react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className='h-full flex'>
      <Navigation />
      <main className='flex-1 h-full overflow-y-auto'>{children}</main>
    </div>
  );
};

export default MainLayout;
