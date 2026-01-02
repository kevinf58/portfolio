import { DOCUMENT_TYPE, DocumentPayload, DocumentType } from "@/types/Document.type";
import { getLocalDate } from "./dateUtils";

const emptyState = (type: DocumentType): DocumentPayload =>
  type === DOCUMENT_TYPE.JOURNAL
    ? {
        type: DOCUMENT_TYPE.JOURNAL,
        title: "",
        createdAt: getLocalDate(),
        updatedAt: getLocalDate(),
        content: "",
        tags: [],
        category: "daily",
      }
    : {
        type: DOCUMENT_TYPE.PROJECT,
        title: "",
        createdAt: getLocalDate(),
        updatedAt: getLocalDate(),
        content: "",
        tags: [],
        imagePreview: "",
      };

export default emptyState;
