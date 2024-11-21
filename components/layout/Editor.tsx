'use client';

import { useTheme } from 'next-themes';

import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';

import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';

import { useEdgeStore } from '@/lib/edgestore';

type PropTypes = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable }: PropTypes) => {
  const { resolvedTheme } = useTheme();

  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });

    return res.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      editable={editable}
      onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
      className='relative'
    />
  );
};

export default Editor;
