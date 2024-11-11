'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/utils';

import { FileIcon } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import Item from './Item';

import type { Doc, Id } from '@/convex/_generated/dataModel';

type PropTypes = {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Doc<'documents'>[];
};

const DocumentList = ({ data, level = 0, parentDocumentId }: PropTypes) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const params = useParams();
  const router = useRouter();

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <p
        style={{
          paddingInlineStart: level ? `${level * 13 + 28}px` : '13px',
        }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}>
        {level !== 0 && 'No pages inside.'}
      </p>
      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            level={level}
            expanded={expanded[doc._id]}
            active={params.documentId === doc._id}
            onClick={() => onRedirect(doc._id)}
            onExpand={() => onExpand(doc._id)}
          />
          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
