'use client';

import Link from './Link';
import { FaCode } from 'react-icons/fa';
import { useRef } from 'react';
import { useScrollFollow } from '@/hooks/useScrollFollow';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const NavBar = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isScrolled = useScrollFollow(scrollRef, 2);
  const scrollProgress = useScrollProgress();

  return (
    <section ref={scrollRef} className='transition-transform duration-300 ease-out'>
      <div
        className={`w-full text-lg font-bold px-14 pb-5 pt-7 flex bg-light-black ${
          isScrolled && 'shadow-primary'
        }`}
      >
        <div className='flex items-center gap-2'>
          <FaCode />
          <h1>Kevin Feng</h1>
        </div>
        <div className='flex ml-auto gap-6'>
          <Link href={'/'} className='px-1.5'>
            Home
          </Link>
          <Link href={'projects'} className='px-1.5'>
            Projects
          </Link>
          <Link href={'/blog'} className='px-1.5'>
            Blog
          </Link>
          <Link href={'/contact'} className='px-1.5'>
            Contact
          </Link>
        </div>
      </div>
      <div
        className='h-1 w-min absolute bg-primary transition-all duration-100 ease-out'
        style={{ width: `${scrollProgress}%` }}
      />
    </section>
  );
};

export default NavBar;
