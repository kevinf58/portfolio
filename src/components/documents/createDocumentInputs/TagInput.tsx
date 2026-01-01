"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { JournalCategory } from "@/types/Journal.type";
import Tag from "@/components/ui/Tag";
import { DOCUMENT_TAG_LIMIT, DOCUMENT_TAG_MAX_LENGTH } from "@/lib/constants";

export default function TagInput() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { tags, setTags } = useDocumentFormContext();

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    const journalCategories: JournalCategory[] = ["learning", "trading", "recruiting", "daily", "development"];

    // inputted tag shouldn't be a journal category or already exist in its current array
    if (journalCategories.includes(tag.toLowerCase() as JournalCategory)) {
      toast.warning(`"${trimmedTag}" is a journal category and cannot be used as a tag.`);
      setInputValue("");
      return;
    } else if (tags.some((t) => t.toLowerCase() === trimmedTag.toLowerCase())) {
      toast.warning(`The tag "${trimmedTag}" already exists!`);
      setInputValue("");
      return;
    }

    setTags([...tags, trimmedTag]);
    setInputValue("");
    setIsEditing(false);
  };

  // remove tag functionality
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((a) => a !== tag));
  };

  // keyboard shortcuts for creating tags and undoing tag creation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue("");
    }
  };

  // when the tag input loses focus, remove text from tag input elem and disable editing
  const handleBlur = () => {
    setInputValue("");
    setIsEditing(false);
  };

  return (
    <div className="flex items-center flex-wrap gap-1 px-1 text-xs">
      <span className="font-medium mr-1">Tags</span>

      {tags.map((tag) => (
        <Tag key={tag} onClick={() => handleRemoveTag(tag)} className="relative group rounded-sm py-2" type="tag">
          <>
            <span className="block transition-opacity group-hover:opacity-0">{tag}</span>
            <MdDeleteOutline className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-lg opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-red" />
          </>
        </Tag>
      ))}
      {tags.length < DOCUMENT_TAG_LIMIT &&
        (isEditing ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= DOCUMENT_TAG_MAX_LENGTH) setInputValue(value);
              }}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className={`max-w-40 outline-none bg-light-gray shadow-inner focus:ring-2 ring-primary rounded-sm py-2 pl-2 pr-9 duration-150 ease-in ${
                isEditing ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
              }`}
              placeholder="New tag..."
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-dark-white pointer-events-none">
              {inputValue.length}/{DOCUMENT_TAG_MAX_LENGTH}
            </span>
          </div>
        ) : (
          <Tag
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className={`rounded-sm py-2 ${isEditing ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"}`}
            type="tag"
          >
            +
          </Tag>
        ))}
    </div>
  );
}
