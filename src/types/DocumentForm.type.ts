import React from "react";
import { CreateDocumentPayload, DocumentType } from "./Document.type";
import { JournalCategory } from "./Journal.type";
import { DOCUMENT_TYPE } from "./Document.type";

export type DocumentFormActions =
  | { type: "TOGGLE_DOCUMENT_TYPE" }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_CATEGORY"; payload: JournalCategory }
  | { type: "SET_IMAGE_PREVIEW"; payload: string }
  | { type: "SET_TAGS"; payload: string[] }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "RESET"; payload: DocumentType };

export type DocumentFormContextValue =
  | {
      type: typeof DOCUMENT_TYPE.JOURNAL;
      title: string;
      date: string;
      category: JournalCategory;
      tags: string[];
      content: string;
      state: CreateDocumentPayload;
      toggleDocumentType: () => void;
      setTitle: (title: string) => void;
      setDate: (date: string) => void;
      setCategory: (category: JournalCategory) => void;
      setTags: (tags: string[]) => void;
      setContent: (content: string) => void;
      resetFields: (type: DocumentType) => void;
    }
  | {
      type: typeof DOCUMENT_TYPE.PROJECT;
      title: string;
      date: string;
      imagePreview: string;
      tags: string[];
      content: string;
      state: CreateDocumentPayload;
      toggleDocumentType: () => void;
      setTitle: (title: string) => void;
      setDate: (date: string) => void;
      setImagePreview: (imagePreview: string) => void;
      setTags: (tags: string[]) => void;
      setContent: (content: string) => void;
      resetFields: (type: DocumentType) => void;
    };

export type DocumentFormProviderProps = {
  children: React.ReactNode;
  initialType: DocumentType;
};

// export type DocumentFormContextValue = {
//   type: DocumentType;
//   title: string;
//   date: string;
//   category: JournalCategory;
//   imagePreview: string;
//   tags: string[];
//   content: string;

//   state: CreateDocumentPayload;
//   toggleDocumentType: () => void;
//   setTitle: (title: string) => void;
//   setDate: (date: string) => void;
//   setCategory: (category: JournalCategory) => void;
//   setImagePreview: (imagePreview: string) => void;
//   setTags: (tags: string[]) => void;
//   setContent: (content: string) => void;
//   resetFields: (type: DocumentType) => void;
// };
