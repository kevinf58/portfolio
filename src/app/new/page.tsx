import { DocumentFormProvider } from "@/components/documents/DocumentFormProvider";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdSend } from "react-icons/md";
import DocumentTypeToggle from "@/components/documents/createDocumentInputs/DocumentTypeToggle";
import TitleInput from "@/components/documents/createDocumentInputs/TitleInput";
import DateInput from "@/components/documents/createDocumentInputs/DateInput";
import ConditionalInputs from "@/components/documents/createDocumentInputs/conditionalInputs/ConditionalInputs";
import TagInput from "@/components/documents/createDocumentInputs/TagInput";
import TempButton from "@/components/documents/createDocumentInputs/TempButton";
import ContentEditor from "@/components/documents/createDocumentInputs/ContentEditor";

const Page = () => {
  return (
    <DocumentFormProvider initialType={DOCUMENT_TYPE.JOURNAL}>
      <section className="relative min-h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-dark-gray shadow-default">
        <div className="flex flex-wrap flex-1 justify-center space-x-10 p-8 pt-28">
          <Card size="lg" className="flex flex-col">
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
        <div className="flex justify-end fixed bottom-0 left-1/2 -translate-x-1/2 space-x-2 px-6 py-4 bg-gray w-full max-w-4xl rounded-t-sm border-t-2 border-x-2 border-tint/10 shadow-xl">
          {/* TODO: TEMPORARY BUTTON */}
          <TempButton />
          <Button size="md" variant="secondary">
            <MdOutlineRemoveRedEye size={18} />
            <span>Preview</span>
          </Button>
          <Button>
            <MdSend size={18} />
            <span>Publish</span>
          </Button>
        </div>
      </section>
    </DocumentFormProvider>
  );
};

export default Page;
