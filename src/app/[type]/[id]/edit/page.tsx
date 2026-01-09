import ManageDocument from "@/components/documents/ManageDocument";
import getDocumentByID from "@/services/getDocumentByID.service";
import { DocumentIdentifierParams } from "@/types/api/DocumentIdentifierParams.type";
import { notFound } from "next/navigation";
import { Document } from "@/types/Document.type";
import { isoToLocalDate } from "@/utils/dateUtils";
import { DOCUMENT_MODE, DocumentModeState } from "@/types/DocumentForm.type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";

const Page = async ({ params }: DocumentIdentifierParams) => {
  const { type, id } = await params;
  const session = await getServerSession(authOptions);

  // auth check
  if (!session) {
    return notFound();
  }

  const res = await getDocumentByID({ type, id });

  if (!res.success) notFound();

  const document: Document = res.data;

  const initialState: Document = {
    ...document,
    createdAt: isoToLocalDate(document.createdAt),
    updatedAt: isoToLocalDate(document.updatedAt),
  };

  const editState: DocumentModeState = {
    mode: DOCUMENT_MODE.EDIT,
    original: initialState,
    draft: initialState,
  };

  return <ManageDocument initialState={editState} />;
};

export default Page;
