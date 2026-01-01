import { DocumentFormProvider } from "@/components/documents/DocumentFormProvider";
import Card from "@/components/ui/Card";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { FaRegEdit } from "react-icons/fa";
import DocumentTypeToggle from "@/components/documents/createDocumentComponents/DocumentTypeToggle";
import TitleInput from "@/components/documents/createDocumentComponents/TitleInput";
import DateInput from "@/components/documents/createDocumentComponents/DateInput";
import ConditionalInputs from "@/components/documents/createDocumentComponents/conditionalInputs/ConditionalInputs";
import TagInput from "@/components/documents/createDocumentComponents/TagInput";
import ContentEditor from "@/components/documents/createDocumentComponents/ContentEditor";
import PublishButton from "@/components/documents/createDocumentComponents/PublishButton";
import PreviewButton from "@/components/documents/createDocumentComponents/PreviewButton";
import ClearFormButton from "@/components/documents/createDocumentComponents/ClearFormButton";

const Page = () => {
  return (
    <DocumentFormProvider initialType={DOCUMENT_TYPE.JOURNAL}>
      <section className="relative min-h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-dark-gray shadow-default">
        <div className="flex flex-wrap flex-1 justify-center space-x-10 p-8 pt-28">
          <Card size="lg" className="w-full flex flex-col">
            <div className="flex items-center gap-2">
              <FaRegEdit size={25} className="text-dark-white mr-1" />
              <DocumentTypeToggle />
            </div>
            <div className="h-full flex flex-col mx-10 my-6 gap-4">
              <div className="flex gap-2">
                <TitleInput />
                <DateInput />
              </div>
              <ConditionalInputs />
              <TagInput />
              <ContentEditor />
            </div>
          </Card>
        </div>
        <div className="flex justify-between fixed bottom-0 left-1/2 -translate-x-1/2 space-x-2 px-6 py-4 bg-gray w-full max-w-4xl rounded-t-sm border-t-2 border-x-2 border-tint/10 shadow-xl">
          <ClearFormButton />
          <div className="flex space-x-2">
            <PreviewButton />
            <PublishButton />
          </div>
        </div>
      </section>
    </DocumentFormProvider>
  );
};

export default Page;
