import Navbar from '@/components/layout/Navbar';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full dark:bg-primary-foreground'>
      <Navbar />
      <main className='h-full pt-32'>{children}</main>
    </div>
  );
};

export default MarketingLayout;
