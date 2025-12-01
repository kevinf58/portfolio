"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Card from "../common/cards/Card";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { useDocumentFormContext } from "./DocumentLayoutContext";
import { Categories } from "@/types/Document.type";

export default function TagInput() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { tags, setTags } = useDocumentFormContext();

  // max number of tags that can be added per project/journal
  const MAX_TAGS = 3;

  // category blacklist
  const CATEGORY_SET = new Set<Categories>(["DAILY", "LEARNING", "DEVELOPMENT", "RECRUITING", "TRADING"]);

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    if (CATEGORY_SET.has(trimmedTag.toUpperCase() as Categories)) {
      toast.warning(`"${trimmedTag}" is a journal category and cannot be used as a tag.`);
      setInputValue("");
      return;
    }

    const isDuplicate = tags.some((t) => t.toLowerCase() === trimmedTag.toLowerCase());
    if (isDuplicate) {
      toast.warning(`The tag "${trimmedTag}" already exists!`);
      setInputValue("");
      return;
    }

    setTags([...tags, trimmedTag]);
    setInputValue("");
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue("");
    }
  };

  // when onBlur, remove text from tag input elem and disable editing
  const handleBlur = () => {
    setInputValue("");
    setIsEditing(false);
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((a) => a !== tag));
  };

  return (
    <div className="flex items-center gap-1 flex-wrap px-1 text-xs">
      <span className="font-medium mr-1">Tags</span>

      {tags.map((tag) => (
        <Card
          key={tag}
          onClick={() => handleRemoveTag(tag)}
          className="relative group border-2 border-transparent hover:border-primary hover:!scale-100"
          href=""
        >
          <div className="inline-block relative whitespace-nowrap">
            <span className="block transition-opacity group-hover:opacity-0">{tag}</span>
            <MdDeleteOutline className="fixed inset-0 m-auto opacity-0 transition-opacity group-hover:opacity-100 text-lg" />
          </div>
        </Card>
      ))}

      {tags.length < MAX_TAGS &&
        (isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`w-min h-min outline-none bg-light-gray text-dark-white shadow-inner focus:ring-2 ring-primary rounded-sm py-2 px-2 !text-xs duration-150 ease-in ${
              isEditing ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
            }`}
            placeholder="New tag..."
          />
        ) : (
          <Card
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className={`!px-3 transition-all duration-150 ease-in ${
              isEditing ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
            }`}
            href=""
          >
            +
          </Card>
        ))}
    </div>
  );
}
