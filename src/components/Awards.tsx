import Box from './common/Box';
import { BiAward } from 'react-icons/bi';

const Awards = () => {
  return (
    <>
      <h1 className='text-3xl font-medium lg:text-start text-center'>Awards</h1>
      <div className='flex flex-wrap justify-center gap-10 mt-10'>
        <Box>
          <div className='h-full flex'>
            <BiAward size={70} className='my-auto mr-6 text-primary' />
            <div className='flex flex-col w-48'>
              <span className='text-sm font-semibold'>2025 TD Scholarship in Computer Science</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-xs text-white/50 mt-1'>$1500</h6>
            </div>
          </div>
        </Box>
        <Box>
          <div className='h-full flex'>
            <BiAward size={70} className='my-auto mr-6 text-primary' />
            <div className='flex flex-col w-48'>
              <span className='text-sm font-semibold'>2024 Toronto Tech Expo Winner</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-xs text-white/50 mt-1'>$600</h6>
            </div>
          </div>
        </Box>
        <Box>
          <div className='h-full flex'>
            <BiAward size={70} className='my-auto mr-6 text-primary' />
            <div className='flex flex-col w-48'>
              <span className='text-sm font-semibold'>2025 TD Scholarship in Computer Science</span>
              <span className='text-xs text-white/50 my-1 break-words'>
                Awarded for Academic Excellence
              </span>
              <h6 className='text-xs text-white/50 mt-1'>$1500</h6>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Awards;
