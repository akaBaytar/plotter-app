'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { Archive, MoreHorizontal } from 'lucide-react';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

import type { Id } from '@/convex/_generated/dataModel';

const Menu = ({ id }: { id: Id<'documents'> }) => {
  const router = useRouter();

  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id });

    toast.promise(promise, {
      loading: 'Document moving to archive...',
      success: 'Document moved to archive successfully.',
      error: 'Failed to archive document.',
    });

    router.push('/documents');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost' className='h-4 w-4'>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' forceMount className='w-60'>
        <DropdownMenuItem onClick={onArchive}>
          <Archive className='h-4 w-4' />
          Archive
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <p className='text-xs text-muted-foreground p-2'>
          Last edited by: {user?.fullName}
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className='h-8 w-8 rounded-md' />;
};

export default Menu;
