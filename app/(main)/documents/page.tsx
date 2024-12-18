'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';

import { api } from '@/convex/_generated/api';

const DocumentsPage = () => {
  const router = useRouter();

  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: 'Untitled' }).then((id) =>
      router.push(`/documents/${id}`)
    );

    toast.promise(promise, {
      loading: 'Creating a new note.',
      success: 'New note created successfully.',
      error: 'Failed to create a new note.',
    });
  };

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4 overflow-x-hidden'>
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
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4' />
        <span>Create a note</span>
      </Button>
    </div>
  );
};

export default DocumentsPage;
