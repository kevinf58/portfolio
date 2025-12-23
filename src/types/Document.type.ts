export type DocumentType = "journal" | "project";

export type Document = {
  title: string;
  date: string;
  tags: string[];
  markdown: string;
  type: DocumentType;
  imagePreviewLink?: string;
  category?: Categories;
};

export type Journal = {
  type: "journal";
  id: number;
};

export type Project = {
  type: "project";
  id: number;
};

export type JournalDocument = Document & {
  type: "journal";
  id: number;
};

export type ProjectDocument = Document & {
  type: "project";
  id: number;
};

export type DocumentActions =
  | { type: "SET_MARKDOWN"; payload: string }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_DOC_TYPE"; payload: DocumentType }
  | { type: "TOGGLE_DOC_TYPE" }
  | { type: "SET_TAGS"; payload: string[] }
  | { type: "ADD_TAG"; payload: string }
  | { type: "REMOVE_TAG"; payload: string }
  | { type: "SET_CATEGORY"; payload: Categories }
  | { type: "RESET"; payload?: Partial<Document> };

export type Categories = "DAILY" | "LEARNING" | "DEVELOPMENT" | "RECRUITING" | "TRADING";

export type DocumentFormContextValue = {
  state: Document;
  markdown: string;
  title: string;
  tags: string[];
  date: string;
  documentType: Document["type"];
  switchDocTypeLabel: "journal" | "project";
  category?: Categories;

  setMarkdown: (markdown: string) => void;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  toggleDocumentType: () => void;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setCategory: (category: Categories) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};
