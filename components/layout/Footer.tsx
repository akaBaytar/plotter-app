import Logo from './Logo';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer className='flex items-center w-full p-6 bg-background dark:bg-primary-foreground z-50'>
      <Logo />
      <div className='w-full ms-auto flex items-center justify-end gap-1 text-muted-foreground'>
        <Button variant='ghost' size='sm'>
          Privacy Policy
        </Button>
        <Button variant='ghost' size='sm'>
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
