import Card from './common/Card';
import { FaReact, FaPython, FaCss3Alt, FaHtml5, FaDatabase, FaGitAlt, FaJava } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiTailwindcss } from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';

const TechStack = () => {
  return (
    <div className='flex justify-center lg:items-stretch items-center lg:flex-row flex-col gap-8 mt-32 mb-40'>
      <div className='md:w-96 w-80 border-3 border-white/8 md:px-10 md:py-8 px-5 py-4 rounded-md'>
        <h1 className='text-2xl lg:text-start'>Tech Stack</h1>
        <div className='flex flex-wrap gap-4 mt-6'>
          <Card cardType='technology'>
            <>
              <FaReact className='text-[#30A2FF]' />
              React
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <SiTypescript className='text-[#3178C6] bg-white rounded-xs' />
              TypeScript
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <RiNextjsFill className='text-[#161416]' />
              Next.JS
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <SiTailwindcss className='text-[#38BDF9]' />
              Tailwind CSS
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <FaHtml5 className='text-[#FC490B]' />
              HTML
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <FaPython className='text-[#336D9C]' />
              Python
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <FaGitAlt className='text-[#F2645A]' />
              Git
            </>
          </Card>
        </div>
      </div>
      <div className='md:w-96 w-80 border-3 border-white/8 md:px-10 snm:py-8 px-5 py-4 rounded-md'>
        <h1 className='text-2xl lg:text-start'>Other Technologies</h1>
        <div className='flex flex-wrap gap-4 mt-6'>
          <Card cardType='technology'>
            <>
              <SiTypescript className='text-[#3178C6] bg-white rounded-xs' />
              TypeScript
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <SiJavascript className='text-[#FFDF00] bg-black' />
              JavaScript
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <FaCss3Alt className='text-[#2196F3]' />
              CSS
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <FaDatabase className='text-white' />
              SQL
            </>
          </Card>
          <Card cardType='technology'>
            <>
              <FaJava className='text-[#DE8E2F]' />
              Java
            </>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
