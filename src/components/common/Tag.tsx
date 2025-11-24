import { TagProps } from "@/types/components/TagProps.type";

const Tag = ({ className = "", ...props }: TagProps) => {
  // make it so that bg and text colors default to gray if none are provided in the className prop
  const hasBg = /\bbg-[^\s]+/.test(className);
  const hasText = /\btext-[^\s]+/.test(className);

  const mergedClasses = `${!hasBg && "bg-white/25"} ${!hasText && "text-white"} ${className}`.trim();
  return (
    <div
      onClick={props.onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs cursor-pointer select-none transition-colors duration-200 ${mergedClasses}`}
    >
      {props.children}
    </div>
  );
};

export default Tag;
