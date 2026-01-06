"use client";

import { useState } from "react";
import { DocumentFormProvider } from "./DocumentFormProvider";
import PreviewDocument from "./createDocument/PreviewDocument";
import Card from "@/components/ui/Card";
import { FaRegEdit } from "react-icons/fa";
import DocumentTypeToggle from "./createDocument/DocumentTypeToggle";
import TitleInput from "./createDocument/TitleInput";
import DateInput from "./createDocument/DateInput";
import ConditionalInputs from "./createDocument/conditionalInputs/ConditionalInputs";
import TagInput from "./createDocument/TagInput";
import ContentEditor from "./createDocument/ContentEditor";
import ClearFormButton from "./createDocument/ClearFormButton";
import PreviewButton from "./createDocument/PreviewButton";
import PublishButton from "./createDocument/PublishButton";
import TempButton from "./createDocument/TempButton";
import { DOCUMENT_MODE, DocumentModeState } from "@/types/DocumentForm.type";

const ManageDocument = ({ initialState }: { initialState: DocumentModeState }) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <DocumentFormProvider initialState={initialState}>
      <section className="relative min-h-[calc(100vh-4.75rem)] w-full flex flex-col items-center font-medium bg-dark-gray shadow-default">
        {isPreview ? (
          <PreviewDocument />
        ) : (
          <div className="flex flex-wrap flex-1 space-x-10 p-8 pt-28">
            <Card size="lg" className="w-full flex flex-col">
              <div className="flex items-center gap-2">
                <FaRegEdit size={25} className="text-dark-white mr-1" />
                <DocumentTypeToggle />
              </div>
              <div className="h-full flex flex-col mx-10 my-6 gap-4">
                <div className="flex gap-2">
                  <TitleInput />
                  <DateInput isEditing={initialState.mode === DOCUMENT_MODE.EDIT} />
                </div>
                <ConditionalInputs />
                <TagInput />
                <ContentEditor />
              </div>
            </Card>
          </div>
        )}
        <div className="flex justify-between fixed bottom-0 left-1/2 -translate-x-1/2 space-x-2 px-6 py-4 bg-gray w-full max-w-4xl rounded-t-sm border-t-2 border-x-2 border-tint/10 shadow-xl">
          <ClearFormButton />
          {/* TODO: TEMPORARY BUTTON */}
          <TempButton />
          <div className="flex space-x-2">
            <PreviewButton isPreview={isPreview} setIsPreview={setIsPreview} />
            <PublishButton />
          </div>
        </div>
      </section>
    </DocumentFormProvider>
  );
};

export default ManageDocument;
