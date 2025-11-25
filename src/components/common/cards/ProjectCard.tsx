import { FaTag } from "react-icons/fa";
import { Project } from "@/types/Document.type";
import truncateText from "@/utils/TruncateText";
import { stripMarkdown } from "@/utils/stripMarkdown";
import Image from "next/image";
import { dateToReadable } from "@/utils/dateUtils";
import Tag from "../Tag";
import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const ProjectCard = (props: Project) => {
  return (
    <a
      href={`/${props.type}/${props.id}`}
      className="block w-[30rem] rounded-2xl overflow-hidden bg-gray hover:shadow-2xl transition-shadow duration-400 group"
    >
      {props.imagePreviewLink && (
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={props.imagePreviewLink}
            alt={props.title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-103"
          />
        </div>
      )}
      <div className="flex flex-col px-8 py-6 space-y-4 h-58">
        <div>
          <h1 className="text-2xl font-semibold leading-7">{props.title}</h1>
          <h6 className="text-xs text-dark-white">{dateToReadable(props.date)}</h6>
        </div>
        <p className="text-sm -mt-2">{truncateText(stripMarkdown(props.markdown), "markdown")}</p>
        <div className="flex space-x-2">
          {props.tags.map((tag) => (
            <Tag href="" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm flex items-center space-x-2">
            <span>View Project</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          <FaGithub className="text-xl" />
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
