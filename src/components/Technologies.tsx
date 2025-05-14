import Box from './common/Box';
import { FaReact, FaPython, FaCss3Alt, FaHtml5, FaDatabase, FaGitAlt, FaJava } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiTailwindcss } from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';

const Technologies = () => {
  return (
    <>
      <h1 className='text-3xl font-medium lg:text-start text-center'>Technologies</h1>
      <div className='flex flex-wrap gap-4 mt-8 mx-6'>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <FaReact className='text-[#30A2FF]' />
            React
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <SiTypescript className='text-[#3178C6] bg-white rounded-xs' />
            TypeScript
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <SiJavascript className='text-[#FFDF00] bg-black' />
            TypeScript
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <FaPython className='text-[#336D9C]' />
            Python
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <FaHtml5 className='text-[#FC490B]' />
            HTML
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <FaCss3Alt className='text-[#2196F3]' />
            CSS
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <SiTailwindcss className='text-[#38BDF9]' />
            Tailwind CSS
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <FaDatabase className='text-white' />
            SQL
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <RiNextjsFill className='text-[#161416]' />
            Next.JS
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <FaGitAlt className='text-[#F2645A]' />
            Git
          </>
        </Box>
        <Box className='w-fit !px-4.5 !py-1.5 flex items-center text-sm font-medium gap-1'>
          <>
            <FaJava className='text-[#DE8E2F]' />
            Java
          </>
        </Box>
      </div>
    </>
  );
};

export default Technologies;
