'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import Editor from '@/components/layout/Editor';
import Toolbar from '@/components/layout/Toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import CoverImage from '@/components/layout/CoverImage';

import type { Id } from '@/convex/_generated/dataModel';

type PropTypes = {
  params: {
    id: Id<'documents'>;
  };
};

const DocumentPage = ({ params }: PropTypes) => {
  const document = useQuery(api.documents.getById, { id: params.id });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({ id: params.id, content });
  };

  if (document === undefined) {
    return (
      <div>
        <CoverImage.Skeleton />
        <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
          <div className='space-y-4 ps-8 pt-4'>
            <Skeleton className='h-14 w-[50%]' />
            <Skeleton className='h-4 w-[80%]' />
            <Skeleton className='h-4 w-[30%]' />
            <Skeleton className='h-4 w-[50%]' />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found.</div>;
  }

  return (
    <div className='pb-40'>
      <CoverImage url={document?.coverImage} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document!} />
        <Editor initialContent={document.content || ''} onChange={onChange} />
      </div>
    </div>
  );
};

export default DocumentPage;
