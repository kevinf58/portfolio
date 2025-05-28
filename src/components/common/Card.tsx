import { CardProps } from "@/types/CardProps";

const Card = (props: CardProps) => {
  /**
   * do something like this when applying conditional styles for 2+ conditions
   * from now in instead of the garbage a ? '' : b ? '' : c ? '' ...
   */
  const cardStyles = {
    project: 'w-68 p-6',
    blog: 'w-64 p-6',
    award: 'w-76 px-6 py-4',
    technology: 'w-fit px-4.5 py-1.5 flex items-center text-sm font-medium gap-1.5',
  };

  return (
    <div
      className={`relative bg-white/8 rounded-md shadow-primary ${props.className} ${
        cardStyles[props.cardType]
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
