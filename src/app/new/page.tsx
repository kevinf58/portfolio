import { DocumentFormProvider } from "@/components/documents/DocumentFormProvider";
import Card from "@/components/ui/Card";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { FaRegEdit } from "react-icons/fa";
import { TbSwitchHorizontal } from "react-icons/tb";

const Page = () => {
  return (
    <DocumentFormProvider initialType={DOCUMENT_TYPE.JOURNAL}>
      <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-dark-gray shadow-default">
        <div className="h-full w-full flex flex-wrap justify-center space-x-10 p-8 pt-28">
          <Card size="lg" className="flex flex-col w-full h-full">
            <div className="flex items-center gap-2">
              <FaRegEdit size={25} className="text-dark-white mr-1" />
              <h3 className="font-sans font-bold text-xl text-white">New Journal</h3>
              <TbSwitchHorizontal size={20} title={`Click to Swap to a Journal!`} className="cursor-pointer" />
            </div>
          </Card>
        </div>
      </section>
    </DocumentFormProvider>
  );
};

export default Page;
