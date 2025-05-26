import copyText from '@/utils/copyText';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';

const Socials = () => {
  return (
    <div className='fixed -right-18 flex flex-col gap-2.5 p-1.5 lg:hover:-translate-x-18 transition-transform duration-200 ease-out bg-white border-l-2 border-y-2 border-primary text-black font-bold'>
      <a
        className='flex items-center gap-1.5'
        href='https://www.linkedin.com/in/kfengg/'
        title={`${'https://www.linkedin.com/in/kfengg/'}`}
        target='_blank'
      >
        <FaLinkedin className='text-[#126BC5] text-2xl' />
        <span>LinkedIn</span>
      </a>
      <a
        className='flex items-center gap-1.5'
        href='https://github.com/kevinf58'
        title={`${'https://github.com/kevinf58'}`}
        target='_blank'
      >
        <FaGithub className='text-black text-2xl' />
        <span>GitHub</span>
      </a>
      <a className='flex items-center gap-1.5' onClick={copyText} title='Click to copy email'>
        <IoIosMail className='text-black text-2xl' />
        <span>Email</span>
      </a>
    </div>
  );
};

export default Socials;
