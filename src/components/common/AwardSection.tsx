import Box from './Box';
import { BiAward } from 'react-icons/bi';

const AwardSection = () => {
  return (
    <section className='w-full bg-black px-32 py-24' id='scroll'>
      <h1 className='text-3xl font-medium lg:text-start text-center'>Awards</h1>
      <div className='flex flex-wrap justify-center mx-10 my-12 gap-6'>
        <Box>
          <div className='flex'>
            <BiAward className='w-20 h-auto mr-6 my-auto text-primary' />
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>2024 TD Scholarship in Computer Science</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-sm text-white/50 mt-2'>$1500</h6>
            </div>
          </div>
        </Box>
        <Box>
          <div className='flex'>
            <BiAward className='w-20 h-auto mr-6 my-auto text-primary' />
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>2024 Toronto Tech Expo Winner</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-sm text-white/50 mt-2'>$600</h6>
            </div>
          </div>
        </Box>
        <Box>
          <div className='flex'>
            <BiAward className=' w-20 h-auto mr-6 my-auto text-primary' />
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>2023 TD Scholarship in Computer Science</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-sm text-white/50 mt-2'>$1500</h6>
            </div>
          </div>
        </Box>
      </div>
      <div className='h-0.5 bg-white/40 rounded-full sm:mx-10' />
    </section>
  );
};

export default AwardSection;
