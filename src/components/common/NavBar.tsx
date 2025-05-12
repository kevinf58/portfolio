'use client';

import Link from './Link';
import { FaCode } from 'react-icons/fa';
import { useRef } from 'react';
import { useScrollFollow } from '@/hooks/useScrollFollow';

const NavBar = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isScrolled = useScrollFollow(scrollRef, 2);

  return (
    <section
      className={`w-full text-lg font-bold px-14 pb-5 pt-7 flex justify-between bg-light-black transition-transform duration-300 ease-out ${
        isScrolled && 'shadow-primary'
      }`}
      ref={scrollRef}
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
    </section>
  );
};

export default NavBar;
