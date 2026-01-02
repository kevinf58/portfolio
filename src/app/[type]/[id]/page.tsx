import getDocumentByID from "@/services/getDocumentByID.service";
import { DocumentIdentifierParams } from "@/types/api/DocumentIdentifierParams";
import { Document } from "@/types/Document.type";
import { notFound } from "next/navigation";
import DocumentDisplay from "@/components/documents/viewDocument/DocumentDisplay";

const Page = async ({ params }: DocumentIdentifierParams) => {
  const { type, id } = await params;

  const res = await getDocumentByID({ type, id });

  if (!res.success) notFound();

  const document: Document = res.data;

  return (
    <section className="relative flex justify-center min-h-[calc(100vh-4.75rem)] w-full bg-dark-gray shadow-default md:px-10 sm:px-6 px-2">
      <DocumentDisplay document={document} />
    </section>
  );
};

export default Page;
