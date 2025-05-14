import Link from '@/components/common/Link';
import { PiMapPinSimpleFill } from 'react-icons/pi';
import Blinker from '@/components/common/Blinker';
import ScrollDown from '@/components/ScrollDown';
import AwardSection from '@/components/common/AwardSection';

export default function Home() {
  return (
    <>
      <section className='relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-light-black shadow-primary'>
        <div className='w-[55%] pl-20'>
          <div className='flex items-end pb-2'>
            <h1 className='text-5xl font-bold'>{"Hi, I'm Kevin"}</h1>
            <Blinker className='mb-1.5 ml-1' />
          </div>
          <div className='flex gap-1.5 items-center'>
            <h6 className='text-lg'>I’m an aspiring developer based in Toronto, ON</h6>
            <PiMapPinSimpleFill />
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
        <ScrollDown />
      </section>
      <AwardSection />
      <section className='h-screen w-full bg-green-300' />
    </>
  );
}
