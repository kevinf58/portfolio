import Card from "./Card";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTag } from "react-icons/fa";
import Tag from "../Tag";
import { CardProps } from "@/types/components/Card.props";
import { JournalType } from "@/types/api/Journal.type";
import truncateText from "@/utils/TruncateText";
import { stripMarkdown } from "@/utils/stripMarkdown";

const JournalCard = (props: CardProps & JournalType) => {
  return (
    <Card href={`/journal/${props.id}`} className={`!w-60 group transition-discrete duration-150 ${props.className}`}>
      <div className="mx-4 my-5 h-full w-full overflow-hidden">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-4 min-w-0">
            <h3 className="font-sans font-bold text-2xl text-1.5xl truncate leading-7 min-w-0">
              {stripMarkdown(truncateText(props.title, "title"))}
            </h3>

            <div className="flex-shrink-0">
              <FiArrowUpRight
                size={20}
                className="transition-transform duration-200 -translate-x-0.5 group-hover:translate-x-0 group-hover:-translate-y-0.5"
              />
            </div>
          </div>

          <h6 className="font-serif text-xs text-white/50 mb-5">
            {Intl.DateTimeFormat("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(props.date)}
          </h6>
          <p className="font-serif text-xs break-words">{stripMarkdown(truncateText(props.markdown, "markdown"))}</p>
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
