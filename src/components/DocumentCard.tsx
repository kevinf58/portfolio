import { Document, DOCUMENT_TYPE } from "@/types/Document.type";
import { dateToReadable } from "@/utils/dateUtils";
import readingTime from "reading-time";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import summarizeContent from "@/utils/summarizeContent";

const DocumentCard = (props: Document) => {
  const titleElem = <h1 className="text-2xl font-bold my-4">{props.title}</h1>;

  // conditional based on the type of document
  const conditionalElem =
    props.type === DOCUMENT_TYPE.JOURNAL ? (
      <div className="flex items-center gap-2">
        <div>{props.category}</div>
        <h6 className="text-xs text-dark-white">{dateToReadable(props.createdAt)}</h6>
        {props.createdAt !== props.updatedAt && (
          <h6 className="text-xs text-dark-white italic">{"(Edited " + dateToReadable(props.createdAt) + ")"}</h6>
        )}

        <span className="text-dark-white">•</span>
        <h6 className="text-xs text-dark-white">{readingTime(props.content).text}</h6>
      </div>
    ) : (
      <>
        {titleElem}
        <h6 className="text-xs text-dark-white">{dateToReadable(props.createdAt)}</h6>
      </>
    );

  return (
    <a href={`/${props.type}/${props.id}`}>
      <div className="flex hover:bg-gray transition-colors duration-200 px-10 py-8 cursor-pointer group gap-4">
        {props.type === "project" && props.imagePreview && (
          <div className="relative w-60 h-38 shrink-0 overflow-hidden rounded-sm">
            <Image
              src={props.imagePreview}
              alt={props.title}
              fill
              className="object-cover object-center transition-transform duration-400 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col w-full">
          {props.type === DOCUMENT_TYPE.JOURNAL && conditionalElem}
          <div className={`flex items-center ${props.type === "project" ? "justify-between" : "gap-2"}`}>
            {props.type === "project" && conditionalElem}
          </div>
          {props.type === DOCUMENT_TYPE.JOURNAL && titleElem}
          <p className="text-sm font-light mb-3">{summarizeContent(props.content)}</p>
          <div className="flex space-x-2">
            {props.tags.map((tag) => (
              <div key={tag}>{tag}</div>
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
