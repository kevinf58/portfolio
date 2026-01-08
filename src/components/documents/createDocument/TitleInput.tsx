"use client";

import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { DOCUMENT_TITLE_MAX_LENGTH } from "@/lib/constants";

const TitleInput = () => {
  const { title, setTitle } = useDocumentFormContext();

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Enter a title..."
        value={title}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= DOCUMENT_TITLE_MAX_LENGTH) setTitle(value);
        }}
        className={`w-full h-min outline-none py-2 pl-3 pr-10 text-xs! ease-in input-base`}
      />
      <span className="absolute right-2 pb-0.5 top-1/2 -translate-y-1/2 text-[10px] text-dark-white pointer-events-none">
        {title.length}/{DOCUMENT_TITLE_MAX_LENGTH}
      </span>
    </div>
  );
};

export default TitleInput;
