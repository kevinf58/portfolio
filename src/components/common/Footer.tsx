import Link from '@/components/common/Link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className='fixed bottom-0 -mb-4 w-full items-center px-28 py-10 bg-light-black font-medium text-xs inset-shadow-primary'>
      <div className='flex flex-col gap-4 items-center'>
        <div className='flex gap-6 !text-white/50'>
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
          <Link href={'https://react.dev/'} underlined title={`${'https://react.dev/'}`} target='_blank'>
            React
          </Link>
        </div>
        <div className='flex gap-1'>
          Want to read about my journey developing this web app?
          <Link href={'https://react.dev/'} underlined>
            Click here!
          </Link>
        </div>
      </div>
      <div className='w-full h-0.5 bg-white/10 rounded-full mb-8 mt-6' />
      <div className='w-full relative flex items-center justify-between mb-8'>
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
              className='flex items-center justify-center w-7 h-7 border-1 border-white/20 rounded-full hover:cursor-pointer'
              href='mailto:kfeng58@uwo.ca'
              title={`${'kfeng58@uwo.ca'}`}
              target='_blank'
            >
              <MdMail />
            </a>
            <Link underlined href={'/'} className='flex items-center'>
              kfeng58@uwo.ca
            </Link>
          </>
        </div>
        <h6 className='absolute left-1/2 transform -translate-x-1/2 flex gap-1'>
          Released under the{' '}
          <Link
            underlined
            href={'https://mit-license.org/'}
            title={`${'https://mit-license.org/'}`}
            target='_blank'
          >
            MIT License
          </Link>
        </h6>
        <h6 className='ml-auto'>© 2025 Kevin Feng. All rights reserved.</h6>
      </div>
    </footer>
  );
};

export default Footer;
