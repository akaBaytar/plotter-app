'use client';

import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';

import Logo from './Logo';
import Spinner from './Spinner';
import { Button } from '../ui/button';
import { ModeToggle } from '../theme/ModeToggle';

import { cn } from '@/utils';
import { useScrollTop } from '@/hooks/useScrollTop';

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        'z-50 dark:bg-primary-foreground fixed top-0 w-full flex items-center p-6',
        scrolled &&
          'backdrop-blur bg-background/80 dark:bg-primary-foreground/80'
      )}>
      <div className='container mx-auto flex items-center justify-between'>
        <Logo />
        <div className='ms-auto w-full flex justify-end items-center gap-2'>
          {isLoading && <Spinner size='lg' />}
          {!isAuthenticated && !isLoading && (
            <SignInButton mode='modal'>
              <Button variant='outline'>Login</Button>
            </SignInButton>
          )}
          {isAuthenticated && !isLoading && <UserButton />}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
