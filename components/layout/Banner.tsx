'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Button } from '../ui/button';
import DeleteModal from './DeleteModal';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import type { Id } from '@/convex/_generated/dataModel';

const Banner = ({ id }: { id: Id<'documents'> }) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id });

    toast.promise(promise, {
      loading: 'Deleting document...',
      success: 'Document deleted successfully.',
      error: 'Failed to delete document.',
    });

    router.push('/documents');
  };

  const onRestore = () => {
    const promise = restore({ id });

    toast.promise(promise, {
      loading: 'Restoring document...',
      success: 'Document restored successfully.',
      error: 'Failed to restore document.',
    });
  };

  return (
    <div className='w-full bg-rose-500 text-center text-xs py-1 px-2 text-white flex items-center justify-center gap-x-2'>
      <p className=''>This document is in the archive.</p>
      <Button
        size='sm'
        variant='outline'
        onClick={onRestore}
        className='border-white/50 bg-transparent text-white hover:text-white hover:bg-white/20 hover:border-white/20 px-2 py-1 font-normal'>
        Restore
      </Button>
      <DeleteModal onDelete={onRemove}>
        <Button
          size='sm'
          variant='outline'
          className='border-white/50 bg-transparent text-white hover:text-white hover:bg-white/20 hover:border-white/20 px-2 py-1 font-normal'>
          Delete
        </Button>
      </DeleteModal>
    </div>
  );
};

export default Banner;
