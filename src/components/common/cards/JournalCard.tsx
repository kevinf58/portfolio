import Card from "./Card";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTag } from "react-icons/fa";
import Tag from "../Tag";
import { CardProps } from "@/types/components/Card.props";
import { JournalType } from "@/types/api/Journal.type";

const JournalCard = (props: CardProps & Omit<JournalType, "id">) => {
  return (
    <Card href="/journal" className={`!w-60 group transition-discrete duration-150 ${props.className}`}>
      <div className="mx-4 my-5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-4">
            <h3 className="font-sans font-bold text-2xl text-1.5xl leading-7">{props.title}</h3>
            <FiArrowUpRight
              size={20}
              className="-translate-x-0.5 group-hover:translate-x-0 group-hover:-translate-y-0.5 duration-200"
            />
          </div>
          <h6 className="font-serif text-xs text-white/50 mb-5">Tuesday, April 21, 2024</h6>
          <p className="font-serif text-xs">This is a description...</p>
          <div className="flex flex-wrap space-x-2.5 space-y-2 font-sans text-xs mt-3">
            <Tag>TypeScript</Tag>
            <Tag>React</Tag>
            <Tag>Tailwind CSS</Tag>
          </div>
          <div className="flex items-center text-xs font-sans gap-1 mt-1">
            <FaTag />
            <h6>General</h6>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JournalCard;
