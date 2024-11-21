'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import Toolbar from '@/components/layout/Toolbar';

import type { Id } from '@/convex/_generated/dataModel';

type PropTypes = {
  params: {
    id: Id<'documents'>;
  };
};

const DocumentPage = ({ params }: PropTypes) => {
  const document = useQuery(api.documents.getById, { id: params.id });

  if (!document === undefined) {
    return <div>Loading...</div>;
  }

  if (!document === null) {
    return <div>Not found.</div>;
  }

  return (
    <div className='pb-40'>
      <div className='h-[35vh]' />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document!} />
      </div>
    </div>
  );
};

export default DocumentPage;
