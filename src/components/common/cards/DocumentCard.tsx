import Card from "./Card";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTag } from "react-icons/fa";
import { CardProps } from "@/types/components/Card.props";
import { Journal, Project } from "@/types/api/Document.type";
import truncateText from "@/utils/TruncateText";
import { stripMarkdown } from "@/utils/stripMarkdown";
import Image from "next/image";
import { dateToReadable } from "@/utils/dateUtils";

const DocumentCard = (props: CardProps & (Journal | Project)) => {
  return (
    <Card
      href={`/${props.type}/${props.id}`}
      className={`group transition-discrete duration-150 min-w-0 ${props.className}`}
    >
      <div className="mx-4 my-5 min-w-0">
        <div className="flex flex-col gap-0.5 min-w-0">
          {props.type === "project" && props.imagePreviewLink && (
            <Image src={props.imagePreviewLink} alt="" width={500} height={10000} className="object-top" />
          )}
          <div className="flex items-center gap-4 min-w-0">
            <h3 className="font-sans font-bold text-2xl leading-7 flex-1 min-w-0 truncate">
              {truncateText(props.title, "title")}
            </h3>

            <div className="flex-shrink-0">
              <FiArrowUpRight
                size={20}
                className="transition-transform duration-200 -translate-x-0.5 group-hover:translate-x-0 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
          <h6 className="font-serif text-xs text-dark-white mb-5">{dateToReadable(props.date)}</h6>
          <p className="font-serif text-xs break-words">{truncateText(stripMarkdown(props.markdown), "markdown")}</p>
          <div className="flex flex-wrap space-x-2.5 space-y-2 font-sans text-xs mt-3">
            {props.tags.map((tag) => (
              <Card href="" key={tag}>
                {tag}
              </Card>
            ))}
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

export default DocumentCard;
