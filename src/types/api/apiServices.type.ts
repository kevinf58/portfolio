import { DocumentID } from "../Document.type";
import { DocumentType } from "../Document.type";

export type GetDocumentsPayload = {
  type: DocumentType;
  limit: number;
  offset: number;
};

export type DocumentIdentifierPayload = {
  type: DocumentType;
  id: DocumentID;
};
