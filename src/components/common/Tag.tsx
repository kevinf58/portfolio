import { TagProps } from "@/types/TagProps";

const Tag = (props: TagProps) => {
  return (
    <button className="w-fit h-fit flex items-center px-4 pt-1.5 pb-2 gap-1 bg-white/8 rounded-sm shadow-primary border-1 border-tint/10 hover:scale-105 duration-100 cursor-pointer">
      {props.children}
    </button>
  );
};

export default Tag;
