import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { Document, DOCUMENT_TYPE } from "@/types/Document.type";
import DocumentDisplay from "../viewDocument/DocumentDisplay";

const PreviewDocument = () => {
  const context = useDocumentFormContext();

  const document: Document =
    context.type === DOCUMENT_TYPE.JOURNAL
      ? {
          id: "",
          type: context.type,
          title: context.title,
          content: context.content,
          createdAt: context.date,
          updatedAt: context.date,
          tags: context.tags,
          category: context.category,
          visibility: context.visibility,
        }
      : {
          id: "",
          type: context.type,
          title: context.title,
          content: context.content,
          createdAt: context.date,
          updatedAt: context.date,
          tags: context.tags,
          imagePreview: context.imagePreview,
        };

  return <DocumentDisplay document={document} />;
};

export default PreviewDocument;
