'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { ImageIcon, Trash } from 'lucide-react';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import { cn } from '@/utils';
import { useEdgeStore } from '@/lib/edgestore';
import { useCoverImage } from '@/hooks/useCoverImage';

import type { Id } from '@/convex/_generated/dataModel';

const CoverImage = ({ url, preview }: { url?: string; preview?: boolean }) => {
  const params = useParams();

  const coverImage = useCoverImage();

  const { edgestore } = useEdgeStore();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) await edgestore.publicFiles.delete({ url });

    removeCoverImage({ id: params.id as Id<'documents'> });
  };

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        url && 'bg-muted',
        !url && 'h-[12vh]'
      )}>
      {!!url && (
        <Image src={url} fill alt='Cover Image' className='object-cover' />
      )}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 end-5 flex items-center gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => coverImage.onReplace(url)}
            className='text-muted-foreground text-xs'>
            <ImageIcon className='h-4 w-4' />
            Change Cover
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={onRemove}
            className='text-muted-foreground text-xs'>
            <Trash className='h-4 w-4' />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};

CoverImage.Skeleton = function CoverImageSkeleton() {
  return <Skeleton className='h-[12vh] w-full'/>;
};

export default CoverImage;
