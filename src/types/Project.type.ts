import { BaseDocument, DOCUMENT_TYPE } from "./Document.type";

export interface Project extends BaseDocument {
  type: typeof DOCUMENT_TYPE.PROJECT;
  imagePreview: string;
}
