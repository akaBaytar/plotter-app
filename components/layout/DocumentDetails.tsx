'use client';

import { useParams } from 'next/navigation';

import { MenuIcon } from 'lucide-react';

import Title from './Title';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import type { Id } from '@/convex/_generated/dataModel';

type PropTypes = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const DocumentDetails = ({ isCollapsed, onResetWidth }: PropTypes) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    id: params.id as Id<'documents'>,
  });

  if (document === undefined)
    return (
      <nav className='bg-background dark:bg-muted w-full flex items-center gap-x-4 px-4 py-2'>
        <Title.Skeleton />
      </nav>
    );

  if (document === null) return null;

  return (
    <>
      <nav className='bg-background dark:bg-muted w-full flex items-center gap-x-4 px-4 py-2'>
        {isCollapsed && (
          <MenuIcon
            role='button'
            onClick={onResetWidth}
            className='h-6 w-6 text-muted-foreground'
          />
        )}
        <div className='flex items-center justify-between w-full'>
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};

export default DocumentDetails;
