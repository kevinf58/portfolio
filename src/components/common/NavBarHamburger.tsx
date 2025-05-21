import { useState, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import Link from './Link';

const NavBarHamburger = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-screen bg-light-black px-8 pb-5 pt-7 transform transition-transform duration-200 ease-in z-20 ${
          open ? 'translate-y-0 shadow-primary' : '-translate-y-full'
        }`}
      >
        <div className='flex items-center gap-2'>
          <FaCode />
          <h1>Kevin Feng</h1>
          <IoClose className='text-white ml-auto hover:cursor-pointer' size={30} onClick={toggleMenu} />
        </div>
        <div className='flex flex-col items-center mt-8 gap-6'>
          <Link href={'/'} className='px-1.5' onClick={toggleMenu}>
            Home
          </Link>
          <Link href={'projects'} className='px-1.5' onClick={toggleMenu}>
            Projects
          </Link>
          <Link href={'/blog'} className='px-1.5' onClick={toggleMenu}>
            Blog
          </Link>
          <Link href={'/contact'} className='px-1.5' onClick={toggleMenu}>
            Contact
          </Link>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black/30 transform transition-transform duration-200 ease-in z-10 ${
          open ? 'translate-y-0 shadow-primary' : '-translate-y-full'
        }`}
        onClick={toggleMenu}
      />
      <IoMenu className='text-white h-full hover:cursor-pointer' size={30} onClick={toggleMenu} />
    </div>
  );
};

export default NavBarHamburger;
