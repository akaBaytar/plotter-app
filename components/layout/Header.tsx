'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';

import { Button } from '../ui/button';

const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <header className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documents and Plans Unified. Welcome to{' '}
        <span className='underline'>Plotter</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        Plotter is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Button disabled>Get Plotter Free</Button>
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/documents'>
            Enter Plotter
            <ArrowRight className='h-4 w-4' />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode='modal'>
          <Button>Get Plotter Free</Button>
        </SignInButton>
      )}
    </header>
  );
};

export default Header;
