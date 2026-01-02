import { ApiResponse } from "@/types/api/api.type";
import { DocumentPayload } from "@/types/Document.type";
import apiRequest from "../app/api/apiRequest";

const updateDocument = async (payload: DocumentPayload): Promise<ApiResponse<null>> => {
  return apiRequest<null>(`/api/${payload.type}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export default updateDocument;
