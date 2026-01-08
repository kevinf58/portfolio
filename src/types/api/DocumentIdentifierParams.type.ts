import { DocumentType } from "../Document.type";

export type DocumentIdentifierParams = {
  params: Promise<{
    type: DocumentType;
    id: string;
  }>;
};
