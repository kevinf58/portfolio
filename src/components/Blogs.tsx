import { Button } from './common/Button';
import Card from './common/Card';
import { AiFillTool } from 'react-icons/ai';
import Link from 'next/link';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const Blogs = () => {
  const currDeviceSize = useBreakpoint();

  return (
    <div className='lg:w-[48rem] sm:w-96 w-80 flex lg:flex-row flex-col gap-8 mx-auto bg-white/5 sm:px-10 sm:py-8 p-5 rounded-2xl'>
      <div className='flex flex-col gap-3 lg:w-1/2 w-full'>
        <h1 className='text-3xl lg:text-start text-center mb-6'>Blog</h1>
        <p>I’m a strong believer in documenting my journey as a developer.</p>
        <p>
          Blogging helps me track my growth, reinforce my learning, and improve communication skills.
        </p>
        <p>It also allows me to share useful insights and experiences with others!</p>
        {currDeviceSize !== 'sm' && currDeviceSize !== 'md' && currDeviceSize !== 'lg' && (
          <Button className='mt-6'>
            <Link href={'/blog'}>View my Blog</Link>
          </Button>
        )}
      </div>
      <div className='flex items-center justify-center lg:w-1/2 w-full'>
        <Card cardType='blog'>
          <div className='p-4'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>My Journal #28</span>
            </div>
            <div className='mt-3 mb-7 text-sm'>
              General thoughts, lessons, and reflections from my journey
            </div>
            <div className='flex gap-3'>
              <AiFillTool className='w-6 h-5' />
              <span className='text-xs font-medium'>NextJS • TypeScript • Tailwind • AWS • Redux</span>
            </div>
            <div className='flex items-center gap-3 mt-2 mb-6'>
              <span className='size-3 bg-green rounded-full' />
              <span className='text-xs'>Completed</span>
            </div>
            <span className='text-xs text-white/40'>Tues, Apr 22nd, 2025</span>
          </div>
          <span className='absolute top-3 right-3'>
            <span className='relative flex size-3.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green/70 opacity-75'></span>
              <span className='relative inline-flex size-3.5 rounded-full bg-green'></span>
            </span>
          </span>
        </Card>
      </div>
      {currDeviceSize !== 'xl' && currDeviceSize !== '2xl' && (
        <Button className='mt-6'>
          <Link href={'/blog'}>View my Blog</Link>
        </Button>
      )}
    </div>
  );
};

export default Blogs;
