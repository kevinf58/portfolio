import Card from "./Card";
import { FiArrowUpRight } from "react-icons/fi";
import { FaArrowRight, FaTag } from "react-icons/fa";
import { Journal } from "@/types/Document.type";
import truncateText from "@/utils/TruncateText";
import { stripMarkdown } from "@/utils/stripMarkdown";
import { dateToReadable } from "@/utils/dateUtils";
import Tag from "../Tag";
import readingTime from "reading-time";

const JournalCard = (props: Journal) => {
  return (
    <a href={`/${props.type}/${props.id}`}>
      <div className="hover:bg-gray transition-colors duration-400 px-10 py-8 cursor-pointer group">
        <div className="flex items-center gap-2">
          <Tag>{props.category}</Tag>
          <h6 className="text-xs text-dark-white">{dateToReadable(props.date)}</h6>
          <span className="text-dark-white">•</span>
          <h6 className="text-xs text-dark-white">{readingTime(props.markdown).text}</h6>
        </div>
        <h1 className="text-2xl font-bold my-4">{props.title}</h1>
        <p className="text-sm font-light mb-3">{truncateText(stripMarkdown(props.markdown), "markdown")}</p>
        <div className="flex space-x-2">
          {props.tags.map((tag) => (
            <Tag href="" key={tag}>
              {tag}
            </Tag>
          ))}
          <a className="flex items-center ml-auto">
            <span className="text-sm flex items-center space-x-2">
              <span>View Project</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </a>
        </div>
      </div>
    </a>
  );
};

export default JournalCard;
