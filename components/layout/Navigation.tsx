/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

import {
  Archive,
  ChevronLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
} from 'lucide-react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';

import Item from './Item';
import TrashBox from './TrashBox';
import UserItem from './UserItem';
import DocumentList from './DocumentList';
import DocumentDetails from './DocumentDetails';

import { cn } from '@/utils';
import { useSearch } from '@/hooks/useSearch';
import { useSettings } from '@/hooks/useSettings';

import type { ElementRef } from 'react';

const Navigation = () => {
  const search = useSearch();
  const settings = useSettings();

  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const isResizing = useRef(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const create = useMutation(api.documents.create);

  const navbar = useRef<ElementRef<'div'>>(null);
  const sidebar = useRef<ElementRef<'aside'>>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      reset();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    let width = e.clientX;

    if (width < 240) width = 240;
    if (width > 480) width = 480;

    if (sidebar.current && navbar.current) {
      sidebar.current.style.width = `${width}px`;
      navbar.current.style.setProperty('left', `${width}px`);
      navbar.current.style.setProperty('width', `calc(100% - ${width}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const reset = () => {
    if (sidebar.current && navbar.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebar.current.style.width = isMobile ? '100%' : '15rem';
      navbar.current.style.setProperty('left', isMobile ? '100%' : '15rem');

      navbar.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 15rem)'
      );

      setTimeout(() => setIsResetting(false), 200);
    }
  };

  const collapse = () => {
    if (sidebar.current && navbar.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebar.current.style.width = '0';
      navbar.current.style.setProperty('width', '100%');
      navbar.current.style.setProperty('left', '0');

      setTimeout(() => setIsResetting(false), 200);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: 'Untitled' }).then((id) =>
      router.push(`/documents/${id}`)
    );

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created.',
      error: 'Failed to create a new note.',
    });
  };

  return (
    <>
      <aside
        ref={sidebar}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[9999]',
          isResetting && 'transition-all ease-in-out duration-200',
          isMobile && 'w-0'
        )}>
        <div
          role='button'
          onClick={collapse}
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-sm hover:bg-primary/10 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobile && 'opacity-100'
          )}>
          <ChevronLeft className='h-6 w-6' />
        </div>
        <div className='flex flex-col gap-1'>
          <UserItem />
          <Item label='Search' icon={Search} isSearch onClick={search.onOpen} />
          <Item label='Settings' icon={Settings} onClick={settings.onOpen} />
          <Item label='New Document' icon={PlusCircle} onClick={handleCreate} />
        </div>
        <div className='mt-4'>
          <DocumentList />
          <Popover>
            <PopoverTrigger className='w-full mt-4'>
              <Item label='Archive' icon={Archive} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? 'bottom' : 'right'}
              className='p-0 w-72'>
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onClick={reset}
          onMouseDown={onMouseDown}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        />
      </aside>
      <div
        ref={navbar}
        className={cn(
          'absolute top-0 left-60 w-[calc(100%-15rem)] z-[999]',
          isResetting && 'transition-all ease-in-out duration-200',
          isMobile && 'left-0 w-full'
        )}>
        {!!params.id ? (
          <DocumentDetails isCollapsed={isCollapsed} onResetWidth={reset} />
        ) : (
          <nav className='bg-transparent px-4 py-2 w-full'>
            {isCollapsed && (
              <MenuIcon
                role='button'
                onClick={reset}
                className='h-6 w-6 text-muted-foreground'
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
