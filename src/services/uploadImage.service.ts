import apiRequest from "@/app/api/apiRequest";
import { ApiResponse } from "@/types/api/Api.type";

const uploadImage = (payload: File): Promise<ApiResponse<string>> => {
  const data = new FormData();
  data.append("file", payload);

  return apiRequest<string>("/api/image", {
    method: "POST",
    body: data,
  });
};

export default uploadImage;
