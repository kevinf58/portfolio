import { TagProps } from "@/types/components/TagProps.type";
import { Categories } from "@/types/Document.type";

const categoryBgMap: Record<Categories, string> = {
  DAILY: "text-blue bg-blue/25",
  LEARNING: "text-green bg-green/25",
  DEVELOPMENT: "text-yellow bg-yellow/25",
  RECRUITING: "text-purple bg-purple/25",
  TRADING: "text-red bg-red/25",
};

const Tag = ({ className = "", children, ...props }: TagProps) => {
  // make it so that bg defaults to gray if none are provided in the className prop
  const hasBg = /\bbg-[^\s]+/.test(className);

  const category = typeof children === "string" && (children as Categories);

  const categoryBg = category && categoryBgMap[category as Categories];

  const mergedClasses = `
    ${!hasBg && !props.onClick && categoryBg}
    ${!hasBg && props.onClick && "bg-white/25"}
    ${!hasBg && !categoryBg && "text-dark-white bg-white/10"}

    ${className}
  `.trim();

  return (
    <div
      onClick={props.onClick}
      className={`w-min h-min px-4 py-[5px] rounded-full text-xs cursor-pointer select-none transition-colors duration-200 whitespace-nowrap ${mergedClasses}`}
    >
      {children}
    </div>
  );
};

export default Tag;
