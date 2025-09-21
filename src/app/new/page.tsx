"use client";

import { Button } from "@/components/common/Button";
import Editor from "@/components/Editor";
import { useState } from "react";

const Page = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-light-black shadow-primary">
      <div className="h-full w-full flex bg-white/3">
        <div className="bg-black h-full w-1/2 overflow-y-scroll">
          <Editor setMarkdown={setMarkdown} />
        </div>
        <div className="w-1/2 h-full flex flex-col border-l-2 border-tint/20">
          <h1 className="bg-primary/10 font-bold py-3 px-6 border-b-2 border-tint/20 shadow-primary">Markdown</h1>
          <div className="w-full flex-1 py-1 px-2 font-serif whitespace-pre-wrap">
            {markdown}
            <Button className="!fixed bottom-5 right-10" type="hollow" onClick={() => console.log(markdown)}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
