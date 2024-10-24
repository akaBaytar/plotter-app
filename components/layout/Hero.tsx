import Image from 'next/image';

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center pt-2 gap-4'>
        <Image
          src='/documents.png'
          alt='a man and papers'
          width={320}
          height={320}
          className='object-contain block dark:hidden'
        />
        <Image
          src='/documents-dark.png'
          alt='a man and papers'
          width={320}
          height={320}
          className='object-contain hidden dark:block'
        />
        <Image
          src='/reading.png'
          alt='a man sitting chair and reading book'
          width={320}
          height={320}
          className='object-contain hidden md:block dark:hidden'
        />
        <Image
          src='/reading-dark.png'
          alt='a man sitting chair and reading book'
          width={320}
          height={320}
          className='object-contain hidden dark:md:block'
        />
      </div>
    </div>
  );
};

export default Hero;
