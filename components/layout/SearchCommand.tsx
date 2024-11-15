'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { File } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { useSearch } from '@/hooks/useSearch';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

const SearchCommand = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const { user } = useUser();

  const isOpen = useSearch((store) => store.isOpen);
  const toggle = useSearch((store) => store.toggle);
  const onClose = useSearch((store) => store.onClose);

  const documents = useQuery(api.documents.getSearch);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Plotter...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Documents'>
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={onSelect}>
              {doc.icon ? (
                <p className='me-1 text-[18px]'>{doc.icon}</p>
              ) : (
                <File className='me-1 h-4 w-4' />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
