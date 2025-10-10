"use client";

import { Button } from "@/components/common/Button";
import Editor from "@/components/Editor";
import { useState } from "react";
import { toast } from "react-toastify";
import { RawJournalType } from "@/types/api/Journal.type";
import { useRouter } from "next/navigation";
import { FaMarkdown } from "react-icons/fa6";

const Page = () => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");

  const handleSubmit = async () => {
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
      const res = await fetch("/api/journal", {
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
      <div className="h-full w-full flex bg-white/3">
        <div className="bg-gray h-full w-1/2 px-28 py-10 overflow-y-scroll">
          <Editor setMarkdown={setMarkdown} />
        </div>
        <div className="w-1/2 h-full flex flex-col border-l-2 border-tint/20">
          <h1 className="flex items-center gap-2 bg-primary/10 font-bold py-3 px-6 border-b-2 border-tint/20 shadow-default">
            <FaMarkdown className="text-lg" />
            <span>Markdown</span>
          </h1>
          <div className="w-full flex-1 py-4 px-6 font-serif whitespace-pre-wrap leading-4 overflow-y-auto">
            {markdown}
          </div>
          <Button className="!fixed bottom-5 right-10" type="hollow" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
