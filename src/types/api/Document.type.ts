export type DocumentType = "journal" | "project";

export type Document = {
  title: string;
  date: string;
  tags: string[];
  markdown: string;
  type: DocumentType;
  imagePreviewLink?: string;
};

export type JournalPageParams = {
  params: {
    id: string;
  };
};

export type Journal = Document & {
  type: "journal";
  id: number;
};

export type Project = Document & {
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
  | { type: "RESET"; payload?: Partial<Document> };
