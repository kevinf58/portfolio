import { BaseCardProps } from "@/types/components/Card.props";
import { default as NextLink } from "next/link";

const Card = (props: BaseCardProps) => {
  const cardStyles = `h-fit flex px-4 pt-1.5 pb-2 gap-1 rounded-sm border-1 border-tint/10 bg-white/8 hover:scale-105 duration-100 cursor-pointer
        ${props.disabled && "pointer-events-none brightness-70"} ${props.className}`;

  return props.href ? (
    <NextLink
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      href={props.href}
      onClick={props.onClick}
      target={props.target}
      title={props.title}
      className={`w-60 ${cardStyles}`}
    >
      {props.children}
    </NextLink>
  ) : (
    <div onClick={props.onClick} title={props.title} className={`w-fit whitespace-nowrap ${cardStyles}`}>
      {props.children}
    </div>
  );
};

export default Card;
