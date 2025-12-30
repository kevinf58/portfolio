"use client";

import { DocumentFormContext, useDocumentForm } from "@/hooks/useDocumentForm";
import { DocumentFormProviderProps } from "@/types/DocumentForm.type";

export const DocumentFormProvider = (props: DocumentFormProviderProps) => {
  const contextValue = useDocumentForm(props.initialType);

  return <DocumentFormContext.Provider value={contextValue}>{props.children}</DocumentFormContext.Provider>;
};
