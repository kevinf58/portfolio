import { DividerProps } from '@/types/DividerProps';

const Divider = (props: DividerProps) => {
  return <div className={`max-w-7xl h-[0.05rem] bg-white/10 rounded-full sm:mx-20 mt-8 mb-16 ${props.className}`} />;
};

export default Divider;
