import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';

const Socials = () => {
  return (
    <section className='absolute -right-18 flex flex-col gap-2.5 p-1.5 hover:-translate-x-18 transition-transform duration-200 ease-out bg-white border-l-2 border-y-2 border-primary text-black font-bold'>
      <a className='flex gap-1.5'>
        <FaLinkedin className='text-[#126BC5] text-2xl' />
        <span>LinkedIn</span>
      </a>
      <a className='flex gap-1.5'>
        <FaGithub className='text-black text-2xl' />
        <span>GitHub</span>
      </a>
      <a className='flex gap-1.5'>
        <IoIosMail className='text-black text-2xl' />
        <span>Email</span>
      </a>
    </section>
  );
};

export default Socials;
