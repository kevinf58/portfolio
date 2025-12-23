"use client";

import { Button } from "@/components/common/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Journal, Project } from "@/types/Document.type";
import deleteDocument from "@/services/deleteDocument.service";

const DeleteButton = (props: Journal | Project) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this journal? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    const document: Journal | Project = {
      type: props.type,
      id: props.id,
    };
    const result = await deleteDocument(document);

    if (!result.ok) {
      toast.error(result.error ?? "Failed to delete journal.");
      setIsDeleting(false);
      return;
    }

    toast.success("Journal deleted successfully!");
    router.push("/");
  };

  return (
    <Button className="fixed! bottom-5 right-10" variant="hollow" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
