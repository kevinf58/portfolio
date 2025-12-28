import { DocumentID } from "../Document.type";
import { DOCUMENT_TYPE } from "../Document.type";
import { Journal } from "../Journal.type";
import { Project } from "../Project.type";

export type CreateDocumentPayload = Omit<Journal, "id"> | Omit<Project, "id">;

type DocumentType = (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];

export type GetDocumentsPayload = {
  type: DocumentType;
  limit: number;
  offset: number;
};

export type DocumentIdentifierPayload = {
  type: DocumentType;
  id: DocumentID;
};
