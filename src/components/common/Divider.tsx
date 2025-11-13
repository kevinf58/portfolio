import { DividerProps } from "@/types/components/Divider.type";

const Divider = (props: DividerProps) => {
  return <div className={`max-w-7xl h-0.5 bg-light-gray rounded-full sm:mx-20 mt-8 mb-16 ${props.className}`} />;
};

export default Divider;
