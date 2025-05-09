import Link from '@/components/common/Link';

const Footer = () => {
  return (
    <section className='w-full flex flex-col mt-auto items-center px-14 py-5 bg-light-black font-medium text-xs'>
      <div>
        Built with
        <Link href={'https://nextjs.org/'} underlined>
          Next.js
        </Link>
        •
        <Link href={'https://www.typescriptlang.org/'} underlined>
          TypeScript
        </Link>
        •
        <Link href={'https://react.dev/'} underlined>
          React
        </Link>
      </div>
      <div>
        Want to read about my journey developing this web app? Click
        <Link href={'https://react.dev/'} underlined>
          here!
        </Link>
      </div>
      <h6>© 2025 Kevin Feng. All rights reserved.</h6>
      <h6>Released under the MIT License.</h6>
    </section>
  );
};

export default Footer;
