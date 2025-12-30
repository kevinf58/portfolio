"use client";

import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import CategoryInput from "./CategoryInput";

const ConditionalInputs = () => {
  const { type } = useDocumentFormContext();

  return type === DOCUMENT_TYPE.JOURNAL ? <CategoryInput /> : "b";
};

export default ConditionalInputs;
