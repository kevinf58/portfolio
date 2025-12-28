import { CardProps } from "@/types/components/ui/Card.type";

//TODO: HANDLE SIZE PROP
const Card = ({ size = "sm", ...props }: CardProps) => {
  //TODO: CHANGE THESE TEMPORARY PADDING STYLES
  const cardSizeStyles = size === "sm" ? "p-2" : size === "md" ? "p-4" : "p-8";

  const cardStyles = `h-fit flex px-4 pt-1.5 pb-2 gap-1 rounded-sm border-1 border-tint/10 bg-light-gray hover:scale-105 duration-100 cursor-pointer
        ${props.disabled && "pointer-events-none brightness-70"} ${props.className} ${cardSizeStyles}`;

  return (
    <div onClick={props.onClick} title={props.title} className={`w-fit whitespace-nowrap ${cardStyles}`}>
      {props.children}
    </div>
  );
};

export default Card;
