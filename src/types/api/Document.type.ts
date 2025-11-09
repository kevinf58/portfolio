export type DocumentType = "journal" | "project";

export type Document = {
  title: string;
  date: Date;
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
