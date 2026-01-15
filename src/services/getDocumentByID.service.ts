import { DocumentIdentifierPayload } from "@/types/api/apiServices.type";
import apiRequest from "../app/api/apiRequest";
import { ApiResponse } from "@/types/api/Api.type";
import { Document } from "@/types/Document.type";
import { cookies } from "next/headers";

const getDocumentByID = async (payload: DocumentIdentifierPayload): Promise<ApiResponse<Document>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${payload.type}/${payload.id}`;

  return apiRequest<Document>(url, {
    method: "GET",
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
};

export default getDocumentByID;
