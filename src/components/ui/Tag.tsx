import { TagProps } from "@/types/components/ui/Tag.type";
import { JournalCategory } from "@/types/Journal.type";

const categoryColorMap: Record<JournalCategory, string> = {
  daily: "text-blue bg-blue/25",
  learning: "text-green bg-green/25",
  development: "text-yellow bg-yellow/25",
  recruiting: "text-purple bg-purple/25",
  trading: "text-orange bg-orange/25",
};

const Tag = ({ children, type, className = "", ...props }: TagProps) => {
  let colorClasses = "";
  // check for whether or not colors have been provided in the className
  const hasBg = /\bbg-[^\s]+/.test(className);

  if (type === "category") {
    colorClasses = categoryColorMap[children as JournalCategory];
  } else if (type === "tag") {
    colorClasses = hasBg ? "" : "text-dark-white bg-white/15";
  }

  return (
    <div
      onClick={props.onClick}
      className={`w-min h-min px-4 py-1.25 rounded-full text-xs cursor-pointer select-none transition-colors duration-200 whitespace-nowrap ${colorClasses}`}
    >
      {type === "category" ? children.toUpperCase() : children.charAt(0).toUpperCase() + children.slice(1)}
    </div>
  );
};

export default Tag;
