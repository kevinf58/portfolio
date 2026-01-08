"use client";

import { DocumentFormContext, useDocumentForm } from "@/hooks/useDocumentForm";
import { DocumentFormProviderProps } from "@/types/DocumentForm.type";

export const DocumentFormProvider = (props: DocumentFormProviderProps) => {
  const context = useDocumentForm(props.initialState);

  return <DocumentFormContext.Provider value={context}>{props.children}</DocumentFormContext.Provider>;
};
