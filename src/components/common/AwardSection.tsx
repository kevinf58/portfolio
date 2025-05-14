import Box from './Box';
import { BiAward } from 'react-icons/bi';

const AwardSection = () => {
  return (
    <section className='w-full bg-black sm:px-32 px-6 py-24' id='scroll'>
      <h1 className='text-3xl font-medium lg:text-start text-center'>Awards</h1>
      <div className='flex flex-wrap justify-center gap-10 pt-10 pb-8'>
        <Box>
          <div className='flex'>
            <BiAward size={60} className='my-auto mr-6 text-primary' />
            <div className='flex flex-col w-48'>
              <span className='text-sm font-semibold'>2025 TD Scholarship in Computer Science</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-sm text-white/50 mt-2'>$600</h6>
            </div>
          </div>
        </Box>
        <Box>
          <div className='flex'>
            <BiAward size={60} className='my-auto mr-6 text-primary' />
            <div className='flex flex-col w-48'>
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
            <BiAward size={60} className='my-auto mr-6 text-primary' />
            <div className='flex flex-col w-48'>
              <span className='text-sm font-semibold'>2025 TD Scholarship in Computer Science</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-sm text-white/50 mt-2'>$600</h6>
            </div>
          </div>
        </Box>
      </div>
      <div className='h-0.5 bg-white/40 rounded-full sm:mx-20' />
    </section>
  );
};

export default AwardSection;
