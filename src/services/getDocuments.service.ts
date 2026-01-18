import { ApiResponse } from "@/types/api/Api.type";
import { Document } from "@/types/Document.type";
import apiRequest from "../app/api/apiRequest";
import { GetDocumentsPayload } from "@/types/api/apiServices.type";

const getDocuments = (payload: GetDocumentsPayload): Promise<ApiResponse<Document[]>> => {
  const params = new URLSearchParams({
    limit: String(payload.limit),
    offset: String(payload.offset),
  });

  // add category to params if filtering journals by category
  if (payload.category) {
    params.set("category", payload.category);
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${payload.type}?${params}`;

  return apiRequest<Document[]>(url, { method: "GET" });
};

export default getDocuments;
