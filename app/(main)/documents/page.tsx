'use client';

import Image from 'next/image';

import { PlusCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';

const DocumentsPage = () => {
  const { user } = useUser();

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src='/empty.png'
        alt='a man inside empty box illustration'
        height={300}
        width={300}
        className='dark:hidden'
      />
      <Image
        src='/empty-dark.png'
        alt='a man inside empty box illustration'
        height={300}
        width={300}
        className='hidden dark:block'
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Plotter
      </h2>
      <Button>
        <PlusCircle className='h-4 w-4' />
        <span>Create a note</span>
      </Button>
    </div>
  );
};

export default DocumentsPage;
