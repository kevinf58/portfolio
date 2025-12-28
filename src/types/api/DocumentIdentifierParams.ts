import { DOCUMENT_TYPE } from "../Document.type";

export type DocumentIdentifierParams = {
  params: Promise<{
    type: (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
    id: string;
  }>;
};
