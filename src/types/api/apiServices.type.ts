import { DocumentID } from "../Document.type";
import { DocumentType } from "../Document.type";
import { JournalCategory } from "../Journal.type";

export type GetDocumentsPayload = {
  type: DocumentType;
  limit: number;
  offset: number;
  category?: JournalCategory;
};

export type DocumentIdentifierPayload = {
  type: DocumentType;
  id: DocumentID;
};
