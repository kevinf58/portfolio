"use client";

import Button from "@/components/ui/Button";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ClearFormButton = () => {
  const context = useDocumentFormContext();
  const { type, resetFields } = context;

  const handleClearFields = () => {
    if (type === DOCUMENT_TYPE.PROJECT) {
      const { imageInputPreviewRef } = context;

      // image preview input needs to be done separately as it's not a part of the state and is kept as a ref
      if (imageInputPreviewRef.current) {
        imageInputPreviewRef.current.value = "";
      }
    }

    resetFields(type);
    toast.success("Fields cleared");
  };

  return (
    <Button size="md" variant="secondary" onClick={handleClearFields}>
      <MdDelete size={18} />
      <span>Clear Form</span>
    </Button>
  );
};

export default ClearFormButton;
