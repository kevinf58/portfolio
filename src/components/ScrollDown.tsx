import { BsChevronCompactDown } from 'react-icons/bs';

const ScrollDown = () => {
  return (
    <a className='flex justify-center w-full absolute bottom-6' href='#scroll'>
      <div className='flex flex-col whitespace-nowrap text-nowrap'>
        <h6 className='text-white/40 whitespace-nowrap text-nowrap'>Scroll Down</h6>
        <BsChevronCompactDown className='w-full h-auto text-white/40 px-4 -mt-4 hover:animate-bounce cursor-pointer' />
      </div>
    </a>
  );
};

export default ScrollDown;
