"use client";

import { Button } from "@/components/common/Button";
import Editor from "@/components/Editor";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Document, DocumentType } from "@/types/api/Document.type";
import { useRouter } from "next/navigation";
import Card from "@/components/common/cards/Card";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { getCurrentDate, dateToReadable } from "@/utils/dateUtils";
import TagInput from "@/components/TagInput";
import ReadOnlyCrepe from "@/components/ReadOnlyCrepe";
import { TbSwitchHorizontal } from "react-icons/tb";
import ImageUpload from "./common/ImageUpload";
import uploadHandler from "@/utils/uploadHandler";
import { CgSpinner } from "react-icons/cg";

const DocumentLayout = () => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(getCurrentDate());
  const [documentType, setDocumentType] = useState<DocumentType>("journal");

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // max char length of a journal/project title
  const MAX_TITLE_LENGTH = 60;

  const inputStyles = "bg-white/8 shadow-inner focus-within:ring-2 ring-primary/80 rounded-sm duration-200";

  const [year, month, day] = date.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);

  const handleCreate = async () => {
    if (markdown.length < 200) {
      toast.warn(`Please add sufficient text to this ${documentType}`);
      return;
    }
    if (title.length < 6) {
      toast.warn("Title too short!");
      return;
    }

    setLoading(true);
    try {
      const file = fileInputRef.current?.files?.[0];
      const imagePreviewLink = file ? await uploadHandler(file) : undefined;

      const newDocument: Document = {
        title,
        date: localDate,
        tags,
        markdown,
        type: documentType,
        ...(documentType === "project" && imagePreviewLink ? { imagePreviewLink } : {}),
      };

      const res = await fetch(`/api/${newDocument.type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDocument),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast.warn(`A ${documentType} with this title already exists. Please rename it!`);
          return;
        }
        throw new Error(data?.error || "Failed to add entry.");
      }

      toast.success("Entry added!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to add entry.");
    } finally {
      setLoading(false);
    }
  };

  const switchDocType = (current: DocumentType): DocumentType => {
    return current === "journal" ? "project" : "journal";
  };

  return (
    <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-light-black shadow-default">
      <div className="h-full w-full flex flex-wrap justify-center space-x-10 p-8 pt-28">
        <Card
          href=""
          className="flex flex-col border-2 !max-w-[36rem] w-full !max-h-[38rem] h-full !px-4 !py-4 hover:!scale-100 !cursor-default"
        >
          <div className="flex items-center gap-2">
            <FaRegEdit size={25} className="text-white/50 mr-2" />
            <h3 className="font-sans font-bold text-xl text-white">New {documentType}</h3>
            <TbSwitchHorizontal
              size={20}
              title={`Click to Swap to a ${switchDocType(documentType)}!`}
              className="cursor-pointer"
              onClick={() => setDocumentType(switchDocType)}
            />
          </div>
          <div className="h-full min-h-0 flex flex-col mx-10 my-6 gap-4">
            <div className="flex gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter a title..."
                  value={title}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 60) setTitle(value);
                  }}
                  className={`w-full h-min outline-none py-2 px-3 !text-xs ease-in pr-10 ${inputStyles}`}
                />
                <span className="absolute right-2 pb-0.5 top-1/2 -translate-y-1/2 text-[10px] text-white/50 pointer-events-none">
                  {title.length}/{MAX_TITLE_LENGTH}
                </span>
              </div>
              <input
                type="date"
                className={`w-min h-min outline-none py-2 px-2 !text-xs text-white/50 ease-in cursor-pointer ${inputStyles}`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            {documentType === "project" && <ImageUpload fileInputRef={fileInputRef} />}
            <TagInput state={{ tags, setTags }} />

            <div className={`h-full rounded-sm cursor-text px-4 py-3 overflow-y-scroll ${inputStyles}`}>
              <Editor setMarkdown={setMarkdown} />
            </div>
          </div>
        </Card>
        <Card
          href=""
          className="w-full !max-h-[38rem] h-full min-h-0 overflow-y-auto flex flex-col border-2 !max-w-[36rem] !px-4 !py-4 hover:!scale-100 !cursor-default"
        >
          <MdOutlineRemoveRedEye size={25} className="text-white/50" />
          <div className="mx-10">
            <h1 className="text-[42px] leading-[50px] mt-8">{title}</h1>
            <p className="text-white/50 text-xs mb-8 font-light italic">{dateToReadable(date)}</p>
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
      </div>
      <Button
        className="!fixed bottom-5 right-10 min-w-[8rem] flex items-center justify-center"
        type="hollow"
        onClick={!loading ? handleCreate : undefined}
      >
        {loading ? <CgSpinner className="size-5 animate-spin text-white" /> : `Create ${documentType}`}
      </Button>
    </section>
  );
};

export default DocumentLayout;
