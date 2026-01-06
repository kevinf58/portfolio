"use client";

import Button from "@/components/ui/Button";

import { useDocumentFormContext } from "@/hooks/useDocumentForm";

import { DOCUMENT_TYPE } from "@/types/Document.type";
import { DOCUMENT_MODE } from "@/types/DocumentForm.type";

const TempButton = () => {
  const context = useDocumentFormContext();

  return (
    <Button
      onClick={() => {
        if (context.draft.type === DOCUMENT_TYPE.PROJECT) {
          console.log("draft: " + context.draft.imagePreview);
          if (context.mode === DOCUMENT_MODE.EDIT && context.original.type === DOCUMENT_TYPE.PROJECT) {
            console.log("original: " + context.original.imagePreview);
          }
        }
      }}
    >
      Log Contents
    </Button>
  );
};

export default TempButton;
