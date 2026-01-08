import { Operation } from "fast-json-patch";
import { DocumentIdentifierPayload } from "./apiServices.type";

export type UploadDocumentPayload = {
  identifier: DocumentIdentifierPayload;
  diff: Operation[];
};
