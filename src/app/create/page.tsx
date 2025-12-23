import { DocumentLayout } from "@/components/DocumentForm/DocumentLayout";
import { DocumentFormProvider } from "@/components/DocumentForm/DocumentLayoutContext";

const Page = () => {
  return (
    <DocumentFormProvider>
      <DocumentLayout />
    </DocumentFormProvider>
  );
};

export default Page;
