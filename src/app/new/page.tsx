import { DOCUMENT_TYPE } from "@/types/Document.type";
import ManageDocument from "@/components/documents/ManageDocument";
import emptyState from "@/utils/emptyState";
import { DOCUMENT_MODE, DocumentModeState } from "@/types/DocumentForm.type";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const createState: DocumentModeState = {
    mode: DOCUMENT_MODE.CREATE,
    draft: emptyState(DOCUMENT_TYPE.JOURNAL),
  };

  return <ManageDocument initialState={createState} />;
};

export default Page;
