import { LinkProps } from '@/types/LinkProps';
import { default as NextLink } from 'next/link';

const Link = (props: LinkProps) => {
  return props.disabled ? (
    <span className={`relative w-min text-white/50 lg:hover:cursor-default`}>
      <span className='relative'>{props.children}</span>
    </span>
  ) : (
    <NextLink
      className={`relative w-min h-min flex justify-center text-white lg:hover:text-primary before:bg-white before:absolute before:bottom-0 before:origin-bottom before:scale-y-[0] lg:hover:before:scale-y-100 before:h-full before:w-full before:transition-transform before:duration-300 duration-300 before:ease-in-out lg:hover:cursor-pointer'
      ${props.underlined && 'underline'} ${props.className}
        `}
      href={props.href}
      title={props.title}
      target={props.target}
      onClick={props.onClick}
    >
      {<span className='relative whitespace-nowrap'>{props.children}</span>}
    </NextLink>
  );
};

export default Link;
