import EditDocument from "@/components/documents/editDocument/EditDocument";
import getDocumentByID from "@/services/getDocumentByID.service";
import { DocumentIdentifierParams } from "@/types/api/DocumentIdentifierParams";
import { notFound } from "next/navigation";
import { Document } from "@/types/Document.type";
import { isoToLocalDate } from "@/utils/dateUtils";

const Page = async ({ params }: DocumentIdentifierParams) => {
  const { type, id } = await params;

  const res = await getDocumentByID({ type, id });

  if (!res.success) notFound();

  const document: Document = res.data;
  const { id: documentID, ...documentPayload } = document;

  const initialState = {
    ...documentPayload,
    createdAt: isoToLocalDate(documentPayload.createdAt),
    updatedAt: isoToLocalDate(documentPayload.updatedAt),
  };

  return <EditDocument initialState={initialState} />;
};

export default Page;
