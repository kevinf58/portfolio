"use client";

import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import CategoryInput from "./CategoryInput";
import ImagePreviewInput from "./ImagePreviewInput";

const ConditionalInputs = () => {
  const { type } = useDocumentFormContext();

  return type === DOCUMENT_TYPE.JOURNAL ? <CategoryInput /> : <ImagePreviewInput />;
};

export default ConditionalInputs;
