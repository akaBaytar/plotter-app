'use client';

import { useState } from 'react';

import { toast } from 'sonner';
import { Check, Copy, Globe } from 'lucide-react';

import { useOrigin } from '@/hooks/useOrigin';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import type { Doc } from '@/convex/_generated/dataModel';

const Publish = ({ initialData }: { initialData: Doc<'documents'> }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const origin = useOrigin();

  const url = `${origin}/preview/${initialData._id}`;

  const update = useMutation(api.documents.update);

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({ id: initialData._id, isPublished: true }).finally(
      () => setIsSubmitting(false)
    );

    toast.promise(promise, {
      loading: 'Publishing the note...',
      success: 'Note published successfully.',
      error: 'Failed to publish note.',
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Unpublishing the note...',
      success: 'Note unpublished successfully.',
      error: 'Failed to unpublish note.',
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='ghost' className='font-normal'>
          Publish{' '}
          {initialData.isPublished && (
            <Globe className='text-yellow-500 w-4 h-4' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' forceMount className='w-72'>
        {initialData.isPublished ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Globe className='text-yellow-500 animate-pulse h-4 w-4' />
              <p className='text-xs font-medium text-yellow-500'>
                This note is live on web.
              </p>
            </div>
            <div className='flex items-center'>
              <input
                value={url}
                disabled
                className='flex-1 px-2 text-xs border rounded-s-md h-8 bg-muted truncate'
              />
              <Button
                variant='secondary'
                onClick={onCopy}
                disabled={copied}
                className='h-8 rounded-s-none'>
                {copied ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='w-full text-xs'
              onClick={onUnpublish}
              disabled={isSubmitting}>
              Unpublish
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Globe className='h-8 w-8 text-muted-foreground mb-2' />
            <p className='text-sm font-medium mb-2'>Publish this note</p>
            <span className='text-xs text-muted-foreground mb-4'>
              Share your work with others.
            </span>
            <Button
              size='sm'
              disabled={isSubmitting}
              onClick={onPublish}
              className='w-full text-xs'>
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
