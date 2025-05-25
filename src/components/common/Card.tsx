import { CardProps } from '@/types/CardProps';

const Card = (props: CardProps) => {
  
  
  return (
    <div
      className={`relative bg-white/8 rounded-xl shadow-primary ${props.className} ${
        props.cardType === 'projects' ? 'w-72 px-6 py-4' : 'w-72 px-6 py-4'
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
