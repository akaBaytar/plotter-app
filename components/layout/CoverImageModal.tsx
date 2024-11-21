'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { SingleImageDropzone } from './ImageDropzone';

import { useEdgeStore } from '@/lib/edgestore';
import { useCoverImage } from '@/hooks/useCoverImage';

const CoverImageModal = () => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();

  const { edgestore } = useEdgeStore();

  const coverImage = useCoverImage();

  const update = useMutation(api.documents.update);

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: { replaceTargetUrl: coverImage.url },
      });

      await update({ id: params.id as Id<'documents'>, coverImage: res.url });

      onClose();
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);

    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          value={file}
          disabled={isSubmitting}
          onChange={onChange}
          className='w-full outline-none'
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
