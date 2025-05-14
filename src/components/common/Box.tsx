import { BoxProps } from '@/types/BoxProps';

const Box = (props: BoxProps) => {
  return (
    <div className='w-88 min-w-[19.25rem] px-6 py-4 bg-white/8 rounded-xl shadow-primary'>
      {props.children}
    </div>
  );
};

export default Box;
