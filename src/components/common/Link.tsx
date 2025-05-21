import { LinkProps } from '@/types/LinkProps';
import { default as Nav } from 'next/link';

const Link = (props: LinkProps) => {
  return props.disabled ? (
    <span className={`relative w-min text-white/50 hover:cursor-default`}>
      <span className='relative'>{props.children}</span>
    </span>
  ) : (
    <Nav
      className={`relative w-min h-min flex justify-center text-white hover:text-primary before:bg-white before:absolute before:bottom-0 before:origin-bottom before:scale-y-[0] hover:before:scale-y-100 before:h-full before:w-full before:transition-transform before:duration-300 duration-300 before:ease-in-out hover:cursor-pointer'
      ${props.underlined && 'underline'} ${props.className}
        `}
      href={props.href}
      title={props.title}
      target={props.target}
      onClick={props.onClick}
    >
      {<span className='relative whitespace-nowrap'>{props.children}</span>}
    </Nav>
  );
};

export default Link;
