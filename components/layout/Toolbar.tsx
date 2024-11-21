'use client';

import { type ElementRef, useRef, useState } from 'react';

import { ImageIcon, Smile, X } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import IconPicker from './IconPicker';
import { Button } from '../ui/button';

import type { Doc } from '@/convex/_generated/dataModel';

type PropTypes = {
  initialData: Doc<'documents'>;
  preview?: boolean;
};

const Toolbar = ({ initialData, preview }: PropTypes) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData?.title);

  const input = useRef<ElementRef<'textarea'>>(null);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const enable = () => {
    if (preview) return;

    setIsEditing(true);

    setTimeout(() => {
      setValue(initialData?.title);
      input.current?.focus();
    }, 0);
  };

  const disable = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);

    update({ id: initialData?._id, title: value || 'Untitled' });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      disable();
    }
  };

  const onIconSelect = (icon: string) => update({ id: initialData?._id, icon });

  const onRemoveIcon = () => removeIcon({ id: initialData?._id });

  return (
    <div className='ps-[58px] relative group'>
      {!!initialData?.icon && !preview && (
        <div className='flex items-center gap-x-2 pt-6 group/icon'>
          <IconPicker onChange={onIconSelect}>
            <p className='text-6xl hover:opacity-80 transition'>
              {initialData?.icon}
            </p>
          </IconPicker>
          <Button
            size='icon'
            variant='outline'
            onClick={onRemoveIcon}
            className='rounded-full text-muted-foreground text-xs opacity-0 group-hover/icon:opacity-100 transition'>
            <X className='h-4 w-4' />
          </Button>
        </div>
      )}
      {!!initialData?.icon && preview && (
        <p className='text-6xl pt-6'>{initialData?.icon}</p>
      )}
      <div className='flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100'>
        {!initialData?.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              size='sm'
              variant='outline'
              className='text-muted-foreground text-xs'>
              <Smile className='h-4 w-4 me-1' />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData?.coverImage && !preview && (
          <Button
            size='sm'
            variant='outline'
            onClick={() => {}}
            className='text-muted-foreground text-xs'>
            <ImageIcon className='h-4 w-4 me-1' />
            Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={input}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          onBlur={disable}
          onKeyDown={onKeyDown}
          className='text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none'
        />
      ) : (
        <div
          onClick={enable}
          className='pb-[11.5px] text-[#3F3F3F] dark:text-[#CFCFCF] text-5xl font-bold break-words outline-none'>
          {initialData?.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
