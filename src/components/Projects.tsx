import { Button } from './common/Button';
import Link from 'next/link';
import Card from './common/Card';
import { FaArrowRightLong } from 'react-icons/fa6';
import { AiFillTool } from 'react-icons/ai';
import VerticalCarousel from './common/VerticalCarousel';

const Projects = () => {
  const projectImgs = [
    '/images/Portfolio-01.png',
    '/images/Portfolio-02.png',
    '/images/Portfolio-03.png',
    '/images/Portfolio-04.png',
    '/images/Portfolio-05.png',
    '/images/Portfolio-06.png',
    '/images/Portfolio-07.png',
    '/images/Portfolio-08.png',
    '/images/Portfolio-09.png',
    '/images/Portfolio-10.png',
    '/images/Portfolio-11.png',
    '/images/Portfolio-12.png',
    '/images/Portfolio-13.png',
    '/images/Portfolio-14.png',
  ];

  return (
    <>
      <h1 className='text-3xl lg:text-start text-center'>Projects</h1>
      <div className='my-8 mx-6'>
        <p>
          Over the years, I’ve worked on a variety of independent and collaborative projects to grow as a
          developer and challenge myself. Each of the cards below offers a closer look at my development
          journey - sharing the reasoning behind my decisions, any challenges I encountered, and the
          lessons I learned throughout the process of building each project. Here are a few that I’m
          particularly proud of.
        </p>
      </div>
      <div className='w-full flex sm:px-12 sm:justify-start justify-center gap-6'>
        <Card cardType='project'>
          <div className='p-4'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold mr-2'>This Portfolio Website!</span> <FaArrowRightLong />
            </div>
            <VerticalCarousel className='h-27 w-auto mx-auto mt-3 mb-5' images={projectImgs} />
            <div className='flex gap-3'>
              <AiFillTool className='w-6 h-5' />
              <span className='text-xs font-medium'>NextJS • TypeScript • Tailwind • AWS • Redux</span>
            </div>
            <div className='flex items-center gap-3 mt-2 mb-6'>
              <span className='size-3 bg-green rounded-full' />
              <span className='text-xs'>Completed</span>
            </div>
            <span className='text-xs text-white/40'>Tues, Apr 22nd, 2025</span>
          </div>
        </Card>
      </div>
      <Button>
        <Link href={'/projects'}>View my Projects</Link>
      </Button>
    </>
  );
};

export default Projects;
