'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

const Error = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-4'>
      <Image
        src='/error.png'
        height={300}
        width={300}
        alt='man hold huge cup of coffee illustration'
        className='block dark:hidden'
      />
      <Image
        src='/error-dark.png'
        height={300}
        width={300}
        alt='man hold huge cup of coffee illustration'
        className='hidden dark:block'
      />
      <h2 className='text-2xl font-semibold'>An error occurred.</h2>
      <Button asChild size='lg'>
        <Link href='/'>Go Home</Link>
      </Button>
    </div>
  );
};

export default Error;
