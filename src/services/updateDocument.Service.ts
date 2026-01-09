import { ApiResponse } from "@/types/api/Api.type";
import apiRequest from "../app/api/apiRequest";
import { UploadDocumentPayload } from "@/types/api/UploadDocumentPayload.type";

const updateDocument = async (payload: UploadDocumentPayload): Promise<ApiResponse<null>> => {
  return apiRequest<null>(`/api/${payload.identifier.type}/${payload.identifier.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload.diff),
  });
};

export default updateDocument;
