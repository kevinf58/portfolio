"use client";

import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { TbSwitchHorizontal } from "react-icons/tb";

const DocumentTypeToggle = () => {
  const { toggleDocumentType, type } = useDocumentFormContext();

  return (
    <div className="flex items-center gap-2">
      <h3 className="font-sans font-bold text-xl text-white">New {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <TbSwitchHorizontal size={20} title={`Click to Swap to a ${!type}!`} className="cursor-pointer" onClick={toggleDocumentType} />
    </div>
  );
};

export default DocumentTypeToggle;
