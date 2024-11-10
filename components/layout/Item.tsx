'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';

import { cn } from '@/utils';

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
  onClick: () => void;
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
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

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
          onClick={() => {}}
          className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 me-1'>
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
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
    </div>
  );
};

export default Item;
