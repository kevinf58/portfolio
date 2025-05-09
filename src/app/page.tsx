import Link from '@/components/common/Link';
import { PiMapPinSimpleFill } from 'react-icons/pi';
import { BsChevronCompactDown } from 'react-icons/bs';

export default function Home() {
  return (
    <section className='h-screen w-full absolute top-0 left-0 flex flex-col justify-center font-medium bg-white/2'>
      <div className='w-[55%] pl-20'>
        <div className='flex items-end pb-2'>
          <h1 className='text-5xl font-bold'>{"Hi, I'm Kevin"}</h1>
          <div className='h-1.5 w-6 bg-primary animate-blink mb-1.5 ml-1' />
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
        <h6>
          {"Let's"}
          <Link href={'/contact'} underlined>
            Connect!
          </Link>
        </h6>
      </div>
      <div className='flex w-full justify-center'>
        <div className='flex flex-col whitespace-nowrap text-nowrap'>
          <h6 className='text-white/40 whitespace-nowrap text-nowrap'>Scroll Down</h6>
          <BsChevronCompactDown className='w-full h-auto text-white/40 px-4 -mt-4 hover:animate-bounce cursor-pointer' />
        </div>
      </div>
    </section>
  );
}
