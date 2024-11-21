'use client';

import { useEffect, useState } from 'react';

import SettingsModal from '../layout/SettingsModal';
import CoverImageModal from '../layout/CoverImageModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};

export default ModalProvider;
