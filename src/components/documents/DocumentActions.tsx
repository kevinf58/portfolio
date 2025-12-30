"use client";

import { MdDelete } from "react-icons/md";
import Button from "../ui/Button";
import { useState } from "react";
import { DocumentIdentifierPayload } from "@/types/api/apiServices.type";
import { deleteDocument } from "@/services/deleteDocument.Service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const DeleteButton = ({ type, id }: DocumentIdentifierPayload) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      return;
    }

    setLoading(true);

    try {
      const res = await deleteDocument({ type, id });

      if (!res.success) {
        toast.error(res.info.message);
        throw new Error(res.info.code + " " + res.info.message);
      }

      toast.success(res.info.message);
      router.push("/");
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button size="sm" variant="secondary" onClick={handleDelete} loading={loading}>
      <MdDelete size={14} className="shrink-0 text-red" />
      <span className="text-red font-medium">Delete</span>
    </Button>
  );
};

export const EditButtion = () => {};
