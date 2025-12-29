import { DocumentIdentifierPayload } from "@/types/api/apiServices.type";
import apiRequest from "../app/api/apiRequest";
import { ApiResponse } from "@/types/api/api.type";
import { Document } from "@/types/Document.type";

export const getDocumentByID = (payload: DocumentIdentifierPayload): Promise<ApiResponse<Document>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${payload.type}/${payload.id}`;

  return apiRequest<Document>(url, {
    method: "GET",
  });
};
