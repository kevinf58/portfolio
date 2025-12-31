import { ApiResponse } from "@/types/api/api.type";
import { CreateDocumentPayload } from "@/types/Document.type";
import apiRequest from "../app/api/apiRequest";

const createDocument = async (payload: CreateDocumentPayload): Promise<ApiResponse<null>> => {
  return apiRequest<null>(`/api/${payload.type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export default createDocument;
