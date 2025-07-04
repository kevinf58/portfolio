'use client';

import Link from '@/components/common/Link';
import { PiMapPinSimpleFill } from 'react-icons/pi';
import Blinker from '@/components/common/Blinker';
import ScrollDown from '@/components/ScrollDown';
import Awards from '@/components/Awards';
import Divider from '@/components/common/Divider';
import Technologies from '@/components/Technologies';
import Projects from '@/components/Projects';
import Blogs from '@/components/Blogs';
import Interests from '@/components/Interests';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import Socials from '@/components/Socials';

export default function Home() {
  const currDeviceSize = useBreakpoint();

  return (
    <>
      <section className='relative h-[calc(100vh-4.75rem)] w-full flex flex-col sm:justify-center sm:pt-0 font-medium bg-light-black shadow-primary pt-20'>
        <div className='lg:w-[55%] w-full sm:px-20 px-2'>
          <div className='flex items-end pb-2'>
            <h1 className='text-5xl font-bold'>{"Hi, I'm Kevin"}</h1>
            <Blinker className='mb-1.5 ml-1' />
          </div>
          <div className='flex sm:flex-row sm:items-center sm:justify-start sm:gap-1 flex-col justify-center text-lg gap-0'>
            <span>I’m an aspiring developer based in </span>
            <div className='flex items-center gap-1.5 whitespace-nowrap'>
              Toronto, ON
              <PiMapPinSimpleFill />
            </div>
          </div>
          <div className='flex ml-5 my-8'>
            <div className='h-auto w-1.5 bg-primary rounded-full' />
            <ul className='flex flex-col gap-y-2 list-disc ml-10 my-1'>
              <li>
                I thrive in environments where I can learn, collaborate, and contribute to bringing
                innovative ideas to life
              </li>
              <li>My favorite tools are TypeScript, React, and Tailwind</li>
              <li>
                Besides coding, I also enjoy biking long distances, going to the gym, and watching horror
                movies
              </li>
            </ul>
          </div>
          <h6 className='flex gap-1'>
            {"Let's"}
            <Link href={'/contact'} underlined className='px-0.5'>
              Connect!
            </Link>
          </h6>
        </div>
        {currDeviceSize !== 'sm' && currDeviceSize !== 'md' && <Socials />}
        <ScrollDown />
      </section>
      <section className='w-full sm:px-32 px-6 py-32 bg-black shadow-primary' id='scroll'>
        <div className='max-w-7xl mx-auto'>
          <Awards />
          <Divider />
          <Technologies />
          <Divider />
          <Projects />
          <Divider />
          <Blogs />
          <Divider />
          <Interests />
        </div>
      </section>
      {/* <section className='h-screen w-full bg-green-300' /> */}
    </>
  );
}
