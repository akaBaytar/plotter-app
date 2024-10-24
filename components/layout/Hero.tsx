import Image from 'next/image';

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center mt-4 gap-4'>
        <Image
          src='/documents.png'
          alt='a man and papers'
          width={320}
          height={320}
          priority
          className='object-contain h-auto w-auto max-w-full dark:hidden'
        />
        <Image
          src='/documents-dark.png'
          alt='a man and papers'
          width={320}
          height={320}
          priority
          className='object-contain h-auto w-auto max-w-full hidden dark:block'
        />
      </div>
    </div>
  );
};

export default Hero;
