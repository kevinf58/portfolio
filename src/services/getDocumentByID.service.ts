import { DocumentIdentifierPayload } from "@/types/api/apiServices.type";
import apiRequest from "../app/api/apiRequest";
import { ApiResponse } from "@/types/api/api.type";

export const getDocumentByID = (payload: DocumentIdentifierPayload): Promise<ApiResponse<Document>> => {
  return apiRequest<Document>(`/api/${payload.type}/${payload.id}`, {
    method: "GET",
  });
};
