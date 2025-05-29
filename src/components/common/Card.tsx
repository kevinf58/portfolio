import { CardProps } from '@/types/CardProps';

const Card = (props: CardProps) => {
  /**
   * do something like this when applying conditional styles for 2+ conditions
   * from now in instead of the garbage a ? '' : b ? '' : c ? '' ...
   */
  const cardStyles = {
    project: 'w-68 p-6 bg-white/8 shadow-primary',
    blog: 'w-64 p-6 bg-white/8 shadow-primary',
    award: 'w-76 px-6 py-4 hover:bg-white/8 transition-colors duration-200',
    technology: 'w-fit px-4.5 py-1.5 flex items-center text-sm font-medium gap-1.5 bg-white/8 shadow-primary',
  };

  return (
    <div
      className={`relative rounded-md ${props.className} ${cardStyles[props.cardType]}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
