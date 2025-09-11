import { BaseCardProps } from "@/types/components/Card.props";
import { default as NextLink } from "next/link";

const Card = (props: BaseCardProps) => {
  return (
    <NextLink
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      href={props.href}
      onClick={props.onClick}
      target={props.target}
      title={props.title}
      className={`w-60 h-fit flex items-center px-4 pt-1.5 pb-2 gap-1 rounded-sm shadow-primary border-1 border-tint/10 bg-white/8 ${props.disabled ? "pointer-events-none brightness-70" : "hover:scale-105 duration-100 cursor-pointer"} ${props.className}`}
    >
      {props.children}
    </NextLink>
  );
};

export default Card;
