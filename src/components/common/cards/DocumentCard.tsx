import { Journal, Project } from "@/types/Document.type";
import Image from "next/image";
import { dateToReadable } from "@/utils/dateUtils";
import Tag from "../Tag";
import { FaArrowRight } from "react-icons/fa6";
import summarizeMarkdown from "@/utils/summarizeMarkdown";
import readingTime from "reading-time";

const DocumentCard = (props: Journal | Project) => {
  const titleElement = <h1 className="text-2xl font-bold my-4">{props.title}</h1>;

  const conditionalElement =
    props.type === "journal" ? (
      <div className="flex items-center gap-2">
        <Tag>{props.category}</Tag>
        <h6 className="text-xs text-dark-white">{dateToReadable(props.date)}</h6>
        <span className="text-dark-white">•</span>
        <h6 className="text-xs text-dark-white">{readingTime(props.markdown).text}</h6>
      </div>
    ) : (
      <>
        {titleElement}
        <h6 className="text-xs text-dark-white">{dateToReadable(props.date)}</h6>
      </>
    );

  return (
    <a href={`/${props.type}/${props.id}`}>
      <div className="flex hover:bg-gray transition-colors duration-200 px-10 py-8 cursor-pointer group gap-4">
        {props.type === "project" && props.imagePreviewLink && (
          <div className="relative w-60 h-38 flex-shrink-0 overflow-hidden rounded-sm">
            <Image
              src={props.imagePreviewLink}
              alt={props.title}
              fill
              className="object-cover object-center transition-transform duration-400 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col w-full">
          {props.type === "journal" && conditionalElement}
          <div className={`flex items-center ${props.type === "project" ? "justify-between" : "gap-2"}`}>
            {props.type === "project" && conditionalElement}
          </div>
          {props.type === "journal" && titleElement}
          <p className="text-sm font-light mb-3">{summarizeMarkdown(props.markdown)}</p>
          <div className="flex space-x-2">
            {props.tags.map((tag) => (
              <Tag href="" key={tag}>
                {tag}
              </Tag>
            ))}
            <div className="flex items-center ml-auto">
              <span className="text-sm flex items-center space-x-2">
                <span>View Project</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default DocumentCard;
