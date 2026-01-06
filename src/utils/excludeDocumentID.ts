import { DocumentPayload, Document } from "@/types/Document.type";

// returns the document without the id prop attached
const excludeDocumentID = (document: Document): DocumentPayload => {
  const { id, ...payload } = document;
  return payload;
};

export default excludeDocumentID;
