import React from "react";
import { CreateDocumentPayload, DocumentType } from "./Document.type";
import { JournalCategory } from "./Journal.type";

export type DocumentFormActions =
  | { type: "TOGGLE_DOCUMENT_TYPE" }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_CATEGORY"; payload: JournalCategory }
  | { type: "SET_IMAGE_PREVIEW"; payload: string }
  | { type: "SET_TAGS"; payload: string[] }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "RESET"; payload: DocumentType };

export type DocumentFormContextValue = {
  state: CreateDocumentPayload;
  toggleDocumentType: () => void;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  setCategory: (category: JournalCategory) => void;
  setImagePreview: (imagePreview: string) => void;
  setTags: (tags: string[]) => void;
  setContent: (content: string) => void;
  resetFields: (type: DocumentType) => void;
};

export type DocumentFormProviderProps = {
  children: React.ReactNode;
  initialType: DocumentType;
};
