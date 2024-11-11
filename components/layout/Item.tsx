'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';

import {
  Archive,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  PlusIcon,
} from 'lucide-react';

import { cn } from '@/utils';
import { Skeleton } from '../ui/skeleton';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import type { LucideIcon } from 'lucide-react';
import type { Id } from '@/convex/_generated/dataModel';

type PropTypes = {
  label: string;
  icon: LucideIcon;
  id?: Id<'documents'>;
  documentIcon?: string;
  level?: number;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  onClick?: () => void;
  onExpand?: () => void;
};

const Item = ({
  id,
  label,
  active,
  isSearch,
  expanded,
  level = 0,
  icon: Icon,
  documentIcon,
  onClick,
  onExpand,
}: PropTypes) => {
  const router = useRouter();

  const { user } = useUser();

  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    onExpand?.();
  };

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!id) return;

    const promise = create({ title: 'Untitled', parentDocument: id }).then(
      (documentId) => {
        if (!expanded) onExpand?.();

        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created.',
      error: 'Failed to create a new note.',
    });
  };

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!id) return;

    const promise = archive({ id });

    toast.promise(promise, {
      loading: 'Moving to archive...',
      success: 'Note moved to archived.',
      error: 'Failed to archive mote.',
    });
  };

  return (
    <div
      onClick={onClick}
      role='button'
      style={{ paddingInlineStart: level ? `${level * 12 + 12}px` : '12px' }}
      className={cn(
        'group min-h-[27px] text-sm py-1 pe-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary'
      )}>
      {!!id && (
        <div
          role='button'
          onClick={handleExpand}
          className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mx-1'>
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground' />
        </div>
      )}
      {documentIcon ? (
        <div className='shrink-0 me-1 text-[18px]'>{documentIcon}</div>
      ) : (
        <Icon className='shrink-0 h-[18px] me-1 text-muted-foreground' />
      )}
      <span className='truncate'>{label}</span>
      {isSearch && (
        <kbd className='ms-auto h-5 px-1.5 font-mono font-medium text-[12px] text-muted-foreground  pointer-events-none inline-flex gap-[3px] items-center select-none rounded border bg-muted'>
          <span className='text-[9px] mt-[1px]'>⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className='ms-auto flex items-center gap-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role='button'
                className='opacity-0 group-hover:opacity-100 h-full ms-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'>
                <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              side='right'
              className='w-60'
              forceMount>
              <DropdownMenuItem
                onClick={onArchive}
                className='cursor-pointer hover:bg-muted'>
                <Archive className='h-4 w-4' />
                <span className='text-sm'>Archive</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className='text-xs text-muted-foreground p-2 cursor-default'>
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role='button'
            onClick={onCreate}
            className='opacity-0 group-hover:opacity-100 h-full ms-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'>
            <PlusIcon className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingInlineStart: level ? `${level * 13 + 27}px` : '13px',
      }}
      className='flex gap-x-1 py-[3px]'>
      <Skeleton className='h-4 w-4' />
      <Skeleton className='h-4 w-[30%]' />
    </div>
  );
};

export default Item;
