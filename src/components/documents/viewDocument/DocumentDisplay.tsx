"use client";

import { FaRegClock } from "react-icons/fa";
import { MdDateRange, MdKeyboardArrowRight } from "react-icons/md";
import { DeleteButton, EditButton } from "../DocumentActions";
import { dateToReadable } from "@/utils/dateUtils";
import Tag from "@/components/ui/Tag";
import ReadOnlyCrepe from "./ReadOnlyCrepe";
import { Document } from "@/types/Document.type";
import { useSession } from "next-auth/react";

const DocumentDisplay = ({ document }: { document: Document }) => {
  const { id, type, title, createdAt, updatedAt, tags, content } = document;
  const { data: session } = useSession();

  return (
    <div className="max-w-260 w-full lg:px-34 sm:px-20 px-8 py-28 gap-1">
      <div className="flex items-center text-sm text-white/50 mb-10">
        Home <MdKeyboardArrowRight size={18} /> {type.charAt(0).toUpperCase() + type.slice(1)}
        <MdKeyboardArrowRight size={18} /> {title}
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[48px] leading-12.5 font-semibold">{title}</h1>
          {id && session && (
            <div className="flex space-x-2">
              <EditButton type={type} id={id} />
              <DeleteButton type={type} id={id} />
            </div>
          )}
        </div>
        <div className="flex gap-x-4 text-white/50">
          <div className="flex space-x-1">
            <MdDateRange />
            <p className="text-xs font-light">{dateToReadable(createdAt)}</p>
          </div>
          {createdAt !== updatedAt && (
            <div className="flex space-x-1">
              <FaRegClock />
              <h6 className="text-xs text-dark-white italic">{"Last Edited " + dateToReadable(createdAt)}</h6>
            </div>
          )}
        </div>
        <div className="flex gap-1.5 text-xs">
          {tags.map((tag) => (
            <Tag type="tag" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
        <hr className="opacity-20 mb-6" />
      </div>
      <ReadOnlyCrepe markdown={content} />
    </div>
  );
};

export default DocumentDisplay;
