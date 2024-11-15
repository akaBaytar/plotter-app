'use client';

import { ModeToggle } from '../theme/ModeToggle';

import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';

import { useSettings } from '@/hooks/useSettings';

const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className='border-b pb-3'>
          <h2 className='text-lg font-medium'>My Settings</h2>
        </DialogHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-1'>
            <Label>Appearance</Label>
            <span className='text-[0.75rem] text-muted-foreground'>
              Customize how Plotter looks on your device.
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
