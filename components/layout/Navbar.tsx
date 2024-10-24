'use client';

import Logo from './Logo';
import { ModeToggle } from '../theme/ModeToggle';

import { cn } from '@/utils';
import { useScrollTop } from '@/hooks/useScrollTop';

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-primary-foreground fixed top-0 w-full flex items-center p-6',
        scrolled && 'border-b shadow-sm'
      )}>
      <Logo />
      <div className='ms-auto w-full flex justify-end items-center gap-2'>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
