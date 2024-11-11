'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { Search, Trash, Undo } from 'lucide-react';

import Spinner from './Spinner';
import { Input } from '../ui/input';
import DeleteModal from './DeleteModal';

import { api } from '@/convex/_generated/api';
import { useQuery, useMutation } from 'convex/react';

import type { Id } from '@/convex/_generated/dataModel';

const TrashBox = () => {
  const [search, setSearch] = useState('');

  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: Id<'documents'>
  ) => {
    e.stopPropagation();

    const promise = restore({ id });

    toast.promise(promise, {
      loading: 'Restoring a note...',
      success: 'Note restored successfully.',
      error: 'Failed to restore a note.',
    });
  };

  const onRemove = (id: Id<'documents'>) => {
    const promise = remove({ id });

    toast.promise(promise, {
      loading: 'Deleting a note...',
      success: 'Note deleted successfully.',
      error: 'Failed to delete a note.',
    });

    if (params.documentId === id) router.push('/documents');
  };

  if (documents === undefined) {
    return (
      <div className='h-full flex items-center justify-center p-4'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-1 p-4'>
        <Search className='w-4 h-4 text-muted-foreground' />
        <Input
          value={search}
          placeholder='Filter by document title'
          onChange={(e) => setSearch(e.target.value)}
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary text-sm text-muted-foreground'
        />
      </div>
      <div className='px-1 pb-1'>
        <p className='hidden last:block text-xs text-muted-foreground text-center pb-1'>
          No documents found.
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            role='button'
            onClick={() => onClick(doc._id)}
            className='text-sm text-primary rounded-sm w-full hover:bg-primary/5 flex items-center justify-between'>
            <p className='ps-4 py-0.5 truncate'>{doc.title}</p>
            <div className='flex items-center'>
              <div
                role='button'
                onClick={(e) => onRestore(e, doc._id)}
                className='rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600'>
                <Undo className='w-4 h-4 text-muted-foreground' />
              </div>
              <DeleteModal onDelete={() => onRemove(doc._id)}>
                <div
                  role='button'
                  className='rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600'>
                  <Trash className='w-4 h-4 text-muted-foreground' />
                </div>
              </DeleteModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
