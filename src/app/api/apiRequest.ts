import { ApiResponse } from "@/types/api/Api.type";

const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  try {
    const res = await fetch(endpoint, options);
    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        info: {
          code: res.status,
          message: json?.info?.message || res.statusText,
        },
      };
    }

    return json;
  } catch (err) {
    return {
      success: false,
      info: {
        code: 0,
        message: err instanceof Error ? err.message : "Network error",
      },
    };
  }
};

export default apiRequest;
