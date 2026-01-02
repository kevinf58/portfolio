"use client";

import { DOCUMENT_TYPE } from "@/types/Document.type";
import EditDocument from "@/components/documents/editDocument/EditDocument";
import emptyState from "@/utils/emptyState";

const Page = () => {
  return <EditDocument initialState={emptyState(DOCUMENT_TYPE.JOURNAL)} />;
};

export default Page;
