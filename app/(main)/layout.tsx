'use client';

import { redirect } from 'next/navigation';

import { useConvexAuth } from 'convex/react';

import Spinner from '@/components/layout/Spinner';
import Navigation from '@/components/layout/Navigation';
import SearchCommand from '@/components/layout/SearchCommand';


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
      <main className='flex-1 h-full overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
