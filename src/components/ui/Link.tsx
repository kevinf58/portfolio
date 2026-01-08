import { LinkProps } from "@/types/components/ui/Link.type";
import { default as NextLink } from "next/link";

const Link = ({ target = "_self", ...props }: LinkProps) => {
  const linkStyles = `relative w-min h-min flex justify-center text-white ${
    !props.static &&
    "lg:hover:text-primary before:bg-white before:absolute before:bottom-0 before:origin-bottom before:scale-y-[0] lg:hover:before:scale-y-100 before:h-full before:w-full before:transition-transform before:duration-300 duration-300 before:ease-in-out lg:hover:cursor-pointer"
  }'
      ${props.underlined && "underline"} ${props.className}
        `;

  return (
    <NextLink className={linkStyles} href={props.href} title={props.title} target={target}>
      {<span className="relative flex items-center w-max gap-1 whitespace-nowrap px-0.5">{props.children}</span>}
    </NextLink>
  );
};

export default Link;
