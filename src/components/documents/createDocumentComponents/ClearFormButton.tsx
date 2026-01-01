"use client";

import Button from "@/components/ui/Button";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ClearFormButton = () => {
  const { type, resetFields } = useDocumentFormContext();

  const handleClearFields = () => {
    resetFields(type);
    toast.success("Input fields cleared");
  };

  return (
    <Button size="md" variant="secondary" onClick={handleClearFields}>
      <MdDelete size={18} />
      <span>Clear Form</span>
    </Button>
  );
};

export default ClearFormButton;
