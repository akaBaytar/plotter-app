'use client';

import { useRef, useState } from 'react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import type { Doc } from '@/convex/_generated/dataModel';

const Title = ({ initialData }: { initialData: Doc<'documents'> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || 'Untitled');

  const input = useRef<HTMLInputElement>(null);

  const update = useMutation(api.documents.update);

  const enable = () => {
    setTitle(initialData.title);

    setIsEditing(true);

    setTimeout(() => {
      input.current?.focus();
      input.current?.setSelectionRange(0, input.current.value.length);
    }, 0);
  };

  const disable = () => setIsEditing(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    update({ id: initialData._id, title: e.target.value || 'Untitled' });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') disable();
  };

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={input}
          value={title}
          onClick={enable}
          onBlur={disable}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className='h-8 px-2 text-sm focus-visible:ring-transparent'
        />
      ) : (
        <Button
          variant='ghost'
          size='sm'
          onClick={enable}
          className='font-normal text-sm h-8 p-1'>
          <span className='truncate'>{initialData.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className='h-8 w-32 rounded-md' />;
};

export default Title;
