import { BlinkerProps } from "@/types/BlinkerProps";

const Blinker = (props: BlinkerProps) => {
  return <div className={`h-1.5 w-6 bg-primary animate-blink ${props.className}`} />;
};

export default Blinker;
