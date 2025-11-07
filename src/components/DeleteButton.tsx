"use client";

import { Button } from "@/components/common/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DocumentType } from "@/types/api/Document.type";

const DeleteButton = ({ id, documentType }: { id: number; documentType: DocumentType }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this journal? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/document/${id}?type=${documentType}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete journal");
      }

      toast.success("Journal deleted successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete journal.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button className="!fixed bottom-5 right-10" type="hollow" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
