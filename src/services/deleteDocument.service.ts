import { DocumentIdentifierPayload } from "@/types/api/apiServices.type";
import apiRequest from "../app/api/apiRequest";
import { ApiResponse } from "@/types/api/api.type";

export const deleteDocument = (payload: DocumentIdentifierPayload): Promise<ApiResponse<null>> => {
  return apiRequest<null>(`/api/${payload.type}/${payload.id}`, {
    method: "DELETE",
  });
};
