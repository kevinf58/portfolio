"use client";

import { Button } from "@/components/common/Button";
import Editor from "@/components/Editor";
import { useState } from "react";
import { toast } from "react-toastify";
import { RawJournalType } from "@/types/api/Journal.type";
import { useRouter } from "next/navigation";
import { FaMarkdown } from "react-icons/fa6";
import Card from "@/components/common/cards/Card";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdOutlineDateRange } from "react-icons/md";
import getCurrentDate from "@/utils/getCurrentDate";
import TagInput from "@/components/TagInput";

const Page = () => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");

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
        <Card href="" className="flex flex-col border-2 !max-w-[36rem] w-full !max-h-[38rem] h-full !px-4 !py-4">
          <FaRegEdit size={25} className="text-white/50" />
          <div className="flex flex-col mx-10 my-6 gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter a title..."
                className="w-full h-min outline-none bg-white/8 shadow-inner focus:ring-2 ring-primary rounded-sm py-2 px-3 !text-xs duration-200 ease-in"
              />
              <input
                type="date"
                placeholder="Enter a title..."
                className="w-min h-min outline-none bg-white/8 text-white/50 shadow-inner focus:ring-2 ring-primary rounded-sm py-2 px-2 !text-xs duration-200 ease-in"
                defaultValue={getCurrentDate()}
              />
            </div>
            <TagInput />
          </div>
        </Card>
        <Card href="" className="border-2 !max-w-[36rem] w-full !max-h-[38rem] h-full !px-4 !py-4">
          <MdOutlineRemoveRedEye size={25} className="text-white/50" />
        </Card>
      </div>
    </section>
  );
};

export default Page;
