import ReadOnlyCrepe from "@/components/documentForm/ReadOnlyCrepe";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import getDocumentByID from "@/services/getDocumentByID.service";
import { DocumentIdentifierParams } from "@/types/api/DocumentIdentifierParams";
import { Document } from "@/types/Document.type";
import { dateToReadable } from "@/utils/dateUtils";
import { notFound } from "next/navigation";
import { MdDateRange, MdKeyboardArrowRight } from "react-icons/md";
import { FaRegEdit, FaRegClock } from "react-icons/fa";
import { DeleteButton } from "@/components/documents/DocumentActions";

const Page = async ({ params }: DocumentIdentifierParams) => {
  const { type, id } = await params;

  const res = await getDocumentByID({ type, id });

  if (!res.success) notFound();

  const document: Document = res.data;

  return (
    <section className="relative flex justify-center min-h-[calc(100vh-4.75rem)] w-full bg-dark-gray shadow-default py-20 md:px-10 sm:px-6 px-2">
      <div className="min-h-full max-w-260 w-full lg:px-34 sm:px-20 px-8 gap-1">
        <div className="flex items-center text-sm text-white/50 mb-10">
          Home <MdKeyboardArrowRight size={18} /> {type.charAt(0).toUpperCase() + type.slice(1)}
          <MdKeyboardArrowRight size={18} /> {document.title}
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[48px] leading-12.5 font-semibold">{document.title}</h1>
            <div className="flex space-x-2">
              <Button size="sm">
                <FaRegEdit size={14} className="shrink-0" />
                <span className="font-medium">Edit</span>
              </Button>
              <DeleteButton type={type} id={id} />
            </div>
          </div>
          <div className="flex gap-x-4 text-white/50">
            <div className="flex space-x-1">
              <MdDateRange />
              <p className="text-xs font-light">{dateToReadable(document.createdAt)}</p>
            </div>
            {document.createdAt !== document.updatedAt && (
              <div className="flex space-x-1">
                <FaRegClock />
                <h6 className="text-xs text-dark-white italic">{"Last Edited " + dateToReadable(document.createdAt)}</h6>
              </div>
            )}
          </div>
          <div className="flex gap-1.5 text-xs">
            {document.tags.map((tag) => (
              <Tag type="tag" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
          <hr className="opacity-20 mb-6" />
        </div>
        <ReadOnlyCrepe markdown={document.content} />
      </div>
    </section>
  );
};

export default Page;
