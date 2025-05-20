import { BsChevronCompactDown } from 'react-icons/bs';

const ScrollDown = () => {
  return (
    <a className='flex group justify-center w-full absolute bottom-6' href='#scroll'>
      <div>
        <h6 className='text-white/40 text-sm'>Scroll Down</h6>
        <BsChevronCompactDown className='w-full h-auto text-white/40 px-4 -mt-4 group-hover:animate-bounce cursor-pointer' />
      </div>
    </a>
  );
};

export default ScrollDown;
