import { ApiResponse } from "@/types/api/api.type";
import { Document } from "@/types/Document.type";
import apiRequest from "../app/api/apiRequest";
import { GetDocumentsPayload } from "@/types/api/apiServices.type";

export const getDocuments = (payload: GetDocumentsPayload): Promise<ApiResponse<Document[]>> => {
  const params = new URLSearchParams({
    limit: String(payload.limit),
    offset: String(payload.offset),
  });

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${payload.type}?${params}`;

  return apiRequest<Document[]>(url, { method: "GET" });
};
