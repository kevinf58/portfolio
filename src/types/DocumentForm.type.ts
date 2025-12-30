import React, { RefObject } from "react";
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

type BaseDocumentFormContextValue = {
  title: string;
  date: string;
  tags: string[];
  content: string;
  state: CreateDocumentPayload;
  toggleDocumentType: () => void;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  setTags: (tags: string[]) => void;
  setContent: (content: string) => void;
  resetFields: (type: DocumentType) => void;
};

type JournalDocumentFormContextValue = BaseDocumentFormContextValue & {
  type: typeof DOCUMENT_TYPE.JOURNAL;
  category: JournalCategory;
  setCategory: (category: JournalCategory) => void;
};

type ProjectDocumentFormContextValue = BaseDocumentFormContextValue & {
  type: typeof DOCUMENT_TYPE.PROJECT;
  imagePreview: string;
  imageInputPreviewRef: RefObject<HTMLInputElement | null>;
};

export type DocumentFormContextValue = JournalDocumentFormContextValue | ProjectDocumentFormContextValue;

export type DocumentFormProviderProps = {
  children: React.ReactNode;
  initialType: DocumentType;
};
