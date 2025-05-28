import React from 'react';

const Interests = () => {
  return (
    <>
      <h1 className='text-3xl font-medium lg:text-start text-center'>Interests and Future Projects</h1>
      <div className='flex flex-col space-y-8 my-8'>
        <p className='mx-6'>
          Full Stack Web Development has been my primary focus during my post-graduate studies. As I
          continue to grow as a developer and individual, I&apos;m always looking to pursue new
          challenges and ideas to grow both professionally and personally. These are a few topics I’m
          interested to explore and continue improving on in the near future.
        </p>
        <div className='flex ml-2'>
          <div className='h-auto w-1 bg-primary rounded-full' />
          <ul className='w-full flex flex-col gap-y-2 list-disc ml-10 my-1 list-indent'>
            <li>Embedded Systems</li>
            <li>Blockchain technologies and smart contracts</li>
          </ul>
        </div>
        <div className='flex ml-2'>
          <div className='h-auto w-1 bg-primary rounded-full' />
          <ul className='w-full flex flex-col gap-y-2 list-disc ml-10 my-1 list-indent'>
            <li>Improving code maintainability and readability</li>
            <li>Learning more about Testing and QA</li>
            <li>Database design and optimization</li>
            <li>Web security</li>
          </ul>
        </div>
        <p className='mx-6 mt-8'>
          As for future projects these are some that I have in mind and the technologies I plan on
          develop them using.
        </p>
        <div className='flex ml-2'>
          <div className='h-auto w-1 bg-primary rounded-full' />
          <ul className='w-full flex flex-col gap-y-2 list-disc ml-10 my-1 list-indent'>
            <li>
              A Stock analytics platform that uses historical market data, sentimental analysis, and
              technical indicators to predict the performance of stocks. (NextJS • TypeScript •
              TailwindCSS • Python • AWS • AI models • stock and news API’s)
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Interests;
