"use client";

import { Button } from "@/components/common/Button";
import Editor from "./Editor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Card from "@/components/common/cards/Card";
import { FaRegEdit } from "react-icons/fa";
import TagInput from "@/components/DocumentForm/TagInput";
import { TbSwitchHorizontal } from "react-icons/tb";
import ImageUpload from "./ImageUpload";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { useDocumentFormContext } from "./DocumentLayoutContext";
import DocumentPreview from "./DocumentPreview";
import TitleInput from "./TitleInput.";
import JournalCategorySelect from "./JournalCategorySelect";
import createDocument from "@/services/createDocument.service";

export const DocumentLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const documentForm = useDocumentFormContext();
  const { date, setDate, toggleDocumentType, switchDocTypeLabel, documentType } = documentForm;

  const handleCreate = async () => {
    setLoading(true);
    try {
      const data = await createDocument(documentForm);

      if (!data.ok) {
        if (data.status === 409) {
          toast.warn(`A ${documentType} with this title already exists. Please rename it!`);
          return;
        }
        toast.warn(data?.error || "Failed to add entry.");
        return;
      }

      toast.success("Entry added!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const handleButtonClick = () => {
    if (!loading) handleCreate();
  };

  return (
    <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-dark-gray shadow-default">
      <div className="h-full w-full flex flex-wrap justify-center space-x-10 p-8 pt-28">
        <Card
          href=""
          className="flex flex-col border-2 max-w-xl! w-full max-h-152! h-full px-4! py-4! hover:scale-100! cursor-default!"
        >
          <div className="flex items-center gap-2">
            <FaRegEdit size={25} className="text-dark-white mr-2" />
            <h3 className="font-sans font-bold text-xl text-white">New {documentType}</h3>
            <TbSwitchHorizontal
              size={20}
              title={`Click to Swap to a ${switchDocTypeLabel}!`}
              className="cursor-pointer"
              onClick={toggleDocumentType}
            />
          </div>
          <div className="h-full min-h-0 flex flex-col mx-10 my-6 gap-4">
            <div className="flex gap-2">
              <TitleInput />
              <input
                type="date"
                className={`w-min h-min outline-none py-2 px-2 text-xs! text-dark-white ease-in cursor-pointer input-base`}
                value={date}
                onChange={handleDateChange}
              />
            </div>
            {documentType === "project" ? <ImageUpload /> : <JournalCategorySelect />}
            <TagInput />
            <div className={`h-full rounded-sm cursor-text px-4 py-3 overflow-y-scroll input-base`}>
              <Editor />
            </div>
          </div>
        </Card>
        <DocumentPreview />
      </div>
      <Button
        className="fixed! bottom-5 right-10 min-w-32 flex items-center justify-center"
        variant="hollow"
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading ? <CgSpinner className="size-5 animate-spin text-white" /> : `Create ${documentType}`}
      </Button>
    </section>
  );
};
