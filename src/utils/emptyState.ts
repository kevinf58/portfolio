import { DOCUMENT_TYPE, DocumentPayload, DocumentType } from "@/types/Document.type";
import { getLocalDate } from "./dateUtils";
import { VISIBILITY_VALUES } from "@/types/Journal.type";

// returns an empty state for the specified document type
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
        visibility: VISIBILITY_VALUES.PRIVATE,
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
