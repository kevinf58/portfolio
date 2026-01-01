import { CardProps } from "@/types/components/ui/Card.type";

const Card = ({ size = "sm", ...props }: CardProps) => {
  const defaultStyles = "border-1 hover:scale-105 duration-100 cursor-pointer px-4 pt-1.5 pb-2";
  const cardSizeStyles = size === "sm" ? `p-2 ${defaultStyles}` : size === "md" ? `p-4 ${defaultStyles}` : "p-8 border-2 max-w-3xl";

  const cardStyles = `w-fit h-full whitespace-nowrap flex gap-1 rounded-sm border-1 border-tint/10 bg-light-gray
        ${props.disabled && "pointer-events-none brightness-70"} ${props.className} ${cardSizeStyles}`;

  return (
    <div onClick={props.onClick} title={props.title} className={`${cardStyles}`}>
      {props.children}
    </div>
  );
};

export default Card;
