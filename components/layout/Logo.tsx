import Image from 'next/image';

const Logo = () => {
  return (
    <div className='flex items-center gap-x-2'>
      <Image src='/logo.png' alt='plotter logo' height={40} width={40} />
      <p className='font-semibold'>Plotter</p>
    </div>
  );
};

export default Logo;
