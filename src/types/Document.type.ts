import { Journal } from "./Journal.type";
import { Project } from "./Project.type";

export type ISODateString = string;

export type DocumentID = string;

export const DOCUMENT_TYPE = {
  JOURNAL: "journal",
  PROJECT: "project",
} as const;

export type BaseDocument = {
  id: DocumentID;
  title: string;
  content: string;
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Document = Journal | Project;
