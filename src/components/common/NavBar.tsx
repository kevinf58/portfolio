'use client';

import Link from './Link';
import { FaCode } from 'react-icons/fa';

const NavBar = () => {
  return (
    <header
      className={`w-full fixed top-0 left-0 z-10 text-lg font-bold px-14 py-5 flex justify-between bg-light-black`}
    >
      <div className='flex items-center gap-2'>
        <FaCode />
        <h1>Kevin Feng</h1>
      </div>
      <div className='flex ml-auto gap-6'>
        <Link href={'/'}>Home</Link>
        <Link href={'projects'}>Projects</Link>
        <Link href={'/blog'}>Blog</Link>
        <Link href={'/contact'}>Contact</Link>
      </div>
    </header>
  );
};

export default NavBar;
