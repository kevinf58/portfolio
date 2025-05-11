'use client';

import Link from './Link';
import { FaCode } from 'react-icons/fa';

const NavBar = () => {
  return (
    <section
      className={`w-full text-lg font-bold px-14 py-5 flex justify-between bg-light-black`}
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
