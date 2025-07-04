'use client';

import Link from '@/components/common/Link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import Divider from './Divider';
import copyText from '@/utils/copyText';

const Footer = () => {
  return (
    <footer className='sticky bottom-0 w-full items-center md:px-18 md:py-10 lg:px-40 px-4 py-6 bg-light-black font-medium text-xs'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col gap-4 items-center sm:scale-100 scale-70'>
          <div className='flex gap-6 !text-white/50'>
            <Link href={'/'}>Home</Link>
            <Link href={'projects'}>Projects</Link>
            <Link href={'/blog'}>Blog</Link>
            <Link href={'/contact'}>Contact</Link>
          </div>
          <div className='flex gap-1'>
            Built with
            <Link
              href={'https://nextjs.org/'}
              underlined
              title={`${'https://nextjs.org/'}`}
              target='_blank'
            >
              Next.js
            </Link>
            •
            <Link
              href={'https://www.typescriptlang.org/'}
              underlined
              title={`${'https://www.typescriptlang.org/'}`}
              target='_blank'
            >
              TypeScript
            </Link>
            •
            <Link
              href={'https://react.dev/'}
              underlined
              title={`${'https://react.dev/'}`}
              target='_blank'
            >
              React
            </Link>
          </div>
          <div className='flex sm:flex-row sm:items-start flex-col items-center gap-1'>
            <span>Want to read about my journey developing this web app?</span>
            <Link href={'https://react.dev/'} underlined>
              Click here!
            </Link>
          </div>
        </div>
        <Divider className='!bg-white/10 !mb-10 !mt-6' />
        <div className='w-full relative flex md:flex-row md:justify-between md:gap-0 md:mb-8 sm:scale-100 flex-col items-center justify-center gap-4 scale-70'>
          <div className='flex items-center gap-2'>
            <a
              className='flex items-center justify-center w-7 h-7 border-1 border-white/20 rounded-full'
              href='https://www.linkedin.com/in/kfengg/'
              title={`${'https://www.linkedin.com/in/kfengg/'}`}
              target='_blank'
            >
              <FaLinkedin />
            </a>
            <a
              className='flex items-center justify-center w-7 h-7 border-1 border-white/20 rounded-full'
              href='https://github.com/kevinf58'
              title={`${'https://github.com/kevinf58'}`}
              target='_blank'
            >
              <FaGithub />
            </a>
            <>
              <a
                className='flex items-center justify-center w-7 h-7 border-1 border-white/20 rounded-full lg:hover:cursor-pointer'
                href='mailto:kfeng58@uwo.ca'
                title={`${'kfeng58@uwo.ca'}`}
                target='_blank'
              >
                <MdMail />
              </a>
              <button
                onClick={copyText}
                title='Click to copy email'
                className='flex items-center lg:hover:cursor-pointer underline'
              >
                kfeng58@uwo.ca
              </button>
            </>
          </div>
          <h6 className='flex gap-1'>
            Released under the
            <Link
              underlined
              href={'https://mit-license.org/'}
              title={`${'https://mit-license.org/'}`}
              target='_blank'
            >
              MIT License
            </Link>
          </h6>
          <h6>© 2025 Kevin Feng. All rights reserved.</h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
