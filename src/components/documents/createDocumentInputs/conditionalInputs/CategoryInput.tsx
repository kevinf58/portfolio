"use client";

import Tag from "@/components/ui/Tag";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { JOURNAL_CATEGORY } from "@/types/Journal.type";

const CategoryInput = () => {
  const { category, setCategory } = useDocumentFormContext();

  return (
    <div className={`flex items-center gap-2 flex-wrap py-2 text-xs`}>
      <span>Category</span>
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
  );
};

export default CategoryInput;
