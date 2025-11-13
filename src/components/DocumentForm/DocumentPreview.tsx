import { MdOutlineRemoveRedEye } from "react-icons/md";
import Card from "../common/cards/Card";
import { dateToReadable } from "@/utils/dateUtils";
import { useDocumentFormContext } from "./DocumentLayoutContext";
import ReadOnlyCrepe from "./ReadOnlyCrepe";

const DocumentPreview = () => {
  const { title, date, tags, markdown } = useDocumentFormContext();

  return (
    <Card
      href=""
      className="w-full !max-h-[38rem] h-full min-h-0 overflow-y-auto flex flex-col border-2 !max-w-[36rem] !px-4 !py-4 hover:!scale-100 !cursor-default"
    >
      <MdOutlineRemoveRedEye size={25} className="text-dark-white" />
      <div className="mx-10">
        <h1 className="text-[42px] leading-[50px] mt-8">{title}</h1>
        <p className="text-dark-white text-xs mb-8 font-light italic">{dateToReadable(date)}</p>
        <div className="flex gap-1.5 text-xs mb-2">
          {tags.map((tag) => (
            <Card href="" key={tag}>
              {tag}
            </Card>
          ))}
        </div>
        <hr className="opacity-20 mb-6" />
        <ReadOnlyCrepe markdown={markdown} />
      </div>
    </Card>
  );
};

export default DocumentPreview;
