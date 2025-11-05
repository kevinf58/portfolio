"use client";

import { Button } from "@/components/common/Button";
import Editor from "@/components/Editor";
import { useState } from "react";
import { toast } from "react-toastify";
import { RawJournalType } from "@/types/api/Journal.type";
import { useRouter } from "next/navigation";
import Card from "@/components/common/cards/Card";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdOutlineDateRange } from "react-icons/md";
import getCurrentDate from "@/utils/getCurrentDate";
import TagInput from "@/components/TagInput";
import dateToReadable from "@/utils/dateToReadable";
import ReadOnlyCrepe from "@/components/ReadOnlyCrepe";

const Page = () => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(getCurrentDate());

  // max char length of a journal project title
  const MAX_TITLE_LENGTH = 60;

  const inputStyles = "bg-white/8 shadow-inner focus-within:ring-2 ring-primary rounded-sm duration-200";

  const handleCreate = async () => {
    const lines = (markdown || "").split("\n");
    const firstLine = lines[0].replace(/^#\s*/, "").trim();

    const newJournal: RawJournalType = {
      title: firstLine,
      date: new Date(),
      tags: [],
      markdown,
    };

    if (markdown.length < 200) {
      toast.warn("Please add sufficient text to this journal");
      return;
    } else if (firstLine.length < 4) {
      toast.warn("Title too short!");
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJournal),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast.warn("A journal with this title already exists. Please rename it!");
        } else {
          toast.error(data.error || "Failed to add entry.");
        }
        return;
      }

      router.push("/");
      toast.success("Entry added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add entry.");
    }
  };

  return (
    <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-light-black shadow-default">
      <div className="h-full w-full flex flex-wrap justify-center space-x-10 p-8 pt-28">
        <Card
          href=""
          className="flex flex-col border-2 !max-w-[36rem] w-full !max-h-[38rem] h-full !px-4 !py-4 hover:!scale-100 !cursor-default"
        >
          <FaRegEdit size={25} className="text-white/50" />
          <div className="h-full flex flex-col mx-10 my-6 gap-4">
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
            <TagInput state={{ tags, setTags }} />
            <div className={`h-full rounded-sm cursor-text px-4 py-3 overflow-y-scroll ${inputStyles}`}>
              <Editor setMarkdown={setMarkdown} />
            </div>
          </div>
        </Card>
        <Card
          href=""
          className="flex flex-col border-2 !max-w-[36rem] w-full !max-h-[38rem] h-full !px-4 !py-4 hover:!scale-100 !cursor-default"
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
            <hr className="opacity-20" />
            <ReadOnlyCrepe markdown={markdown} />
          </div>
        </Card>
      </div>
      <Button className="!fixed bottom-5 right-10" type="hollow" onClick={handleCreate}>
        Create Project
      </Button>
    </section>
  );
};

export default Page;
