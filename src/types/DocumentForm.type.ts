import { ReactNode, RefObject } from "react";
import { DocumentPayload, DocumentType } from "./Document.type";
import { JournalCategory, Visibility } from "./Journal.type";
import { DOCUMENT_TYPE, Document } from "./Document.type";

export type DocumentDraftActions =
  | { type: "TOGGLE_DOCUMENT_TYPE" }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_CATEGORY"; payload: JournalCategory }
  | { type: "TOGGLE_VISIBILITY" }
  | { type: "SET_IMAGE_PREVIEW"; payload: string }
  | { type: "SET_TAGS"; payload: string[] }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "RESET"; payload: DocumentType };

export type BaseFormContextValue = {
  title: string;
  date: string;
  tags: string[];
  content: string;
  toggleDocumentType: () => void;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  setTags: (tags: string[]) => void;
  setContent: (content: string) => void;
  resetFields: (type: DocumentType) => void;
};

export type JournalFormContextValue = BaseFormContextValue & {
  type: typeof DOCUMENT_TYPE.JOURNAL;
  category: JournalCategory;
  visibility: Visibility;
  setCategory: (category: JournalCategory) => void;
  toggleVisibility: () => void;
};
export type ProjectFormContextValue = BaseFormContextValue & {
  type: typeof DOCUMENT_TYPE.PROJECT;
  imagePreview: string;
  setImagePreview: (imagePreview: string) => void;
  imageInputPreviewRef: RefObject<HTMLInputElement | null>;
};
type EditFormContextValue = (JournalFormContextValue | ProjectFormContextValue) & DocumentEditState;
type CreateFormContextValue = (JournalFormContextValue | ProjectFormContextValue) & DocumentCreateState;
export type FormContextValue = EditFormContextValue | CreateFormContextValue;

export const DOCUMENT_MODE = {
  EDIT: "edit",
  CREATE: "create",
} as const;

interface DocumentEditState {
  mode: typeof DOCUMENT_MODE.EDIT;
  original: Document;
  draft: DocumentPayload;
}
interface DocumentCreateState {
  mode: typeof DOCUMENT_MODE.CREATE;
  draft: DocumentPayload;
}
export type DocumentModeState = DocumentEditState | DocumentCreateState;

export type DocumentFormProviderProps = {
  children: ReactNode;
  initialState: DocumentModeState;
};

export type EditorActions =
  | { type: "START_CREATE"; payload: DocumentType }
  | { type: "START_EDIT"; payload: Document }
  | { type: "UPDATE_DRAFT"; payload: DocumentDraftActions };
