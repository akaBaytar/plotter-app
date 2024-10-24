'use client';

import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const Header = () => {
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
      <Button>
        Enter Plotter
        <ArrowRight className='h-4 w-4 ms-2' />
      </Button>
    </header>
  );
};

export default Header;
