import Logo from './Logo';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer className='flex items-center w-full p-6 z-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <Logo />
        <div className='w-full ms-auto flex items-center justify-end gap-1 text-muted-foreground'>
          <Button variant='ghost' size='sm'>
            Privacy Policy
          </Button>
          <Button variant='ghost' size='sm'>
            Terms & Conditions
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
