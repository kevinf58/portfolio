import { CardProps } from "@/types/CardProps";

const Card = (props: CardProps) => {
  return (
    <a
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      {...(props.href ? { href: props.href } : {})}
      className={`w-60 h-fit flex items-center px-4 pt-1.5 pb-2 gap-1 bg-white/8 rounded-sm shadow-primary border-1 border-tint/10 hover:scale-105 duration-100 cursor-pointer ${props.className}`}
    >
      {props.children}
    </a>
  );
};

export default Card;
