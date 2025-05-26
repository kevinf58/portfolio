import Card from './common/Card';
import { FaReact, FaPython, FaCss3Alt, FaHtml5, FaDatabase, FaGitAlt, FaJava } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiTailwindcss } from 'react-icons/si';
import { RiNextjsFill } from 'react-icons/ri';

const Technologies = () => {
  return (
    <>
      <h1 className='text-3xl font-medium lg:text-start text-center'>Technologies</h1>
      <div className='flex flex-wrap gap-4 mt-8 mx-6'>
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
            <SiJavascript className='text-[#FFDF00] bg-black' />
            TypeScript
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
            <FaHtml5 className='text-[#FC490B]' />
            HTML
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
            <SiTailwindcss className='text-[#38BDF9]' />
            Tailwind CSS
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
            <RiNextjsFill className='text-[#161416]' />
            Next.JS
          </>
        </Card>
        <Card cardType='technology'>
          <>
            <FaGitAlt className='text-[#F2645A]' />
            Git
          </>
        </Card>
        <Card cardType='technology'>
          <>
            <FaJava className='text-[#DE8E2F]' />
            Java
          </>
        </Card>
      </div>
    </>
  );
};

export default Technologies;
