'use client';

import { useUser, SignOutButton } from '@clerk/clerk-react';
import { ChevronsLeftRight } from 'lucide-react';

import { Avatar, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role='button'
          className='flex items-center text-sm p-3 w-full hover:bg-primary/5'>
          <div className='flex items-center gap-x-2 max-w-36'>
            <Avatar className='h-5 w-5'>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className='text-start font-medium line-clamp-1'>
              {user?.fullName}&apos;s Plotter
            </span>
          </div>
          <ChevronsLeftRight className='rotate-90 ms-2 h-5 w-5 text-muted-foreground' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        alignOffset={11}
        forceMount
        className='w-80'>
        <div className='flex flex-col gap-4 p-2'>
          <p className='text-xs font-medium leading-none text-muted-foreground'>
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className='flex items-center gap-x-2'>
            <div className='rounded-sm bg-secondary p-1'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className='space-y-1'>
              <p className='text-sm line-clamp-1'>
                {user?.fullName}&apos;s Plotter
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className='w-full text-muted-foreground cursor-pointer'>
          <SignOutButton>Logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
