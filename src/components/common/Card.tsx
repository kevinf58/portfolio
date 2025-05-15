import { CardProps } from "@/types/CardProps";

const Card = (props: CardProps) => {
  return (
    <div className={`w-72 px-6 py-4 bg-white/8 rounded-xl shadow-primary ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
