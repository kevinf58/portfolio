"use client";

import Tag from "@/components/ui/Tag";
import { JOURNAL_CATEGORY, JournalCategory } from "@/types/Journal.type";
import { useState } from "react";
import Documents from "../Documents";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { TextAnimation } from "@/components/ui/TextAnimation";

const Page = () => {
  const [category, setCategory] = useState<JournalCategory | undefined>();

  return (
    <>
      <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-dark-gray shadow-default">
        <div className="2xl:w-[40%] xl:w-[55%] lg:w-[60%] md:w-[80%] w-full sm:px-28 px-6 space-y-12">
          <TextAnimation element="div" className="flex items-end">
            <h1 className="sm:text-7xl text-5xl font-bold text-tint">Journals</h1>
          </TextAnimation>
          <TextAnimation element="span" delay={0.2} className="font-serif sm:text-xl text-lg">
            Thoughts, insights, and learnings from my journey as a developer. Exploring code, design, and everything in between.
          </TextAnimation>
        </div>
        <div className="flex flex-wrap absolute bottom-10 sm:px-28 gap-2">
          <Tag type="tag" onClick={() => setCategory(undefined)} className={`${!category && "bg-white/50"}`}>
            ALL
          </Tag>
          <Tag
            type="category"
            onClick={() => setCategory(JOURNAL_CATEGORY.DAILY)}
            className={`${category === JOURNAL_CATEGORY.DAILY && "text-blue bg-blue/25"}`}
          >
            {JOURNAL_CATEGORY.DAILY}
          </Tag>
          <Tag
            type="category"
            onClick={() => setCategory(JOURNAL_CATEGORY.LEARNING)}
            className={`${category === JOURNAL_CATEGORY.LEARNING && "text-green bg-green/25"}`}
          >
            {JOURNAL_CATEGORY.LEARNING}
          </Tag>
          <Tag
            type="category"
            onClick={() => setCategory(JOURNAL_CATEGORY.DEVELOPMENT)}
            className={`${category === JOURNAL_CATEGORY.DEVELOPMENT && "text-yellow bg-yellow/25"}`}
          >
            {JOURNAL_CATEGORY.DEVELOPMENT}
          </Tag>
          <Tag
            type="category"
            onClick={() => setCategory(JOURNAL_CATEGORY.RECRUITING)}
            className={`${category === JOURNAL_CATEGORY.RECRUITING && "text-purple bg-purple/25"}`}
          >
            {JOURNAL_CATEGORY.RECRUITING}
          </Tag>
          <Tag
            type="category"
            onClick={() => setCategory(JOURNAL_CATEGORY.TRADING)}
            className={`${category === JOURNAL_CATEGORY.TRADING && "text-orange bg-orange/25"}`}
          >
            {JOURNAL_CATEGORY.TRADING}
          </Tag>
        </div>
      </section>
      <Documents type={DOCUMENT_TYPE.JOURNAL} category={category} className="bg-black shadow-default" />
    </>
  );
};

export default Page;
